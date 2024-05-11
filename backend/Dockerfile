# Python 3.12.0을 base image로 설정
FROM python:3.12.0

# META DATA
LABEL version="1.0"
LABEL description="This is a sample gwnu_backend image"
LABEL maintainer="hwstar1204@gmail.com"

# 파이썬 출력 버퍼링 없앰
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip

# 도커 파일에서 작업 디렉토리를 프로젝트 디렉토리로 설정
WORKDIR /App/backend

# requirements.txt 설치 
COPY ./requirements.txt /requirements.txt
RUN pip install -r /requirements.txt

# 현재 디렉토리에 있는 모든 파일을 작업 디렉토리로 복사
COPY . .

# 이동한 디렉토리에서 django를 가동시켜주는 코드를 작성합니다. 여기서 port는 8000로 실행시키겠습니다.
# CMD ["python3", "manage.py", "makemigrations"]
# CMD ["python3", "manage.py", "migrate"]
# CMD ["python3", "manage.py", "runserver", "localhost:8000"]

# django 서버의 포트를 8000로 지정하였으므로 Docker의 컨테이너 또한 8000 포트를 열어줍니다.
EXPOSE 8000