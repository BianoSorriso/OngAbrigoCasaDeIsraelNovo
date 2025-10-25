from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
import os

os.makedirs('static/docs', exist_ok=True)


def make_pdf(path: str, title: str, subtitle: str):
    c = canvas.Canvas(path, pagesize=A4)
    width, height = A4

    # Header
    c.setFont("Helvetica-Bold", 20)
    c.drawString(72, height - 72, title)

    # Subheader
    c.setFont("Helvetica", 12)
    c.drawString(72, height - 100, subtitle)

    # Body
    c.drawString(72, height - 130, "Documento demonstrativo sem validade legal.")
    c.drawString(72, height - 150, "Conteúdo fictício para testes de download no site.")
    c.drawString(72, height - 180, "Este PDF foi gerado automaticamente para fins de demonstração.")

    # Footer
    c.setFont("Helvetica-Oblique", 10)
    c.drawString(72, 40, "© ONG CABI - Documento demonstração")

    c.showPage()
    c.save()


make_pdf(
    'static/docs/Relatorio_Anual_2024_Demo.pdf',
    'Relatório Anual 2024 (Demo)',
    'Resumo fictício de atividades e resultados.'
)

make_pdf(
    'static/docs/Balanco_Contabil_2024_Demo.pdf',
    'Balanço Contábil 2024 (Demo)',
    'Demonstrativo fictício de receitas e despesas.'
)