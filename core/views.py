from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required
from .models import Projeto, Contato, Doacao, Voluntario, ConfiguracaoSite
from .forms import ContatoForm, DoacaoForm, VoluntarioForm

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
