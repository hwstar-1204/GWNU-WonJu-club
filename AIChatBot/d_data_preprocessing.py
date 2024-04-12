import os
import pandas as pd
import json

daily = './raw_data/daily_conversation'


# 폴더별로 파일 불러와서 csv화
p_files = os.listdir(daily) # daily의 폴더 이름 불러옴 (TL~)

for pidx, fname in enumerate(p_files) :
  tpath = daily + '/' + fname
  TL = os.listdir(tpath) # TL하나의 폴더이름 저장
  extracted_data = []

  for pidx2, fname2 in enumerate(TL) :
    cpath = tpath + '/' + fname2
    try:
      with open(cpath, "r") as file:
        data = json.load(file)
    except json.JSONDecodeError as e:
      print(f"JSONDecodeError: {e} in {cpath}")
      continue

    for item in data['info'] :
      text = item['annotations']['text']
      category = item['annotations']['subject']
      extracted_data.append({'text': text, 'category': category})

# 추출한 데이터를 데이터프레임으로 변환
df = pd.DataFrame(extracted_data)

# 데이터프레임을 CSV 파일로 저장
csv_file_path = 'd_extracted_data.csv'
df.to_csv(csv_file_path, index=False)

print(f'Data saved to {csv_file_path}')

print(p_files)
