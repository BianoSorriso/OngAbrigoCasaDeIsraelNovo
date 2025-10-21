import os
import django
import datetime

# Configurar o ambiente Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ong_project.settings')
django.setup()

# Importar o modelo Projeto
from core.models import Projeto
from django.core.files import File

# Verificar se já existem projetos
projetos_existentes = Projeto.objects.all()
if projetos_existentes.count() > 0:
    print(f"Já existem {projetos_existentes.count()} projetos cadastrados. Nenhum projeto de exemplo será adicionado.")
    exit()

# Criar projetos de exemplo
projetos = [
    {
        'titulo': 'Educação para Todos',
        'descricao': 'Projeto que visa proporcionar acesso à educação de qualidade para crianças em situação de vulnerabilidade social. Oferecemos reforço escolar, oficinas de leitura e atividades culturais.',
        'imagem_path': 'static/images/projeto-educacao.svg',
        'data_inicio': datetime.date(2023, 3, 15),
    },
    {
        'titulo': 'Saúde para Todos',
        'descricao': 'Iniciativa que promove atendimento médico básico, campanhas de vacinação e orientação sobre saúde e higiene para famílias de baixa renda.',
        'imagem_path': 'static/images/projeto-saude.svg',
        'data_inicio': datetime.date(2023, 5, 10),
    },
    {
        'titulo': 'Alimentação Saudável',
        'descricao': 'Projeto que distribui cestas básicas, oferece oficinas de nutrição e promove hortas comunitárias para garantir segurança alimentar às famílias atendidas.',
        'imagem_path': 'static/images/projeto-alimentacao.svg',
        'data_inicio': datetime.date(2023, 1, 20),
    },
]

# Adicionar projetos ao banco de dados
for projeto_data in projetos:
    projeto = Projeto(
        titulo=projeto_data['titulo'],
        descricao=projeto_data['descricao'],
        data_inicio=projeto_data['data_inicio'],
        ativo=True
    )
    
    # Adicionar imagem
    imagem_path = projeto_data['imagem_path']
    if os.path.exists(imagem_path):
        with open(imagem_path, 'rb') as img_file:
            projeto.imagem.save(
                os.path.basename(imagem_path),
                File(img_file),
                save=False
            )
    
    projeto.save()
    print(f"Projeto '{projeto.titulo}' adicionado com sucesso!")

print("\nTodos os projetos de exemplo foram adicionados com sucesso!")