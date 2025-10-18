# DESCRIÇÃO DE USO ADAPTADA - SITE CABI

Baseada na implementação real do site da Casa de Amparo Beneficente de Israel (CABI)

## USUÁRIO/VISITANTE

**Ator principal: Usuário/Visitante**

1. O usuário acessa a aplicação web da ONG CABI através do navegador.
2. O sistema exibe a página inicial (home) com:
   - Banner principal da CABI
   - Números de impacto (50+ crianças beneficiadas, 10+ projetos, 30+ voluntários)
   - Projetos em destaque (últimos 3 projetos cadastrados)
   - Seção "Como Ajudar" com botões para doação e voluntariado
3. O usuário clica no link "Quem Somos" no menu de navegação.
4. O sistema exibe a página "Sobre" com:
   - História da CABI
   - Missão, Visão e Valores
   - Informações sobre a equipe
5. O usuário clica no link "Projetos" no menu de navegação.
6. O sistema exibe a página de projetos com:
   - Lista completa de projetos ativos
   - Detalhes de cada projeto (título, descrição, imagem)
   - Seção "Como Apoiar" com opções de doação, voluntariado e parcerias
7. O usuário clica no link "Doações" no menu de navegação.
8. O sistema exibe a página de doações com:
   - Formulário de registro de doação
   - QR Code PIX para pagamento
   - Seção de transparência com distribuição de recursos
   - Relatórios financeiros para download
   - Depoimentos de doadores
9. O usuário preenche o formulário de doação e realiza o pagamento via PIX.
10. O sistema registra a doação e exibe mensagem de confirmação.
11. O usuário clica no link "Voluntários" no menu de navegação.
12. O sistema exibe a página de voluntários com:
    - Informações sobre áreas de atuação
    - Depoimentos de voluntários
    - Processo de cadastro em 3 etapas
    - Formulário de inscrição
13. O usuário preenche o formulário de voluntário com:
    - Dados pessoais (nome, email, telefone)
    - Habilidades e áreas de interesse
    - Disponibilidade
14. O sistema salva os dados e exibe mensagem de confirmação.
15. O usuário clica no link "Contato" no menu de navegação.
16. O sistema exibe a página de contato com:
    - Informações de contato (endereço, telefone, email)
    - Formulário de contato
    - Mapa de localização
    - FAQ (Perguntas Frequentes)
17. O usuário envia mensagem através do formulário de contato.
18. O sistema registra a mensagem e exibe confirmação de envio.

## ADMINISTRADOR

**Ator principal: Administrador**

1. O administrador acessa a página de login através da URL `/admin/`.
2. O sistema exibe o formulário de login do Django Admin.
3. O administrador insere suas credenciais (username e password).
4. O sistema autentica o usuário e redireciona para o painel administrativo.
5. O sistema exibe o Django Admin com opções para gerenciar:
   - Projetos (adicionar, editar, excluir, ativar/desativar)
   - Voluntários (visualizar cadastros, aprovar, gerenciar)
   - Doações (visualizar registros, gerar relatórios)
   - Mensagens de contato (visualizar, responder)
   - Configurações do site (dados PIX, informações gerais)
6. O administrador pode adicionar novos projetos com:
   - Título, descrição, imagem
   - Status (ativo/inativo)
   - Data de criação
7. O administrador pode gerenciar voluntários:
   - Visualizar cadastros recebidos
   - Aprovar ou rejeitar inscrições
   - Entrar em contato com voluntários
8. O administrador pode visualizar doações registradas:
   - Dados dos doadores
   - Valores e formas de pagamento
   - Gerar relatórios financeiros
9. O administrador pode gerenciar mensagens de contato:
   - Visualizar mensagens recebidas
   - Responder através dos dados de contato
10. O administrador pode configurar informações do sistema:
    - Dados PIX para doações
    - Informações gerais da ONG
11. O administrador faz logout do sistema.
12. O sistema encerra a sessão e redireciona para a página inicial.

## FUNCIONALIDADES ESPECÍFICAS IMPLEMENTADAS

### Sistema de Doações
- Formulário de registro de doações
- Integração com PIX (QR Code)
- Seção de transparência financeira
- Relatórios para download

### Sistema de Voluntariado
- Formulário completo de cadastro
- Áreas de atuação definidas
- Processo de seleção em etapas
- Depoimentos de voluntários ativos

### Gestão de Projetos
- CRUD completo via Django Admin
- Exibição dinâmica na página inicial
- Sistema de ativação/desativação

### Sistema de Contato
- Formulário de contato funcional
- FAQ integrado
- Informações de localização

### Área Administrativa
- Django Admin customizado
- Gerenciamento completo de conteúdo
- Sistema de autenticação seguro

## PRÉ-CONDIÇÕES

1. **Acesso à aplicação web**: O usuário deve conseguir acessar a aplicação web da CABI, que deve estar operacional.
2. **Navegador compatível**: O sistema funciona em navegadores modernos com suporte a HTML5, CSS3 e JavaScript.
3. **Conexão de internet estável**: Necessária para carregar conteúdo, enviar formulários e realizar doações.
4. **Para administradores**: Credenciais válidas de acesso ao Django Admin.

## TECNOLOGIAS UTILIZADAS

- **Backend**: Python com Framework Django
- **Frontend**: HTML5, CSS3, JavaScript
- **Banco de Dados**: SQLite
- **Sistema de Pagamento**: PIX (QR Code)
- **Área Administrativa**: Django Admin
- **Hospedagem de Mídia**: Sistema de arquivos local

## CONCLUSÃO

A aplicação web desenvolvida para a Casa de Amparo Beneficente de Israel (CABI) oferece uma plataforma completa e moderna para:

- **Aumentar a visibilidade** da ONG e seus projetos
- **Facilitar doações** através de sistema PIX integrado
- **Gerenciar voluntários** de forma eficiente
- **Manter transparência** com relatórios financeiros
- **Facilitar contato** com a comunidade
- **Administrar conteúdo** de forma centralizada

O sistema atende às necessidades específicas da CABI, proporcionando uma experiência de usuário intuitiva e ferramentas administrativas robustas para o crescimento sustentável da organização.