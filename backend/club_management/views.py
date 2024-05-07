from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.generics import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from club_management.serializer import *
from club_management.models import *
from club_introduce.models import *

import backend
from django.utils import timezone
from django.core.files.storage import default_storage

# Create your views here.
class ClubManagementHomeView(RetrieveAPIView):
    serializer_class = ClubSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        """
        동아리 관리 페이지 홈
        """
        club_name = self.kwargs.get('club_name')
        try:
            return Club.objects.get(club_name=club_name)
        except Club.DoesNotExist:
            raise Http404

class MemberApproveAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = ClubMemberSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        id = self.kwargs.get('id')
        club_name = self.kwargs.get('club_name')
        return ClubMember.objects.get(id=id, club_name=club_name)

    def delete(self, request, *args, **kwargs):
        """
        신규 회원 거부
        """
        member = self.get_object()
        member.delete()
        Response({"message": "신청을 거부했습니다."}, status=status.HTTP_204_NO_CONTENT)

    def patch(self, request, *args, **kwargs):
        """
        신규 회원 승인
        """
        member = self.get_object()
        member.joined_date = timezone.now()
        member.job = '일반회원'

        serializer = self.get_serializer(member)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data, status=status.HTTP_200_OK)

class LogoCorrectionDelete(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, club_name):
        """
        동아리 로고 디렉터리에 있는 파일 확인
        """
        club_name = os.path.basename(os.path.normpath(club_name))
        logo_directory_path = os.path.join(settings.MEDIA_ROOT, club_name, 'logo')

        try:
            logo_files = os.listdir(logo_directory_path)
            logo_urls = [request.build_absolute_uri(settings.MEDIA_URL + f'{club_name}/logo/' + file) for file in logo_files]
        except FileNotFoundError:
            return Response({'error': f'Logo directory for {club_name} not found.'})

        return Response({'logo': logo_urls}, status=status.HTTP_200_OK)

    def patch(self, request, club_name):
        """
        동아리 로고 수정
        """
        club = Club.objects.get(club_name=club_name)
        file_name = request.data.get('file_name')

        if not file_name:
            return Response({'error': 'File name is required.'}, status=status.HTTP_400_BAD_REQUEST)

        file_path = os.path.join(settings.MEDIA_ROOT, club_name, 'logo', file_name)
        if not os.path.exists(file_path):
            return Response({'error': 'File does not exist in the specified directory.'}, status=status.HTTP_404_NOT_FOUND)

        club.logo = os.path.join(settings.MEDIA_ROOT, club_name, 'logo', file_name)
        club.save()

        return Response({'message': 'Logo updated successfully.', 'new_logo': club.logo}, status=status.HTTP_200_OK)

    def delete(self, request, club_name):
        """
        동아리 로고 삭제
        """
        file_name = request.data.get('file_name')

        if not file_name:
            return Response({'error': 'File name is required.'}, status=status.HTTP_400_BAD_REQUEST)

        file_path = os.path.join(settings.MEDIA_ROOT, club_name, 'logo', file_name)
        if not os.path.exists(file_path):
            return Response({'error': 'File does not exist in the specified directory.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            # 파일 삭제
            default_storage.delete(file_path)
            return Response({'message': 'File deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class LogoUpload(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ClubSerializer

    def get_object(self):
        club_name = self.kwargs.get('club_name')
        return Club.objects.get(club_name=club_name)

    def post(self, request, *args, **kwargs):
        """
        동아리 로고 추가
        """
        file = request.FILES.get('logo')
        club_name = kwargs.get('club_name')

        if not file:
            return Response({'message': 'No logo provided'}, status=status.HTTP_400_BAD_REQUEST)

        directory_path = os.path.join(settings.MEDIA_ROOT, club_name, 'logo')
        full_path = os.path.join(directory_path, file)

        if default_storage.exists(full_path):
            return Response({'messege': 'logo exsit'}, status=status.HTTP_400_BAD_REQUEST)

        default_storage.save(full_path, ContentFile(file.read()))
        return Response({'message': 'upload logo'}, status=status.HTTP_200_OK)

class PhotoCorrectionDelete(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, club_name):
        """
        동아리 사진 디렉터리에 있는 파일 확인
        """
        club_name = os.path.basename(os.path.normpath(club_name))
        photo_directory_path = os.path.join(settings.MEDIA_ROOT, club_name, 'photo')

        try:
            photo_files = os.listdir(photo_directory_path)
            photo_urls = [request.build_absolute_uri(settings.MEDIA_URL + f'{club_name}/photo/' + file) for file in photo_files]
        except FileNotFoundError:
            return Response({'error': f'Logo directory for {club_name} not found.'})

        return Response({'photo': photo_urls}, status=status.HTTP_200_OK)

    def patch(self, request, club_name):
        """
        동아리 사진 수정
        """
        club = Club.objects.get(club_name=club_name)
        file_name = request.data.get('file_name')

        if not file_name:
            return Response({'error': 'File name is required.'}, status=status.HTTP_400_BAD_REQUEST)

        file_path = os.path.join(settings.MEDIA_ROOT, club_name, 'photo', file_name)
        if not os.path.exists(file_path):
            return Response({'error': 'File does not exist in the specified directory.'}, status=status.HTTP_404_NOT_FOUND)

        club.photo = os.path.join(settings.MEDIA_ROOT, club_name, 'photo', file_name)
        club.save()

        return Response({'message': 'photo updated successfully.', 'new_photo': club.photo}, status=status.HTTP_200_OK)

    def delete(self, request, club_name):
        """
        동아리 사진 삭제
        """
        file_name = request.data.get('file_name')

        if not file_name:
            return Response({'error': 'File name is required.'}, status=status.HTTP_400_BAD_REQUEST)

        file_path = os.path.join(settings.MEDIA_ROOT, club_name, 'photo', file_name)
        if not os.path.exists(file_path):
            return Response({'error': 'File does not exist in the specified directory.'}, status=status.HTTP_404_NOT_FOUND)

        try:
            # 파일 삭제
            default_storage.delete(file_path)
            return Response({'message': 'File deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PhotoUpload(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ClubSerializer

    def get_object(self):
        club_name = self.kwargs.get('club_name')
        return Club.objects.get(club_name=club_name)

    def post(self, request, *args, **kwargs):
        """
        동아리 사진 추가
        """
        file = request.FILES.get('photo')
        club_name = kwargs.get('club_name')

        if not file:
            return Response({'message': 'No logo provided'}, status=status.HTTP_400_BAD_REQUEST)

        directory_path = os.path.join(settings.MEDIA_ROOT, club_name, 'photo')
        full_path = os.path.join(directory_path, file)

        if default_storage.exists(full_path):
            return Response({'messege': 'photo exsit'}, status=status.HTTP_400_BAD_REQUEST)

        default_storage.save(full_path, ContentFile(file.read()))
        return Response({'message': 'upload photo'}, status=status.HTTP_200_OK)

class IntroducationCorrection(UpdateAPIView):
    queryset = Club.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ClubSerializer
    lookup_field = 'club_name'

    def patch(self, request, *args, **kwargs):
        """
        동아리 소개글 수정
        """
        return self.partial_update(request, *args, **kwargs)