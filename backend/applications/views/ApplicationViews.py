from rest_framework import generics
from rest_framework.permissions import AllowAny
from applications.models import Application
from applications.serializers import ApplicationSerializer


class ApplicationListCreateView(generics.ListCreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [AllowAny]


class ApplicationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [AllowAny]

