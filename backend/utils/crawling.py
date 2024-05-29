import urllib.request
from bs4 import BeautifulSoup
import os
import sys
import django


class Crawling:
    def __init__(self, url):
        self.url = url
        self.obj = self.get_html()

    def get_html(self):
        html = urllib.request.urlopen(self.url)
        bsObj = BeautifulSoup(html, "html.parser")
        return bsObj

    def get_all_data(self):
        bsObj = self.get_html()
        rows = bsObj.find_all("tr", {"class": "normalLi"})
        result = []
        
        for row in rows:
            # 제목 추출
            title_td = row.find("td", class_="_artclTdTitle")
            if title_td:
                title = title_td.get_text(strip=True)
                title = title.split(']', 1)[-1].strip()

                print("Title:", title)
                
                # 작성자 추출
                writer_td = row.find("td", class_="_artclTdWriter")
                writer = writer_td.get_text(strip=True).split('(', 1)[0] if writer_td else "N/A"
                print("Writer:", writer)
                
                # 날짜 추출
                date_td = row.find("td", class_="_artclTdRdate")
                date = date_td.get_text(strip=True) if date_td else "N/A"
                # 날짜 형식 변환
                date = date.replace(".", "-")
                print("Date:", date)

                # 링크 추출
                link = title_td.find("a")["href"]
                print("Link:", "https://ctl.gwnu.ac.kr/"+link)

                # 공지사항 번호 추출
                specific_id_td = row.find("td", class_="_artclTdNum")
                specific_id = specific_id_td.get_text(strip=True) if specific_id_td else "N/A"
                print("Specific ID:", specific_id)

                print("\n")

                result.append({
                    "specific_id": specific_id,
                    "title": title,
                    "author": writer,
                    "created_date": date,
                    "link": "https://ctl.gwnu.ac.kr/"+link
                })
        return result

def setup():

    # 현재 스크립트의 디렉토리를 Django 프로젝트 루트 디렉토리로 설정
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    sys.path.append(BASE_DIR)

    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
    django.setup()

def add_new_items_to_database(crawled_items):
    from club_board.models import Notice

    last_inserted_items = Notice.objects.last()
    if last_inserted_items is None:
        last_inserted_specific_id = ""
    else:
        last_inserted_specific_id = getattr(last_inserted_items, 'specific_id')

    items_to_insert_into_db = []
    for item in crawled_items:
        if item['specific_id'] == last_inserted_specific_id:
            print("already inserted!!")
            break
        items_to_insert_into_db.append(item)
    items_to_insert_into_db.reverse()

    for item in items_to_insert_into_db:
        print("new item added!! : " + item['title'])

        Notice.objects.create(
            specific_id=item['specific_id'],
            title=item['title'],
            author=item['author'],
            created_date=item['created_date'],
            link=item['link']
        )

    return items_to_insert_into_db


def run():
    url = "https://www.gwnu.ac.kr/kr/7897/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGa3IlMkYxNjEzJTJGYXJ0Y2xMaXN0LmRvJTNGYmJzQ2xTZXElM0QlMjZiYnNPcGVuV3JkU2VxJTNEJTI2aXNWaWV3TWluZSUzRGZhbHNlJTI2c3JjaENvbHVtbiUzRHNqJTI2c3JjaFdyZCUzRCVFQiU4RiU5OSVFQyU5NSU4NCVFQiVBNiVBQyUyNg%3D%3D"
    crawler = Crawling(url)
    notices = crawler.get_all_data()
    
    setup()
    add_new_items_to_database(notices)


if __name__ == "__main__":
    run()
