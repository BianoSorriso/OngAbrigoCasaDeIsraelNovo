"""
Configurações de produção para PythonAnywhere
"""
import os
from .settings import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

# Hosts permitidos no PythonAnywhere
ALLOWED_HOSTS = [
    'seuusuario.pythonanywhere.com',  # Substitua 'seuusuario' pelo seu username
    'localhost',
    '127.0.0.1',
]

# Configuração de arquivos estáticos para produção
STATIC_ROOT = '/home/seuusuario/mysite/static'  # Substitua 'seuusuario' pelo seu username
STATIC_URL = '/static/'

STATICFILES_DIRS = [
    BASE_DIR / "static",
]

# Configuração de arquivos de mídia
MEDIA_ROOT = '/home/seuusuario/mysite/media'  # Substitua 'seuusuario' pelo seu username
MEDIA_URL = '/media/'

# Middleware para servir arquivos estáticos
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Para servir arquivos estáticos
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# Configurações de segurança para produção
SECURE_BROWSER_XSS_FILTER = True
SECURE_CONTENT_TYPE_NOSNIFF = True
X_FRAME_OPTIONS = 'DENY'

# Configuração do banco de dados (SQLite funciona no PythonAnywhere)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Configuração de logs para produção
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': '/home/seuusuario/mysite/django.log',  # Substitua 'seuusuario'
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}