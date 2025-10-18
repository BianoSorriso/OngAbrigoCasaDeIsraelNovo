#!/usr/bin/env python
import qrcode
import re

def calcular_crc16_ccitt(payload):
    """
    Calcula o CRC16-CCITT para o payload PIX (padrão correto)
    """
    crc = 0xFFFF
    for char in payload:
        crc ^= ord(char) << 8
        for _ in range(8):
            if crc & 0x8000:
                crc = (crc << 1) ^ 0x1021
            else:
                crc <<= 1
            crc &= 0xFFFF
    return crc

def validar_payload_pix(payload):
    """
    Valida se o payload PIX está no formato correto
    """
    print(f"🔍 Validando payload PIX:")
    print(f"📏 Tamanho do payload: {len(payload)} caracteres")
    print(f"📝 Payload: {payload}")
    print()
    
    # Verificações básicas
    if not payload.startswith("000201"):
        print("❌ Erro: Payload deve começar com '000201' (Payload Format Indicator)")
        return False
    
    if not "0014br.gov.bcb.pix" in payload:
        print("❌ Erro: Payload deve conter '0014br.gov.bcb.pix'")
        return False
    
    # Verifica CRC16
    if len(payload) < 4:
        print("❌ Erro: Payload muito curto")
        return False
        
    payload_sem_crc = payload[:-4]  # Remove os últimos 4 caracteres (CRC)
    crc_esperado = calcular_crc16_ccitt(payload_sem_crc)
    crc_atual = payload[-4:]
    
    print(f"🔢 CRC16 calculado: {crc_esperado:04X}")
    print(f"🔢 CRC16 no payload: {crc_atual}")
    
    if f"{crc_esperado:04X}" != crc_atual:
        print("❌ Erro: CRC16 inválido")
        return False
    
    print("✅ Payload PIX válido!")
    return True

def gerar_payload_pix_correto():
    """
    Gera um payload PIX seguindo o padrão EMV correto
    """
    print("🧪 Gerando payload PIX correto...")
    print("=" * 50)
    
    # Dados
    chave_pix = "luanapyetro0213@gmail.com"
    nome_beneficiario = "CABI - Centro de Apoio ao Bem-Estar Infantil"
    cidade = "São Paulo"
    
    print(f"📧 Chave PIX: {chave_pix}")
    print(f"🏢 Beneficiário: {nome_beneficiario}")
    print(f"🌆 Cidade: {cidade}")
    print()
    
    # Monta o payload PIX seguindo o padrão EMV correto
    payload = ""
    
    # 00 - Payload Format Indicator
    payload += "000201"
    
    # 01 - Point of Initiation Method (12 = dinâmico, 11 = estático)
    payload += "010212"
    
    # 26 - Merchant Account Information (PIX)
    # Estrutura: 26 + tamanho + (0014br.gov.bcb.pix + 01 + tamanho_chave + chave)
    pix_info = f"0014br.gov.bcb.pix01{len(chave_pix):02d}{chave_pix}"
    payload += f"26{len(pix_info):02d}{pix_info}"
    
    # 52 - Merchant Category Code
    payload += "52040000"
    
    # 53 - Transaction Currency (986 = BRL)
    payload += "5303986"
    
    # 58 - Country Code
    payload += "5802BR"
    
    # 59 - Merchant Name (máximo 25 caracteres)
    nome_clean = nome_beneficiario[:25].upper()
    payload += f"59{len(nome_clean):02d}{nome_clean}"
    
    # 60 - Merchant City (máximo 15 caracteres)
    cidade_clean = cidade[:15].upper()
    payload += f"60{len(cidade_clean):02d}{cidade_clean}"
    
    # 62 - Additional Data Field Template (opcional)
    reference = "***"  # Referência padrão
    additional_data = f"05{len(reference):02d}{reference}"
    payload += f"62{len(additional_data):02d}{additional_data}"
    
    # 63 - CRC16 placeholder
    payload += "6304"
    
    # Calcula CRC16
    crc = calcular_crc16_ccitt(payload)
    payload += f"{crc:04X}"
    
    print("🔧 Payload gerado:")
    print(payload)
    print()
    
    return payload

def testar_qr_code_pix():
    """
    Testa a geração do QR Code PIX
    """
    # Gera o payload
    payload = gerar_payload_pix_correto()
    
    # Valida o payload
    if validar_payload_pix(payload):
        print("✅ Payload PIX válido! Pode ser usado em qualquer app bancário.")
        
        # Gera QR Code de teste
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_M,
            box_size=10,
            border=4,
        )
        qr.add_data(payload)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        img.save("qr_pix_teste_validado.png")
        print("💾 QR Code de teste salvo como 'qr_pix_teste_validado.png'")
        
    else:
        print("❌ Payload PIX inválido!")
    
    print()
    print("📱 Para testar:")
    print("1. Abra o app do seu banco")
    print("2. Vá em PIX > Pagar com QR Code")
    print("3. Escaneie o QR Code gerado")
    print("4. Verifique se os dados aparecem corretamente")
    print()
    print("🔍 Principais diferenças do algoritmo corrigido:")
    print("- Payload Format Indicator correto: 000201")
    print("- Point of Initiation Method: 010212")
    print("- Estrutura EMV completa e padronizada")
    print("- CRC16-CCITT calculado corretamente")
    print("- Nomes em maiúsculo conforme padrão")

if __name__ == "__main__":
    testar_qr_code_pix()