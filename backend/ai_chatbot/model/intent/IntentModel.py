import tensorflow as tf
# from tensorflow.keras.models import load_model
# from tf_keras.models import load_model
# from keras.models import load_model
from tensorflow.keras import preprocessing
from tf_keras.models import load_model

#
# import os
#
# os.environ['TF_USE_LEGACY_KERAS'] = '1'

# 의도 분류 모델 모듈
class IntentModel:
    def __init__(self, model_name, preprocess):
        # if not os.path.exists(model_name):
        #     raise ValueError(f"Model file not found at {model_name}")

        # 의도 클래스 별 레이블
        self.labels = {0: "인사", 1: "욕설", 2: "종류", 3: "소개", 4: "기타", 5: "가입방법", 6: "위치", 7: "활동", 8: "생성", 9: "회비", 10: "분류"}

        # 의도 분류 모델 불러오기
        # self.model = tf.keras.models.load_model(model_name)
        # self.model = keras.models.load_model(model_name)
        self.model = load_model(model_name)
        # 모델 컴파일

        # 챗봇 Preprocess 객체
        self.p = preprocess


    # 의도 클래스 예측
    def predict_class(self, query):
        # 형태소 분석
        pos = self.p.pos(query)

        # 문장내 키워드 추출(불용어 제거)
        keywords = self.p.get_keywords(pos, without_tag=True)
        sequences = [self.p.get_wordidx_sequence(keywords)]

        # 단어 시퀀스 벡터 크기
        from ai_chatbot.config.GlobalParams import MAX_SEQ_LEN

        # 패딩처리
        padded_seqs = preprocessing.sequence.pad_sequences(sequences, maxlen=MAX_SEQ_LEN, padding='post')
        predict = self.model.predict(padded_seqs)
        predict_class = tf.math.argmax(predict, axis=1)
        return predict_class.numpy()[0]