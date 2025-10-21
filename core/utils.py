import qrcode
from io import BytesIO
from django.core.files.base import ContentFile
import base64

def gerar_qr_code_pix(chave_pix, nome_beneficiario, valor=None, cidade="São Paulo"):
    """
    Gera um QR Code PIX seguindo o padrão EMV correto
    
    Args:
        chave_pix (str): Chave PIX (email, CPF, CNPJ, telefone ou chave aleatória)
        nome_beneficiario (str): Nome do beneficiário
        valor (float, optional): Valor da transação
        cidade (str): Cidade do beneficiário
    
    Returns:
        ContentFile: Arquivo de imagem do QR Code
    """
    
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
    
    # 54 - Transaction Amount (opcional)
    if valor and valor > 0:
        valor_str = f"{valor:.2f}"
        payload += f"54{len(valor_str):02d}{valor_str}"
    
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
    
    # Gera o QR Code
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
    )
    qr.add_data(payload)
    qr.make(fit=True)
    
    # Cria a imagem
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Converte para arquivo Django
    buffer = BytesIO()
    img.save(buffer, format='PNG')
    buffer.seek(0)
    
    return ContentFile(buffer.read(), name=f'qr_pix_{chave_pix[:10]}.png')

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

def gerar_qr_code_simples(texto, nome_arquivo="qr_code"):
    """
    Gera um QR Code simples para qualquer texto
    
    Args:
        texto (str): Texto para gerar o QR Code
        nome_arquivo (str): Nome base do arquivo
    
    Returns:
        ContentFile: Arquivo de imagem do QR Code
    """
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
    )
    qr.add_data(texto)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    
    buffer = BytesIO()
    img.save(buffer, format='PNG')
    buffer.seek(0)
    
    return ContentFile(buffer.read(), name=f'{nome_arquivo}.png')

def gerar_qr_code_simples(texto, nome_arquivo="qr_code"):
    """
    Gera um QR Code simples para qualquer texto
    
    Args:
        texto (str): Texto para gerar o QR Code
        nome_arquivo (str): Nome base do arquivo
    
    Returns:
        ContentFile: Arquivo de imagem do QR Code
    """
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,
        box_size=10,
        border=4,
    )
    qr.add_data(texto)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    
    buffer = BytesIO()
    img.save(buffer, format='PNG')
    buffer.seek(0)
    
    return ContentFile(buffer.read(), name=f'{nome_arquivo}.png')