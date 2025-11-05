
// Aguardar o DOM ser carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔥 Modal.js carregado!');
    
    // Remover qualquer listener duplicado
    const existingListeners = document.querySelectorAll('[data-modal-initialized]');
    existingListeners.forEach(el => el.removeAttribute('data-modal-initialized'));
    
    // Event listeners para abrir modal
    const modalTriggers = document.querySelectorAll('[data-toggle="modal"]');
    console.log(`📋 Encontrados ${modalTriggers.length} triggers de modal`);
    
    modalTriggers.forEach(function(trigger) {
        // Verificar se já foi inicializado
        if (trigger.hasAttribute('data-modal-initialized')) return;
        trigger.setAttribute('data-modal-initialized', 'true');
        
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🖱️ Clique no trigger do modal detectado');
            
            const targetId = this.getAttribute('data-target');
            const modal = document.querySelector(targetId);
            
            if (modal) {
                console.log(`✅ Modal encontrado: ${targetId}`);
                openModal(modal);
            } else {
                console.log(`❌ Modal não encontrado: ${targetId}`);
            }
        });
    });

    // Event listeners para fechar modal
    const closeButtons = document.querySelectorAll('[data-dismiss="modal"]');
    console.log(`🔒 Encontrados ${closeButtons.length} botões de fechar`);
    
    closeButtons.forEach(function(button) {
        if (button.hasAttribute('data-modal-initialized')) return;
        button.setAttribute('data-modal-initialized', 'true');
        
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('🔒 Clique no botão fechar detectado');
            
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }
        });
    });

    // Fechar modal e navegar para o formulário de doação
    const goToFormLinks = document.querySelectorAll('[data-action="go-to-form"]');
    console.log(`🔗 Links para ir ao formulário encontrados: ${goToFormLinks.length}`);
    goToFormLinks.forEach(function(link) {
        if (link.hasAttribute('data-modal-initialized')) return;
        link.setAttribute('data-modal-initialized', 'true');

        link.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('➡️ Ir para formulário: fechando modal e navegando');

            const href = this.getAttribute('href');
            const modal = this.closest('.modal');
            if (modal) {
                closeModal(modal);
            }

            // Navega após pequeno delay para garantir fechamento visual do modal
            if (href) {
                setTimeout(function() {
                    window.location.href = href;
                }, 50);
            }
        });
    });

    // Fechar modal ao clicar fora dele (no backdrop)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal-backdrop')) {
            console.log('🔒 Clique no backdrop detectado');
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });

    // Fechar modal com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            console.log('⌨️ Tecla ESC pressionada');
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
    console.log('🚀 Abrindo modal...');
    
    // Remover backdrop existente
    const existingBackdrop = document.querySelector('.modal-backdrop');
    if (existingBackdrop) {
        existingBackdrop.remove();
    }

    // Criar novo backdrop
    const backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop');
    document.body.appendChild(backdrop);

    // Mostrar modal
    modal.style.display = 'flex';
    modal.classList.add('show');
    document.body.classList.add('modal-open');
    
    console.log('✅ Modal aberto com sucesso!');
}

/**
 * Fecha um modal
 * @param {HTMLElement} modal - O elemento modal a ser fechado
 */
function closeModal(modal) {
    console.log('🔒 Fechando modal...');
    
    modal.classList.remove('show');
    modal.style.display = 'none';

    // Remover backdrop
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
        backdrop.remove();
    }
    document.body.classList.remove('modal-open');
    
    console.log('✅ Modal fechado com sucesso!');
}