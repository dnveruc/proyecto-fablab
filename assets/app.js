(() => {
  'use strict';
  const weeks = window.YURAFAB_WEEKLY;
  const grid = document.getElementById('weekly-grid');
  const dialogs = document.getElementById('weekly-dialogs');
  const arrow = '<svg class="arrow-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14"/></svg>';
  const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const pending = items => items.length ? `<div class="pending-block"><p class="pending-label">Por completar</p><ul>${items.map(item=>`<li>${escape(item)}</li>`).join('')}</ul></div>` : '';
  const downloadRows = files => files.length ? `<div class="weekly-downloads">${files.map(file=>`<a class="file-row" href="${escape(file.path)}" download><span><strong>${escape(file.title)}</strong><small>${escape(file.description)}</small></span>${arrow}</a>`).join('')}</div>` : '<p class="pending-copy">Todavía no hay archivos nativos adjuntos para esta semana. Los entregables pendientes se indican en los apartados anteriores.</p>';
  for (const week of weeks) {
    const number = String(week.num).padStart(2, '0');
    grid.insertAdjacentHTML('beforeend', `<button class="journal-card ${week.num>5?'is-pending':''}" data-open-week="${week.num}" aria-haspopup="dialog"><div class="journal-card-top"><span class="journal-number">${number}</span>${arrow}</div><p class="journal-topic">${escape(week.topic)}</p><h3>${escape(week.title)}</h3><p class="journal-card-summary">${escape(week.summary)}</p><span class="journal-status">${escape(week.status)}</span></button>`);
    dialogs.insertAdjacentHTML('beforeend', `<dialog id="modal-semana${week.num}" class="week-dialog" aria-labelledby="week-title-${week.num}"><div class="dialog-heading"><p class="eyebrow">Bitácora / Semana ${number}</p><button class="dialog-close" data-close aria-label="Cerrar semana ${week.num}">×</button></div><div class="dialog-scroll"><header class="week-heading"><span class="week-status">${escape(week.status)}</span><h2 id="week-title-${week.num}">${escape(week.title)}</h2><p>${escape(week.summary)}</p></header><section class="week-objective"><h3>Objetivo de la semana</h3><p>${escape(week.objective)}</p></section>${week.sections.map(section=>`<section class="academic-section"><h3><span>${escape(section.number)}</span> ${escape(section.title)}</h3><div class="weekly-content">${section.html}</div>${pending(section.pending)}</section>`).join('')}<section class="academic-section"><h3>Archivos y documentos descargables</h3>${downloadRows(week.downloads)}</section><section class="academic-section"><h3>Reflexión del equipo</h3><div class="reflection-grid">${['Qué aprendimos','En qué nos equivocamos','Qué fue lo más difícil'].map(title=>`<article><h4>${title}</h4><p>Pendiente de redactar por el equipo.</p></article>`).join('')}</div></section><section class="academic-section"><h3>Conclusiones y recomendaciones</h3><p>${escape(week.conclusion)}</p>${pending(week.pending)}</section><nav class="modal-nav" aria-label="Navegación entre semanas">${week.num>1?`<button data-open-week="${week.num-1}"><svg class="direction-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H4m6-6-6 6 6 6"/></svg> Semana ${week.num-1}</button>`:'<span></span>'}<a href="assets/descargas/plantilla-semanal.md" download>Plantilla semanal</a>${week.num<weeks.length?`<button data-open-week="${week.num+1}">Semana ${week.num+1} <svg class="direction-arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12h16m-6-6 6 6-6 6"/></svg></button>`:'<span></span>'}</nav></div></dialog>`);
  }
  // Every legacy photograph can be opened at its original size as well.
  document.querySelectorAll('.weekly-content .photo-frame > img').forEach(img => {
    if (img.closest('a')) return;
    const a = document.createElement('a');
    a.href = img.getAttribute('src'); a.target = '_blank'; a.rel = 'noopener';
    a.className = 'legacy-evidence-link'; a.setAttribute('aria-label', `Abrir imagen completa: ${img.alt}`);
    img.before(a); a.append(img); img.loading = 'lazy'; img.decoding = 'async';
  });
  function openDialog(id, updateHash=true) {
    const dialog = document.getElementById(id);
    if (!(dialog instanceof HTMLDialogElement)) return;
    document.querySelectorAll('dialog[open]').forEach(other => {if (other!==dialog) other.close();});
    const scroll = dialog.querySelector('.dialog-scroll'); if (scroll) scroll.scrollTop=0;
    if (!dialog.open) dialog.showModal();
    if (updateHash && id.startsWith('modal-semana')) history.replaceState(null,'',`#semana-${id.replace('modal-semana','')}`);
  }
  function closeDialog(dialog) { if (dialog?.open) dialog.close(); }
  document.addEventListener('click', event => {
    const week = event.target.closest('[data-open-week]');
    if (week) {event.preventDefault(); openDialog(`modal-semana${week.dataset.openWeek}`); return;}
    const profile = event.target.closest('[data-open-profile]');
    if (profile) {openDialog(`modal-${profile.dataset.openProfile}`,false); return;}
    const closer=event.target.closest('[data-close], [data-close-dialog]');
    if (closer) closeDialog(closer.closest('dialog'));
  });
  document.querySelectorAll('dialog').forEach(dialog => {
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const stops = [...dialog.querySelectorAll('button:not([disabled]), a[href], summary, [tabindex="0"]')].filter(el => el.getClientRects().length > 0);
      const first = stops[0], last = stops[stops.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    });
    dialog.addEventListener('click', event => {if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
    dialog.addEventListener('close',()=>{const n=dialog.id.replace('modal-semana','');if(location.hash===`#semana-${n}`)history.replaceState(null,'','#bitacora');});
  });
  const openHash = () => {const match=location.hash.match(/^#(?:semana-|modal-semana)([1-9])$/);if(match)openDialog(`modal-semana${match[1]}`,false);};
  window.addEventListener('hashchange', openHash); openHash();
  window.abrirModal = openDialog;
  window.cerrarModal = id => closeDialog(document.getElementById(id));
  window.cambiarSemana = (actual,direction) => openDialog(`modal-semana${actual+direction}`);
})();
