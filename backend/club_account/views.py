from django.contrib.auth import get_user_model
from django.shortcuts import render, redirect
from rest_framework import generics

# Create your views here.
from rest_framework.exceptions import NotFound
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC
from django.http import HttpResponseRedirect

from club_account.serializers import UserInfoSerializer


class ConfirmEmailView(APIView):
    permission_classes = [AllowAny]

    def get(self, *args, **kwargs):
        self.object = confirmation = self.get_object()
        confirmation.confirm(self.request)
        # A React Router Route will handle the failure scenario
        return HttpResponseRedirect('/login/success/')

    def get_object(self, queryset=None):
        key = self.kwargs['key']
        email_confirmation = EmailConfirmationHMAC.from_key(key)
        if not email_confirmation:
            if queryset is None:
                queryset = self.get_queryset()
            try:
                email_confirmation = queryset.get(key=key.lower())
            except EmailConfirmation.DoesNotExist:
                # A React Router Route will handle the failure scenario
                return HttpResponseRedirect('/login/failure/')
        return email_confirmation

    def get_queryset(self):
        qs = EmailConfirmation.objects.all_valid()
        qs = qs.select_related("email_address__user")
        return qs


# TODO user_detail 오버라이딩 !!
class UserDetailApiView(generics.RetrieveAPIView):
    # permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = get_user_model().objects.all()
    serializer_class = UserInfoSerializer


class PageAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def handle_exception(self, exc):
        from rest_framework.exceptions import NotAuthenticated
        if isinstance(exc, NotAuthenticated):
            print("Not authenticated")
        return super().handle_exception(exc)