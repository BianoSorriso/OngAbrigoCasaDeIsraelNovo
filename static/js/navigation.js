/**
 * Script para gerenciar a navegação responsiva
 */
document.addEventListener('DOMContentLoaded', function() {
    // Toggle do menu mobile
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            this.classList.toggle('active');
            
            // Atualiza o atributo aria-expanded
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
        });
    }

    // Gerenciar dropdowns
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(function(toggle) {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            const dropdownMenu = parent.querySelector('.dropdown-menu');
            
            if (dropdownMenu) {
                // Fechar outros dropdowns abertos
                document.querySelectorAll('.dropdown-menu.show').forEach(function(menu) {
                    if (menu !== dropdownMenu) {
                        menu.classList.remove('show');
                    }
                });
                
                dropdownMenu.classList.toggle('show');
            }
        });
    });

    // Fechar dropdowns quando clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(function(menu) {
                menu.classList.remove('show');
            });
        }
    });

    // Adicionar classe active ao link atual
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href === currentPath || (href !== '/' && currentPath.includes(href))) {
            link.classList.add('active');
        } else if (href === '/' && currentPath === '/') {
            link.classList.add('active');
        }
    });
    
    // Compatibilidade com atributos data-bs-*
    document.querySelectorAll('[data-bs-toggle="dropdown"]').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const parent = this.parentElement;
            const dropdown = parent.querySelector('.dropdown-menu');
            if (dropdown) {
                dropdown.classList.toggle('show');
            }
        });
    });
    
    document.querySelectorAll('[data-bs-toggle="collapse"]').forEach(function(element) {
        element.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('data-bs-target'));
            if (target) {
                target.classList.toggle('show');
            }
        });
    });
});