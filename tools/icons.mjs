/* Satır içi SVG ikon seti — Font Awesome CDN'inin yerini alır.
   Tümü 24x24 kutuda, currentColor ile çizilir. */
export const ICONS = {
  menu:        '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close:       '<path d="M18 6 6 18M6 6l12 12"/>',
  'arrow-right':'<path d="M5 12h14M13 6l6 6-6 6"/>',
  'arrow-left': '<path d="M19 12H5M11 18l-6-6 6-6"/>',
  'chevron-right':'<path d="m9 6 6 6-6 6"/>',
  check:       '<path d="M20 6 9 17l-5-5"/>',
  info:        '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  clock:       '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
  calendar:    '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  'list-checks':'<path d="M3 5h1.5L6 6.5 8.5 4M3 12h1.5L6 13.5 8.5 11M3 19h1.5L6 20.5 8.5 18M12 5h9M12 12h9M12 19h9"/>',
  share:       '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  refresh:     '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
  mail:        '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>',
  lock:        '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v5h5"/><path d="M9 13h6M9 17h6"/>',
  'alert-triangle':'<path d="m21.7 18-8-14a2 2 0 0 0-3.4 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.7-3Z"/><path d="M12 9v4M12 17h.01"/>',
  'shield-check':'<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/><path d="m9 12 2 2 4-4"/>',
  shield:      '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/>',
  stethoscope: '<path d="M4 3v6a5 5 0 0 0 10 0V3"/><path d="M4 3H2.5M14 3h1.5"/><path d="M9 14v2a5 5 0 0 0 10 0v-1.5"/><circle cx="19" cy="12" r="2.5"/>',
  'user-round':'<circle cx="12" cy="8" r="4.5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  target:      '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
  compass:     '<circle cx="12" cy="12" r="10"/><path d="m16.2 7.8-2.1 6.4-6.4 2.1 2.1-6.4z"/>',
  'book-open': '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  moon:        '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  sun:         '<circle cx="12" cy="12" r="4.2"/><path d="M12 2v2.4M12 19.6V22M4.2 4.2l1.7 1.7M18.1 18.1l1.7 1.7M2 12h2.4M19.6 12H22M4.2 19.8l1.7-1.7M18.1 5.9l1.7-1.7"/>',
  link:        '<path d="M10 13a5 5 0 0 0 7.1.2l2.6-2.6a5 5 0 0 0-7.1-7.1L11.1 5"/><path d="M14 11a5 5 0 0 0-7.1-.2l-2.6 2.6a5 5 0 0 0 7.1 7.1L12.9 19"/>',
  image:       '<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="8.8" cy="9.5" r="1.8"/><path d="m4 17 5-5 4.5 4.5L16.5 14l3.5 3.4"/>',
  printer:     '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 15h12v6H6z"/>',
  bell:        '<path d="M18 9a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7"/><path d="M13.7 20a2 2 0 0 1-3.4 0"/>',
  'trending-up': '<path d="M22 7 13.6 15.4l-4-4L2 19"/><path d="M15.5 7H22v6.5"/>',
  sparkles:    '<path d="M11 3l1.8 4.4L17 9l-4.2 1.6L11 15l-1.8-4.4L5 9l4.2-1.6L11 3Z"/><path d="M18.5 14.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9.9-2.1Z"/>',
  leaf:        '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10Z"/><path d="M2 21c0-3 1.9-5.4 5.1-6C9.5 14.5 12 13 13 12"/>',
  brain:       '<path d="M9.5 4A2.5 2.5 0 0 0 7 6.5c0 .3 0 .5.1.8A3 3 0 0 0 5 10a3 3 0 0 0 .8 2 3 3 0 0 0 .7 4.5A2.5 2.5 0 0 0 9.5 20a2.5 2.5 0 0 0 2.5-2.5v-11A2.5 2.5 0 0 0 9.5 4Z"/><path d="M14.5 4A2.5 2.5 0 0 1 17 6.5c0 .3 0 .5-.1.8A3 3 0 0 1 19 10a3 3 0 0 1-.8 2 3 3 0 0 1-.7 4.5A2.5 2.5 0 0 1 14.5 20 2.5 2.5 0 0 1 12 17.5v-11A2.5 2.5 0 0 1 14.5 4Z"/>',
  'heart-pulse':'<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7Z"/><path d="M3.2 13h6.3l.5-1 2 4.5 2-7 1.5 3.5h5.3"/>',
  crosshair:   '<circle cx="12" cy="12" r="10"/><path d="M22 12h-4M6 12H2M12 6V2M12 22v-4"/>',
  dumbbell:    '<path d="M4 9v6M8 6v12M16 6v12M20 9v6M8 12h8"/>',
  smartphone:  '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M12 18h.01"/>',
  'x-brand':   '<path d="M18.9 2H22l-7.1 8.1L23 22h-6.4l-5-6.6L5.8 22H2.7l7.6-8.7L1.6 2h6.6l4.5 6 5.3-6zm-1.1 18h1.7L7.3 3.8H5.5L17.8 20z"/>',
  whatsapp:    '<path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.4A10 10 0 1 0 12 2zm5.2 13.9c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .1-1.7-.1-.4-.1-.9-.3-1.5-.6a11 11 0 0 1-4.3-4.3c-.4-.7-.7-1.4-.7-2 0-.7.3-1.3.6-1.6.2-.2.4-.3.6-.3h.5c.2 0 .4 0 .6.4l.8 1.9c.1.2 0 .4-.1.5l-.3.4c-.1.2-.3.3-.1.6.5.9 1.1 1.6 2 2.2.4.3.7.4.9.2l.6-.7c.2-.2.4-.2.6-.1l1.8.9c.2.1.4.2.4.3.1.2.1.6 0 1z"/>'
};

export function icon(name, cls = '') {
  const solid = name === 'x-brand' || name === 'whatsapp';
  return `<svg class="icon${solid ? ' icon--solid' : ''}${cls ? ' ' + cls : ''}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#i-${name}"/></svg>`;
}

export function sprite(names) {
  const body = names.map(n => {
    const solid = n === 'x-brand' || n === 'whatsapp';
    return `<symbol id="i-${n}" viewBox="0 0 24 24"${solid ? ' fill="currentColor" stroke="none"' : ''}>${ICONS[n]}</symbol>`;
  }).join('');
  return `<svg class="icon-sprite" aria-hidden="true">${body}</svg>`;
}

export const ALL_ICONS = Object.keys(ICONS);
