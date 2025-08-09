from django.contrib import admin
from .models import Projeto, Voluntario, Contato, Doacao, ConfiguracaoSite

@admin.register(Projeto)
class ProjetoAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'data_inicio', 'ativo', 'data_criacao')
    list_filter = ('ativo', 'data_inicio')
    search_fields = ('titulo', 'descricao')

@admin.register(Voluntario)
class VoluntarioAdmin(admin.ModelAdmin):
    list_display = ('nome', 'idade', 'email', 'telefone', 'area_interesse', 'data_cadastro', 'aprovado')
    list_filter = ('aprovado', 'data_cadastro', 'area_interesse')
    search_fields = ('nome', 'email', 'area_interesse')
    list_editable = ('aprovado',)
    actions = ['aprovar_voluntarios']
    
    def aprovar_voluntarios(self, request, queryset):
        queryset.update(aprovado=True)
    aprovar_voluntarios.short_description = "Aprovar voluntários selecionados"

@admin.register(Contato)
class ContatoAdmin(admin.ModelAdmin):
    list_display = ('nome', 'email', 'assunto', 'data_envio')
    search_fields = ('nome', 'email', 'assunto')
    list_filter = ('data_envio',)

@admin.register(Doacao)
class DoacaoAdmin(admin.ModelAdmin):
    list_display = ('nome_doador', 'tipo', 'valor', 'data_doacao')
    list_filter = ('tipo', 'data_doacao')
    search_fields = ('nome_doador', 'email_doador')

@admin.register(ConfiguracaoSite)
class ConfiguracaoSiteAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'chave_pix', 'nome_beneficiario')
    
    def has_add_permission(self, request):
        # Verificar se já existe uma configuração
        return not ConfiguracaoSite.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Não permitir exclusão
        return False
