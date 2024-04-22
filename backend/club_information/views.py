from django.shortcuts import redirect
from rest_framework import status
from rest_framework.decorators import APIView, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from club_information.serializer import *
from club_information.models import *
from django.db.models import Max, Q

# Create your views here.
class ClubHomeAPIView(APIView):
    def get(self, request, club_name):
        # 동아리 이름이 제공되지 않을 때
        if not club_name:
            return Response({'error': '동아리 이름이 제공되지 않았습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        club_info = ClubHome.objects.filter(club_name=club_name)  # 동아리 정보
        club_members = ClubHomeMember.objects.filter(club_name=club_name).select_related('student_num')  # 동아리 회원 정보
        club_posts = ClubHomePost.objects.filter(club_type=club_name)  # 동아리 사진첩 정보

        # 동아리 이벤트 정보
        posts_with_content = ClubHomePostContent.objects.select_related('post_id').filter(post_id__club_type=club_name, post_id__category=2)

        # 동아리 홈에 필요한 정보들
        info_data = ClubSerializer(club_info, many=True).data
        members_data = ClubMemberSerializer(club_members, many=True).data
        posts_data = BoardPostSerializer(club_posts, many=True).data
        event_data = BoardPostContentSerializer(posts_with_content, many=True).data

        response_data = {
            'club_info': info_data,
            'club_member': members_data,
            'club_post': posts_data,
            'club_event': event_data
        }
        return Response(response_data, status=status.HTTP_200_OK)


class ClubPhotoAPIView(APIView):
    def get(self, request, club_name, search_type=None, search_query=None):
        # 동아리 이름이 제공되지 않을 때
        if not club_name:
            return Response({'error': '동아리 이름이 제공되지 않았습니다.'}, status=status.HTTP_400_BAD_REQUEST)

        photo_post = ClubHomePostContent.objects.select_related('post_id').filter(post_id__club_type=club_name, post_id__category=1)

        if not photo_post.exists():
            return Response('게시물를 찾을 수 없습니다.', status=status.HTTP_404_NOT_FOUND)


        # 특정 사진을 찾는 방법
        if search_type and search_query:
            filters = Q()
            if search_type == 'all':
                filters = Q(post_id__post_name__icontains=search_query) | Q(post_content__icontains=search_query) | Q(
                    writer__icontains=search_query)
            elif search_type == 'title_content':
                filters = Q(post_id__post_name__icontains=search_query) | Q(post_content__icontains=search_query)
            elif search_type == 'title':
                filters = Q(post_id__post_name__icontains=search_query)
            elif search_type == 'content':
                filters = Q(post_content__icontains=search_query)
            elif search_type == 'author':
                filters = Q(post_id__writer__icontains=search_query)
            photo_post = photo_post.filter(filters)

        photo_data = BoardPostContentSerializer(photo_post, many=True).data
        return Response(photo_data)

    @permission_classes([IsAuthenticated])
    def post(self, request, club_name):
        # 로그인 된 사용자의 정보를 가져온다.
        user = request.session.get('student_num')

        # User에 작성자가 존재하지 않는 경우
        try:
            writer = ClubHomeUser.objects.get(pk=user)
        except ClubHomeUser.DoesNotExist:
            return Response('사용자를 찾을 수 없습니다.', status=status.HTTP_404_NOT_FOUND)

        # 동아리원인지 확인
        if not ClubHomeMember.objects.filter(student_num=writer, club_name=club_name).exists():
            return Response('이 동아리 회원이 아닙니다.', status=status.HTTP_403_FORBIDDEN)

        # 동아리에서 가장 큰 post_id를 통해 새로운 post_id 값 생성
        max_post_id = ClubHomePost.objects.filter(club_type=club_name).aggregate(Max('post_id'))['post_id__max']
        new_post_id = max_post_id + 1

        # 제목, 내용, 사진 데이터
        title = request.data.get('title')
        contents = request.data.get('contents')
        photo = request.FILES.get('image')

        # 필수 값이 없을 경우
        if not (title and contents):
            return Response({'error': '모든 값을 입력해야됩니다.'}, status=status.HTTP_400_BAD_REQUEST)

        board_post = ClubHomePost(
            post_id = new_post_id,
            club_type = club_name,
            post_name = title,
            writer = writer,
            category = 3,
            recommend_cnt = 0,
            view_cnt = 0
        )
        board_post.save()

        board_post_content = ClubHomePostContent(
            post_id = new_post_id,
            post_content = contents,
            photo = photo
        )
        board_post_content.save()

        return redirect('club-photo', club_name=club_name)

class ClubEventAPIView(APIView):
    def get(self, request, club_name, search_type=None, search_query=None):
        # 동아리 이름이 제공되지 않을 때
        if not club_name:
            return Response({'error': '동아리 이름이 제공되지 않았습니다.'}, status=400)

        # post_id를 통해 Board_Post 테이블과 Board_Post_Content 테이블을 JOIN
        event_post = ClubHomePostContent.objects.select_related('post_id').filter(post_id__club_type=club_name, post_id__category=2)

        # 특정 이벤트를 찾는 방법
        if search_type and search_query:
            filters = Q()
            if search_type == 'all':
                filters = Q(post_id__post_name__icontains=search_query) | Q(post_content__icontains=search_query) | Q(
                    writer__icontains=search_query)
            elif search_type == 'title_content':
                filters = Q(post_id__post_name__icontains=search_query) | Q(post_content__icontains=search_query)
            elif search_type == 'title':
                filters = Q(post_id__post_name__icontains=search_query)
            elif search_type == 'content':
                filters = Q(post_content__icontains=search_query)
            elif search_type == 'author':
                filters = Q(post_id__writer__icontains=search_query)

            event_post = event_post.filter(filters)

        event_data = BoardPostContentSerializer(event_post, many=True).data

        return Response(event_data)

    @permission_classes([IsAuthenticated])
    def post(self, request, club_name):
        # 로그인 된 사용자의 정보를 가져온다.
        user = request.session.get('student_num')

        # User에 작성자가 존재하지 않는 경우
        try:
            writer = ClubHomeUser.objects.get(pk=user)
        except ClubHomeUser.DoesNotExist:
            return Response('사용자를 찾을 수 없습니다.', status=status.HTTP_404_NOT_FOUND)

        # 동아리 회원이자 회장인지 확인
        try:
            club_member = ClubHomeMember.objects.get(student_num=writer, club_type=club_name)
            if club_member.job != '0':
                return Response('이 기능은 회장만 사용할 수 있습니다.', status=status.HTTP_403_FORBIDDEN)
        except ClubHomeMember.DoesNotExist:
            return Response('동아리 회원이 아닙니다.', status=status.HTTP_403_FORBIDDEN)

        # 동아리에서 가장 큰 post_id를 통해 새로운 post_id 값 생성
        max_post_id = ClubHomeMember.objects.filter(club_type=club_name).aggregate(Max('post_id'))['post_id__max']
        new_post_id = max_post_id + 1

        # 제목, 내용, 사진 데이터
        title = request.data.get('title')
        contents = request.data.get('contents')
        photo = request.FILES.get('image')

        # 필수 값이 없을 경우
        if not (title and contents):
            return Response({'error': '모든 값을 입력해야됩니다.'}, status=status.HTTP_400_BAD_REQUEST)

        board_post = ClubHomePost(
            post_id=new_post_id,
            club_type=club_name,
            post_name=title,
            writer=writer,
            category=3,
            recommend_cnt=0,
            view_cnt=0
        )
        board_post.save()

        board_post_content = ClubHomePostContent(
            post_id=new_post_id,
            post_content=contents,
            photo=photo
        )
        board_post_content.save()

        return redirect('club-event', club_name=club_name)