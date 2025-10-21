# Deploy no PythonAnywhere - Guia Completo

## Pré-requisitos
- Conta no PythonAnywhere (gratuita ou paga)
- Projeto Django funcionando localmente
- Arquivos preparados: `requirements.txt`, `settings_production.py`, `.gitignore`

## Passo 1: Preparar o Projeto Localmente

### 1.1 Verificar arquivos necessários
✅ `requirements.txt` - Criado
✅ `settings_production.py` - Criado
✅ `.gitignore` - Criado

### 1.2 Testar localmente
```bash
python manage.py runserver
```

## Passo 2: Criar Conta no PythonAnywhere

1. Acesse: https://www.pythonanywhere.com/
2. Clique em "Pricing & signup"
3. Escolha o plano "Beginner" (gratuito)
4. Crie sua conta com username único

## Passo 3: Upload dos Arquivos

### Opção A: Via Git (Recomendado)
1. No Dashboard do PythonAnywhere, abra um "Bash console"
2. Clone o repositório:
```bash
git clone https://github.com/BianoSorriso/OngAbrigoCasaDeIsraelNovo.git
cd OngAbrigoCasaDeIsraelNovo
```

### Opção B: Via Upload Manual
1. Vá em "Files" no dashboard
2. Crie uma pasta para o projeto (ex: `mysite`)
3. Faça upload de todos os arquivos do projeto

## Passo 4: Configurar Ambiente Virtual

1. No Bash console:
```bash
# Criar ambiente virtual
python3.10 -m venv mysite-venv

# Ativar ambiente virtual
source mysite-venv/bin/activate

# Navegar para o projeto
cd mysite  # ou nome da sua pasta

# Instalar dependências
pip install -r requirements.txt
```

## Passo 5: Configurar Banco de Dados

```bash
# Ainda no ambiente virtual ativado
python manage.py migrate
python manage.py createsuperuser  # Opcional
python manage.py collectstatic --noinput
```

## Passo 6: Configurar Web App

1. No Dashboard, vá em "Web"
2. Clique "Add a new web app"
3. Escolha "Manual configuration"
4. Selecione "Python 3.10"

### 6.1 Configurar Source Code
- **Source code**: `/home/seuusuario/mysite`
- **Working directory**: `/home/seuusuario/mysite`

### 6.2 Configurar Virtual Environment
- **Virtualenv**: `/home/seuusuario/mysite-venv`

## Passo 7: Configurar WSGI File

1. Na aba "Web", clique no link do arquivo WSGI
2. Substitua o conteúdo por:

```python
import os
import sys

# Adicionar o diretório do projeto ao Python path
path = '/home/seuusuario/mysite'  # Substitua 'seuusuario'
if path not in sys.path:
    sys.path.insert(0, path)

# Configurar Django settings
os.environ['DJANGO_SETTINGS_MODULE'] = 'ong_project.settings_production'

# Importar Django WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

## Passo 8: Configurar Arquivos Estáticos

1. Na aba "Web", seção "Static files":
   - **URL**: `/static/`
   - **Directory**: `/home/seuusuario/mysite/static`

2. Adicionar para arquivos de mídia:
   - **URL**: `/media/`
   - **Directory**: `/home/seuusuario/mysite/media`

## Passo 9: Atualizar Configurações de Produção

1. Edite o arquivo `settings_production.py`:
   - Substitua `seuusuario` pelo seu username real do PythonAnywhere
   - Atualize `ALLOWED_HOSTS` com seu domínio: `['seuusuario.pythonanywhere.com']`

## Passo 10: Reload e Teste

1. Na aba "Web", clique "Reload seuusuario.pythonanywhere.com"
2. Acesse: `https://seuusuario.pythonanywhere.com`

## Solução de Problemas Comuns

### Erro 500 - Internal Server Error
1. Verifique os logs em "Web" > "Error log"
2. Verifique se o WSGI está configurado corretamente
3. Confirme se o ambiente virtual está ativo

### Arquivos estáticos não carregam
1. Execute `python manage.py collectstatic` no console
2. Verifique as configurações de Static files na aba Web

### Erro de importação
1. Verifique se todas as dependências estão no `requirements.txt`
2. Reinstale as dependências: `pip install -r requirements.txt`

## Limitações da Conta Gratuita

- 1 web app
- 512MB de espaço em disco
- Tráfego limitado
- CPU seconds limitados por dia
- Sem HTTPS customizado

## Comandos Úteis

```bash
# Ativar ambiente virtual
source mysite-venv/bin/activate

# Atualizar dependências
pip install -r requirements.txt

# Executar migrações
python manage.py migrate

# Coletar arquivos estáticos
python manage.py collectstatic --noinput

# Ver logs do Django
tail -f /var/log/seuusuario.pythonanywhere.com.error.log
```

## Atualizações Futuras

Para atualizar o site após mudanças:

1. Faça push das mudanças para o GitHub
2. No console do PythonAnywhere:
```bash
cd mysite
git pull origin main
source mysite-venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput
```
3. Clique "Reload" na aba Web

---

**Importante**: Substitua `seuusuario` pelo seu username real do PythonAnywhere em todos os caminhos e URLs mencionados neste guia.