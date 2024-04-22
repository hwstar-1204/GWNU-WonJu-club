import os

from rest_framework import status
from rest_framework.decorators import APIView
from club_management.permissions import IsClubPresident
from rest_framework.response import Response

import config
from club_management.serializer import *
from club_management.models import *
from django.db.models import Q
from django.utils import timezone
from django.core.files.storage import default_storage

# Create your views here.
class ClubManagementHomeAPIView(APIView):
    permission_classes = [IsClubPresident]
    def get(self, request, club_name):
        # 동아리 이름이 제공되지 않을 때
        if not club_name:
            return Response({'error': '동아리 이름이 제공되지 않았습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        # joined_data를 통해서 기존 회원을 찾는다.
        club_members = ClubMemberManagement.objects.filter(club_name=club_name).select_related('student_num')
        exiting_members = club_members.filter(joined_data__isnull=False)
        existing_data = ClubMemberSerializer(exiting_members, many=True).data

        # 로고, 사진 데이터를 가져온다.
        logo_photo = ClubManagement.objects.filter(club_name=club_name)
        logophoto_data = ClubSerializer(logo_photo, fields=('logo', 'photo')).data

        introduce_content = ClubManagement.objects.filter(club_name=club_name)
        introduce_data = ClubSerializer(introduce_content, fields=('introducation')).data

        response_data = {
            'existing_members': existing_data,
            'logo_photo': logophoto_data,
            'introduce_content': introduce_data
        }
        return Response(response_data)

class ApproveMemberAPIView(APIView):
    permission_classes = [IsClubPresident]
    def post(self, request, club_name):
        user = request.user
        student_num = user.student_num

        # 동아리 이름이 제공되지 않을 때
        if not club_name:
            return Response({'error': '동아리 이름이 제공되지 않았습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        # 동아리 회원 중 가입날짜가 null이고 클라이언트에게 받은 student_num에 맞는 회원을 찾는다.
        club_members = ClubMemberManagement.objects.filter(club_name=club_name).select_related('student_num')
        new_club_members = club_members.filter(Q(joined_data=None) & Q(student_num=student_num))

        # 가입을 승인하려는 데이터가 없을때
        if not new_club_members:
            return  Response({'error': '가입요청이 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)

        # '허가' 또는 '거부' 데이터가 action에 존재하지 않을때
        action = request.data.get('action')
        if action not in ['approve', 'reject']:
            return Response({'error': '값이 전달되지 않았습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        # '허가' 또는 '거부'일 때 처리
        if action == 'approve':
            new_club_members.joined_data = timezone.now() # 코드를 처리하는 현재 시간을 저장
            new_club_members.save()
            return Response({'message': '정상적으로 처리 되었습니다.'}, status=status.HTTP_200_OK)
        elif action == 'reject':
            new_club_members.delete()
            return Response({'message': '가입신청을 거부했습니다.'}, status=status.HTTP_200_OK)

class LogoAPIView(APIView):
    permission_classes = [IsClubPresident]
    def post(self, request, club_name):
        # 동아리 이름이 제공되지 않을 때
        if not club_name:
            return Response({'error': '동아리 이름이 제공되지 않았습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        # 동아리 로고와 사진 데이터
        logo_photo = ClubManagement.objects.get(club_name=club_name)

        action = request.data.get('action')
        if action not in ['correction', 'upload', 'delete']:
            return Response({'error': '값이 전달되지 않았습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        if action == 'correction':
            logo_file = request.FILES['logo']
            if not logo_file:
                return Response({'error': '로고정보를 전달받지 못했습니다.'}, status=status.HTTP_400_BAD_REQUEST)

            new_image_path = os.path.join(config.settings.MEDIA_ROOT, 'club', 'logo', logo_file.name)

            if not os.path.isfile(new_image_path):
                return Response({'error': '폴더에 이미지가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)

            logo_photo.logo = new_image_path
            logo_photo.save()

            return Response({'message': '로고를 성공적으로 수정했습니다.'}, status=status.HTTP_200_OK)

        elif action == 'upload':
            logo_file = request.FILES['logo']
            if not logo_file:
                return Response({'error': '로고정보를 전달받지 못했습니다.'}, status=status.HTTP_400_BAD_REQUEST)

            upload_path = os.path.join(config.settings.MEDIA_ROOT, 'club', 'logo', logo_file.name)

            if default_storage.exists(upload_path):
                return Response({'error': '같은 이름의 로고가 존재하고 있습니다.'}, status=status.HTTP_400_BAD_REQUEST)

            default_storage.save(upload_path, logo_file)
            return Response({'error': '성공적으로 로고를 업로드 했습니다.'}, status=status.HTTP_200_OK)

        elif action == 'delete':
            logo_file = request.FILES['logo']
            if not logo_file:
                return Response({'error': '로고정보를 전달받지 못했습니다.'}, status=status.HTTP_400_BAD_REQUEST)
            delete_path = os.path.join(config.settings.MEDIA_ROOT, 'club', 'logo', logo_file.name)

            if default_storage.exists(delete_path):
                default_storage.delete(delete_path)
                return Response({'message': '로고가 정상적으로 삭제되었습니다.'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': '로고가 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

class PhotoAPIView(APIView):
    permission_classes = [IsClubPresident]

    def post(self, request, club_name):
        # 동아리 이름이 제공되지 않을 때
        if not club_name:
            return Response({'error': '동아리 이름이 제공되지 않았습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        # 동아리 로고와 사진 데이터
        logo_photo = ClubManagement.objects.get(club_name=club_name)

        action = request.data.get('action')
        if action not in ['correction', 'upload', 'delete']:
            return Response({'error': '값이 전달되지 않았습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        if action == 'correction':
            photo_file = request.FILES['photo']
            if not photo_file:
                return Response({'error': '사진정보를 전달받지 못했습니다.'}, status=status.HTTP_400_BAD_REQUEST)

            new_image_path = os.path.join(config.settings.MEDIA_ROOT, 'club', 'photo', photo_file.name)

            if not os.path.isfile(new_image_path):
                return Response({'error': '폴더에 이미지가 존재하지 않습니다.'}, status=status.HTTP_404_NOT_FOUND)

            logo_photo.photo = new_image_path
            logo_photo.save()

            return Response({'message': '사진을 성공적으로 수정했습니다.'}, status=status.HTTP_200_OK)

        elif action == 'upload':
            photo_file = request.FILES['photo']
            if not photo_file:
                return Response({'error': '사진정보를 전달받지 못했습니다.'}, status=status.HTTP_400_BAD_REQUEST)

            upload_path = os.path.join(config.settings.MEDIA_ROOT, 'club', 'photo', photo_file.name)

            if default_storage.exists(upload_path):
                return Response({'error': '같은 이름의 사진이 존재하고 있습니다.'}, status=status.HTTP_400_BAD_REQUEST)

            default_storage.save(upload_path, photo_file)
            return Response({'error': '성공적으로 사진을 업로드 했습니다.'}, status=status.HTTP_200_OK)

        elif action == 'delete':
            photo_file = request.FILES['photo']
            if not photo_file:
                return Response({'error': '사진정보를 전달받지 못했습니다.'}, status=status.HTTP_400_BAD_REQUEST)
            delete_path = os.path.join(config.settings.MEDIA_ROOT, 'club', 'photo', photo_file.name)

            if default_storage.exists(delete_path):
                default_storage.delete(delete_path)
                return Response({'message': '사진이 정상적으로 삭제되었습니다.'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': '사진이 존재하지 않습니다.'}, status=status.HTTP_400_BAD_REQUEST)

class IntroduceContentAPIView(APIView):
    permission_classes = [IsClubPresident]
    def post(self, request, club_name):
        action = request.data.get('action')
        if action not in ['correction']:
            return Response({'error': '값이 전달되지 않았습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        if action == 'correction':
            correction_content = request.data.get('content')

            club = ClubManagement.object.get(club_name=club_name)
            club.introducation = correction_content

            club.save()
            return Response({'message': '성공적으로 소개글이 수정되었습니다.'}, status=status.HTTP_200_OK)
