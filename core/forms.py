from django import forms
from .models import Contato, Doacao, Voluntario

class ContatoForm(forms.ModelForm):
    class Meta:
        model = Contato
        fields = ['nome', 'email', 'assunto', 'mensagem']
        widgets = {
            'nome': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Seu nome'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Seu email'}),
            'assunto': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Assunto'}),
            'mensagem': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Sua mensagem', 'rows': 5}),
        }

class DoacaoForm(forms.ModelForm):
    class Meta:
        model = Doacao
        fields = ['nome_doador', 'email_doador', 'tipo', 'descricao', 'valor']
        widgets = {
            'nome_doador': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Seu nome'}),
            'email_doador': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Seu email (opcional)'}),
            'tipo': forms.Select(attrs={'class': 'form-control'}),
            'descricao': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Descrição da doação', 'rows': 3}),
            'valor': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Valor (se aplicável)'}),
        }

class VoluntarioForm(forms.ModelForm):
    class Meta:
        model = Voluntario
        fields = ['nome', 'idade', 'email', 'telefone', 'area_interesse', 'disponibilidade']
        widgets = {
            'nome': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Seu nome completo'}),
            'idade': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Sua idade (mínimo 18 anos)', 'min': '18'}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Seu email'}),
            'telefone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Seu telefone'}),
            'area_interesse': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Área de interesse'}),
            'disponibilidade': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Sua disponibilidade'}),
        }
        
    def clean_idade(self):
        idade = self.cleaned_data.get('idade')
        if idade < 18:
            raise forms.ValidationError('A idade mínima para se cadastrar como voluntário é 18 anos.')
        return idade