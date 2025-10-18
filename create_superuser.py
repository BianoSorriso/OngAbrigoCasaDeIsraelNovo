#!/usr/bin/env python
"""Script para criar um superusuário Django automaticamente."""
import os
import sys
import django

# Configurar o Django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "ong_project.settings")
django.setup()

from django.contrib.auth.models import User

def create_superuser():
    """Cria um superusuário se não existir."""
    username = 'superuser'
    email = 'superuser@example.com'
    password = 'admin123'
    
    # Verificar se o usuário já existe
    if User.objects.filter(username=username).exists():
        print(f"Usuário '{username}' já existe!")
        # Listar usuários existentes
        print("\nUsuários existentes:")
        for user in User.objects.filter(is_superuser=True):
            print(f"- {user.username} (email: {user.email})")
    else:
        # Criar o superusuário
        user = User.objects.create_superuser(
            username=username,
            email=email,
            password=password
        )
        print(f"Superusuário criado com sucesso!")
        print(f"Username: {username}")
        print(f"Email: {email}")
        print(f"Password: {password}")
        print("\nVocê pode usar essas credenciais para fazer login no admin do Django.")

if __name__ == "__main__":
    create_superuser()