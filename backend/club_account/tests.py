import re
from django.test import TestCase
from django.urls import reverse
from django.core import mail
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token

from allauth.account.models import EmailAddress
from .models import CustomUser

class BaseTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            email='test1234@gmail.com',
            password='testpassword',
            name='Test User',
            student_id=22225678,
            grade=1,
            study='Computer Science',
            gender='남자',
            phone='010-1234-5678'
        )
        EmailAddress.objects.create(
            user=self.user,
            email=self.user.email,
            primary=True,
            verified=True
        )
        self.user.save()
        self.token = Token.objects.create(user=self.user)


class RegistrationTest(BaseTest):
    def test_registration(self):
        response = self.client.post(reverse('rest_register'), {
            'email': 'qwer1234@gmail.com',
            'password1': 'testpassword',
            'password2': 'testpassword',
            'name': 'Test User',
            'student_id': 12345678,
            'grade': 1,
            'study': 'Computer Science',
            'gender': '남자',
            'phone': '010-1231-1231'
        })
        self.assertEqual(response.status_code, 201)


class LoginTest(BaseTest):
    def test_successful_login(self):
        response = self.client.post(reverse('rest_login'), {
            'email': self.user.email,
            'password': 'testpassword'
        })

        self.assertIn('key', response.data)
        self.assertEqual(response.status_code, 200)

    def test_login_with_wrong_password(self):
        response = self.client.post(reverse('rest_login'), {
            'email': 'hwstar1204@gmail.com',
            'password': 'wrongpassword'
        })
        self.assertEqual(response.status_code, 400)

    def test_login_with_nonexistent_user(self):
        response = self.client.post(reverse('rest_login'), {
            'email': 'nonexistent@gmail.com',
            'password': 'testpassword'
        })
        self.assertEqual(response.status_code, 400)


class PasswordResetTest(BaseTest):
    def test_password_reset_request(self):
        response = self.client.post(reverse('rest_password_reset'), {'email': self.user.email})
        self.assertEqual(response.status_code, 200)

        # 이메일이 전송되었는지 확인
        self.assertEqual(len(mail.outbox), 1)
        email = mail.outbox[0]

        # 이메일 내용에서 URL 추출
        url_match = re.search(r'http://testserver/club_account/password/reset/confirm/\S+', email.body)
        self.assertIsNotNone(url_match, "Password reset URL not found in email body")

        url = url_match.group(0)

        # URL에서 uid와 token 추출
        uid_and_token = url.split('/')[-3:-1]
        uid = uid_and_token[0]
        token = uid_and_token[1]

        return uid, token

    def test_password_reset_confirm(self):
        uid, token = self.test_password_reset_request()

        response = self.client.post(reverse('rest_password_reset_confirm'), {
            'uid': uid,
            'token': token,
            'new_password1': 'newpassword@',
            'new_password2': 'newpassword@',
        })
        self.assertEqual(response.status_code, 200)
