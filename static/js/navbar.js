document.addEventListener('DOMContentLoaded', function() {
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Toggle do hambúrguer (suporta data-bs-target e data-target)
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        const targetSelector = navbarToggler.getAttribute('data-bs-target') || navbarToggler.getAttribute('data-target');
        const targetEl = targetSelector ? document.querySelector(targetSelector) : navbarCollapse;
        navbarToggler.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (targetEl) {
                targetEl.classList.toggle('show');
            }
        });
    }
    
    if (navbarCollapse) {
        // Fecha quando clica em um link (exceto dropdown toggle)
        const navLinks = navbarCollapse.querySelectorAll('.nav-link:not([data-bs-toggle="dropdown"]):not(.dropdown-toggle)');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navbarCollapse.classList.remove('show');
            });
        });
        
        // Fecha quando clica fora
        document.addEventListener('click', function(event) {
            const navbarToggler = document.querySelector('.navbar-toggler');
            if (navbarToggler && !navbarToggler.contains(event.target) && !navbarCollapse.contains(event.target)) {
                navbarCollapse.classList.remove('show');
            }
        });
    }

    // Dropdown: abrir/fechar ao clicar e fechar ao clicar fora
    const dropdownToggles = document.querySelectorAll('[data-bs-toggle="dropdown"], [data-toggle="dropdown"]');
    dropdownToggles.forEach(toggle => {
        const dropdown = toggle.closest('.dropdown');
        const menu = dropdown ? dropdown.querySelector('.dropdown-menu') : null;
        if (!menu) return;

        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            // Fecha outros dropdowns abertos
            document.querySelectorAll('.dropdown-menu.show').forEach(m => {
                if (m !== menu) m.classList.remove('show');
            });
            document.querySelectorAll('.dropdown-toggle[aria-expanded="true"]').forEach(t => {
                if (t !== toggle) t.setAttribute('aria-expanded', 'false');
            });

            // Toggle do menu atual
            const isOpen = menu.classList.toggle('show');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    });

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function() {
        document.querySelectorAll('.dropdown-menu.show').forEach(m => m.classList.remove('show'));
        document.querySelectorAll('.dropdown-toggle[aria-expanded="true"]').forEach(t => t.setAttribute('aria-expanded', 'false'));
    });

    // Fechar dropdown ao clicar em um item e recolher navbar no mobile
    const dropdownItems = document.querySelectorAll('.dropdown-menu .dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function() {
            const menu = this.closest('.dropdown-menu');
            if (menu) menu.classList.remove('show');
            const toggle = menu ? menu.closest('.dropdown').querySelector('.dropdown-toggle') : null;
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        });
    });
});