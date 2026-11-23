/* =========================================================
   Gracie Barra Xcanatún · Lógica de la landing
   ========================================================= */

/* ---------- CONFIGURACIÓN (edita aquí) ---------- */
const CONFIG = {
  // Número de WhatsApp en formato internacional, sin "+" ni espacios (México: 52 + 10 dígitos)
  WHATSAPP: '529999914657',
  // URL de la Web App de Google Apps Script (ver README / apps-script/Code.gs). Déjala vacía para modo demo.
  SHEETS_URL: 'https://script.google.com/macros/s/AKfycbxvos8JrYCXaRh3uXWRAkcSnYL3svsL_ggnYI4SCJo7OiMzKbaU8gLO4Fj3BibRnyUJNQ/exec',
  // Búsqueda que usa Google Maps para ubicar la escuela
  MAP_QUERY: 'Prime Center Distrito Xcanatún, Carretera Mérida-Progreso, Mérida, Yucatán, México'
};

/* ---------- DATOS ---------- */
const LEGACY = [
  { ini:'MM', foto:'img/mitsuyo-maeda.webp', name:'Mitsuyo Maeda', sub:'El origen de una gran historia', era:'Origen',
    short:'Conocido como Conde Koma, Mitsuyo Maeda fue un maestro japonés que llevó sus conocimientos de artes marciales a Brasil, donde transmitió sus enseñanzas a Carlos Gracie.',
    more:'Su legado sentó las bases para el nacimiento del Jiu Jitsu brasileño, dando inicio a una historia que transformaría las artes marciales para siempre.' },
  { ini:'CG', foto:'img/carlos-gracie.webp', name:'Carlos Gracie Sr.', sub:'El visionario que inició un legado', era:'Fundador de la tradición',
    short:'Pionero del Brazilian Jiu Jitsu y fundador de la tradición Gracie, convirtió las enseñanzas recibidas en una filosofía de vida basada en la disciplina, el respeto y la superación personal.',
    more:'Su visión fue fundamental para desarrollar un arte marcial que trascendiera generaciones.' },
  { ini:'HG', foto:'img/helio-gracie.webp', name:'Hélio Gracie', sub:'La técnica por encima de la fuerza', era:'Evolución',
    short:'Una de las figuras más influyentes en la evolución del Jiu Jitsu brasileño. Contribuyó a perfeccionar un sistema de defensa personal donde la técnica y la eficiencia superan las diferencias de fuerza y tamaño.',
    more:'Su legado continúa siendo parte esencial de la enseñanza del Jiu Jitsu.' },
  { ini:'RG', foto:'img/rolls-gracie.webp', name:'Rolls Gracie', sub:'El espíritu de la innovación', era:'Innovación',
    short:'Reconocido por su visión innovadora y su pasión por el entrenamiento, impulsó la evolución del Jiu Jitsu mediante la incorporación de nuevas técnicas y métodos de preparación.',
    more:'Su influencia marcó a generaciones de atletas y profesores, contribuyendo al desarrollo del Jiu Jitsu moderno.' },
  { ini:'CJ', foto:'img/carlos-gracie-jr.webp', name:'Carlos Gracie Jr.', sub:'El fundador de Gracie Barra', era:'1986 · Gracie Barra',
    short:'En 1986 fundó Gracie Barra con una visión que transformaría la enseñanza del BJJ: hacer de este arte marcial una herramienta de desarrollo personal accesible para todos.',
    more:'Su liderazgo dio origen a una comunidad internacional de escuelas unidas por la disciplina, el compañerismo y la excelencia, consolidando la filosofía que hoy nos representa: Jiu Jitsu para Todos.' },
  { ini:'CL', foto:'img/carlos-lemos.webp', name:'Profesor Carlos Lemos Jr.', sub:'Un legado que trascendió fronteras', era:'Gracie Barra internacional',
    short:'Conocido como Escorrega, es uno de los grandes representantes de Gracie Barra a nivel internacional. Formado bajo la enseñanza de Carlos Gracie Jr. y reconocido por sus múltiples campeonatos mundiales.',
    more:'Ha dedicado gran parte de su trayectoria a formar atletas, desarrollar profesores y expandir el Brazilian Jiu Jitsu. Su trayectoria representa la esencia de Gracie Barra: formar personas dentro y fuera del tatami, preservando los valores que han definido a nuestra comunidad durante generaciones.' },
  { ini:'GA', foto:'img/gibran-alvarez.webp', name:'Profesor Gibrán Álvarez', sub:'Un referente del Jiu Jitsu en México', era:'México',
    short:'Figura destacada en la historia y el desarrollo del BJJ en México. Con más de dos décadas de experiencia, ha dedicado su trayectoria a promover el deporte y formar competidores.',
    more:'Como discípulo del profesor Carlos Lemos Jr., ha mantenido vivo el legado de Gracie Barra, fortaleciendo su presencia en el sureste mexicano. Su experiencia como atleta, instructor y formador lo posiciona como uno de los referentes del Jiu Jitsu nacional, representando los valores de constancia, respeto y excelencia que caracterizan a nuestra organización.' }
];
const FEATURE = { ini:'RS', foto:'img/raul-solis.webp', name:'Profesor Raúl Solís', sub:'Una nueva generación', era:'Head Coach · Gracie Barra Xcanatún',
  paras:[
    'Con más de 14 años de trayectoria y 5,000 horas de clases impartidas, el profesor Raúl Solís ha dedicado su carrera a la enseñanza y desarrollo del Brazilian Jiu Jitsu.',
    'Su compromiso va más allá de transmitir técnicas: trabaja para formar grandes atletas y personas disciplinadas, seguras y preparadas para enfrentar desafíos dentro y fuera del tatami, capaces de representar y competir a nivel nacional e internacional.',
    'Hoy continúa este compromiso como Head Coach de Gracie Barra Xcanatún, llevando consigo la experiencia, los valores y la filosofía de una organización que cree en el poder transformador del Jiu Jitsu.'
  ] };

// group: ninos | teens | adultos | privadas
const SCHEDULE = [
  { t:'7:00 – 8:00 a. m.',  n:'GB 1: Adultos · Fundamentos', g:'adultos',  tag:'Mañana' },
  { t:'8:00 – 9:00 a. m.',  n:'GB 2: Adultos · Avanzados',   g:'adultos',  tag:'Mañana' },
  { t:'9:00 – 10:00 a. m.', n:'Clases privadas',             g:'privadas', tag:'Mañana', s:'Sujeto a disponibilidad' },
  { t:'4:00 – 5:00 p. m.',  n:'Tiny Champions',              g:'ninos',    tag:'Tarde',  s:'3 a 6 años' },
  { t:'5:00 – 6:00 p. m.',  n:'Little Champions',            g:'ninos',    tag:'Tarde',  s:'7 a 11 años' },
  { t:'6:00 – 7:00 p. m.',  n:'Juniors',                     g:'teens',    tag:'Tarde',  s:'12 a 15 años' },
  { t:'7:00 – 8:00 p. m.',  n:'GB 1: Adultos · Fundamentos', g:'adultos',  tag:'Noche' },
  { t:'8:00 – 9:00 p. m.',  n:'GB 2: Adultos · Avanzados',   g:'adultos',  tag:'Noche' }
];

/* ---------- UTILIDADES ---------- */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const waLink = (msg) => `https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(msg)}`;

/* ---------- NAV ---------- */
const nav = $('#nav'), burger = $('#burger'), navLinks = $('#navLinks');
const onScroll = () => nav.classList.toggle('is-solid', window.scrollY > 30);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });
burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', open);
});
$$('#navLinks a').forEach(a => a.addEventListener('click', () => {
  navLinks.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false');
}));

// Enlace activo según la sección visible
const sections = $$('main section[id]');
const linkMap = new Map($$('#navLinks a:not(.btn)').map(a => [a.getAttribute('href').slice(1), a]));
const spy = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      linkMap.forEach(a => a.classList.remove('is-active'));
      const a = linkMap.get(e.target.id); if (a) a.classList.add('is-active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => spy.observe(s));

/* ---------- LEGADO (galería fotográfica + "ver más") ---------- */
const timeline = $('#timeline');
const colL = document.createElement('div'); colL.className = 'tl-col tl-col--l';
const colR = document.createElement('div'); colR.className = 'tl-col tl-col--r';
const cols = document.createElement('div'); cols.className = 'tl-cols';
cols.append(colL, colR);
timeline.appendChild(cols);
LEGACY.forEach((p, i) => {
  const el = document.createElement('article');
  el.className = 'card reveal';
  el.style.setProperty('--i', String(i + 1));   // orden cronológico (móvil)
  el.style.setProperty('--portrait-y', ({'Mitsuyo Maeda':'26%', 'Carlos Gracie Sr.':'18%', 'Hélio Gracie':'22%', 'Rolls Gracie':'20%', 'Carlos Gracie Jr.':'16%', 'Profesor Carlos Lemos Jr.':'19%', 'Profesor Gibrán Álvarez':'22%'})[p.name] || '20%');
  el.innerHTML = `
    <div class="card__media">
      <img src="${p.foto}" alt="Retrato de ${p.name}" loading="lazy" width="600" height="420">
      <span class="card__era">${p.era}</span>
    </div>
    <div class="card__content">
      <h3>${p.name}</h3>
      <span class="card__sub">${p.sub}</span>
      <div class="card__body">
        <p>${p.short}</p>
        <div class="card__more" id="legacy-more-${i}"><p>${p.more}</p></div>
      </div>
      <button type="button" class="card__btn" aria-controls="legacy-more-${i}" aria-expanded="false">Leer más</button>
    </div>`;
  (i % 2 === 0 ? colL : colR).appendChild(el);   // alterna izquierda / derecha
});

// El Head Coach conserva su información y estadísticas en una tarjeta fotográfica.
const feat = document.createElement('article');
feat.className = 'card card--feature reveal';
feat.innerHTML = `
  <div class="card__media">
    <img src="${FEATURE.foto}" alt="Retrato de ${FEATURE.name}" loading="lazy" width="600" height="420">
    <span class="card__era">${FEATURE.era}</span>
  </div>
  <div class="card__content">
    <span class="badge">Head Coach</span>
    <h3>${FEATURE.name}</h3>
    <span class="card__sub">${FEATURE.sub}</span>
    <div class="card__body">
      <p>${FEATURE.paras[0]}</p>
      <div class="card__more" id="legacy-more-headcoach">
        ${FEATURE.paras.slice(1).map(t => `<p>${t}</p>`).join('')}
      </div>
      <div class="feature-stats"><div><b>+14</b><span>años de trayectoria</span></div><div><b>+5,000</b><span>horas de clase impartidas</span></div></div>
    </div>
    <button type="button" class="card__btn" aria-controls="legacy-more-headcoach" aria-expanded="false">Leer más</button>
  </div>`;
const fin = document.createElement('div');
fin.className = 'tl-final';
fin.innerHTML = '<span class="tl-end" aria-hidden="true"></span>';
fin.appendChild(feat);
timeline.appendChild(fin);

timeline.addEventListener('click', e => {
  const btn = e.target.closest('.card__btn'); if (!btn) return;
  const card = btn.closest('.card');
  const open = card.classList.toggle('is-open');
  btn.textContent = open ? 'Leer menos' : 'Leer más';
  btn.setAttribute('aria-expanded', String(open));
});

/* ---------- HORARIOS + FILTROS ---------- */
const list = $('#scheduleList');
list.innerHTML = SCHEDULE.map(s => `
  <div class="slot" data-group="${s.g}">
    <div class="slot__time">${s.t}</div>
    <div class="slot__name">${s.n}${s.s ? `<small>${s.s}</small>` : ''}</div>
    <span class="slot__pill ${s.g === 'adultos' ? 'slot__pill--blue' : ''}">${s.tag}</span>
  </div>`).join('');

$$('.chip').forEach(chip => chip.addEventListener('click', () => {
  $$('.chip').forEach(c => c.classList.remove('is-active'));
  chip.classList.add('is-active');
  const f = chip.dataset.filter;
  $$('.slot').forEach(s => s.classList.toggle('is-hidden', f !== 'all' && s.dataset.group !== f));
  $$('.program').forEach(p => p.classList.toggle('is-dim', f !== 'all' && p.dataset.group !== f));
}));

/* ---------- FAQ: abrir uno cierra los demás ---------- */
$$('#faq details').forEach(d => d.addEventListener('toggle', () => {
  if (d.open) $$('#faq details').forEach(o => { if (o !== d) o.open = false; });
}));

/* ---------- ANIMACIONES DE ENTRADA + CONTADORES ---------- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in'); io.unobserve(e.target);
  });
}, { threshold: .12 });
// Retraso escalonado para elementos hermanos
$$('.reveal').forEach((el, i) => { el.style.transitionDelay = `${(i % 4) * 80}ms`; io.observe(el); });

const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, suf = el.dataset.suffix || '', plain = el.dataset.plain;
    const dur = 1400, t0 = performance.now();
    const tick = now => {
      const p = Math.min((now - t0) / dur, 1), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
      el.textContent = (plain ? v : v.toLocaleString('es-MX')) + suf;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick); countObs.unobserve(el);
  });
}, { threshold: .6 });
$$('[data-count]').forEach(el => countObs.observe(el));

/* ---------- WHATSAPP ---------- */
$$('[data-wa]').forEach(a => {
  a.href = waLink(a.dataset.wa);
  a.target = '_blank'; a.rel = 'noopener';
});

/* ---------- MAPA ---------- */
const q = encodeURIComponent(CONFIG.MAP_QUERY);
$('#mapFrame').src = `https://www.google.com/maps?q=${q}&hl=es&z=16&output=embed`;
$('#dirBtn').href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;

/* ---------- CTA FLOTANTE: se oculta cuando ya estás en el formulario ---------- */
const sticky = $('#stickyCta');
new IntersectionObserver(entries => {
  sticky.classList.toggle('is-hidden', entries[0].isIntersecting);
}, { threshold: .25 }).observe($('#leadForm'));

/* ---------- FORMULARIO ---------- */
const form = $('#leadForm'), submitBtn = $('#submitBtn');
const consent = $('#consent'), consentErr = $('#consentErr');

// Sugerir programa según la edad (solo si aún no eligen uno)
$('#edad').addEventListener('input', e => {
  const age = +e.target.value, sel = $('#programa');
  if (!age || sel.value) return;
  const pick = age <= 6 ? 'Tiny Champions (3–6)' : age <= 11 ? 'Little Champions (7–11)'
             : age <= 15 ? 'Juniors (12–15)' : 'Adultos · Fundamentos';
  sel.value = pick;
});

function setError(input, msg) {
  const f = input.closest('.field'); if (!f) return;
  f.classList.toggle('has-error', !!msg);
  $('.err', f).textContent = msg || '';
}
function validate() {
  let ok = true;
  const req = [['nombre','Escribe tu nombre completo'],['paraQuien','Selecciona una opción'],
               ['programa','Elige un programa'],['turno','Elige un turno']];
  req.forEach(([id, msg]) => { const el = $('#' + id); const bad = !el.value.trim(); setError(el, bad ? msg : ''); if (bad) ok = false; });
  const phone = $('#whatsapp'), digits = phone.value.replace(/\D/g, '');
  const badPhone = digits.length < 10 || digits.length > 13;
  setError(phone, badPhone ? 'Escribe un número válido de 10 dígitos' : ''); if (badPhone) ok = false;
  const age = $('#edad'), a = +age.value;
  const badAge = !a || a < 3 || a > 99;
  setError(age, badAge ? 'Edad mínima: 3 años' : ''); if (badAge) ok = false;
  consentErr.textContent = consent.checked ? '' : 'Necesitamos tu consentimiento para continuar';
  if (!consent.checked) ok = false;
  return ok;
}
form.addEventListener('input', e => { if (e.target.closest('.field')) setError(e.target, ''); });

form.addEventListener('submit', async e => {
  e.preventDefault();
  if ($('[name=website]').value) return;            // honeypot: bot detectado
  if (!validate()) { const bad = $('.has-error input, .has-error select'); if (bad) bad.focus(); return; }

  const data = {
    fecha: new Date().toLocaleString('es-MX', { timeZone: 'America/Merida' }),
    nombre: $('#nombre').value.trim(),
    whatsapp: $('#whatsapp').value.trim(),
    paraQuien: $('#paraQuien').value,
    edad: $('#edad').value,
    programa: $('#programa').value,
    turno: $('#turno').value,
    origen: location.href,
    utm: location.search.slice(1)
  };

  submitBtn.classList.add('is-loading'); submitBtn.disabled = true;

  // Enviar al Apps Script. Con no-cors Google no permite leer la respuesta:
  // completar fetch NO acredita que Sheets haya guardado el registro.
  // Aun así, los errores de red no deben mostrarse como envíos exitosos.
  try {
    if (!CONFIG.SHEETS_URL) throw new Error('La URL de Apps Script no está configurada.');
    await fetch(CONFIG.SHEETS_URL, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.error('Error al enviar el formulario:', err);
    let errorBox = $('#submitError');
    if (!errorBox) {
      errorBox = document.createElement('p');
      errorBox.id = 'submitError';
      errorBox.setAttribute('role', 'alert');
      errorBox.style.color = '#b9131a';
      submitBtn.insertAdjacentElement('afterend', errorBox);
    }
    errorBox.textContent = 'No pudimos enviar tu solicitud. Intenta nuevamente o contáctanos por WhatsApp.';
    submitBtn.classList.remove('is-loading'); submitBtn.disabled = false;
    return;
  }
  if ($('#submitError')) $('#submitError').textContent = '';

  // Pantalla de éxito + botón para confirmar por WhatsApp
  $('#okName').textContent = data.nombre.split(' ')[0];
  $('#okWa').href = waLink(
    `Hola, soy ${data.nombre}. Acabo de solicitar mi clase muestra gratuita en Gracie Barra Xcanatún.\n` +
    `Programa: ${data.programa}\nTurno: ${data.turno}\nParticipante: ${data.paraQuien}, ${data.edad} años.`);
  $('#formOk').hidden = false;
  form.reset();
  submitBtn.classList.remove('is-loading'); submitBtn.disabled = false;
});

/* ---------- AVISO DE PRIVACIDAD ---------- */
const modal = $('#privacyModal');
$('#privacyLink').addEventListener('click', e => { e.preventDefault(); modal.showModal(); });
$('#closePrivacy').addEventListener('click', () => modal.close());
modal.addEventListener('click', e => { if (e.target === modal) modal.close(); });

/* ---------- VARIOS ---------- */
$('#year').textContent = new Date().getFullYear();
