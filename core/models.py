from django.db import models
from django.contrib.auth.models import User

class ConfiguracaoSite(models.Model):
    qr_code_pix = models.ImageField(upload_to='qr_codes/', verbose_name='QR Code PIX', blank=True, null=True)
    chave_pix = models.CharField(max_length=255, verbose_name='Chave PIX')
    nome_beneficiario = models.CharField(max_length=255, verbose_name='Nome do Beneficiário')
    cidade = models.CharField(max_length=100, verbose_name='Cidade', default='São Paulo')
    
    class Meta:
        verbose_name = 'Configuração do Site'
        verbose_name_plural = 'Configurações do Site'
    
    def __str__(self):
        return 'Configurações do Site'
    
    def gerar_qr_code_pix(self):
        """Gera um novo QR Code PIX baseado na chave PIX configurada"""
        from .utils import gerar_qr_code_pix
        
        if self.chave_pix and self.nome_beneficiario:
            qr_file = gerar_qr_code_pix(
                chave_pix=self.chave_pix,
                nome_beneficiario=self.nome_beneficiario,
                cidade=self.cidade
            )
            
            # Remove o QR Code antigo se existir
            if self.qr_code_pix:
                self.qr_code_pix.delete(save=False)
            
            # Salva o novo QR Code
            self.qr_code_pix.save(
                f'qr_pix_{self.pk or "novo"}.png',
                qr_file,
                save=False
            )
            return True
        return False
    
    def save(self, *args, **kwargs):
        # Garantir que só exista uma instância
        if ConfiguracaoSite.objects.exists() and not self.pk:
            raise ValueError('Já existe uma configuração do site')
        
        # Gera QR Code automaticamente se não existir ou se a chave PIX mudou
        gerar_qr = False
        if self.pk:
            try:
                old_instance = ConfiguracaoSite.objects.get(pk=self.pk)
                if (old_instance.chave_pix != self.chave_pix or 
                    old_instance.nome_beneficiario != self.nome_beneficiario or
                    not self.qr_code_pix):
                    gerar_qr = True
            except ConfiguracaoSite.DoesNotExist:
                gerar_qr = True
        else:
            gerar_qr = True
        
        # Salva primeiro para ter o ID disponível
        super().save(*args, **kwargs)
        
        # Gera o QR Code se necessário
        if gerar_qr:
            self.gerar_qr_code_pix()
            # Salva novamente com o QR Code
            super().save(update_fields=['qr_code_pix'])

class Projeto(models.Model):
    titulo = models.CharField(max_length=200)
    descricao = models.TextField()
    imagem = models.ImageField(upload_to='projetos/', verbose_name='Imagem do Projeto', blank=True, null=True)
    data_inicio = models.DateField()
    ativo = models.BooleanField(default=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.titulo
        
    def save(self, *args, **kwargs):
        # Salva primeiro para ter o arquivo disponível para processamento
        super().save(*args, **kwargs)
        
        # Se houver uma imagem, redimensiona para o tamanho padrão
        if self.imagem:
            from PIL import Image
            import os
            from django.conf import settings
            
            img_path = os.path.join(settings.MEDIA_ROOT, self.imagem.name)
            if os.path.exists(img_path):
                img = Image.open(img_path)
                # Definindo o tamanho padrão para as imagens de projetos
                output_size = (800, 600)
                img.thumbnail(output_size, Image.LANCZOS)
                img.save(img_path)

class Voluntario(models.Model):
    # Mantendo o campo usuario para compatibilidade com registros existentes
    usuario = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    nome = models.CharField(max_length=100, null=True, blank=True)
    idade = models.IntegerField(null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    telefone = models.CharField(max_length=20)
    area_interesse = models.CharField(max_length=100)
    disponibilidade = models.CharField(max_length=100)
    data_cadastro = models.DateTimeField(auto_now_add=True)
    aprovado = models.BooleanField(default=False)
    
    def __str__(self):
        if self.nome:
            return self.nome
        elif self.usuario:
            return self.usuario.username
        return f"Voluntário #{self.id}"
        
    def clean(self):
        # Validação para idade mínima de 18 anos
        from django.core.exceptions import ValidationError
        if self.idade and self.idade < 18:
            raise ValidationError('A idade mínima para se cadastrar como voluntário é 18 anos.')

class Contato(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField()
    assunto = models.CharField(max_length=200)
    mensagem = models.TextField()
    data_envio = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.nome} - {self.assunto}"

class Doacao(models.Model):
    TIPO_CHOICES = (
        ('dinheiro', 'Dinheiro'),
        ('alimentos', 'Alimentos'),
        ('roupas', 'Roupas'),
        ('outros', 'Outros'),
    )
    
    nome_doador = models.CharField(max_length=100)
    email_doador = models.EmailField(blank=True, null=True)
    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    descricao = models.TextField(blank=True, null=True)
    valor = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    data_doacao = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.nome_doador} - {self.tipo}"
