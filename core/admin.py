from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse
from django.http import HttpResponseRedirect
from django.contrib import messages
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
    list_display = ('__str__', 'chave_pix', 'nome_beneficiario', 'cidade', 'qr_code_preview', 'gerar_qr_action')
    fields = ('chave_pix', 'nome_beneficiario', 'cidade', 'qr_code_pix')
    readonly_fields = ('qr_code_preview',)
    
    def qr_code_preview(self, obj):
        """Exibe uma prévia do QR Code PIX"""
        if obj.qr_code_pix:
            return format_html(
                '<img src="{}" style="max-width: 150px; max-height: 150px; border: 1px solid #ddd; border-radius: 4px;" />',
                obj.qr_code_pix.url
            )
        return "Nenhum QR Code gerado"
    qr_code_preview.short_description = "Prévia do QR Code PIX"
    
    def gerar_qr_action(self, obj):
        """Botão para gerar novo QR Code"""
        if obj.pk:
            return format_html(
                '<a class="button" href="{}">🔄 Gerar Novo QR Code</a>',
                reverse('admin:gerar_qr_code', args=[obj.pk])
            )
        return "Salve primeiro para gerar QR Code"
    gerar_qr_action.short_description = "Ações"
    
    def get_urls(self):
        from django.urls import path
        urls = super().get_urls()
        custom_urls = [
            path(
                '<int:object_id>/gerar-qr/',
                self.admin_site.admin_view(self.gerar_qr_code_view),
                name='gerar_qr_code',
            ),
        ]
        return custom_urls + urls
    
    def gerar_qr_code_view(self, request, object_id):
        """View para gerar novo QR Code"""
        try:
            obj = ConfiguracaoSite.objects.get(pk=object_id)
            if obj.gerar_qr_code_pix():
                obj.save(update_fields=['qr_code_pix'])
                messages.success(request, 'QR Code PIX gerado com sucesso!')
            else:
                messages.error(request, 'Erro: Verifique se a chave PIX e nome do beneficiário estão preenchidos.')
        except ConfiguracaoSite.DoesNotExist:
            messages.error(request, 'Configuração não encontrada.')
        
        return HttpResponseRedirect(reverse('admin:core_configuracaosite_change', args=[object_id]))
    
    def has_add_permission(self, request):
        # Verificar se já existe uma configuração
        return not ConfiguracaoSite.objects.exists()
    
    def has_delete_permission(self, request, obj=None):
        # Não permitir exclusão
        return False
