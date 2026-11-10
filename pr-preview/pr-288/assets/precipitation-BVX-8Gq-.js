import{n as e}from"./rolldown-runtime-8BhlS34s.js";import{Wt as t,Yn as n,d as r,u as i,ut as a,v as o}from"./three.core-D_MC1HuL.js";import{r as s}from"./three.module-DaU68U-6.js";import{dt as c,ft as l}from"./environment-shadows-D9LxRyz4.js";import{i as u,t as d}from"./terrain-KKF2uGHj.js";function f(e){return{sunAzimuth:(_(e.sunAzimuth,c.sunAzimuth)%360+360)%360,sunElevation:g(_(e.sunElevation,c.sunElevation),-90,90),rain:g(_(e.rain,c.rain),0,1),snow:g(_(e.snow,c.snow),0,1),greenness:g(_(e.greenness,c.greenness),0,1)}}function p(e,t,n){let r=e*Math.PI/180,i=t*Math.PI/180;return[n*Math.cos(i)*Math.sin(r),n*Math.sin(i),-n*Math.cos(i)*Math.cos(r)]}function m(e){let t=f(e),n=v(-12,18,t.sunElevation),r=g(t.rain*.78+t.snow*.3,0,1),i=v(-12,0,t.sunElevation)*(1-v(8,32,t.sunElevation));return{daylight:n,overcast:r,direct:v(0,10,t.sunElevation)*(1-t.rain*.82)*(1-t.snow*.35),exposure:(.72+n*.4)*(1-t.rain*.26),warmth:i*(1-r*.85)}}function h(e){let t=new o(`#1e303c`).lerp(new o(`#e6e9da`),e.daylight);t.lerp(new o(`#f2b17c`),e.warmth*.82),t.lerp(new o(`#54636b`),e.overcast*e.daylight*.62);let n=new o(`#fff0cd`).lerp(new o(`#ff8838`),e.warmth),r=new o(`#647e9a`).lerp(new o(`#dcebef`),e.daylight);r.lerp(new o(`#ffd1a0`),e.warmth*.72),r.lerp(new o(`#a5b4c0`),e.overcast*.5);let i=new o(`#25303b`).lerp(new o(`#8a845c`),e.daylight);return i.lerp(new o(`#b77d57`),e.warmth*.55),{background:t,sun:n,sky:r,ground:i}}var g,_,v;function y(){return(y=e((()=>{s(),l(),g=(e,t,n)=>Math.max(t,Math.min(n,e)),_=(e,t)=>Number.isFinite(e)?e:t,v=(e,t,n)=>{let r=g((n-e)/(t-e),0,1);return r*r*(3-2*r)}})))()}function b(e,t,n,r,i){return{azimuth:((e.azimuth+t/Math.max(1,r)*360)%360+360)%360,elevation:Math.max(-90,Math.min(90,e.elevation-n/Math.max(1,i)*180))}}function x(e,t){let[n,r,i]=p(e,t,1);return{x:128+n*72,y:112+i*24-r*70}}function S(e,t){return{x:128+e/40*50,y:112+t/32*25}}function C(e={kind:`legacy`}){return`
    <svg class="sun-widget" viewBox="0 0 256 204" aria-label="Sol sobre un mapa de referencia">
      <defs>
        <radialGradient id="sun-sphere-fill" cx="32%" cy="28%" r="75%">
          <stop offset="0" stop-color="#fff5c3"/><stop offset=".45" stop-color="#e9be65"/>
          <stop offset="1" stop-color="#bc7940"/>
        </radialGradient>
      </defs>
      <ellipse class="sun-sky-outline" cx="128" cy="112" rx="72" ry="70"/>
      <ellipse class="sun-horizon" cx="128" cy="112" rx="72" ry="24"/>
      <path class="sun-meridian" d="M128 42 C87 64 87 160 128 182 C169 160 169 64 128 42"/>
      <g class="mini-map" aria-hidden="true">
        <path class="mini-map-edge" d="M78 114 128 89 178 114 178 120 128 145 78 120Z"/>
        <path class="mini-map-ground" d="M78 114 128 89 178 114 128 139Z"/>
        <path class="mini-map-grid" d="m90.5 107.75 50 25 m-37.5-31.25 50 25 m-37.5-31.25 50 25 M90.5 120.25l50-25 m-37.5 31.25 50-25 m-37.5 31.25 50-25"/>
        ${e.kind===`legacy`?`
        <path class="mini-map-river" d="M128 92c-12 10 17 8 5 18s-1 13-8 26"/>
        <g transform="translate(${T.x} ${T.y})">
          <path class="mini-map-mountain" d="m-11 6 11-16 12 17-10-5-6 8Z"/>
          <path class="mini-map-peak" d="m-4-4 4-6 5 7-5-2Z"/>
        </g>
        <path class="mini-map-forest" d="m145 111 4-10 4 10Zm10 5 4-10 4 10Zm-14 8 4-10 4 10Z"/>`:``}
      </g>
      <g class="sun-cardinals" aria-hidden="true"><text x="128" y="81">N</text><text x="210" y="115">E</text><text x="128" y="151">S</text><text x="46" y="115">O</text></g>
      <line class="sun-ray" x1="128" y1="112"/>
      <g class="sun-handle" tabindex="0" role="button" aria-label="Mover el sol con las flechas">
        <circle class="sun-hit-area" r="19"/><circle class="sun-halo" r="16"/>
        <circle class="sun-ball" r="10" fill="url(#sun-sphere-fill)"/>
        <circle class="sun-highlight" cx="-3" cy="-3" r="2"/>
      </g>
      <text class="mini-map-caption" x="128" y="199">${e.kind===`legacy`?`MAPA COMPLETO · REFERENCIA`:`DOMINIO EXTERNO · SIN MAPA`}</text>
    </svg>`}function w(e,t,n,r){e.innerHTML=C(r);let i=e.querySelector(`svg`),a=e.querySelector(`.sun-handle`),o=e.querySelector(`.sun-ray`),s={...t},c=null;function l(e){s={...e};let t=x(e.azimuth,e.elevation);a.setAttribute(`transform`,`translate(${t.x} ${t.y})`),a.setAttribute(`aria-label`,`Sol: azimut ${Math.round(e.azimuth)} grados, elevación ${Math.round(e.elevation)} grados. Usa las flechas para moverlo.`),i.dataset.night=String(e.elevation<0),o.setAttribute(`x2`,String(t.x)),o.setAttribute(`y2`,String(t.y))}function u(e){l(e),n({...e})}let d=e=>{if(e.button!==0)return;let t=i.getBoundingClientRect();c={pointer:e.pointerId,x:e.clientX,y:e.clientY,width:t.width,height:t.height,start:{...s}},i.setPointerCapture(e.pointerId),i.dataset.dragging=`true`,e.preventDefault()},f=e=>{c&&c.pointer===e.pointerId&&u(b(c.start,e.clientX-c.x,e.clientY-c.y,c.width,c.height))},p=e=>{c&&c.pointer===e.pointerId&&(c=null,delete i.dataset.dragging,i.hasPointerCapture(e.pointerId)&&i.releasePointerCapture(e.pointerId))},m=e=>{if(![`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`].includes(e.key))return;e.preventDefault();let t=e.shiftKey?10:1;u(b(s,e.key===`ArrowLeft`?-t:e.key===`ArrowRight`?t:0,e.key===`ArrowUp`?-t:e.key===`ArrowDown`?t:0,360,180))};return i.addEventListener(`pointerdown`,d),i.addEventListener(`pointermove`,f),i.addEventListener(`pointerup`,p),i.addEventListener(`pointercancel`,p),i.addEventListener(`lostpointercapture`,p),a.addEventListener(`keydown`,m),l(t),{sync:l,dispose(){c&&i.hasPointerCapture(c.pointer)&&i.releasePointerCapture(c.pointer),i.removeEventListener(`pointerdown`,d),i.removeEventListener(`pointermove`,f),i.removeEventListener(`pointerup`,p),i.removeEventListener(`pointercancel`,p),i.removeEventListener(`lostpointercapture`,p),a.removeEventListener(`keydown`,m),e.replaceChildren()}}}var T;function E(){return(E=e((()=>{y(),u(),T=S(d.x,d.z)})))()}function D(e,t,n,r){e.innerHTML=`
    <section class="sun-section" aria-labelledby="sun-title">
      <div class="control-section-title"><h2 id="sun-title">Posición del sol</h2><output id="sun-phase"></output></div>
      <div class="sun-widget-mount"></div>
      <p class="control-caption sun-instruction">Arrastra la esfera · flechas al enfocarla</p>
      <div class="angle-controls">
        <label class="environment-range" for="sun-azimuth"><span>Azimut <output id="sun-azimuth-value" for="sun-azimuth"></output></span><input id="sun-azimuth" type="range" min="0" max="360" step="1" /></label>
        <label class="environment-range" for="sun-elevation"><span>Elevación <output id="sun-elevation-value" for="sun-elevation"></output></span><input id="sun-elevation" type="range" min="-90" max="90" step="1" /></label>
      </div>
    </section>
    <section class="weather-section" aria-label="Clima y color de la vegetación">
      <label class="environment-range" for="rain"><span>Lluvia <output id="rain-value" for="rain"></output></span><input id="rain" type="range" min="0" max="100" step="1" /></label>
      <label class="environment-range" for="snow"><span>Nieve <output id="snow-value" for="snow"></output></span><input id="snow" type="range" min="0" max="100" step="1" aria-describedby="snow-caption" /></label>
      <p id="snow-caption" class="control-caption">Cobertura de superficies y densidad de copos.</p>
      <label class="environment-range greenness-range" for="greenness"><span>Verdor <output id="greenness-value" for="greenness"></output></span><input id="greenness" type="range" min="0" max="100" step="1" /></label>
      <div class="range-endpoints" aria-hidden="true"><span>Marrón</span><span>Verde</span></div>
    </section>
    <div class="environment-actions"><button id="reset-environment" type="button">Restablecer ambiente <span aria-hidden="true">↺</span></button></div>
    <details class="performance-details"><summary>Coste de la escena <span id="environment-frame-status">—</span></summary>
      <dl class="performance-stats">
        <div><dt>CPU · actualización/envío</dt><dd id="environment-cpu">—</dd></div>
        <div><dt>Llamadas de dibujo</dt><dd id="environment-draw-calls">—</dd></div>
        <div><dt>Triángulos</dt><dd id="environment-triangles">—</dd></div>
        <div><dt>Partículas</dt><dd id="environment-particles">—</dd></div>
      </dl><p class="control-caption">CPU de actualización y envío, sin medir la GPU. Compara ajustes en este equipo.</p>
    </details>`;let i=e.closest(`.environment-panel`);i&&(i.open=!window.matchMedia(`(max-width: 740px)`).matches);let a=t=>e.querySelector(t),o={...t},s=a(`#sun-azimuth`),l=a(`#sun-elevation`),u=a(`#rain`),d=a(`#snow`),f=a(`#greenness`),p=w(a(`.sun-widget-mount`),{azimuth:o.sunAzimuth,elevation:o.sunElevation},e=>h({...o,sunAzimuth:e.azimuth,sunElevation:e.elevation}),r);function m(e){o={...e};let t=e=>`${Math.round(e)}°`;s.value=String(e.sunAzimuth),l.value=String(e.sunElevation),a(`#sun-azimuth-value`).value=t(e.sunAzimuth),a(`#sun-elevation-value`).value=t(e.sunElevation),a(`#sun-phase`).value=e.sunElevation<0?`Bajo el horizonte · noche`:e.sunElevation<6?`En el horizonte`:`Sobre el horizonte`;for(let[t,n,r]of[[u,e.rain,`#rain-value`],[d,e.snow,`#snow-value`],[f,e.greenness,`#greenness-value`]]){let e=Math.round(n*100);t.value=String(e),a(r).value=`${e} %`,t.setAttribute(`aria-valuetext`,`${e} por ciento`)}p.sync({azimuth:e.sunAzimuth,elevation:e.sunElevation})}function h(e){m(e),n({...o})}let g=[[s,`sunAzimuth`,1],[l,`sunElevation`,1],[u,`rain`,100],[d,`snow`,100],[f,`greenness`,100]].map(([e,t,n])=>{let r=()=>h({...o,[t]:Number(e.value)/n});return e.addEventListener(`input`,r),()=>e.removeEventListener(`input`,r)}),_=a(`#reset-environment`),v=()=>h({...c});_.addEventListener(`click`,v);let y=new Intl.NumberFormat(`es-ES`,{maximumFractionDigits:0});return m(t),{sync:m,setStats(e){a(`#environment-frame-status`).textContent=e.idle?`En reposo`:e.fps===null?`— FPS`:`${Math.round(e.fps)} FPS`,a(`#environment-cpu`).textContent=`${e.cpuMs.toFixed(2)} ms`,a(`#environment-draw-calls`).textContent=y.format(e.drawCalls),a(`#environment-triangles`).textContent=y.format(e.triangles),a(`#environment-particles`).textContent=y.format(e.particles)},dispose(){g.forEach(e=>e()),_.removeEventListener(`click`,v),p.dispose(),e.replaceChildren()}}}function O(){return(O=e((()=>{l(),E()})))()}function k({domain:e,focus:t}){if(![e.uMin,e.uMax,e.vMin,e.vMax,t.u,t.v].every(Number.isFinite)||e.uMin>=e.uMax||e.vMin>=e.vMax)throw RangeError(`Invalid precipitation domain or focus`);let n={uMin:Math.max(e.uMin,t.u-P),uMax:Math.min(e.uMax,t.u+P),vMin:Math.max(e.vMin,t.v-F),vMax:Math.min(e.vMax,t.v+F)};return n.uMin<n.uMax&&n.vMin<n.vMax?n:null}function A(e,t){return e===t||e!==null&&t!==null&&e.uMin===t.uMin&&e.uMax===t.uMax&&e.vMin===t.vMin&&e.vMax===t.vMax}function j(e,t){let n=B(M,!0,e,t);try{return[n,B(N,!1,e,t)]}catch(e){throw n.dispose(),e}}var M,N,P,F,I,L,R,z,B,V,H,U,W,G;function K(){return(K=e((()=>{s(),M=4200,N=2200,P=40,F=32,I=45,L={domain:{uMin:-40,uMax:P,vMin:-32,vMax:F},focus:{u:0,v:0},surfaceKey:Symbol(`legacy-precipitation-surface`)},R=e=>Number.isFinite(e)?Math.max(0,Math.min(1,e)):0,z=e=>{let t=e>>>0;return()=>(t=Math.imul(1664525,t)+1013904223>>>0,t/4294967296)},B=(e,t,n,a)=>{let o=z(t?1246883881:1908002325),s=t?2:1,c=new Float32Array(e*s*3),l=new Float32Array(c.length),u=t?new Float32Array(e*2):null,d=0;for(let r=0;a&&r<e;r+=1){let e=a.uMin+o()*(a.uMax-a.uMin),r=a.vMin+o()*(a.vMax-a.vMin),i=n(e,r),f=o(),p=t?26+o()*12:1.8+o()*1.7,m=t?.95+o()*.9:3.8+o()*2.8;if(i===void 0||!Number.isFinite(i))continue;let h=i+.06;for(let t=0;t<s;t+=1){let n=d*s+t;c.set([e,h,r],n*3),l.set([f,p,m],n*3),u&&(u[n]=t)}d+=1}let f=new r,p=d*s;return f.setAttribute(`position`,new i(c.slice(0,p*3),3)),f.setAttribute(`aParameters`,new i(l.slice(0,p*3),3)),u&&f.setAttribute(`aEnd`,new i(u.slice(0,p),1)),f.setDrawRange(0,0),f},V=`
  uniform float uTime;
  attribute vec3 aParameters;
  attribute float aEnd;
  void main() {
    // Both ends recycle together, so a segment never stretches across the column.
    float fall = mod(aParameters.x * ${I.toFixed(1)} - uTime * aParameters.y, ${I.toFixed(1)});
    vec3 point = position;
    point.y += fall + aEnd * aParameters.z;
    point.x += aEnd * 0.08;
    point.z -= aEnd * 0.025;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(point, 1.0);
  }
`,H=`
  uniform float uLight;
  void main() {
    vec3 color = vec3(0.37, 0.49, 0.58) * (0.24 + 0.76 * uLight);
    gl_FragColor = vec4(color, 0.48);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,U=`
  uniform float uTime;
  attribute vec3 aParameters;
  void main() {
    float fall = mod(aParameters.x * ${I.toFixed(1)} - uTime * aParameters.y, ${I.toFixed(1)});
    vec3 point = position;
    point.y += fall;
    vec4 viewPoint = modelViewMatrix * vec4(point, 1.0);
    gl_Position = projectionMatrix * viewPoint;
    float flutter = 0.9 + 0.1 * sin(uTime * 1.8 + aParameters.x * 6.283185);
    gl_PointSize = clamp(aParameters.z * flutter * 90.0 / max(35.0, -viewPoint.z), 2.8, 8.0);
  }
`,W=`
  uniform float uLight;
  void main() {
    float radius = length(gl_PointCoord - vec2(0.5));
    float opacity = 1.0 - smoothstep(0.12, 0.5, radius);
    if (opacity < 0.03) discard;
    gl_FragColor = vec4(vec3(0.34 + 0.66 * uLight), opacity * 0.9);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,G=(e,r,i=L)=>{let o=k(i),s=i.surfaceKey,[c,l]=j(r,o),u={uTime:{value:0},uLight:{value:1}},d=new n({uniforms:u,vertexShader:V,fragmentShader:H,transparent:!0,depthTest:!0,depthWrite:!1,toneMapped:!1}),f=new n({uniforms:u,vertexShader:U,fragmentShader:W,transparent:!0,depthTest:!0,depthWrite:!1,toneMapped:!1}),p=new a(c,d),m=new t(l,f);p.name=`terrain-art-rain`,m.name=`terrain-art-snow`,p.renderOrder=2,m.renderOrder=2,p.frustumCulled=!1,m.frustumCulled=!1,p.visible=!1,m.visible=!1,e.add(p,m);let h=!1,g=0,_=0,v=Object.freeze({rain:0,snow:0}),y=()=>{v=Object.freeze({rain:Math.ceil(g*p.geometry.getAttribute(`position`).count/2),snow:Math.ceil(_*m.geometry.getAttribute(`position`).count)}),p.geometry.setDrawRange(0,v.rain*2),m.geometry.setDrawRange(0,v.snow),p.visible=v.rain>0,m.visible=v.snow>0};return{setSurface(e){if(h)return!1;let t=k(e);if(Object.is(e.surfaceKey,s)&&A(t,o))return!1;let[n,r]=j(e.floorAt,t),i=p.geometry,a=m.geometry;return p.geometry=n,m.geometry=r,o=t,s=e.surfaceKey,y(),i.dispose(),a.dispose(),!0},setAmounts(e,t){h||(g=R(e),_=R(t),y())},setLight(e){h||(u.uLight.value=R(e))},update(e){!h&&(v.rain>0||v.snow>0)&&Number.isFinite(e)&&(u.uTime.value=Math.max(0,e))},get active(){return!h&&(v.rain>0||v.snow>0)},get counts(){return v},dispose(){h||(h=!0,v=Object.freeze({rain:0,snow:0}),p.visible=!1,m.visible=!1,p.geometry.setDrawRange(0,0),m.geometry.setDrawRange(0,0),e.remove(p,m),p.geometry.dispose(),m.geometry.dispose(),d.dispose(),f.dispose())}}}})))()}export{y as a,f as c,D as i,p as l,K as n,m as o,O as r,h as s,G as t};