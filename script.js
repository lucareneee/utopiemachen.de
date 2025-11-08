/* === Datei-Config ===
   Falls dein PDF noch den langen Upload-Namen hat, kannst du
   - entweder die Datei in melissa-beier-utopie.pdf umbenennen
   - oder hier den Dateinamen anpassen.
*/
const pdfUrl = "melissa-beier-utopie.pdf";

/* === Inhalte (Tiles) === */
const ITEMS = [
  /* COMMUNITY */
  { id:"gp1", category:"COMMUNITY", title:"GAY PANIC · Community-basiert",
    meta:"Partyreihe · FLINTA* Fokus · Safe Space",
    desc:"Queere Nacht mit Raum für Freude, Consent und Care-Strukturen. Community first – Soli-Tickets, Awareness präsent.",
    action:{ type:"internal", href:"#gp" } },
  { id:"comm2", category:"COMMUNITY", title:"Soli-System & Awareness",
    meta:"Community · Struktur",
    desc:"Transparente Soli-Tickets, Low-Sensory Zonen, Consent-Check-ins – Care als Designprinzip für alle Formate.",
    action:{ type:"internal", href:"#care" } },

  /* ARCHITEKTUR & ZUKUNFT */
  { id:"arch1", category:"ARCH", title:"Three Chimneys — Erinnerung & Zukunft",
    meta:"Architektur & Zukunft · Text: Melissa Beier",
    desc:"Wie industrielle Relikte zu Orten des Wandels werden. Eindrücke zur Manifesta 15 und eine Einladung, Stadt neu zu denken.",
    action:{ type:"pdf", href: pdfUrl, embed:true } },
  { id:"arch2", category:"ARCH", title:"Stadtlabor · Materialkreisläufe",
    meta:"Architektur & Zukunft · Fallstudie",
    desc:"Umbau statt Neubau, Bauteilbörsen, Mikro-Werkstätten und Klimaresilienz – zirkuläres Bauen als lokale Praxis.",
    action:{ type:"internal", href:"#labor" } },

  /* ART & CHAOS */
  { id:"art1", category:"ART", title:"Glitch Garden · Webkunst-Showcase",
    meta:"Art & Chaos · Interaktive Installation",
    desc:"Digitale Skulpturen, Live-Coding und Noise als wuchernder Garten aus Zufall, Farbe, Sound. Contributions willkommen.",
    action:{ type:"internal", href:"#glitch-garden" } },

  /* WORDS & THOUGHTS */
  { id:"words1", category:"WORDS", title:"Utopie Machen! · Editorial",
    meta:"Words & Thoughts · Essay",
    desc:"Warum wir an kollektive, zärtliche Zukunft glauben: zwischen Praxis, Politik und Poetik – ein Werkzeugkasten statt Manifest.",
    action:{ type:"internal", href:"#editorial" } },
];

/* === Platzhaltertexte für interne Routen === */
const INTERNAL = {
  "#gp": {
    meta:"Community · Partyreihe",
    desc:`**GAY PANIC** ist Community-getrieben und FLINTA*-fokussiert.
- Awareness-Team vor Ort
- Soli-Tickets auf Anfrage
- Foto-Opt-Out jederzeit möglich

Line-Ups, Mood-Playlists und ein Mini-Archiv vergangener Abende folgen hier.`,
    tags:["COMMUNITY"]
  },
  "#care": {
    meta:"Community · Struktur",
    desc:`**Care ist Infrastruktur.**
- Consent-Check-ins am Einlass
- Low-Sensory Areas
- Awareness-Chat (vor Ort)

Soli-Tickets priorisieren marginalisierte Personen. Transparente Kommunikation vorab.`,
    tags:["COMMUNITY"]
  },
  "#labor": {
    meta:"Architektur & Zukunft · Fallstudie",
    desc:`**Stadtlabor UTMA**: Kreisläufe aktivieren statt Ressourcen verbrennen.
- Bauteilbörse & Kiez-Mikro-Werkstatt
- Umbau statt Neubau
- Aktive Erdgeschosszonen als soziale Infrastruktur`,
    tags:["ARCHITEKTUR & ZUKUNFT"]
  },
  "#glitch-garden": {
    meta:"Art & Chaos · Ausstellungsprojekt",
    desc:`Ein wandelbarer Showroom für Webkunst, Live-Coding und Audiovisuals.
- Szenen werden interaktiv freigeschaltet
- Offene Calls & Experimente aus dem Kollektiv
- Dokumentation als lebendiges Archiv`,
    tags:["ART & CHAOS"]
  },
  "#editorial": {
    meta:"Words & Thoughts · Leitartikel",
    desc:`**Utopie Machen!** heißt Räume bauen – physisch & digital – die Care, Mut und Zärtlichkeit priorisieren.
Kein Manifest, sondern ein Werkzeugkasten für Praxis im Alltag.`,
    tags:["WORDS & THOUGHTS"]
  }
};

/* === Kategorien-Farben / Labels === */
const CAT = {
  COMMUNITY:{color:'var(--red)',side:'accent-community',badge:'COMMUNITY'},
  ARCH:{color:'var(--lime)',side:'accent-arch',badge:'ARCH+FUTURE'},
  ART:{color:'var(--blue)',side:'accent-art',badge:'ART+CHAOS'},
  WORDS:{color:'var(--pink)',side:'accent-words',badge:'WORDS+THOUGHTS'}
};

/* === Utilities === */
const rand=(a,b)=>Math.random()*(b-a)+a;
const int=(a,b)=>Math.floor(rand(a,b+1));
const choose=a=>a[Math.floor(Math.random()*a.length)];
const bigTitle=document.getElementById("bigTitle"),
      layersEl=document.getElementById("layers"),
      tilesEl=document.getElementById("tiles");

/* === Poster generieren === */
function generatePoster(){
  layersEl.innerHTML=""; tilesEl.innerHTML="";

  // Titel-Glitch/Jitter
  bigTitle.style.transform=`scale(${rand(0.92,1.18)}) rotate(${rand(-6,6)}deg)`;
  bigTitle.style.opacity=rand(0.85,1);
  bigTitle.style.letterSpacing=`${rand(-8,6)/10}em`;

  // Farblayer
  const COLORS=['var(--red)','var(--lime)','var(--blue)','var(--pink)'];
  for(let i=0;i<int(3,6);i++){
    const e=document.createElement('div');
    e.className='layer';
    e.style.width=`${int(20,70)}vw`;
    e.style.height=`${int(18,55)}vh`;
    e.style.left=`${int(-15,70)}vw`;
    e.style.top=`${int(-10,80)}vh`;
    e.style.background=`linear-gradient(${int(0,360)}deg,${choose(COLORS)},rgba(255,255,255,${rand(0.02,0.1)}))`;
    e.style.opacity=rand(0.45,0.95);
    const dur=rand(8,22);
    e.style.transition=`transform ${dur}s ease-in-out,left ${dur}s ease-in-out,top ${dur}s ease-in-out`;
    layersEl.appendChild(e);
    setInterval(()=> {
      e.style.left=`${int(-15,70)}vw`;
      e.style.top=`${int(-10,80)}vh`;
      e.style.transform=`rotate(${int(-20,60)}deg) translate(${rand(-6,6)}px,${rand(-6,6)}px)`;
    }, dur*1000);
  }
  // Noise
  const noise=document.createElement('div');
  noise.className='layer noise';
  noise.style.width='140vw'; noise.style.height='140vh';
  noise.style.left='-20vw'; noise.style.top='-20vh';
  noise.style.background=`radial-gradient(circle at ${int(20,80)}% ${int(20,80)}%, rgba(255,255,255,0.06), transparent 25%)`;
  layersEl.appendChild(noise);

  // Filter
  const activeFilter=document.querySelector('.chip.active')?.dataset.filter||'ALL';
  ITEMS.filter(i=>activeFilter==='ALL'||i.category===activeFilter).forEach(item=>{
    const cfg=CAT[item.category];

    const tile=document.createElement('div');
    tile.className='tile';
    tile.style.width=`${int(240,420)}px`;
    tile.style.height=`${int(170,320)}px`;
    tile.style.left=`${int(6,70)}vw`;
    tile.style.top=`${int(18,80)}vh`;
    tile.style.transform=`rotate(${int(-8,8)}deg)`;

    const inner=document.createElement('div');
    inner.className='inner';
    inner.innerHTML=`
      <div class="t-title" style="font-size:${int(20,28)}px">${item.title}</div>
      <div class="t-meta">${item.meta}</div>
      <div class="badge" style="background:${cfg.color}${item.category==='ARCH' ? ';color:#111' : ''}">${cfg.badge}</div>
    `;
    tile.appendChild(inner);

    const overlay=document.createElement('div');
    overlay.style.position='absolute';
    overlay.style.inset='0';
    overlay.style.pointerEvents='none';
    overlay.style.background=`linear-gradient(180deg,${cfg.color},rgba(0,0,0,0))`;
    overlay.style.mixBlendMode='overlay';
    overlay.style.opacity=.85;
    tile.appendChild(overlay);

    tile.addEventListener('click',()=>openModal(item));
    tile.addEventListener('keydown',e=>{ if(e.key==='Enter') openModal(item) });
    tile.tabIndex=0;

    tilesEl.appendChild(tile);
  });
}

/* === Modal === */
const modalWrap=document.getElementById('modalWrap'),
      modalTitle=document.getElementById('modalTitle'),
      modalMeta=document.getElementById('modalMeta'),
      modalDesc=document.getElementById('modalDesc'),
      modalTags=document.getElementById('modalTags'),
      modalCategory=document.getElementById('modalCategory'),
      sideAccent=document.getElementById('sideAccent'),
      primaryAction=document.getElementById('primaryAction'),
      toggleEmbed=document.getElementById('toggleEmbed'),
      embedWrap=document.getElementById('embedWrap'),
      embedFrame=document.getElementById('embedFrame');

function md(t){
  return t
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\n- (.+)/g,'<br>• $1')
    .replace(/\n/g,'<br>');
}

function openModal(item){
  const cfg=CAT[item.category];

  // Standard-Inhalt (Teaser)
  modalTitle.textContent=item.title;
  modalMeta.textContent=item.meta||'';
  modalDesc.innerHTML=md(item.desc);
  modalTags.innerHTML=`<span class="tag" style="background:${cfg.color}${item.category==='ARCH'?';color:#111':''}">${cfg.badge}</span>`;
  modalCategory.textContent=cfg.badge;
  sideAccent.className=`side-accent ${cfg.side}`;

  // Aktionen zurücksetzen
  embedWrap.style.display="none";
  toggleEmbed.style.display="none";
  embedFrame.removeAttribute('src');
  primaryAction.onclick=null;

  if(item.action?.type==="pdf"){
    // PDF: externer Link + optionaler Embed-Viewer
    primaryAction.textContent="→ Vollständigen Artikel (PDF)";
    primaryAction.href=item.action.href;
    primaryAction.target="_blank";
    primaryAction.rel="noopener";
    if(item.action.embed){
      toggleEmbed.style.display="inline-block";
      toggleEmbed.onclick=()=>{
        const show=embedWrap.style.display==="none";
        embedWrap.style.display=show?"block":"none";
        if(show) embedFrame.src=item.action.href; else embedFrame.removeAttribute('src');
      };
    }
  } else if(item.action?.type==="internal"){
    // interne „Unterseite“ im Modal nachladen
    primaryAction.textContent="→ Mehr lesen";
    primaryAction.href="#";
    primaryAction.onclick=e=>{
      e.preventDefault();
      const d=INTERNAL[item.action.href];
      if(!d) return;
      modalMeta.textContent=d.meta||'';
      modalDesc.innerHTML=md(d.desc);
      modalTags.innerHTML=(d.tags||[]).map(t=>`<span class="tag" style="background:${cfg.color}${item.category==='ARCH'?';color:#111':''}">${t}</span>`).join('');
    };
  } else {
    primaryAction.textContent="Mehr";
    primaryAction.href="#";
  }

  modalWrap.style.display='flex';
  modalWrap.setAttribute('aria-hidden','false');
}

/* Modal schließen */
document.getElementById('closeModal').onclick=()=>{
  modalWrap.style.display='none';
  modalWrap.setAttribute('aria-hidden','true');
  embedWrap.style.display="none";
  embedFrame.removeAttribute('src');
};
modalWrap.addEventListener('click',e=>{
  if(e.target===modalWrap){
    modalWrap.style.display='none';
    modalWrap.setAttribute('aria-hidden','true');
    embedWrap.style.display="none";
    embedFrame.removeAttribute('src');
  }
});

/* Filter & Buttons */
document.getElementById('regenerateBtn').onclick=generatePoster;
document.getElementById('showListBtn').onclick=()=>{
  modalTitle.textContent='UTMA · Überblick';
  modalMeta.textContent='Alle Einträge in Kurzform';
  modalDesc.innerHTML=ITEMS.map(i=>{
    const cfg=CAT[i.category];
    return `<div style="margin:10px 0 14px">
      <strong>${i.title}</strong><br>
      <small style="opacity:.8">${i.meta}</small><br>
      <span style="opacity:.85">${i.desc}</span><br>
      <span class="tag" style="background:${cfg.color}${i.category==='ARCH'?';color:#111':''}">${cfg.badge}</span>
    </div>`;
  }).join('');
  modalTags.innerHTML='';
  modalCategory.textContent='Alle';
  sideAccent.className='side-accent';
  primaryAction.textContent='Schließen';
  primaryAction.href='#';
  primaryAction.onclick=e=>{e.preventDefault();document.getElementById('closeModal').click();};
  toggleEmbed.style.display="none";
  embedWrap.style.display="none";
  embedFrame.removeAttribute('src');
  modalWrap.style.display='flex';
  modalWrap.setAttribute('aria-hidden','false');
};

document.querySelectorAll('.chip').forEach(chip=>{
  chip.addEventListener('click',()=>{
    document.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    generatePoster();
  });
});

/* Init */
generatePoster();

/* Shortcut: R = neu würfeln */
document.addEventListener('keydown',e=>{ if(e.key.toLowerCase()==='r') generatePoster(); });
