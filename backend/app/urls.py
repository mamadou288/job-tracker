from django.contrib import admin
from django.urls import path
from applications.views import ApplicationListCreateView, ApplicationRetrieveUpdateDestroyView
from users.views import UserListCreateView, UserRetrieveUpdateDestroyView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/applications/', ApplicationListCreateView.as_view(), name='application-list-create'),
    path('api/applications/<int:pk>/', ApplicationRetrieveUpdateDestroyView.as_view(), name='application-detail'),
    path('api/users/', UserListCreateView.as_view(), name='user-list-create'),
    path('api/users/<int:pk>/', UserRetrieveUpdateDestroyView.as_view(), name='user-detail'),
]
