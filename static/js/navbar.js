document.addEventListener('DOMContentLoaded', function() {
    // Seleciona o botão toggle e o menu collapse
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        // Adiciona evento de clique no botão toggle
        navbarToggler.addEventListener('click', function() {
            // Toggle da classe 'show' no menu
            navbarCollapse.classList.toggle('show');
            
            // Atualiza o atributo aria-expanded
            const isExpanded = navbarCollapse.classList.contains('show');
            navbarToggler.setAttribute('aria-expanded', isExpanded);
        });
        
        // Fecha o menu quando clicar em um link (mobile)
        const navLinks = navbarCollapse.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Só fecha em mobile (quando o toggler está visível)
                if (window.getComputedStyle(navbarToggler).display !== 'none') {
                    navbarCollapse.classList.remove('show');
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            });
        });
        
        // Fecha o menu quando clicar fora dele
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navbarToggler.contains(event.target) || navbarCollapse.contains(event.target);
            
            if (!isClickInsideNav && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                navbarToggler.setAttribute('aria-expanded', 'false');
            }
        });
    }
});