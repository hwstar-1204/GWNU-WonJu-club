import os
import pandas as pd
import json

purpose = './raw_data/Purpose_conversation'


# 폴더별로 파일 불러와서 csv화
p_files = os.listdir(purpose) # purpose의 폴더 이름 불러옴 (TL~)

for pidx, fname in enumerate(p_files) :
  tpath = purpose + '/' + fname
  TL = os.listdir(tpath) # TL하나의 폴더이름 저장
  
  for pidx2, fname2 in enumerate(TL) :
    print(fname2)
    cpath = tpath + '/' + fname2 
    category = os.listdir(cpath) # TL 속 01~ 파일 이름 저장
    
    extracted_data = []
    for pidx3, fname3 in enumerate(category) :
      fpath = cpath + '/' + fname3
      try:
        with open(fpath, "r") as file:
          data = json.load(file)
      except json.JSONDecodeError as e:
        print(f"JSONDecodeError: {e} in {fpath}")
        continue

      for item in data['info'] :
        text = item['annotations']['text']
        category = item['annotations']['subject']
        extracted_data.append({'text': text, 'category': category})

# 추출한 데이터를 데이터프레임으로 변환
df = pd.DataFrame(extracted_data)

# 데이터프레임을 CSV 파일로 저장
csv_file_path = 'extracted_data.csv'
df.to_csv(csv_file_path, index=False)

print(f'Data saved to {csv_file_path}')

print(p_files)
