const z=document.querySelectorAll(".tab-btn"),E=document.querySelectorAll(".carousel-wrapper");z.forEach(t=>{t.addEventListener("click",()=>{const e=t.dataset.category;z.forEach(o=>o.classList.remove("active")),t.classList.add("active"),E.forEach(o=>{o.dataset.carousel===e?o.classList.remove("hidden"):o.classList.add("hidden")})})});function k(t){const e=t.querySelector(".slider-track"),o=t.querySelector(".slider-dots"),i=t.querySelector(".arrow-prev"),a=t.querySelector(".arrow-next"),r=t.querySelectorAll(".slider-card");if(!e||r.length===0)return;const s=r.length,l=3,p=Math.max(0,s-l);let d=0,n;function g(){return o?o.querySelectorAll(".dot"):[]}function c(v){d=(v%s+s)%s,d>p&&(d=0);const f=100/l*d;e.style.transform=`translateX(-${f}%)`,g().forEach((w,L)=>w.classList.toggle("active",L===d))}function u(){c(d+1)}function x(){c(d-1<0?p:d-1)}function b(){clearInterval(n),n=setInterval(()=>{t.classList.contains("hidden")||document.hidden||u()},3500)}function m(){clearInterval(n)}a?.addEventListener("click",()=>{m(),u(),b()}),i?.addEventListener("click",()=>{m(),x(),b()});const $=t.querySelector(".slider-viewport");$?.addEventListener("mouseenter",m),$?.addEventListener("mouseleave",b),o?.addEventListener("click",v=>{const f=v.target.closest(".dot");if(!f)return;const w=parseInt(f.dataset.index??"0",10);m(),c(w),b()}),b()}function j(t){return`
      <div class="slider-card" style="flex: 0 0 33.333%; padding: 0 0.5rem; box-sizing: border-box;">
        <div class="inner-card" style="border-radius: 14px; background: #0a0a0a; border: 1px solid var(--color-pill-bg); overflow: hidden; cursor: pointer; position: relative; aspect-ratio: 16/9; width: 100%;">
          ${t.background?`<img src="${t.background}" alt="${t.title}" class="card-img" loading="lazy" decoding="async" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; opacity: 0; transition: opacity 0.5s ease, transform 0.5s ease;" onload="this.style.opacity='1'" />`:""}
          <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.92) 100%); pointer-events: none; z-index: 1;"></div>
          <div class="play-btn" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 52px; height: 52px; border-radius: 9999px; background: rgba(255,255,255,0.15); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; z-index: 2;">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M5 3l14 9-14 9V3z"/></svg>
          </div>
          <div style="position: absolute; bottom: 0; left: 0; right: 0; z-index: 2; padding: 0.75rem 1rem; display: flex; align-items: flex-end; justify-content: space-between; gap: 0.75rem;">
            ${t.logo?`<img src="${t.logo}" alt="${t.title}" decoding="async" loading="lazy" style="max-height: 52px; max-width: 160px; object-fit: contain; filter: drop-shadow(0 2px 10px rgba(0,0,0,0.9)); opacity: 0; transition: opacity 0.5s ease;" onload="this.style.opacity='1'" />`:`<div style="font-size: 0.9375rem; font-weight: 800; color: #fff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${t.title}</div>`}
          </div>
        </div>
      </div>`}function H(t){return`
      <div class="mobile-card" style="flex: 0 0 85vw; max-width: 400px; border-radius: 12px; background: #0a0a0a; border: 1px solid var(--color-pill-bg); overflow: hidden; cursor: pointer; scroll-snap-align: start; position: relative; aspect-ratio: 16/9; box-sizing: border-box;">
        ${t.background?`<img src="${t.background}" alt="${t.title}" class="card-img" loading="lazy" decoding="async" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; opacity: 0; transition: opacity 0.5s ease, transform 0.5s ease;" onload="this.style.opacity='1'" />`:""}
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.92) 100%); pointer-events: none; z-index: 1;"></div>
        <div style="position: absolute; bottom: 0; left: 0; right: 0; z-index: 2; padding: 0.6rem 0.875rem; display: flex; align-items: flex-end; justify-content: space-between; gap: 0.5rem;">
          ${t.logo?`<img src="${t.logo}" alt="${t.title}" decoding="async" loading="lazy" style="max-height: 36px; max-width: 120px; object-fit: contain; filter: drop-shadow(0 2px 8px rgba(0,0,0,0.9)); opacity: 0; transition: opacity 0.5s ease;" onload="this.style.opacity='1'" />`:`<div style="font-size: 0.875rem; font-weight: 800; color: #fff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${t.title}</div>`}
        </div>
      </div>`}async function B(){const t=document.querySelector('[data-carousel="peliculas"]'),e=document.getElementById("peliculas-track"),o=document.getElementById("peliculas-mobile-track"),i=document.getElementById("peliculas-dots");if(!(!e||!t))try{const a=await fetch("http://192.168.100.130:3000/api/on-demand").then(r=>r.json());if(e.innerHTML="",o&&(o.innerHTML=""),i&&(i.innerHTML=""),!a||a.length===0){e.innerHTML=`
          <div style="flex: 0 0 100%; display: flex; align-items: center; justify-content: center; aspect-ratio: 16/9; color: var(--color-muted); font-size: 0.9375rem; font-weight: 500;">
            No hay contenido disponible
          </div>`;return}a.forEach((r,s)=>{e.insertAdjacentHTML("beforeend",j(r)),o&&o.insertAdjacentHTML("beforeend",H(r)),i&&i.insertAdjacentHTML("beforeend",`
            <button class="dot${s===0?" active":""}" data-index="${s}" aria-label="Ir a slide ${s+1}"
              style="width: 6px; height: 6px; border-radius: 9999px; border: none; background: var(--color-muted); cursor: pointer; padding: 0; transition: all 0.3s;"></button>`)}),k(t)}catch{e&&(e.innerHTML=`
          <div style="flex: 0 0 100%; display: flex; align-items: center; justify-content: center; aspect-ratio: 16/9; color: var(--color-muted); font-size: 0.875rem;">
            Error al cargar el contenido
          </div>`)}}function y(t,e,o,i,a=!1){return a?`<div style="position: absolute; bottom: 0; left: 0; right: 0; z-index: 2; padding: 0.5rem 0.75rem; display: flex; align-items: center; justify-content: space-between; gap: 0.4rem;">
           <div style="font-size: 0.6875rem; font-weight: 800; color: #fff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;">${t}</div>
           <div style="display: flex; align-items: center; gap: 0.4rem; flex-shrink: 0;">
             <span style="font-size: 0.5625rem; font-weight: 700; color: ${i};">${e}</span>
             <span style="font-size: 0.5rem; color: rgba(255,255,255,0.45); white-space: nowrap;">${o}</span>
           </div>
         </div>`:`<div style="position: absolute; bottom: 0; left: 0; right: 0; z-index: 2; padding: 0.625rem 1rem; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
           <div style="font-size: 0.8125rem; font-weight: 800; color: #fff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1;">${t}</div>
           <div style="display: flex; align-items: center; gap: 0.5rem; flex-shrink: 0;">
             <span style="font-size: 0.6875rem; font-weight: 700; color: ${i};">${e}</span>
             <span style="font-size: 0.5625rem; color: rgba(255,255,255,0.45); white-space: nowrap;">${o}</span>
           </div>
         </div>`}function h(t,e){const o=parseInt(t.slice(1,3),16)||249,i=parseInt(t.slice(3,5),16)||115,a=parseInt(t.slice(5,7),16)||22;return`rgba(${o},${i},${a},${e})`}function C(t){const e=t.borderColor||t.labelColor||"#f97316",o=e.startsWith("#")?h(e,.3):"rgba(249,115,22,0.3)",i=e.startsWith("#")?h(e,.6):"rgba(249,115,22,0.6)",a=t.type==="tarucas"?"#1a0a00":"#1a0000";let r="";t.strThumb?r=`<img src="${t.strThumb}" alt="${t.strEvent}" class="card-img" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; transition: transform 0.5s ease;" loading="lazy" />`:t.type==="tarucas"&&(r='<img src="/backgroundTarucas.webp" alt="Tarucas" class="card-img" loading="lazy" decoding="async" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; transition: transform 0.5s ease;" />');const s=!!t.strThumb,l=!s&&t.strLeagueBadge?`<div style="position: absolute; top: 0.75rem; right: 0.875rem; z-index: 2;">
            <img src="${t.strLeagueBadge}" alt="${t.strLeague}" width="44" height="44" style="object-fit: contain;" />
          </div>`:"",p=!s&&t.strHomeTeamBadge&&t.strAwayTeamBadge?`<div style="position: absolute; inset: 0; bottom: 2.5rem; z-index: 2; display: flex; align-items: center; justify-content: space-around; padding: 0 1.5rem;">
            <img src="${t.strHomeTeamBadge}" alt="${t.strHomeTeam}" width="120" height="120" style="object-fit: contain; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.8));" />
            <img src="${t.strAwayTeamBadge}" alt="${t.strAwayTeam}" width="120" height="120" style="object-fit: contain; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.8));" />
          </div>`:"";return`
      <div class="slider-card" style="flex: 0 0 33.333%; padding: 0 0.5rem; box-sizing: border-box;">
        <div class="match-inner-card featured-card" style="--hover-shadow: ${i}; border-radius: 14px; border: 2px solid ${e}; box-shadow: 0 0 24px ${o}; overflow: hidden; cursor: pointer; position: relative; aspect-ratio: 16/9; width: 100%; background: ${a};">
          ${r}
          <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.97) 100%); pointer-events: none; z-index: 1;"></div>
          ${l}
          ${p}
          ${y(t.strEvent,t.timeLocal,t.dateFormatted,t.labelColor)}
        </div>
      </div>`}function M(t){const e=t.borderColor||t.labelColor||"#f97316",o=e.startsWith("#")?h(e,.25):"rgba(249,115,22,0.25)",i=e.startsWith("#")?h(e,.6):"rgba(249,115,22,0.6)",a=t.type==="tarucas"?"#1a0a00":"#1a0000";let r="";t.strThumb?r=`<img src="${t.strThumb}" alt="${t.strEvent}" class="card-img" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; transition: transform 0.5s ease;" loading="lazy" />`:t.type==="tarucas"&&(r='<img src="/backgroundTarucas.webp" alt="Tarucas" class="card-img" loading="lazy" decoding="async" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; transition: transform 0.5s ease;" />');const s=!!t.strThumb,l=!s&&t.strLeagueBadge?`<div style="position: absolute; top: 0.6rem; right: 0.75rem; z-index: 2;">
          <img src="${t.strLeagueBadge}" alt="${t.strLeague}" width="36" height="36" style="object-fit: contain;" />
        </div>`:"",p=!s&&t.strHomeTeamBadge&&t.strAwayTeamBadge?`<div style="position: absolute; inset: 0; bottom: 2.25rem; z-index: 2; display: flex; align-items: center; justify-content: space-around; padding: 0 1.25rem;">
            <img src="${t.strHomeTeamBadge}" alt="${t.strHomeTeam}" width="88" height="88" style="object-fit: contain; filter: drop-shadow(0 3px 8px rgba(0,0,0,0.8));" />
            <img src="${t.strAwayTeamBadge}" alt="${t.strAwayTeam}" width="88" height="88" style="object-fit: contain; filter: drop-shadow(0 3px 8px rgba(0,0,0,0.8));" />
          </div>`:"";return`
      <div class="mobile-card match-mobile-card" style="flex: 0 0 85vw; max-width: 400px; border-radius: 12px; border: 2px solid ${e}; box-shadow: 0 0 20px ${o}; --hover-shadow: ${i}; overflow: hidden; cursor: pointer; scroll-snap-align: start; position: relative; aspect-ratio: 16/9; box-sizing: border-box; background: ${a};">
        ${r}
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.97) 100%); pointer-events: none; z-index: 1;"></div>
        ${l}
        ${p}
        ${y(t.strEvent,t.timeLocal,t.dateFormatted,t.labelColor,!0)}
      </div>`}function A(t){const e=t.strThumb||"";return`
      <div class="slider-card" style="flex: 0 0 33.333%; padding: 0 0.5rem; box-sizing: border-box;">
        <div class="match-inner-card" style="background: linear-gradient(135deg, #0f2744 0%, #1e3a5f 100%); border-radius: 14px; border: 1px solid var(--color-pill-bg); overflow: hidden; cursor: pointer; position: relative; aspect-ratio: 16/9; width: 100%;">
          ${e?`<img src="${e}" alt="${t.strEvent}" class="card-img" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; transition: transform 0.5s ease;" loading="lazy" />`:""}
          <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.97) 100%); pointer-events: none; z-index: 1;"></div>
          ${y(t.strEvent,t.timeLocal,t.dateFormatted,t.labelColor)}
        </div>
      </div>`}function I(t){const e=t.strThumb||"";return`
      <div class="mobile-card match-mobile-card" style="flex: 0 0 85vw; max-width: 400px; border-radius: 12px; background: linear-gradient(135deg, #0f2744 0%, #1e3a5f 100%); border: 1px solid var(--color-pill-bg); overflow: hidden; cursor: pointer; scroll-snap-align: start; position: relative; aspect-ratio: 16/9; box-sizing: border-box;">
        ${e?`<img src="${e}" alt="${t.strEvent}" class="card-img" style="position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; transition: transform 0.5s ease;" loading="lazy" />`:""}
        <div style="position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 45%, rgba(0,0,0,0.97) 100%); pointer-events: none; z-index: 1;"></div>
        ${y(t.strEvent,t.timeLocal,t.dateFormatted,t.labelColor,!0)}
      </div>`}async function S(){const t=document.querySelector('[data-carousel="deportes"]'),e=document.getElementById("deportes-track"),o=document.getElementById("deportes-mobile-track"),i=document.getElementById("deportes-dots");if(!(!e||!t))try{const a=await fetch("http://192.168.100.130:3000/api/sports");if(!a.ok)throw new Error("Network response was not ok");const r=await a.json(),s={ENE:1,FEB:2,MAR:3,ABR:4,MAY:5,JUN:6,JUL:7,AGO:8,SEP:9,OCT:10,NOV:11,DIC:12},l=n=>{const[g,c]=n.dateFormatted.split(" "),[u,x]=n.timeLocal.split(":");return(s[c]??0)*1e6+Number(g)*1e4+Number(u)*100+Number(x)},p=[...r.featured||[],...r.events||[]].sort((n,g)=>l(n)-l(g));e.innerHTML="",o&&(o.innerHTML=""),i&&(i.innerHTML="");const d=[];if(p.forEach(n=>{d.push(n.type?{desktop:C(n),mobile:M(n)}:{desktop:A(n),mobile:I(n)})}),d.length===0){e.innerHTML=`
          <div style="flex: 0 0 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; aspect-ratio: 16/9; color: var(--color-muted); gap: 0.5rem;">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
            <span style="font-size: 0.9375rem; font-weight: 500;">No hay partidos hoy</span>
          </div>`;return}d.forEach(({desktop:n,mobile:g},c)=>{e.insertAdjacentHTML("beforeend",n),o&&o.insertAdjacentHTML("beforeend",g),i&&i.insertAdjacentHTML("beforeend",`
            <button class="dot${c===0?" active":""}" data-index="${c}" aria-label="Ir a slide ${c+1}"
              style="width: 6px; height: 6px; border-radius: 9999px; border: none; background: var(--color-muted); cursor: pointer; padding: 0; transition: all 0.3s;"></button>`)}),k(t)}catch{e&&(e.innerHTML=`
          <div style="flex: 0 0 100%; display: flex; align-items: center; justify-content: center; aspect-ratio: 16/9; color: var(--color-muted); font-size: 0.875rem;">
            Error al cargar los partidos
          </div>`)}}const T=document.getElementById("ccc-go");if(T){const t=new IntersectionObserver(([e])=>{e.isIntersecting&&(t.disconnect(),S(),B())},{rootMargin:"400px"});t.observe(T)}
