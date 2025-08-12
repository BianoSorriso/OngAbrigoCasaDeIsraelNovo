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
        
        // Fechar menu ao clicar em um link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // Apenas fecha o menu em telas pequenas
                if (window.innerWidth <= 1199.98) {
                    navMenu.classList.remove('show');
                    menuToggle.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
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
    
    // Fechar menu ao redimensionar a janela
    window.addEventListener('resize', function() {
        const navMenu = document.querySelector('.nav-menu');
        const menuToggle = document.querySelector('.menu-toggle');
        
        if (navMenu && menuToggle && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
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