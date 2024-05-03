import dj_rest_auth.views
from django.contrib.auth import get_user_model
from django.shortcuts import render, redirect
from rest_framework import generics

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from allauth.account.models import EmailConfirmation, EmailConfirmationHMAC
from django.http import HttpResponseRedirect

# from club_account.serializers import

# Create your views here.

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
