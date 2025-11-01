# 🏠 ONG Abrigo Casa de Israel

## 📋 Descrição do Projeto

Sistema web desenvolvido para a ONG Abrigo Casa de Israel, uma organização sem fins lucrativos dedicada ao acolhimento e cuidado de crianças e adolescentes em situação de vulnerabilidade social. O sistema oferece uma plataforma completa para divulgação dos projetos, captação de recursos, gestão de voluntários e transparência das ações da instituição.

### 🎯 Funcionalidades Principais

- **Portal Institucional**: Apresentação da ONG, missão, visão e valores
- **Gestão de Projetos**: Divulgação e acompanhamento dos projetos sociais
- **Sistema de Doações**: Plataforma para doações financeiras com QR Code PIX
- **Área do Voluntário**: Cadastro e gestão de voluntários
- **Transparência**: Relatórios financeiros e prestação de contas
- **Contato**: Formulário de contato e informações institucionais
- **Painel Administrativo**: Gestão completa do conteúdo do site

## 🚀 Tecnologias Utilizadas

### Backend
- **Python 3.8+**
- **Django 4.2** - Framework web principal
- **SQLite** - Banco de dados (desenvolvimento)
- **Pillow** - Processamento de imagens
- **qrcode** - Geração de QR Codes para PIX

### Frontend
- **HTML5** - Estruturação das páginas
- **CSS3** - Estilização e layout responsivo
- **JavaScript** - Interatividade e funcionalidades dinâmicas
- **Font Awesome** - Ícones e elementos visuais

### Ferramentas de Desenvolvimento
- **Git** - Controle de versão
- **GitHub** - Repositório remoto
- **PythonAnywhere** - Deploy e hospedagem

## 📦 Como Baixar e Rodar o Projeto Localmente

### Pré-requisitos
- Python 3.8 ou superior instalado
- Git instalado
- Pip (gerenciador de pacotes do Python)

### 1. Clone o Repositório
```bash
git clone https://github.com/BianoSorriso/OngAbrigoCasaDeIsraelNovo.git
cd OngAbrigoCasaDeIsraelNovo
```

### 2. Crie um Ambiente Virtual
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Linux/Mac
python3 -m venv venv
source venv/bin/activate
```

### 3. Instale as Dependências
```bash
pip install -r requirements.txt
```

### 4. Configure o Banco de Dados
```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Crie um Superusuário (Opcional)
```bash
python manage.py createsuperuser
```

### 6. Execute o Servidor de Desenvolvimento
```bash
python manage.py runserver
```

### 7. Acesse o Sistema
Abra seu navegador e acesse: `http://127.0.0.1:8000`

## 📁 Estrutura do Projeto

```
OngAbrigoCasaDeIsraelNovo/
├── core/                   # App principal do Django
│   ├── models.py          # Modelos de dados
│   ├── views.py           # Lógica das views
│   ├── forms.py           # Formulários
│   └── urls.py            # URLs do app
├── ong_project/           # Configurações do projeto
│   ├── settings.py        # Configurações principais
│   └── urls.py            # URLs principais
├── templates/             # Templates HTML
│   ├── base/              # Templates base
│   └── pages/             # Páginas do site
├── static/                # Arquivos estáticos
│   ├── css/               # Estilos CSS
│   ├── js/                # Scripts JavaScript
│   └── images/            # Imagens do site
├── requirements.txt       # Dependências do projeto
└── manage.py             # Script de gerenciamento Django
```

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e sociais.

## 👥 Integrantes do Grupo

- **Fabiano Bastos**
- **Guilherme Ribeiro**
- **Peterson Galdino**
- **Matheus Braga**

## 📞 Contato

Para mais informações sobre o projeto ou a ONG, entre em contato através do site ou das redes sociais da instituição.

---

*Desenvolvido com ❤️ para fazer a diferença na vida de crianças e adolescentes.*