/**
 * Framework JavaScript Customizado
 * Sistema de componentes interativos desenvolvido especificamente para este projeto
 */

// ========== MODAL FUNCTIONALITY ==========
class CustomModal {
    constructor(element) {
        this.modal = element;
        this.backdrop = null;
        this.isOpen = false;
        this.init();
    }

    init() {
        // Criar backdrop
        this.createBackdrop();
        
        // Event listeners para botões de fechar
        const closeButtons = this.modal.querySelectorAll('[data-dismiss="modal"], .btn-close, .btn-secondary');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', () => this.hide());
        });

        // Fechar ao clicar no backdrop
        this.backdrop.addEventListener('click', (e) => {
            if (e.target === this.backdrop) {
                this.hide();
            }
        });

        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.hide();
            }
        });
    }

    createBackdrop() {
        this.backdrop = document.createElement('div');
        this.backdrop.className = 'modal-backdrop';
        this.backdrop.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 1040;
            display: none;
        `;
        document.body.appendChild(this.backdrop);
    }

    show() {
        this.isOpen = true;
        this.backdrop.style.display = 'block';
        this.modal.style.display = 'block';
        this.modal.style.zIndex = '1050';
        document.body.style.overflow = 'hidden';
        
        // Animação de entrada
        setTimeout(() => {
            this.backdrop.style.opacity = '1';
            this.modal.style.opacity = '1';
            this.modal.style.transform = 'translateY(0)';
        }, 10);
    }

    hide() {
        this.isOpen = false;
        this.backdrop.style.opacity = '0';
        this.modal.style.opacity = '0';
        this.modal.style.transform = 'translateY(-50px)';
        
        setTimeout(() => {
            this.backdrop.style.display = 'none';
            this.modal.style.display = 'none';
            document.body.style.overflow = '';
        }, 300);
    }
}

// ========== ACCORDION FUNCTIONALITY ==========
class CustomAccordion {
    constructor(element) {
        this.accordion = element;
        this.init();
    }

    init() {
        const buttons = this.accordion.querySelectorAll('.accordion-button');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggle(button);
            });
        });
    }

    toggle(button) {
        const targetId = button.getAttribute('data-target') || button.getAttribute('aria-controls');
        const target = document.getElementById(targetId);
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        if (isExpanded) {
            this.collapse(button, target);
        } else {
            // Fechar outros accordions no mesmo grupo
            const allButtons = this.accordion.querySelectorAll('.accordion-button');
            allButtons.forEach(btn => {
                if (btn !== button) {
                    const otherId = btn.getAttribute('data-target') || btn.getAttribute('aria-controls');
                    const otherTarget = document.getElementById(otherId);
                    this.collapse(btn, otherTarget);
                }
            });
            
            this.expand(button, target);
        }
    }

    expand(button, target) {
        button.setAttribute('aria-expanded', 'true');
        button.classList.remove('collapsed');
        target.classList.add('show');
        target.style.height = target.scrollHeight + 'px';
    }

    collapse(button, target) {
        button.setAttribute('aria-expanded', 'false');
        button.classList.add('collapsed');
        target.classList.remove('show');
        target.style.height = '0px';
    }
}

// ========== DROPDOWN FUNCTIONALITY ==========
class CustomDropdown {
    constructor(element) {
        this.dropdown = element;
        this.menu = this.dropdown.querySelector('.dropdown-menu');
        this.isOpen = false;
        this.init();
    }

    init() {
        // Apenas o botão toggle deve abrir/fechar o dropdown
        const toggleButton = this.dropdown.querySelector('.dropdown-toggle');
        if (toggleButton) {
            toggleButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.toggle();
            });
        }

        // Permitir que links dentro do dropdown funcionem normalmente
        const dropdownLinks = this.dropdown.querySelectorAll('.dropdown-menu a');
        dropdownLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Não prevenir o comportamento padrão dos links
                e.stopPropagation();
                // Fechar o dropdown após clicar no link
                this.hide();
            });
        });

        // Fechar ao clicar fora
        document.addEventListener('click', () => {
            if (this.isOpen) {
                this.hide();
            }
        });
    }

    toggle() {
        if (this.isOpen) {
            this.hide();
        } else {
            this.show();
        }
    }

    show() {
        this.isOpen = true;
        this.menu.style.display = 'block';
        this.dropdown.setAttribute('aria-expanded', 'true');
    }

    hide() {
        this.isOpen = false;
        this.menu.style.display = 'none';
        this.dropdown.setAttribute('aria-expanded', 'false');
    }
}

// ========== NAVBAR TOGGLE ==========
class CustomNavbar {
    constructor(element) {
        this.navbar = element;
        this.toggler = this.navbar.querySelector('.navbar-toggler');
        this.collapse = this.navbar.querySelector('.navbar-collapse');
        this.isOpen = false;
        this.init();
    }

    init() {
        if (this.toggler) {
            this.toggler.addEventListener('click', () => {
                this.toggle();
            });
        }
    }

    toggle() {
        if (this.isOpen) {
            this.hide();
        } else {
            this.show();
        }
    }

    show() {
        this.isOpen = true;
        this.collapse.classList.add('show');
        this.toggler.setAttribute('aria-expanded', 'true');
    }

    hide() {
        this.isOpen = false;
        this.collapse.classList.remove('show');
        this.toggler.setAttribute('aria-expanded', 'false');
    }
}

// ========== ALERT FUNCTIONALITY ==========
class CustomAlert {
    constructor(element) {
        this.alert = element;
        this.init();
    }

    init() {
        const closeButton = this.alert.querySelector('.btn-close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                this.hide();
            });
        }
    }

    hide() {
        this.alert.style.opacity = '0';
        setTimeout(() => {
            this.alert.remove();
        }, 300);
    }
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar Modais
    const modals = document.querySelectorAll('.modal');
    const modalInstances = new Map();
    
    modals.forEach(modal => {
        const instance = new CustomModal(modal);
        modalInstances.set(modal.id, instance);
    });

    // Event listeners para botões que abrem modais
    document.addEventListener('click', function(e) {
        const trigger = e.target.closest('[data-toggle="modal"], [data-target]');
        if (trigger) {
            e.preventDefault();
            const targetId = trigger.getAttribute('data-target')?.replace('#', '') || 
                           trigger.getAttribute('href')?.replace('#', '');
            const modalInstance = modalInstances.get(targetId);
            if (modalInstance) {
                modalInstance.show();
            }
        }
    });

    // Inicializar Accordions
    const accordions = document.querySelectorAll('.accordion');
    accordions.forEach(accordion => {
        new CustomAccordion(accordion);
    });

    // Inicializar Dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        new CustomDropdown(dropdown);
    });

    // Inicializar Navbar
    const navbars = document.querySelectorAll('.navbar');
    navbars.forEach(navbar => {
        new CustomNavbar(navbar);
    });

    // Inicializar Alerts
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        new CustomAlert(alert);
    });
});

// ========== UTILITY FUNCTIONS ==========
window.CustomFramework = {
    showModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal && modal.customModal) {
            modal.customModal.show();
        }
    },
    
    hideModal: function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal && modal.customModal) {
            modal.customModal.hide();
        }
    }
};