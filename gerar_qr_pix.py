#!/usr/bin/env python
import os
import django

# Configurar Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'ong_project.settings')
django.setup()

from core.models import ConfiguracaoSite

def main():
    print("🔄 Gerando QR Code PIX para CABI...")
    
    # Criar ou atualizar configuração
    config, created = ConfiguracaoSite.objects.get_or_create(
        defaults={
            'chave_pix': 'luanapyetro0213@gmail.com',
            'nome_beneficiario': 'CABI - Centro de Apoio ao Bem-Estar Infantil',
            'cidade': 'São Paulo'
        }
    )
    
    if not created:
        print("📝 Atualizando configuração existente...")
        config.chave_pix = 'luanapyetro0213@gmail.com'
        config.nome_beneficiario = 'CABI - Centro de Apoio ao Bem-Estar Infantil'
        config.cidade = 'São Paulo'
    else:
        print("✨ Criando nova configuração...")
    
    # Gerar QR Code
    print("🎯 Gerando QR Code PIX...")
    success = config.gerar_qr_code_pix()
    
    if success:
        config.save()
        print("✅ QR Code PIX gerado com sucesso!")
        print(f"📧 Chave PIX: {config.chave_pix}")
        print(f"🏢 Beneficiário: {config.nome_beneficiario}")
        print(f"🌆 Cidade: {config.cidade}")
        
        if config.qr_code_pix:
            print(f"📁 Arquivo QR Code: {config.qr_code_pix.name}")
            print(f"🌐 URL do QR Code: /media/{config.qr_code_pix.name}")
        else:
            print("❌ Erro: QR Code não foi salvo")
    else:
        print("❌ Erro ao gerar QR Code. Verifique os dados.")

if __name__ == "__main__":
    main()