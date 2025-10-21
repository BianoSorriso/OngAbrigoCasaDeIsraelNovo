document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os elementos com classe accordion-button ou data-toggle="collapse"
    const accordionButtons = document.querySelectorAll('.accordion-button, [data-toggle="collapse"]');
    
    // Adiciona evento de clique a cada botão
    accordionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtém o alvo do collapse pelo data-target
            const target = this.getAttribute('data-target');
            if (!target) return;
            
            const content = document.querySelector(target);
            if (!content) return;
            
            // Fecha todos os outros accordions primeiro
            const parent = this.closest('.accordion');
            if (parent) {
                const otherContents = parent.querySelectorAll('.accordion-collapse.show');
                const otherButtons = parent.querySelectorAll('.accordion-button[aria-expanded="true"]');
                
                otherContents.forEach(item => {
                    if (item !== content) {
                        item.classList.remove('show');
                    }
                });
                
                otherButtons.forEach(item => {
                    if (item !== this) {
                        item.classList.add('collapsed');
                        item.setAttribute('aria-expanded', 'false');
                    }
                });
            }
            
            // Toggle da classe 'show' para mostrar/esconder o conteúdo
            content.classList.toggle('show');
            
            // Toggle da classe 'collapsed' no botão
            this.classList.toggle('collapsed');
            
            // Atualiza o atributo aria-expanded
            const expanded = content.classList.contains('show');
            this.setAttribute('aria-expanded', expanded);
            
            // Ajusta a altura máxima para animação suave
            if (expanded) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    });
    
    // Inicializa o estado dos accordions
    accordionButtons.forEach(button => {
        const target = button.getAttribute('data-target');
        if (!target) return;
        
        const content = document.querySelector(target);
        if (!content) return;
        
        const expanded = button.getAttribute('aria-expanded') === 'true';
        
        if (expanded) {
            content.classList.add('show');
            content.style.maxHeight = content.scrollHeight + 'px';
        } else {
            button.classList.add('collapsed');
            content.style.maxHeight = '0';
        }
    });
});