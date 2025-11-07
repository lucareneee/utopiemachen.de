/* === Datei-Config === */
const pdfUrl = "melissa-beier-utopie.pdf";

/* === Daten === */
const ITEMS = [
  { id:"gp1", category:"COMMUNITY", title:"GAY PANIC · Community-basiert",
    meta:"Partyreihe · FLINTA* Fokus · Safe Space",
    desc:"Queere Nacht mit Raum für Freude, Consent und Care-Strukturen. Community first – Soli-Tickets, Awareness präsent.",
    action:{ type:"internal", href:"#gp" } },
  { id:"arch1", category:"ARCH", title:"Three Chimneys — Erinnerung & Zukunft",
    meta:"Architektur & Zukunft · Melissa Beier",
    desc:"Wie industrielle Relikte zu Orten des Wandels werden: Beobachtungen zur Manifesta 15 in Barcelona.",
    action:{ type:"pdf", href: pdfUrl, embed:true } },
  { id:"art1", category:"ART", title:"Glitch Garden · Webkunst-Showcase",
    meta:"Art & Chaos · Interaktive Installation",
    desc:"Digitale Skulpturen, Live-Coding, Noise – ein wuchernder Garten aus Zufall, Farbe und Sound.",
    action:{ type:"internal", href:"#glitch-garden" } },
  { id:"words1", category:"WORDS", title:"Utopie Machen! · Editorial",
    meta:"Words & Thoughts · Essay",
    desc:"Wieso wir an kollektive, zärtliche Zukunft glauben: eine Handreichung zwischen Praxis, Politik und Poetik.",
    action:{ type:"internal", href:"#editorial" } },
];

/* === Texte === */
const INTERNAL = {
  "#gp": { meta:"Community · Partyreihe",
    desc:`**GAY PANIC** ist Community-getrieben und FLINTA*-fokussiert.
- Awareness-Team vor Ort
- Soli-Tickets auf Anfrage
- Foto-Opt-Out jederzeit möglich.`,
    tags:["COMMUNITY"] },
  "#glitch-garden": { meta:"Art & Chaos · Projekt",
    desc:`Webkunst, Live-Coding, Audiovisuals und offene Calls – interaktive Experimente.`,
    tags:["ART & CHAOS"] },
  "#editorial": { meta:"Words & Thoughts · Leitartikel",
    desc:`**Utopie Machen!** ist unser Arbeitsmodus: zwischen Praxis, Politik und Poetik.`,
    tags:["WORDS & THOUGHTS"] },
};

/* === Kategorienfarben === */
const CAT = {
  COMMUNITY:{color:'var(--red)',side:'accent-community',badge:'COMMUNITY'},
  ARCH:{color:'var(--lime)',side:'accent-arch',badge:'ARCH+FUTURE'},
  ART:{color:'var(--blue)',side:'accent-art',badge:'ART+CHAOS'},
  WORDS:{color:'var(--pink)',side:'accent-words',badge:'WORDS+THOUGHTS'}
};

/* === Hilfsfunktionen === */
const rand=(a,b)=>Math.random()*(b-a)+a;
const int=(a,b)=>Math.floor(rand(a,b+1));
const choose=a=>a[Math.floor(Math.random()*a.length)];
const bigTitle=document.getElementById("bigTitle"),
      layersEl=document.getElementById("layers"),
      tilesEl=document.getElementById("tiles");

/* === Poster === */
function generatePoster(){
  layersEl.innerHTML="";tilesEl.innerHTML="";
  bigTitle.style.transform=`scale(${rand(0.92,1.18)}) rotate(${rand(-6,6)}deg)`;

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
    layersEl.appendChild(e);
  }
  const noise=document.createElement('div');
  noise.className='layer noise';
  noise.style.width='140vw';noise.style.height='140vh';
  noise.style.left='-20vw';noise.style.top='-20vh';
  layersEl.appendChild(noise);

  const activeFilter=document.querySelector('.chip.active')?.dataset.filter||'ALL';
  ITEMS.filter(i=>activeFilter==='ALL'||i.category===activeFilter).forEach(item=>{
    const cfg=CAT[item.category]||{};
    const tile=document.createElement('div');
    tile.className='tile';
    tile.style.left=`${int(6,70)}vw`;
    tile.style.top=`${int(18,80)}vh`;
    tile.style.transform=`rotate(${int(-8,8)}deg)`;
    const inner=document.createElement('div');
    inner.className='inner';
    inner.innerHTML=`<div class="t-title">${item.title}</div>
                     <div class="t-meta">${item.meta}</div>
                     <div class="badge" style="background:${cfg.color}">${cfg.badge}</div>`;
    tile.appendChild(inner);
    const overlay=document.createElement('div');
    overlay.style.position='absolute';overlay.style.inset='0';
    overlay.style.pointerEvents='none';
    overlay.style.background=`linear-gradient(180deg,${cfg.color},rgba(0,0,0,0))`;
    overlay.style.mixBlendMode='overlay';overlay.style.opacity=.85;
    tile.appendChild(overlay);
    tile.addEventListener('click',()=>openModal(item));
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

function md(t){return t.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/\n- (.+)/g,'<br>• $1').replace(/\n/g,'<br>');}

function openModal(item){
  const cfg=CAT[item.category]||{};
  modalTitle.textContent=item.title;
  modalMeta.textContent=item.meta;
  modalDesc.innerHTML=md(item.desc);
  modalTags.innerHTML=`<span class="tag" style="background:${cfg.color}">${cfg.badge}</span>`;
  modalCategory.textContent=cfg.badge;
  sideAccent.className=`side-accent ${cfg.side}`;
  embedWrap.style.display="none";toggleEmbed.style.display="none";embedFrame.removeAttribute('src');

  if(item.action.type==="pdf"){
    primaryAction.textContent="→ Vollständigen Artikel (PDF)";
    primaryAction.href=item.action.href;
    if(item.action.embed){
      toggleEmbed.style.display="inline-block";
      toggleEmbed.onclick=()=>{ 
        const show=embedWrap.style.display==="none";
        embedWrap.style.display=show?"block":"none";
        embedFrame.src=show?item.action.href:"";
      };
    }
  }else if(item.action.type==="internal"){
    primaryAction.textContent="→ Mehr lesen";
    primaryAction.href="#";
    primaryAction.onclick=e=>{
      e.preventDefault();
      const d=INTERNAL[item.action.href];
      if(!d)return;
      modalMeta.textContent=d.meta;
      modalDesc.innerHTML=md(d.desc);
      modalTags.innerHTML=d.tags.map(t=>`<span class="tag" style="background:${cfg.color}">${t}</span>`).join('');
    };
  }
  modalWrap.style.display='flex';modalWrap.setAttribute('aria-hidden','false');
}

document.getElementById('closeModal').onclick=
