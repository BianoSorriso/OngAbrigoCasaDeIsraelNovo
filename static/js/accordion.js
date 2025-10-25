document.addEventListener('DOMContentLoaded', function() {
  const triggers = document.querySelectorAll('.accordion-button, [data-toggle="collapse"], [data-bs-toggle="collapse"]');
  
  triggers.forEach(function(trigger) {
    // Evita interferir no botão do menu hambúrguer (navbar)
    if (trigger.classList.contains('navbar-toggler')) return;

    trigger.addEventListener('click', function(event) {
      event.preventDefault();
      event.stopPropagation();

      const targetSelector = trigger.getAttribute('data-target') || trigger.getAttribute('data-bs-target');
      const content = targetSelector ? document.querySelector(targetSelector) : null;
      if (!content) return;

      const isOpen = content.classList.toggle('show');
      trigger.classList.toggle('collapsed', !isOpen);
      trigger.setAttribute('aria-expanded', isOpen);

      // Se fizer parte de um accordion, fecha os demais
      const accordion = trigger.closest('.accordion');
      if (accordion) {
        const items = accordion.querySelectorAll('.accordion-collapse');
        items.forEach(function(item) {
          if (item !== content) {
            item.classList.remove('show');
          }
        });
        const buttons = accordion.querySelectorAll('.accordion-button');
        buttons.forEach(function(btn) {
          if (btn !== trigger) {
            btn.classList.add('collapsed');
            btn.setAttribute('aria-expanded', 'false');
          }
        });
      }
    });
  });
});