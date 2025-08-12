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
            'nome_doador': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Seu nome (obrigatório)', 'required': True}),
            'email_doador': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Seu email (obrigatório)', 'required': True}),
            'tipo': forms.Select(attrs={'class': 'form-control', 'required': True}),
            'descricao': forms.Textarea(attrs={'class': 'form-control', 'placeholder': 'Descrição da doação', 'rows': 3}),
            'valor': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Valor (se aplicável)'}),
        }
        
    def clean_nome_doador(self):
        nome = self.cleaned_data.get('nome_doador')
        if not nome:
            raise forms.ValidationError('O nome é obrigatório.')
        return nome
        
    def clean_email_doador(self):
        email = self.cleaned_data.get('email_doador')
        if not email:
            raise forms.ValidationError('O email é obrigatório.')
        return email
        
    def clean_tipo(self):
        tipo = self.cleaned_data.get('tipo')
        if not tipo:
            raise forms.ValidationError('O tipo de doação é obrigatório.')
        return tipo
              

class VoluntarioForm(forms.ModelForm):
    class Meta:
        model = Voluntario
        fields = ['nome', 'idade', 'email', 'telefone', 'area_interesse', 'disponibilidade']
        widgets = {
            'nome': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Seu nome completo (obrigatório)', 'required': True}),
            'idade': forms.NumberInput(attrs={'class': 'form-control', 'placeholder': 'Sua idade (mínimo 18 anos)', 'min': '18', 'required': True}),
            'email': forms.EmailInput(attrs={'class': 'form-control', 'placeholder': 'Seu email (obrigatório)', 'required': True}),
            'telefone': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Seu telefone'}),
            'area_interesse': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Área de interesse'}),
            'disponibilidade': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Sua disponibilidade'}),
        }
        
    def clean_idade(self):
        idade = self.cleaned_data.get('idade')
        if idade is None:
            raise forms.ValidationError('Campo idade é obrigatório.')
        if idade < 18:
            raise forms.ValidationError('A idade mínima é 18 anos.')
        return idade
        
    def clean_nome(self):
        nome = self.cleaned_data.get('nome')
        if not nome:
            raise forms.ValidationError('O nome é obrigatório.')
        return nome
        
    def clean_email(self):
        email = self.cleaned_data.get('email')
        if not email:
            raise forms.ValidationError('O email é obrigatório.')
        return email





 