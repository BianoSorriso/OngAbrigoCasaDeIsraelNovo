from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from .models import Projeto, Contato, Doacao, Voluntario, ConfiguracaoSite
from .forms import ContatoForm, DoacaoForm, VoluntarioForm
from .models import NewsletterSubscriber
from .utils import send_newsletter_welcome

def home(request):
    projetos = Projeto.objects.filter(ativo=True).order_by('-data_criacao')[:3]
    return render(request, 'pages/home.html', {'projetos': projetos})

def logout_view(request):
    logout(request)
    messages.success(request, 'Você foi desconectado com sucesso!')
    return redirect('home')

def sobre(request):
    return render(request, 'pages/sobre.html')

def projetos(request):
    projetos = Projeto.objects.filter(ativo=True).order_by('-data_criacao')
    return render(request, 'pages/projetos.html', {'projetos': projetos})

def contato(request):
    if request.method == 'POST':
        form = ContatoForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Mensagem enviada com sucesso!')
            return redirect('contato')
    else:
        form = ContatoForm()
    return render(request, 'pages/contato.html', {'form': form})

def area_voluntarios(request):
    if request.method == 'POST':
        form = VoluntarioForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Seu cadastro de voluntário foi enviado com sucesso! Nossa equipe entrará em contato em breve.')
            return redirect('area_voluntarios')
    else:
        form = VoluntarioForm()
    
    return render(request, 'pages/area_voluntarios.html', {'form': form})

def doacoes(request):
    if request.method == 'POST':
        form = DoacaoForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Doação registrada com sucesso!')
            return redirect('doacoes')
    else:
        form = DoacaoForm()
    
    # Obter configurações do site para o QR code PIX
    try:
        config = ConfiguracaoSite.objects.first()
    except:
        config = None
        
    return render(request, 'pages/doacoes.html', {
        'form': form,
        'config': config
    })

def subscribe_newsletter(request):
    if request.method != 'POST':
        return redirect('home')

    email = request.POST.get('email', '').strip()
    if not email:
        messages.error(request, 'Informe um e-mail válido.')
        return redirect('home')

    try:
        validate_email(email)
    except ValidationError:
        messages.error(request, 'E-mail inválido. Verifique e tente novamente.')
        return redirect('home')

    try:
        NewsletterSubscriber.objects.create(email=email)
        sent = send_newsletter_welcome(email)
        if sent:
            messages.success(request, 'Obrigado por se inscrever! Você receberá notícias e atualizações por e-mail.')
        else:
            messages.info(request, 'Inscrição registrada, mas não foi possível enviar o e-mail de boas-vindas agora.')
    except IntegrityError:
        messages.info(request, 'Esse e-mail já está cadastrado. Obrigado por acompanhar!')

    return redirect('home')
