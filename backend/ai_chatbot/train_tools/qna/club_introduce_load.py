import pymysql
import openpyxl

from config.DatabaseConfig import * # DB 접속 정보 불러오기

# 학습 데이터 초기화
def all_clear_train_data(db) :
  # 기존 데이터 삭제
  sql = '''
        delete from club_introduce_club
      '''
  
  with db.cursor() as cursor:
    cursor.execute(sql)

  # auto increment 초기화
  sql = '''
        ALTER TABLE club_introduce_club AUTO_INCREMENT=1
      '''
  
  with db.cursor() as cursor :
    cursor.execute(sql)

# db에 데이터 저장
def insert_data(db, xls_row) :
  club_name, category, introducation, logo, new_club, photo =  xls_row

  sql = '''
        INSERT club_introduce_club(club_name, category, introducation, logo, new_club, photo)
        values('%s', '%s', '%s', '%s', '%s', '%s')
      ''' % (club_name.value, category.value, introducation.value, logo.value, new_club.value, photo.value)
  
  # 엑셀에서 불러온 cell에 데이터가 없는 경우, null 로 치환
  sql = sql.replace("'None'", "null")

  with db.cursor() as cursor:
      cursor.execute(sql)
      #print('{} 저장'.format(query.value))
      db.commit()
 

train_file = './ai_chatbot/train_tools/qna/club_introduce_data.xlsx'
db = None
try:
  # DB 호스트 정보에 맞게 입력해주세요
  db = pymysql.connect(
      host='127.0.0.1',
      user='root',
      db='chatbot',
      charset='utf8'
  )

  # 기존 학습 데이터 초기화
  all_clear_train_data(db)

  # 학습 엑셀 파일 불러오기
  wb = openpyxl.load_workbook(train_file)
  sheet = wb['Sheet1'] # 시트명 확인 잘 하기 
  for row in sheet.iter_rows(min_row=2): # 해더는 불러오지 않음
      # 데이터 저장
      insert_data(db, row) # too many values to unpack (expected 5) => .xlsx파일에 빈 열이 생기지 않았는지 확인

  wb.close()

except Exception as e:
    print(e)

finally:
    if db is not None:
        db.close()
 
