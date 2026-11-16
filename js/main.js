// =====================================================================
// Guineo Video — JS compartido por todas las páginas.
// Cada módulo solo se activa si los elementos existen en la página.
// =====================================================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initDemoReel();
  initProjectPanel();
  initLightbox();
  initContactForm();
});

// ---------------------------------------------------------------- Menú móvil
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const open = mobileMenu.classList.toggle('hidden') === false;
    menuBtn.setAttribute('aria-expanded', String(open));
  });
}

// ------------------------------------------------- Home: demo reel de fondo
function initDemoReel() {
  const video = document.getElementById('demo-reel');
  if (!video) return;

  // Si el video no existe o no carga, se oculta y queda el fondo de color.
  const hide = () => { video.style.display = 'none'; };
  video.addEventListener('error', hide, true);
  const source = video.querySelector('source');
  if (source) source.addEventListener('error', hide);

  // Respeta "reducir movimiento" del sistema.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.removeAttribute('autoplay');
    video.pause();
  }
}

// ------------------------------------- Proyectos: panel de detalles derecho
function initProjectPanel() {
  const panel = document.getElementById('project-panel');
  const backdrop = document.getElementById('project-backdrop');
  const cards = document.querySelectorAll('.project-card');
  if (!panel || !backdrop || !cards.length) return;

  const $ = (id) => document.getElementById(id);
  let lastCard = null;

  function open(card) {
    const d = card.dataset;
    $('panel-title').textContent = d.title || '';
    $('panel-meta').textContent = [d.kind, d.year].filter(Boolean).join(' / ');
    $('panel-desc').textContent = d.desc || '';
    $('panel-credits').innerHTML = d.credits || '';

    const media = $('panel-media');
    media.innerHTML = '';
    if (d.img) {
      const img = document.createElement('img');
      img.src = d.img;
      img.alt = d.title || '';
      img.className = 'w-full h-full object-cover';
      media.appendChild(img);
    } else {
      media.textContent = 'Imagen';
    }

    const link = $('panel-link');
    if (d.link) {
      link.href = d.link;
      link.classList.remove('hidden');
      link.classList.add('inline-block');
    } else {
      link.classList.add('hidden');
      link.classList.remove('inline-block');
    }

    cards.forEach((c) => c.classList.remove('is-active'));
    card.classList.add('is-active');
    lastCard = card;

    panel.classList.remove('translate-x-full');
    panel.setAttribute('aria-hidden', 'false');
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    panel.querySelector('[data-panel-close]').focus();
  }

  function close() {
    panel.classList.add('translate-x-full');
    panel.setAttribute('aria-hidden', 'true');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    cards.forEach((c) => c.classList.remove('is-active'));
    if (lastCard) lastCard.focus();
  }

  cards.forEach((card) => card.addEventListener('click', () => open(card)));
  backdrop.addEventListener('click', close);
  panel.querySelector('[data-panel-close]').addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.getAttribute('aria-hidden') === 'false') close();
  });
}

// ----------------------------------------- Biombo: lightbox del "Making of"
function initLightbox() {
  const box = document.getElementById('lightbox');
  if (!box) return;
  const img = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');

  function close() {
    box.classList.add('hidden');
    box.classList.remove('flex');
    img.src = '';
  }

  document.querySelectorAll('.making-of-item').forEach((item) => {
    item.addEventListener('click', () => {
      const photo = item.querySelector('img');
      if (!photo) return; // placeholder sin foto todavía
      img.src = photo.src;
      img.alt = photo.alt;
      caption.textContent = item.dataset.caption || '';
      box.classList.remove('hidden');
      box.classList.add('flex');
    });
  });

  box.addEventListener('click', (e) => {
    if (e.target === box || e.target.hasAttribute('data-lightbox-close')) close();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !box.classList.contains('hidden')) close();
  });
}

// ------------------------------------------------ Contacto: envío Formspree
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const status = document.getElementById('form-status');
  const button = form.querySelector('button[type="submit"]');

  function show(message, ok) {
    status.textContent = message;
    status.classList.remove('hidden', 'bg-green-100', 'bg-red-100');
    status.classList.add(ok ? 'bg-green-100' : 'bg-red-100');
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (form.action.includes('TU_FORM_ID')) {
      show('El formulario todavía no está configurado (falta el ID de Formspree).', false);
      return;
    }

    button.disabled = true;
    button.textContent = 'Enviando…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        form.reset();
        show('¡Gracias! Recibimos tu mensaje y te responderemos pronto.', true);
      } else {
        const data = await res.json().catch(() => ({}));
        const msg = data.errors ? data.errors.map((er) => er.message).join(', ') : 'Hubo un problema enviando el mensaje.';
        show(msg + ' También puedes escribir a info@guineovideo.com.', false);
      }
    } catch (err) {
      show('No se pudo enviar. Revisa tu conexión o escribe a info@guineovideo.com.', false);
    } finally {
      button.disabled = false;
      button.textContent = 'Enviar Mensaje';
    }
  });
}

// ------------------------------------------------- Iconos de mouse (cursor)
document.addEventListener('mousedown', () => {
  document.body.classList.add('clicking');
});

document.addEventListener('mouseup', () => {
  document.body.classList.remove('clicking');
});
