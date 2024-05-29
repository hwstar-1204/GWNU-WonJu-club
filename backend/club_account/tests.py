from django.test import TestCase
from django.urls import reverse
from .models import CustomUser
from rest_framework.test import APIClient
from rest_framework.authtoken.models import Token

class PasswordResetTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = CustomUser.objects.create_user(
            email='hwstar1204@gmail.com',
            password='testpassword',
            name='Test User',
            student_id=12345678,
            grade=1,
            study='Computer Science',
            gender='남자',
            phone='010-1234-5678'
        )
        self.token = Token.objects.create(user=self.user)


    def test_password_reset_request(self):
        response = self.client.post(reverse('rest_password_reset'), {'email': self.user.email})
        self.assertEqual(response.status_code, 200)

    def test_password_reset_confirm(self):
        # In a real test, you would extract the uid and token from the email sent to the user.
        # Here, we'll just generate them manually.
        uid = self.user.pk
        token = self.token.key
        print(token)
        response = self.client.post(reverse('rest_password_reset_confirm'), {
            'uid': uid,
            'token': token,
            'new_password1': 'newpassword@',
            'new_password2': 'newpassword@',
        })
        self.assertEqual(response.status_code, 200)