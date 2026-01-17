from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from users.models import User
from users.serializers import UserSerializer, UserProfileSerializer


class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]


class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.request.user == self.get_object():
            return UserProfileSerializer
        return UserSerializer

