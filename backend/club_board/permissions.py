from rest_framework import permissions

class IsAuthorOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit/delete it.
    """
    def has_object_permission(self, request, view, obj):
        # 읽기 권한은 모두에게 허용
        if request.method in permissions.SAFE_METHODS:
            return True

        # 쓰기 권한은 해당 객체의 소유자에게만 허용
        if obj.author == request.user:
            return True

        # 삭제 및 수정 권한은 해당 객체의 소유자에게만 허용
        return False

class IsSystemAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        # 시스템 관리자인 경우에만 생성, 수정, 삭제 권한을 허용, 읽기는 누구나
        print("권한 체크: ", request.user.is_staff or request.method in permissions.SAFE_METHODS)

        return request.user.is_staff or request.method in permissions.SAFE_METHODS

