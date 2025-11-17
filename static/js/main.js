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

    // Ajusta padding-top quando a navbar está fixa no mobile
    const fixedNavbar = document.querySelector('.navbar.fixed-top');
    const applyNavbarPadding = () => {
        const vw = window.innerWidth;
        if (fixedNavbar && vw < 992) {
            document.body.classList.add('with-fixed-navbar');
            const h = fixedNavbar.offsetHeight || 85;
            document.body.style.setProperty('--navbar-height', h + 'px');
        } else {
            document.body.classList.remove('with-fixed-navbar');
            document.body.style.removeProperty('--navbar-height');
        }
    };
    applyNavbarPadding();
    window.addEventListener('resize', applyNavbarPadding);
    window.addEventListener('orientationchange', applyNavbarPadding);

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
        const animateNumber = (element, target, opts) => {
            let current = 0;
            const intervalMs = 50; // ticks estáveis
            const durationMs = 6500; // duração alvo ~6.5s
            const steps = Math.max(1, Math.floor(durationMs / intervalMs));
            const increment = target / steps;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                const value = Math.floor(current);
                if (opts.prefixPlus) {
                    element.textContent = '+' + value;
                } else if (opts.suffixPlus) {
                    element.textContent = value + '+';
                } else if (opts.suffixPercent) {
                    element.textContent = value + '%';
                } else {
                    element.textContent = String(value);
                }
            }, intervalMs);
        };

        const isElementInViewport = (el) => {
            const rect = el.getBoundingClientRect();
            return (
                rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
                rect.bottom > 0
            );
        };

        const parseTarget = (text) => {
            const raw = text.trim();
            const prefixPlus = raw.startsWith('+');
            const suffixPlus = raw.endsWith('+');
            const suffixPercent = raw.endsWith('%');
            const digits = raw.replace(/[^0-9]/g, '');
            const target = parseInt(digits || '0', 10);
            return { target, prefixPlus, suffixPlus, suffixPercent };
        };

        const checkAndAnimateNumbers = () => {
            impactNumbers.forEach(number => {
                if (isElementInViewport(number) && !number.classList.contains('animated')) {
                    number.classList.add('animated');
                    const { target, prefixPlus, suffixPlus, suffixPercent } = parseTarget(number.textContent);
                    animateNumber(number, target, { prefixPlus, suffixPlus, suffixPercent });
                }
            });
        };

        checkAndAnimateNumbers();
        window.addEventListener('scroll', checkAndAnimateNumbers);
    }
    // Ajuste de rolagem suave para âncoras com navbar fixa
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            const navbar = document.querySelector('.navbar.fixed-top');
            const offset = navbar ? navbar.offsetHeight + 10 : 0;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }

    // Scroll reveal: seções, cards (laterais) e imagens de páginas (exceto banners/hero)
    const baseTargets = Array.from(document.querySelectorAll('main section, .reveal, .card'));
    const imageCandidates = Array.from(document.querySelectorAll('main img'))
        .filter(img => !img.classList.contains('no-reveal') &&
                        !img.classList.contains('hero-image') &&
                        !img.closest('.page-banner') &&
                        !img.closest('.hero') &&
                        !img.closest('.carousel'));
    const revealTargets = [...baseTargets, ...imageCandidates];

    if (revealTargets.length > 0) {
        // Alterna direção lateral em cards; aplica zoom leve em imagens
        let cardIndex = 0;
        let imgIndex = 0;
        revealTargets.forEach((el) => {
            if (!el.classList.contains('reveal')) el.classList.add('reveal');
            if (el.classList.contains('card')) {
                const useLeft = (cardIndex % 2 === 0);
                el.classList.add(useLeft ? 'reveal-left' : 'reveal-right');
                const delayMs = Math.min(cardIndex * 80, 400);
                el.style.setProperty('--reveal-delay', delayMs + 'ms');
                cardIndex++;
            } else if (el.tagName === 'IMG') {
                el.classList.add('reveal-zoom');
                const delayMs = Math.min(imgIndex * 60, 300);
                el.style.setProperty('--reveal-delay', delayMs + 'ms');
                imgIndex++;
            }
        });

        let lastScrollY = window.scrollY;
        let scrollingUp = false;
        window.addEventListener('scroll', () => {
            const currentY = window.scrollY;
            scrollingUp = currentY < lastScrollY;
            lastScrollY = currentY;
        }, { passive: true });

        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else if (scrollingUp) {
                        entry.target.classList.remove('visible');
                    }
                });
            }, { root: null, threshold: 0.15 });
            revealTargets.forEach(el => io.observe(el));
        } else {
            // Fallback: sem IO, apenas revela tudo
            revealTargets.forEach(el => el.classList.add('visible'));
        }
    }
});