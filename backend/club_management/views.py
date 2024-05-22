from rest_framework import status
from rest_framework.decorators import APIView
from rest_framework.generics import *
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from club_management.serializer import *
from club_management.models import *
from club_introduce.models import *
import os
from backend import settings
from django.utils import timezone
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
from django.core.signing import Signer


# Create your views here.
class ClubManagementHomeView(RetrieveAPIView):
    serializer_class = ClubSerializer
    permission_classes = [IsAuthenticated]

    def get(self, *args, **kwargs):
        """
        동아리 관리 페이지 홈
        """
        club_name = self.kwargs.get('club_name')
        club_manage = Club.objects.get(club_name=club_name)
        serializer = self.get_serializer(club_manage)
        try:
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Club.DoesNotExist:
            raise Response({"message": "동아리 관리정보를 가져올 수 없습니다."}, status=status.HTTP_404_NOT_FOUND)

class MemberApproveAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = ClubMemberSerializer
    permission_classes = [IsAuthenticated]
    http_method_names = ['delete', 'patch']

    def get_object(self):
        id = self.kwargs.get('id')
        club_name = self.kwargs.get('club_name')
        # 객체를 안전하게 가져오기
        try:
            # 객체를 안전하게 가져오기
            return ClubMember.objects.get(id=id, club_name=club_name)
        except ClubMember.DoesNotExist:
            # 객체가 없는 경우 적절한 HTTP 상태 코드와 메시지를 반환
            return Response({'error': 'No ClubMember found matching the given query.'},
                            status=status.HTTP_404_NOT_FOUND)
        except ClubMember.MultipleObjectsReturned:
            # 객체가 여러 개 있는 경우 적절한 HTTP 상태 코드와 메시지를 반환
            return Response({'error': 'Multiple ClubMembers found. Please specify unique identifier.'},
                            status=status.HTTP_400_BAD_REQUEST)

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

class ImageCorrectionDelete(APIView):
    permission_classes = [IsAuthenticated]
    http_method_names = ['get', 'patch', 'delete', 'post']

    def _sign_url(self, url):
        signer = Signer()
        return signer.sign(url)
    def get(self, request, club_name, image):
        """
        동아리 로고 디렉터리에 있는 파일 확인
        """
        image = image[0:4]

        if image == 'logo':
            directory_path = os.path.join(settings.MEDIA_ROOT, 'logos')
        elif image == 'photo':
            directory_path = os.path.join(settings.MEDIA_ROOT, 'photos')

        try:
            image_files = os.listdir(directory_path)
            image_urls = [self._sign_url(request.build_absolute_uri(settings.MEDIA_URL + 'logos/' + file)) for file in image_files if file.startswith(club_name)]
            return Response({'image': image_urls}, status=status.HTTP_200_OK)
        except FileNotFoundError:
            return Response({'error': f'Directory for {club_name} not found.'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def patch(self, request, club_name, image):
        """
        동아리 로고, 사진 수정
        """
        image = image[0:4]

        club = Club.objects.get(club_name=club_name)
        file_name = request.data.get('file_name')

        if not file_name:
            return Response({'error': 'File name is required.'}, status=status.HTTP_400_BAD_REQUEST)

        if image == 'logo':
            file_path = os.path.join(settings.MEDIA_ROOT, 'logos', file_name)
            club.logo = os.path.join(settings.MEDIA_ROOT, 'logos', file_name)
        elif image == 'photo':
            file_path = os.path.join(settings.MEDIA_ROOT, 'photos', file_name)
            club.photo = os.path.join(settings.MEDIA_ROOT, 'photos', file_name)

        if not os.path.exists(file_path):
            return Response({'error': 'File does not exist in the specified directory.'}, status=status.HTTP_404_NOT_FOUND)

        club.save()
        return Response({'message': 'Logo updated successfully.', 'new_logo': club.logo}, status=status.HTTP_200_OK)

    def delete(self, request, image):
        """
        동아리 로고, 사진 삭제
        """
        file_name = request.data.get('file_name')
        image = image[0:4]

        if not file_name:
            return Response({'error': 'File name is required.'}, status=status.HTTP_400_BAD_REQUEST)

        if image == 'logo':
            file_path = os.path.join(settings.MEDIA_ROOT, 'logos', file_name)
        elif image == 'photo':
            file_path = os.path.join(settings.MEDIA_ROOT, 'photos', file_name)
        else:
            return Response({'error': 'Invalid image type provided.'}, status=status.HTTP_400_BAD_REQUEST)

        if not os.path.exists(file_path):
            return Response({'error': 'File does not exist in the specified directory.'}, status=status.HTTP_404_NOT_FOUND)
            # 삭제를 시도하기 전에 파일이 존재하는지 확인
        if not default_storage.exists(file_path):
            return Response({'error': 'File does not exist in the specified directory.'},
                            status=status.HTTP_404_NOT_FOUND)
        try:
            # 파일 삭제
            default_storage.delete(file_path)
            return Response({'message': 'File deleted successfully.'}, status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        """
        동아리 로고, 사진 추가
        """
        image = request.FILES.get('image')

        if not image:
            return Response({'message': 'No image provided'}, status=status.HTTP_400_BAD_REQUEST)

        image_name = image.name.split('_')
        image_name = image_name[-1]

        if image_name == 'logo':
            directory_path = os.path.join(settings.MEDIA_ROOT, 'logos')
        elif image_name == 'photo':
            directory_path = os.path.join(settings.MEDIA_ROOT, 'photos')

        full_path = os.path.join(directory_path, image_name)

        if default_storage.exists(full_path):
            return Response({'messege': 'image exsit'}, status=status.HTTP_400_BAD_REQUEST)

        default_storage.save(full_path, ContentFile(image.read()))
        return Response({'message': 'upload image'}, status=status.HTTP_200_OK)

class IntroducationCorrection(UpdateAPIView):
    queryset = Club.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = ClubSerializer
    lookup_field = 'club_name'
    http_method_names = ['patch']

    def patch(self, request, *args, **kwargs):
        """
        동아리 소개글 수정
        """
        return self.partial_update(request, *args, **kwargs)