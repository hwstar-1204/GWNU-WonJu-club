from rest_framework.decorators import permission_classes, api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from club_introduce.serializer import *
from club_introduce.models import *
from django.db.models import Max, Q


# Create your views here.
@api_view(['GET'])
def club_list(request):
    qs = Club.objects.all()
    serializer = ClubSerializer(qs, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def category_club(request, category_id):
    category_id = category_id

    if not category_id:
        return Response({'error': '카테고리가 제공되지 않았습니다.'}, status=400)

    qs = Club.objects.filter(category=category_id)

    if not qs:
        return Response({'error': '카테고리에 해당하는 동아리가 존재하지 않습니다.'}, status=400)

    serializer = ClubSerializer(qs, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def club_join(request, club_name, student_num):
    club_name = club_name
    student_num = student_num

    if not club_name or not student_num:
        return Response({'error': '필수 정보가 누락되었습니다.'}, status=400)

    max_member_id = ClubMember.objects.aggregate(Max('member_id'))['member_id__max']
    new_member_id = (max_member_id or 0) + 1

    join_data = None
    default_job = ''

    new_member = ClubMember(
        member_id=new_member_id,
        club_name=club_name,
        student_num=student_num,
        join_date=join_data,
        job=default_job
    )
    new_member.save()
    return Response({'message': '가입 신청이 완료되었습니다.', 'member_id': new_member.member_id}, status=201)


@api_view(['GET'])
def club_home(request, club_name):
    if not club_name:
        return Response({'error': '동아리 이름이 제공되지 않았습니다.'}, status=400)

    club_info = Club.objects.filter(club_name=club_name) #동아리 정보
    club_members = ClubMember.objects.filter(club_name=club_name).select_related('student_num') #동아리 회원 정보
    club_posts = BoardPost.objects.filter(club_type=club_name)

    posts_with_content = BoardPostContent.objects.select_related('post_id').filter(post_id__club_type=club_name)
    posts_with_content = posts_with_content.filter(post_id__category=2)



    info_data = ClubSerializer(club_info, many=True).data
    members_data = ClubMemberSerializer(club_members, many=True).data
    posts_data = BoardPostSerializer(club_posts, many=True).data
    event_data = BoardPostContentSerializer(posts_with_content, many=True).data

    if not info_data or not members_data or not posts_data or not event_data:
        return Response({'error': '데이터가 존재하지 않습니다.'}, status=400)

    response_data = {
        'club_info': info_data,
        'club_member': members_data,
        'club_post': posts_data,
        'club_event': event_data
    }
    return Response(response_data)


@api_view(['GET'])
def club_members(request, club_name):
    club_name = club_name

    if not club_name:
        return Response({'error': '동아리 이름이 제공되지 않았습니다.'}, status=400)

    club_members = ClubMember.objects.filter(club_name=club_name).select_related('student_num')  # 동아리 회원 정보
    members_data = ClubMemberSerializer(club_members, many=True).data

    return Response(members_data)



@api_view(['GET'])
def club_photo(request, club_name, search_type=None, search_query=None):
    photo_post = BoardPostContent.objects.select_related('post_id').filter(post_id__club_type=club_name)

    if search_type and search_query:
        if search_type == 'all':
            photo_post = photo_post.filter(Q(post_id__post_name__icontains=search_query) | Q(post_content__icontains=search_query) | Q(
                writer__icontains=search_query))
        elif search_type == 'title_content':
            photo_post = photo_post.filter(Q(post_id__post_name__icontains=search_query) | Q(post_content__icontains=search_query))
        elif search_type == 'title':
            photo_post = photo_post.filter(post_id__post_name__icontains=search_query)
        elif search_type == 'content':
            photo_post = photo_post.filter(post_content__icontains=search_query)
        elif search_type == 'author':
            photo_post = photo_post.filter(post_id__writer__icontains=search_query)

        photo_data = BoardPostContentSerializer(photo_post, many=True).data

        return Response(photo_data)

    photo_data = BoardPostContentSerializer(photo_post, many=True).data

    return Response(photo_data)
@api_view(['GET'])
def club_event(request, club_name, search_type=None, search_query=None):
    if not club_name:
        return Response({'error': '동아리 이름이 제공되지 않았습니다.'}, status=400)

    event_post = BoardPostContent.objects.select_related('post_id').filter(post_id__club_type=club_name)
    event_post = event_post.filter(post_id__category=2)

    if search_type and search_query:
        if search_type == 'all':
            event_post = event_post.filter(Q(post_id__post_name__icontains=search_query) | Q(post_content__icontains=search_query) | Q(
                writer__icontains=search_query))
        elif search_type == 'title_content':
            event_post = event_post.filter(Q(post_id__post_name__icontains=search_query) | Q(post_content__icontains=search_query))
        elif search_type == 'title':
            event_post = event_post.filter(post_id__post_name__icontains=search_query)
        elif search_type == 'content':
            event_post = event_post.filter(post_content__icontains=search_query)
        elif search_type == 'author':
            event_post = event_post.filter(post_id__writer__icontains=search_query)

        event_data = BoardPostContentSerializer(event_post, many=True).data

        return Response(event_data)

    event_data = BoardPostContentSerializer(event_post, many=True).data

    return Response(event_data)

'''
@api_view(['GET'])
def club_board(request, club_name, category=None, sort=None, search_type=None, search_query=None):
    # 쿼리셋 구성
    bp_qs = BoardPost.objects.filter(club_type__icontains=club_name)
    cp_qs = BoardPostContent.objects.filter(post_id=bp_qs).select_related('post_id')
    bc_qs = BoardComment.objects.filter(post_i=cp_qs).select_related('post_id')

    if category != 'all':
        bc_qs = bc_qs.filter(category=category)

    if search_type and search_query:
        if search_type == 'all':
            bc_qs = bc_qs.filter(Q(post_name__icontains=search_query) | Q(post_content__icontains=search_query) | Q(
                writer__icontains=search_query) | Q(comment_content__icontains=search_query))
        elif search_type == 'title_content':
            cp_qs = cp_qs.filter(Q(post_name__icontains=search_query) | Q(post_content__icontains=search_query))
        elif search_type == 'title':
            cp_qs = cp_qs.filter(post_name__icontains=search_query)
        elif search_type == 'content':
            cp_qs = cp_qs.filter(post_content__icontains=search_query)
        elif search_type == 'writer':
            cp_qs = cp_qs.filter(writer__icontains=search_query)
        elif search_type == 'comment':
            cp_qs = cp_qs.filter(comment_content__icontains=search_query)

    # 정렬 처리
    if sort == 'views':
        bc_qs = bc_qs.order_by('-view_cnt')
    elif sort == 'recommends':
        bc_qs = bc_qs.order_by('-recommend_cnt')
    elif sort == 'created_at':
        bc_qs = bc_qs.order_by('-post_id__created_data')

    club_board = BoardPostCommentSerializer(cp_qs, many=True)

    return Response(club_board)
'''