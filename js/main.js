// Lógica para el menú móvil en las páginas de la carpeta /html/
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
});

// Event listeners para iconos de mouse
document.addEventListener('mousedown', () => {
  document.body.classList.add('clicking');
});

document.addEventListener('mouseup', () => {
  document.body.classList.remove('clicking');
});
