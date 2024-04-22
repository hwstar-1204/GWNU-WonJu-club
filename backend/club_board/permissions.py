from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Object-level permission to only allow owners of an object to edit/delete it.
    """
    def has_object_permission(self, request, view, obj):
        # 읽기 권한은 모두에게 허용
        if request.method in permissions.SAFE_METHODS:
            return True

        # 쓰기 권한은 해당 객체의 소유자에게만 허용
        return obj.author == request.user
