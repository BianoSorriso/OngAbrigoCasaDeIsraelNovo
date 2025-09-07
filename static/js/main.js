// Espera o DOM ser carregado completamente
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa tooltips personalizados
    const tooltipTriggerList = document.querySelectorAll('[data-tooltip]');
    tooltipTriggerList.forEach(function(tooltipTriggerEl) {
        tooltipTriggerEl.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.classList.add('show');
            
            this.addEventListener('mouseleave', function() {
                tooltip.remove();
            }, { once: true });
        });
    });
    
    // Inicializa popovers personalizados
    const popoverTriggerList = document.querySelectorAll('[data-popover]');
    popoverTriggerList.forEach(function(popoverTriggerEl) {
        popoverTriggerEl.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove qualquer popover existente
            const existingPopovers = document.querySelectorAll('.popover');
            existingPopovers.forEach(p => p.remove());
            
            const popoverTitle = this.getAttribute('data-popover-title') || '';
            const popoverContent = this.getAttribute('data-popover');
            
            const popover = document.createElement('div');
            popover.className = 'popover';
            popover.innerHTML = `
                ${popoverTitle ? `<div class="popover-header">${popoverTitle}</div>` : ''}
                <div class="popover-body">${popoverContent}</div>
            `;
            document.body.appendChild(popover);
            
            const rect = this.getBoundingClientRect();
            popover.style.top = rect.bottom + 10 + 'px';
            popover.style.left = rect.left + (rect.width / 2) - (popover.offsetWidth / 2) + 'px';
            popover.classList.add('show');
            
            // Fechar popover ao clicar fora
            document.addEventListener('click', function closePopover(event) {
                if (!popover.contains(event.target) && event.target !== popoverTriggerEl) {
                    popover.remove();
                    document.removeEventListener('click', closePopover);
                }
            });
        });
    });

    // Adiciona classe 'active' ao link de navegação atual
    
    const currentLocation = location.pathname;
    const mainNavLinks = document.querySelectorAll('.navbar-nav .nav-link');
mainNavLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation) {
            link.classList.add('active');
        }
    });

    // Animação de fade-in para elementos com a classe 'animate-fade-in'
    const animateElements = document.querySelectorAll('.animate-fade-in');
    animateElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });

    // Botões de valor de doação
    const donationButtons = document.querySelectorAll('.donation-amount-btn');
    if (donationButtons.length > 0) {
        donationButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove a classe 'active' de todos os botões
                donationButtons.forEach(btn => btn.classList.remove('active'));
                // Adiciona a classe 'active' ao botão clicado
                this.classList.add('active');
                // Atualiza o valor no campo de entrada, se existir
                const inputField = document.querySelector('#custom-amount');
                if (inputField) {
                    inputField.value = this.getAttribute('data-value');
                }
            });
        });
    }
    
    // Funcionalidade de QR Code PIX
    const generatePixButton = document.getElementById('generate-pix');
    const pixQrcodeContainer = document.getElementById('pix-qrcode-container');
    const pixAmountSpan = document.getElementById('pix-amount');
    const customAmountInput = document.getElementById('custom-amount');
    
    if (generatePixButton && pixQrcodeContainer && pixAmountSpan) {
        generatePixButton.addEventListener('click', function() {
            // Obter o valor selecionado
            let amount = 0;
            const activeButton = document.querySelector('.donation-amount-btn.active');
            
            if (customAmountInput && customAmountInput.value) {
                amount = parseFloat(customAmountInput.value);
            } else if (activeButton) {
                amount = parseFloat(activeButton.getAttribute('data-value'));
            }
            
            if (amount > 0) {
                // Formatar o valor para exibição
                pixAmountSpan.textContent = `R$ ${amount.toFixed(2)}`;
                
                // Exibir o container do QR code
                pixQrcodeContainer.style.display = 'block';
                
                // Rolar até o QR code
                pixQrcodeContainer.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert('Por favor, selecione ou digite um valor para a doação.');
            }
        });
    }

    // Validação de formulários personalizada
    const forms = document.querySelectorAll('form');
    if (forms.length > 0) {
        Array.from(forms).forEach(form => {
            form.addEventListener('submit', event => {
                let isValid = true;
                
                // Verificar campos obrigatórios
                const requiredFields = form.querySelectorAll('[required]');
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('is-invalid');
                        
                        // Mostrar mensagem de erro se não existir
                        let errorContainer = field.nextElementSibling;
                        if (!errorContainer || !errorContainer.classList.contains('invalid-feedback')) {
                            errorContainer = document.createElement('div');
                            errorContainer.className = 'invalid-feedback';
                            errorContainer.textContent = 'Este campo é obrigatório.';
                            field.parentNode.insertBefore(errorContainer, field.nextSibling);
                        }
                    } else {
                        field.classList.remove('is-invalid');
                        field.classList.add('is-valid');
                    }
                });
                
                // Verificar campos de email
                const emailFields = form.querySelectorAll('input[type="email"]');
                emailFields.forEach(field => {
                    if (field.value.trim() && !validateEmail(field.value)) {
                        isValid = false;
                        field.classList.add('is-invalid');
                        
                        // Mostrar mensagem de erro se não existir
                        let errorContainer = field.nextElementSibling;
                        if (!errorContainer || !errorContainer.classList.contains('invalid-feedback')) {
                            errorContainer = document.createElement('div');
                            errorContainer.className = 'invalid-feedback';
                            errorContainer.textContent = 'Por favor, insira um endereço de e-mail válido.';
                            field.parentNode.insertBefore(errorContainer, field.nextSibling);
                        }
                    }
                });
                
                if (!isValid) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                
                form.classList.add('was-validated');
            }, false);
            
            // Limpar validação ao digitar
            const formFields = form.querySelectorAll('input, textarea, select');
            formFields.forEach(field => {
                field.addEventListener('input', function() {
                    if (this.value.trim()) {
                        this.classList.remove('is-invalid');
                    }
                });
            });
        });
    }
    
    // Função para validar email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Contador de caracteres para campos de texto
    const textareas = document.querySelectorAll('textarea[maxlength]');
    if (textareas.length > 0) {
        textareas.forEach(textarea => {
            const maxLength = textarea.getAttribute('maxlength');
            const counterElement = document.createElement('div');
            counterElement.className = 'form-text text-end';
            counterElement.innerHTML = `<span class="char-count">0</span>/${maxLength} caracteres`;
            textarea.parentNode.appendChild(counterElement);

            textarea.addEventListener('input', function() {
                const currentLength = this.value.length;
                const charCountElement = counterElement.querySelector('.char-count');
                charCountElement.textContent = currentLength;

                if (currentLength >= maxLength * 0.9) {
                    charCountElement.classList.add('text-danger');
                } else {
                    charCountElement.classList.remove('text-danger');
                }
            });
        });
    }

    // Botão de voltar ao topo
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Inicializa o mapa na página de contato, se existir
    const mapContainer = document.getElementById('map');
    if (mapContainer && typeof L !== 'undefined') {
        // Coordenadas da ONG (exemplo)
        const lat = -23.550520;
        const lng = -46.633308;
        
        // Inicializa o mapa
        const map = L.map('map').setView([lat, lng], 15);
        
        // Adiciona o tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Adiciona um marcador na localização da ONG
        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup('<strong>CABI</strong><br>Rua das Flores, 123 - Centro').openPopup();
    }

    // Galeria de projetos com lightbox, se existir
    const galleryItems = document.querySelectorAll('.project-gallery img');
    if (galleryItems.length > 0 && typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.project-gallery img',
            touchNavigation: true,
            loop: true,
            autoplayVideos: true
        });
    }

    // Animação de números de impacto
    const impactNumbers = document.querySelectorAll('.impact-number');
    if (impactNumbers.length > 0) {
        const animateNumber = (element, target) => {
            let current = 0;
            const increment = target / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                // Formata o número com + se começar com +
                if (element.textContent.startsWith('+')) {
                    element.textContent = '+' + Math.floor(current);
                } else if (element.textContent.endsWith('%')) {
                    element.textContent = Math.floor(current) + '%';
                } else {
                    element.textContent = Math.floor(current);
                }
            }, 10);
        };

        // Função para verificar se o elemento está visível na tela
        const isElementInViewport = (el) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        };

        // Verifica e anima os números quando estiverem visíveis
        const checkAndAnimateNumbers = () => {
            impactNumbers.forEach(number => {
                if (isElementInViewport(number) && !number.classList.contains('animated')) {
                    number.classList.add('animated');
                    let targetValue = number.textContent;
                    if (targetValue.startsWith('+')) {
                        targetValue = targetValue.substring(1);
                    }
                    if (targetValue.endsWith('%')) {
                        targetValue = targetValue.substring(0, targetValue.length - 1);
                    }
                    animateNumber(number, parseInt(targetValue, 10));
                }
            });
        };

        // Verifica ao carregar a página e ao rolar
        checkAndAnimateNumbers();
        window.addEventListener('scroll', checkAndAnimateNumbers);
    }
});