import{A as e,At as t,Et as n,Ht as r,J as i,Ot as a,Rt as o,U as s,Ut as c,_ as l,d as u,ot as d,t as f,u as p,vt as m,zt as h}from"./three.module-DPGQKfeO.js";import{t as g}from"./GLTFLoader-wxuDuVif.js";var _={sunAzimuth:316,sunElevation:51,rain:0,snow:0,greenness:1},v=e=>Number.isFinite(e)?Math.max(0,Math.min(1,e)):0,y=[1.65,1.05,.42],b=`
varying vec3 vEnvironmentWorldPosition;
varying vec3 vEnvironmentWorldNormal;
`,ee=`
// transformedNormal already includes Three's instance normal matrix and skinning.
vEnvironmentWorldNormal = inverseTransformDirection(transformedNormal, viewMatrix);
vec4 environmentWorldPosition = vec4(transformed, 1.0);
#ifdef USE_BATCHING
  environmentWorldPosition = batchingMatrix * environmentWorldPosition;
#endif
#ifdef USE_INSTANCING
  environmentWorldPosition = instanceMatrix * environmentWorldPosition;
#endif
vEnvironmentWorldPosition = (modelMatrix * environmentWorldPosition).xyz;
`,te=`
uniform float environmentRain;
uniform float environmentSnow;
uniform float environmentGreenness;
`,ne=e=>{let t=e===`ground`?`clamp(vSurfaceWeights.x, 0.0, 1.0)`:e===`solid`?`0.0`:`1.0`,n=e===`foliage`?`0.58 + 0.42 * abs(environmentNormal.y)`:e===`grass`?`0.4 + 0.6 * abs(environmentNormal.y)`:`smoothstep(0.15, 0.7, environmentNormal.y)`;return`
float environmentVegetationMask = ${t};
float environmentLuminance = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
vec3 environmentDryColor = environmentLuminance * vec3(${y.join(`, `)});
diffuseColor.rgb = mix(diffuseColor.rgb, environmentDryColor,
  (1.0 - environmentGreenness) * environmentVegetationMask);

vec3 environmentNormal = normalize(vEnvironmentWorldNormal);
float environmentPatch = 0.5 + 0.5
  * sin(dot(vEnvironmentWorldPosition, vec3(0.87, 0.43, 0.63)))
  * sin(dot(vEnvironmentWorldPosition, vec3(0.31, 1.13, -0.47)));
float environmentSnowMask = environmentSnow * (${n}) * (0.86 + 0.14 * environmentPatch);

// Change RGB only: Three's existing alpha test still determines every leaf edge.
diffuseColor.rgb *= mix(1.0, 0.76, environmentRain * (1.0 - environmentSnowMask));
vec3 environmentSnowColor = vec3(0.83, 0.89, 0.94) * (0.9 + 0.1 * environmentLuminance);
diffuseColor.rgb = mix(diffuseColor.rgb, environmentSnowColor, environmentSnowMask);
roughnessFactor = mix(max(0.22, roughnessFactor * (1.0 - 0.48 * environmentRain)),
  0.94, environmentSnowMask);
`},re=()=>{let e={environmentRain:{value:_.rain},environmentSnow:{value:_.snow},environmentGreenness:{value:_.greenness}},t=new Map;return{decorate(n,r){if(t.has(n))return;let i=n.onBeforeCompile,a=n.customProgramCacheKey,o=a.call(n),s=(t,a)=>{i.call(n,t,a),Object.assign(t.uniforms,e),t.vertexShader=b+t.vertexShader.replace(`#include <project_vertex>`,`#include <project_vertex>\n${ee}`),t.fragmentShader=b+te+t.fragmentShader.replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>\n${ne(r)}`)},c=()=>`${o}|terrain-art-environment-v1:${r}`;n.onBeforeCompile=s,n.customProgramCacheKey=c,t.set(n,{previousCompile:i,previousCacheKey:a,compile:s,cacheKey:c}),n.needsUpdate=!0},setState(t){e.environmentRain.value=v(t.rain),e.environmentSnow.value=v(t.snow),e.environmentGreenness.value=v(t.greenness)},dispose(){for(let[e,n]of t)e.onBeforeCompile===n.compile&&(e.onBeforeCompile=n.previousCompile),e.customProgramCacheKey===n.cacheKey&&(e.customProgramCacheKey=n.previousCacheKey),e.needsUpdate=!0;t.clear()}}};function x(e,t,r){return e.wrapS=e.wrapT=n,e.colorSpace=t?a:``,e.anisotropy=Math.min(8,r),e}function S(e,t,n){let i=n.kind,a=n.kind===`reference-local`?n.waterLevel:0;if(i===`reference-local`&&!Number.isFinite(a))throw TypeError(`Reference water level must be finite`);let o=i===`reference-local`?`(1.0 - smoothstep(`+a.toFixed(2)+`, `+(a+.65).toFixed(2)+`, vTerrainPoint.y)) * vSurfaceWeights.w`:`0.0`,[s,c,l,u,p,m,h,g]=e,_=new d({map:s,normalMap:p,normalScale:new r(.45,.45),roughness:.94});return _.onBeforeCompile=e=>{Object.assign(e.uniforms,{terrainDirt:{value:c},terrainRock:{value:l},terrainSand:{value:u},terrainDirtNormal:{value:m},terrainRockNormal:{value:h},terrainSandNormal:{value:g}}),e.vertexShader=`attribute vec4 surfaceWeights; varying vec4 vSurfaceWeights; varying vec3 vTerrainPoint; varying vec3 vTerrainNormal;\n${e.vertexShader}`,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,i===`reference-local`?`#include <begin_vertex>
vSurfaceWeights = surfaceWeights; vTerrainPoint = position; vTerrainNormal = normal;`:`#include <begin_vertex>
vSurfaceWeights = surfaceWeights;`),i===`external-global`&&(e.vertexShader=e.vertexShader.replace(`#include <project_vertex>`,`#include <project_vertex>
vTerrainPoint = (modelMatrix * vec4(transformed, 1.0)).xyz; vTerrainNormal = inverseTransformDirection(transformedNormal, viewMatrix);`)),e.fragmentShader=`uniform sampler2D terrainDirt; uniform sampler2D terrainRock; uniform sampler2D terrainSand; uniform sampler2D terrainDirtNormal; uniform sampler2D terrainRockNormal; uniform sampler2D terrainSandNormal; varying vec4 vSurfaceWeights; varying vec3 vTerrainPoint; varying vec3 vTerrainNormal;\n${e.fragmentShader}`,e.fragmentShader=e.fragmentShader.replace(`#include <normal_fragment_maps>`,f.normal_fragment_maps.replace(`vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;`,`vec2 surfaceNormalUv = vTerrainPoint.xz / 6.0;
       vec3 normalTexel = texture2D(normalMap, surfaceNormalUv).xyz * vSurfaceWeights.x
         + texture2D(terrainDirtNormal, surfaceNormalUv * 0.85).xyz * vSurfaceWeights.y
         + texture2D(terrainRockNormal, surfaceNormalUv * 0.85).xyz * vSurfaceWeights.z
         + texture2D(terrainSandNormal, surfaceNormalUv * 0.65).xyz * vSurfaceWeights.w;
       vec3 mapN = normalize(normalTexel * 2.0 - 1.0);`)),e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`
      vec2 groundUv = vTerrainPoint.xz / 6.0;
      vec3 axisWeight = pow(abs(normalize(vTerrainNormal)), vec3(4.0));
      axisWeight /= max(dot(axisWeight, vec3(1.0)), 0.0001);
      vec3 stoneColor = texture2D(terrainRock, vTerrainPoint.zy / 7.0).rgb * axisWeight.x
        + texture2D(terrainRock, groundUv * 0.85).rgb * axisWeight.y
        + texture2D(terrainRock, vTerrainPoint.xy / 7.0).rgb * axisWeight.z;
      stoneColor = mix(stoneColor, vec3(dot(stoneColor, vec3(0.299, 0.587, 0.114))), 0.5) * vec3(0.94, 1.04, 1.13);
      vec3 grassColor = texture2D(map, groundUv).rgb * vec3(0.52, 0.72, 0.58);
      vec3 dirtColor = texture2D(terrainDirt, groundUv * 0.85).rgb;
      vec3 sandColor = texture2D(terrainSand, groundUv * 0.65).rgb * vec3(1.0, 1.08, 1.15);
      vec3 surfaceColor = grassColor * vSurfaceWeights.x + dirtColor * vSurfaceWeights.y
        + stoneColor * vSurfaceWeights.z + sandColor * vSurfaceWeights.w;
      float wetBank = ${o};
      diffuseColor.rgb *= surfaceColor * mix(1.0, 0.64, wetBank);
    `)},_.customProgramCacheKey=()=>i===`external-global`?`terrain-appearance-four-surfaces-v1:global:dry`:`terrain-art-four-surfaces-v2`+(a===.65?``:`:water:`+a),t.decorate(_,`ground`),_}function ie(){if(typeof createImageBitmap>`u`)return!1;let e=typeof navigator>`u`?``:navigator.userAgent;return!(/^((?!chrome|android).)*safari/i.test(e)&&Number(e.match(/Version\/(\d+)/)?.[1]??-1)<17||e.includes(`Firefox`)&&Number(e.match(/Firefox\/([0-9]+)\./)?.[1]??-1)<98)}var ae=class extends i{root;sources=new Map;bitmaps;images;constructor(t,n){super(t),this.root=n,this.bitmaps=ie()?new e(t):void 0,this.images=new h(t)}load(e,t,n,r){e===`${this.root}Leaves_TwistedTree_C.png`&&(e=`${this.root}Leaves_TwistedTree.png`);let i=this.sources.get(e);i||(i=this.bitmaps?this.bitmaps.loadAsync(e).then(e=>{let t=new o(e);return t.needsUpdate=!0,t}):this.images.loadAsync(e),this.sources.set(e,i),i.catch(()=>{this.sources.delete(e)}));let a=new o;return i.then(e=>{a.copy(e),t?.(a)},r),a}release(){this.sources.clear()}};function C(e,t){let n=t.endsWith(`/`)?t:`${t}/`,r=new ae(e,n),i=/(?:^|\/)(?:Bark_NormalTree(?:_Normal)?|Leaves_NormalTree_C|Leaf_Pine_C|Leaves_TwistedTree(?:_C)?|Rocks_Diffuse|Grass)\.png$/;e.addHandler(i,r);let a=new g(e),o=!1;return{async load(e){if(o)throw Error(`Nature asset loader has been disposed`);return(await a.loadAsync(`${n}${e}.gltf`)).scene},dispose(){o=!0,e.removeHandler(i),r.release()}}}var w=(e,t,n)=>Math.max(t,Math.min(n,e)),T=(e,t)=>Number.isFinite(e)?e:t,E=(e,t,n)=>{let r=w((n-e)/(t-e),0,1);return r*r*(3-2*r)};function D(e){return{sunAzimuth:(T(e.sunAzimuth,_.sunAzimuth)%360+360)%360,sunElevation:w(T(e.sunElevation,_.sunElevation),-90,90),rain:w(T(e.rain,_.rain),0,1),snow:w(T(e.snow,_.snow),0,1),greenness:w(T(e.greenness,_.greenness),0,1)}}function O(e,t,n){let r=e*Math.PI/180,i=t*Math.PI/180;return[n*Math.cos(i)*Math.sin(r),n*Math.sin(i),-n*Math.cos(i)*Math.cos(r)]}function k(e){let t=D(e),n=E(-12,18,t.sunElevation),r=w(t.rain*.78+t.snow*.3,0,1),i=E(-12,0,t.sunElevation)*(1-E(8,32,t.sunElevation));return{daylight:n,overcast:r,direct:E(0,10,t.sunElevation)*(1-t.rain*.82)*(1-t.snow*.35),exposure:(.72+n*.4)*(1-t.rain*.26),warmth:i*(1-r*.85)}}function oe(e){let t=new l(`#1e303c`).lerp(new l(`#e6e9da`),e.daylight);t.lerp(new l(`#f2b17c`),e.warmth*.82),t.lerp(new l(`#54636b`),e.overcast*e.daylight*.62);let n=new l(`#fff0cd`).lerp(new l(`#ff8838`),e.warmth),r=new l(`#647e9a`).lerp(new l(`#dcebef`),e.daylight);r.lerp(new l(`#ffd1a0`),e.warmth*.72),r.lerp(new l(`#a5b4c0`),e.overcast*.5);let i=new l(`#25303b`).lerp(new l(`#8a845c`),e.daylight);return i.lerp(new l(`#b77d57`),e.warmth*.55),{background:t,sun:n,sky:r,ground:i}}var A=.65,j={x:-22,z:-14},M=(e,t,n)=>{let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)},N=e=>({center:2+9*Math.sin(e*.065)+1.2*Math.sin(e*.2),width:2.35+.32*Math.sin(e*.13+.7)}),P=(e,t,n,r,i,a)=>Math.exp(-(((e-n)/i)**2)-((t-r)/a)**2),F=(e,t)=>{let n=N(t),r=Math.abs(e-n.center),i=.05+.025*Math.sin(t*.28);return r<=n.width?i+(A-i)*M(n.width*.45,n.width,r):A+(1.45+.24*Math.sin(e*.12)*Math.cos(t*.1)+.15*Math.sin((e+t)*.13)+.55*P(e,t,26,12,15,20)+(17*P(e,t,j.x,j.z,10,12)+6*P(e,t,-30,-5,8,10))-A)*M(n.width,n.width+3,r)},I=(e,t)=>{let n=N(t),r=F(e,t),i=(1-M(0,2.1,Math.max(0,Math.abs(e-n.center)-n.width)))*(1-M(1.35,2.75,r)),a=.35,o=Math.hypot((F(e+a,t)-F(e-a,t))/(2*a),(F(e,t+a)-F(e,t-a))/(2*a)),s=Math.min(1,.8*M(.45,1.3,o)+.75*M(7,14,r)),c=n.center-n.width-5.5-1.3*Math.sin(t*.16+.4),l=1-M(.55,1.35,Math.abs(e-c)),u=(1-i)*s,d=(1-i)*(1-s)*l;return[(1-i)*(1-s)*(1-l),d,u,i]};function L(e,t,n,r,i){return{azimuth:((e.azimuth+t/Math.max(1,r)*360)%360+360)%360,elevation:Math.max(-90,Math.min(90,e.elevation-n/Math.max(1,i)*180))}}function R(e,t){let[n,r,i]=O(e,t,1);return{x:128+n*72,y:112+i*24-r*70}}function z(e,t){return{x:128+e/40*50,y:112+t/32*25}}var B=z(j.x,j.z);function V(e={kind:`legacy`}){return`
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
        <g transform="translate(${B.x} ${B.y})">
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
    </svg>`}function H(e,t,n,r){e.innerHTML=V(r);let i=e.querySelector(`svg`),a=e.querySelector(`.sun-handle`),o=e.querySelector(`.sun-ray`),s={...t},c=null;function l(e){s={...e};let t=R(e.azimuth,e.elevation);a.setAttribute(`transform`,`translate(${t.x} ${t.y})`),a.setAttribute(`aria-label`,`Sol: azimut ${Math.round(e.azimuth)} grados, elevación ${Math.round(e.elevation)} grados. Usa las flechas para moverlo.`),i.dataset.night=String(e.elevation<0),o.setAttribute(`x2`,String(t.x)),o.setAttribute(`y2`,String(t.y))}function u(e){l(e),n({...e})}let d=e=>{if(e.button!==0)return;let t=i.getBoundingClientRect();c={pointer:e.pointerId,x:e.clientX,y:e.clientY,width:t.width,height:t.height,start:{...s}},i.setPointerCapture(e.pointerId),i.dataset.dragging=`true`,e.preventDefault()},f=e=>{c&&c.pointer===e.pointerId&&u(L(c.start,e.clientX-c.x,e.clientY-c.y,c.width,c.height))},p=e=>{c&&c.pointer===e.pointerId&&(c=null,delete i.dataset.dragging,i.hasPointerCapture(e.pointerId)&&i.releasePointerCapture(e.pointerId))},m=e=>{if(![`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`].includes(e.key))return;e.preventDefault();let t=e.shiftKey?10:1;u(L(s,e.key===`ArrowLeft`?-t:e.key===`ArrowRight`?t:0,e.key===`ArrowUp`?-t:e.key===`ArrowDown`?t:0,360,180))};return i.addEventListener(`pointerdown`,d),i.addEventListener(`pointermove`,f),i.addEventListener(`pointerup`,p),i.addEventListener(`pointercancel`,p),i.addEventListener(`lostpointercapture`,p),a.addEventListener(`keydown`,m),l(t),{sync:l,dispose(){c&&i.hasPointerCapture(c.pointer)&&i.releasePointerCapture(c.pointer),i.removeEventListener(`pointerdown`,d),i.removeEventListener(`pointermove`,f),i.removeEventListener(`pointerup`,p),i.removeEventListener(`pointercancel`,p),i.removeEventListener(`lostpointercapture`,p),a.removeEventListener(`keydown`,m),e.replaceChildren()}}}function U(e,t,n,r){e.innerHTML=`
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
    </details>`;let i=e.closest(`.environment-panel`);i&&(i.open=!window.matchMedia(`(max-width: 740px)`).matches);let a=t=>e.querySelector(t),o={...t},s=a(`#sun-azimuth`),c=a(`#sun-elevation`),l=a(`#rain`),u=a(`#snow`),d=a(`#greenness`),f=H(a(`.sun-widget-mount`),{azimuth:o.sunAzimuth,elevation:o.sunElevation},e=>m({...o,sunAzimuth:e.azimuth,sunElevation:e.elevation}),r);function p(e){o={...e};let t=e=>`${Math.round(e)}°`;s.value=String(e.sunAzimuth),c.value=String(e.sunElevation),a(`#sun-azimuth-value`).value=t(e.sunAzimuth),a(`#sun-elevation-value`).value=t(e.sunElevation),a(`#sun-phase`).value=e.sunElevation<0?`Bajo el horizonte · noche`:e.sunElevation<6?`En el horizonte`:`Sobre el horizonte`;for(let[t,n,r]of[[l,e.rain,`#rain-value`],[u,e.snow,`#snow-value`],[d,e.greenness,`#greenness-value`]]){let e=Math.round(n*100);t.value=String(e),a(r).value=`${e} %`,t.setAttribute(`aria-valuetext`,`${e} por ciento`)}f.sync({azimuth:e.sunAzimuth,elevation:e.sunElevation})}function m(e){p(e),n({...o})}let h=[[s,`sunAzimuth`,1],[c,`sunElevation`,1],[l,`rain`,100],[u,`snow`,100],[d,`greenness`,100]].map(([e,t,n])=>{let r=()=>m({...o,[t]:Number(e.value)/n});return e.addEventListener(`input`,r),()=>e.removeEventListener(`input`,r)}),g=a(`#reset-environment`),v=()=>m({..._});g.addEventListener(`click`,v);let y=new Intl.NumberFormat(`es-ES`,{maximumFractionDigits:0});return p(t),{sync:p,setStats(e){a(`#environment-frame-status`).textContent=e.idle?`En reposo`:e.fps===null?`— FPS`:`${Math.round(e.fps)} FPS`,a(`#environment-cpu`).textContent=`${e.cpuMs.toFixed(2)} ms`,a(`#environment-draw-calls`).textContent=y.format(e.drawCalls),a(`#environment-triangles`).textContent=y.format(e.triangles),a(`#environment-particles`).textContent=y.format(e.particles)},dispose(){h.forEach(e=>e()),g.removeEventListener(`click`,v),f.dispose(),e.replaceChildren()}}}function W(e,t,n){if(t.isEmpty())return;let r=e.shadow.camera;e.updateMatrixWorld(!0),e.target.updateMatrixWorld(!0),e.shadow.updateMatrices(e);let i=e.getWorldPosition(new c).sub(e.target.getWorldPosition(new c)).normalize(),a=new c,o=1/0,s=-1/0,l=1/0,u=-1/0,d=1/0,f=-1/0,p=-1/0;for(let e of[t.min.x,t.max.x])for(let c of[t.min.y,t.max.y])for(let m of[t.min.z,t.max.z])a.set(e,c,m).applyMatrix4(r.matrixWorldInverse),o=Math.min(o,a.x),s=Math.max(s,a.x),l=Math.min(l,a.y),u=Math.max(u,a.y),d=Math.min(d,-a.z),f=Math.max(f,-a.z),i.y>0&&(p=Math.max(p,-a.z+(c-n.min.y)/i.y));if(i.y>0&&!n.isEmpty()){let e=-1/0;for(let t of[n.min.x,n.max.x])for(let i of[n.min.z,n.max.z])a.set(t,n.min.y,i).applyMatrix4(r.matrixWorldInverse),e=Math.max(e,-a.z);f=Math.max(f,Math.min(p,e))}Object.assign(r,{left:o-2,right:s+2,bottom:l-2,top:u+2,near:Math.max(.1,d-2),far:f+2}),e.shadow.bias=-.08/(r.far-r.near),r.updateProjectionMatrix()}var G=4200,K=2200,q=40,J=32,Y=45,se={domain:{uMin:-40,uMax:q,vMin:-32,vMax:J},focus:{u:0,v:0},surfaceKey:Symbol(`legacy-precipitation-surface`)};function X({domain:e,focus:t}){if(![e.uMin,e.uMax,e.vMin,e.vMax,t.u,t.v].every(Number.isFinite)||e.uMin>=e.uMax||e.vMin>=e.vMax)throw RangeError(`Invalid precipitation domain or focus`);let n={uMin:Math.max(e.uMin,t.u-q),uMax:Math.min(e.uMax,t.u+q),vMin:Math.max(e.vMin,t.v-J),vMax:Math.min(e.vMax,t.v+J)};return n.uMin<n.uMax&&n.vMin<n.vMax?n:null}function ce(e,t){return e===t||e!==null&&t!==null&&e.uMin===t.uMin&&e.uMax===t.uMax&&e.vMin===t.vMin&&e.vMax===t.vMax}var Z=e=>Number.isFinite(e)?Math.max(0,Math.min(1,e)):0,le=e=>{let t=e>>>0;return()=>(t=Math.imul(1664525,t)+1013904223>>>0,t/4294967296)},Q=(e,t,n,r)=>{let i=le(t?1246883881:1908002325),a=t?2:1,o=new Float32Array(e*a*3),s=new Float32Array(o.length),c=t?new Float32Array(e*2):null,l=0;for(let u=0;r&&u<e;u+=1){let e=r.uMin+i()*(r.uMax-r.uMin),u=r.vMin+i()*(r.vMax-r.vMin),d=n(e,u),f=i(),p=t?26+i()*12:1.8+i()*1.7,m=t?.95+i()*.9:3.8+i()*2.8;if(d===void 0||!Number.isFinite(d))continue;let h=d+.06;for(let t=0;t<a;t+=1){let n=l*a+t;o.set([e,h,u],n*3),s.set([f,p,m],n*3),c&&(c[n]=t)}l+=1}let d=new u,f=l*a;return d.setAttribute(`position`,new p(o.slice(0,f*3),3)),d.setAttribute(`aParameters`,new p(s.slice(0,f*3),3)),c&&d.setAttribute(`aEnd`,new p(c.slice(0,f),1)),d.setDrawRange(0,0),d};function $(e,t){let n=Q(G,!0,e,t);try{return[n,Q(K,!1,e,t)]}catch(e){throw n.dispose(),e}}var ue=`
  uniform float uTime;
  attribute vec3 aParameters;
  attribute float aEnd;
  void main() {
    // Both ends recycle together, so a segment never stretches across the column.
    float fall = mod(aParameters.x * ${Y.toFixed(1)} - uTime * aParameters.y, ${Y.toFixed(1)});
    vec3 point = position;
    point.y += fall + aEnd * aParameters.z;
    point.x += aEnd * 0.08;
    point.z -= aEnd * 0.025;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(point, 1.0);
  }
`,de=`
  uniform float uLight;
  void main() {
    vec3 color = vec3(0.37, 0.49, 0.58) * (0.24 + 0.76 * uLight);
    gl_FragColor = vec4(color, 0.48);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,fe=`
  uniform float uTime;
  attribute vec3 aParameters;
  void main() {
    float fall = mod(aParameters.x * ${Y.toFixed(1)} - uTime * aParameters.y, ${Y.toFixed(1)});
    vec3 point = position;
    point.y += fall;
    vec4 viewPoint = modelViewMatrix * vec4(point, 1.0);
    gl_Position = projectionMatrix * viewPoint;
    float flutter = 0.9 + 0.1 * sin(uTime * 1.8 + aParameters.x * 6.283185);
    gl_PointSize = clamp(aParameters.z * flutter * 90.0 / max(35.0, -viewPoint.z), 2.8, 8.0);
  }
`,pe=`
  uniform float uLight;
  void main() {
    float radius = length(gl_PointCoord - vec2(0.5));
    float opacity = 1.0 - smoothstep(0.12, 0.5, radius);
    if (opacity < 0.03) discard;
    gl_FragColor = vec4(vec3(0.34 + 0.66 * uLight), opacity * 0.9);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,me=(e,n,r=se)=>{let i=X(r),a=r.surfaceKey,[o,c]=$(n,i),l={uTime:{value:0},uLight:{value:1}},u=new t({uniforms:l,vertexShader:ue,fragmentShader:de,transparent:!0,depthTest:!0,depthWrite:!1,toneMapped:!1}),d=new t({uniforms:l,vertexShader:fe,fragmentShader:pe,transparent:!0,depthTest:!0,depthWrite:!1,toneMapped:!1}),f=new s(o,u),p=new m(c,d);f.name=`terrain-art-rain`,p.name=`terrain-art-snow`,f.renderOrder=2,p.renderOrder=2,f.frustumCulled=!1,p.frustumCulled=!1,f.visible=!1,p.visible=!1,e.add(f,p);let h=!1,g=0,_=0,v=Object.freeze({rain:0,snow:0}),y=()=>{v=Object.freeze({rain:Math.ceil(g*f.geometry.getAttribute(`position`).count/2),snow:Math.ceil(_*p.geometry.getAttribute(`position`).count)}),f.geometry.setDrawRange(0,v.rain*2),p.geometry.setDrawRange(0,v.snow),f.visible=v.rain>0,p.visible=v.snow>0};return{setSurface(e){if(h)return!1;let t=X(e);if(Object.is(e.surfaceKey,a)&&ce(t,i))return!1;let[n,r]=$(e.floorAt,t),o=f.geometry,s=p.geometry;return f.geometry=n,p.geometry=r,i=t,a=e.surfaceKey,y(),o.dispose(),s.dispose(),!0},setAmounts(e,t){h||(g=Z(e),_=Z(t),y())},setLight(e){h||(l.uLight.value=Z(e))},update(e){!h&&(v.rain>0||v.snow>0)&&Number.isFinite(e)&&(l.uTime.value=Math.max(0,e))},get active(){return!h&&(v.rain>0||v.snow>0)},get counts(){return v},dispose(){h||(h=!0,v=Object.freeze({rain:0,snow:0}),f.visible=!1,p.visible=!1,f.geometry.setDrawRange(0,0),p.geometry.setDrawRange(0,0),e.remove(f,p),f.geometry.dispose(),p.geometry.dispose(),u.dispose(),d.dispose())}}};export{F as a,k as c,O as d,C as f,_ as g,re as h,A as i,oe as l,S as m,W as n,N as o,x as p,U as r,I as s,me as t,D as u};