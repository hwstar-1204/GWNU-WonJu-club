from django.db import models

class ChatbotTrainData(models.Model):
    intent = models.CharField(max_length=45, blank=True, null=True)
    ner = models.CharField(max_length=1024, blank=True, null=True)
    query = models.TextField(blank=True, null=True)
    answer = models.TextField()
    answer_image = models.CharField(max_length=2048, blank=True, null=True)

    class Meta:
        db_table = 'Chatbot train data'
        verbose_name = 'Chatbot'
        verbose_name_plural = 'Chatbot'

    def __str__(self):
        return self.query if self.query else 'No Query'

