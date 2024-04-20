from allauth.account.adapter import DefaultAccountAdapter


class CustomAccountAdapter(DefaultAccountAdapter):
    # user의 추가적인 데이터를 db에 저장하기 위한 어뎁터

    def save_user(self, request, user, form, commit=True):
        data = form.cleaned_data
        # 기본 저장 필드:  username, email
        user = super().save_user(request, user, form, False)

        user.name = data.get('name')
        user.student_id = data.get("student_id")
        user.grade = data.get("grade")
        user.study = data.get("study")
        user.gender = data.get("gender")
        user.phone = data.get("phone")

        user.save()
        return user
