from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import viewsets

# viewsets : provides default create(), retireve(), update(), destroy(),
#            list(), partial_update()

# Create your views here.
class BoardViewSet(viewsets.ModelViewSet):
    queryset = Board.objects.all()
    serializer_class = BoardSerializer

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
