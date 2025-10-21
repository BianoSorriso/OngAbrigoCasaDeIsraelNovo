from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('sobre/', views.sobre, name='sobre'),
    path('projetos/', views.projetos, name='projetos'),
    path('contato/', views.contato, name='contato'),
    path('voluntarios/', views.area_voluntarios, name='area_voluntarios'),
    path('doacoes/', views.doacoes, name='doacoes'),
    path('logout/', views.logout_view, name='logout'),
]