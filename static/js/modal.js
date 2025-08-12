
document.addEventListener('DOMContentLoaded', function() {
    // Selecionar todos os botões que abrem modais
    const modalTriggers = document.querySelectorAll('[data-toggle="modal"]');
    
    modalTriggers.forEach(function(trigger) {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-target');
            const modal = document.querySelector(targetId);
            
            if (modal) {
                openModal(modal);
            }
        });
    });
    
    // Selecionar todos os botões de fechar dentro dos modais
    const closeButtons = document.querySelectorAll('[data-dismiss="modal"]');
    
    closeButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });
    
    // Fechar modal ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
});

/**
 * Abre um modal
 * @param {HTMLElement} modal - O elemento modal a ser aberto
 */
function openModal(modal) {
    // Adicionar backdrop
    const backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop');
    document.body.appendChild(backdrop);
    
    // Mostrar modal
    modal.style.display = 'block';
    setTimeout(() => {
        modal.classList.add('show');
        document.body.classList.add('modal-open');
    }, 10);
}

/**
 * Fecha um modal
 * @param {HTMLElement} modal - O elemento modal a ser fechado
 */
function closeModal(modal) {
    modal.classList.remove('show');
    
    // Remover backdrop e classe do body após a animação
    setTimeout(() => {
        modal.style.display = 'none';
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
            backdrop.remove();
        }
        document.body.classList.remove('modal-open');
    }, 300);
}