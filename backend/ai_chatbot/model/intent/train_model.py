import pandas as pd
import tensorflow as tf
from tf_keras import preprocessing, Input, layers,optimizers,callbacks, Model
from ai_chatbot.config.GlobalParams import MAX_SEQ_LEN

# 데이터 읽어오기
train_file = "./total_train_data_최종보완1.csv"
data = pd.read_csv(train_file, delimiter=',', encoding='utf8')
queries = data['query'].tolist()
intents = data['intent'].tolist()

print(set(intents))

from ai_chatbot.utils.Preprocess import Preprocess

p = Preprocess(word2index_dic='../../train_tools/dict/chatbot_dict.bin',
               userdic='../../utils/user_dic.tsv')

# 단어 시퀀스 생성
sequences = []
# line = 1
for sentence in queries:
    # line += 1
    # try :
        pos = p.pos(sentence)
        keywords = p.get_keywords(pos, without_tag=True)
        seq = p.get_wordidx_sequence(keywords)
        sequences.append(seq)
    # except :
    #     print(line, sentence)

# 단어 인덱스 시퀀스 벡터 ○2
# 단어 시퀀스 벡터 크기
padded_seqs = preprocessing.sequence.pad_sequences(sequences, maxlen=MAX_SEQ_LEN, padding='post')

# (105658, 15)
print(padded_seqs.shape)
print(len(intents))

# 학습용, 검증용, 테스트용 데이터셋 생성 ○3
# 학습셋:검증셋:테스트셋 = 7:2:1
ds = tf.data.Dataset.from_tensor_slices((padded_seqs, intents))
ds = ds.shuffle(len(queries))

train_size = int(len(padded_seqs) * 0.7)
val_size = int(len(padded_seqs) * 0.2)
test_size = int(len(padded_seqs) * 0.1)

train_ds = ds.take(train_size).batch(20)
val_ds = ds.skip(train_size).take(val_size).batch(20)
test_ds = ds.skip(train_size + val_size).take(test_size).batch(20)

# 하이퍼 파라미터 설정
dropout_prob = 0.5
EMB_SIZE = 128
EPOCH = 200
VOCAB_SIZE = len(p.word_index) + 1 #전체 단어 개수


# CNN 모델 정의  ○4
input_layer = Input(shape=(MAX_SEQ_LEN,))
embedding_layer = layers.Embedding(VOCAB_SIZE, EMB_SIZE, input_length=MAX_SEQ_LEN)(input_layer)
dropout_emb = layers.Dropout(rate=dropout_prob)(embedding_layer)

conv1 = layers.Conv1D(
    filters=128,
    kernel_size=3,
    padding='valid',
    activation='relu')(dropout_emb)
pool1 = layers.GlobalMaxPool1D()(conv1)

conv2 = layers.Conv1D(
    filters=128,
    kernel_size=4,
    padding='valid',
    activation='relu')(dropout_emb)
pool2 = layers.GlobalMaxPool1D()(conv2)

conv3 = layers.Conv1D(
    filters=128,
    kernel_size=5,
    padding='valid',
    activation='relu')(dropout_emb)
pool3 = layers.GlobalMaxPool1D()(conv3)

# 3,4,5gram 이후 합치기
concat = layers.concatenate([pool1, pool2, pool3])

hidden = layers.Dense(128, activation='relu')(concat)
dropout_hidden = layers.Dropout(rate=dropout_prob)(hidden)
logits = layers.Dense(11, name='logits')(dropout_hidden) # 출력 개수 잘 맞춰주기
predictions = layers.Dense(11, activation='softmax')(logits) # 출력 개수 잘 맞춰주기

# 모델 생성  ○5
model = Model(inputs=input_layer, outputs=predictions)
model.compile(
              optimizer=optimizers.Adam(),
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

early_stopping = callbacks.EarlyStopping()

callbacks.EarlyStopping(monitor='val_loss', min_delta=20, patience=25, mode='auto')

# 모델 학습 ○6
model.fit(train_ds, validation_data=val_ds, epochs=EPOCH, verbose=1, callbacks = [early_stopping])

# 모델 평가(테스트 데이터 셋 이용) ○7
loss, accuracy = model.evaluate(test_ds, verbose=1)
print('Accuracy: %f' % (accuracy * 100))
print('loss: %f' % (loss))


# 모델 저장  ○8
model.save('../intent_model_new.h5', overwrite=True)