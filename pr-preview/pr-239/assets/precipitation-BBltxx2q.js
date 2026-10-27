import{Bt as e,Dt as t,Ut as n,W as r,Wt as i,Y as a,d as o,f as s,j as c,jt as l,kt as u,r as d,st as f,t as p,v as m,yt as h,zt as g}from"./three.module-B0arsMe3.js";import{n as _,t as v}from"./GLTFLoader-BK4ATeWl.js";import{n as y}from"./rolldown-runtime-8BhlS34s.js";var b;function x(){return(x=y((()=>{b={sunAzimuth:316,sunElevation:51,rain:0,snow:0,greenness:1}})))()}var S,C,w,T,E,D,O;function k(){return(k=y((()=>{x(),S=e=>Number.isFinite(e)?Math.max(0,Math.min(1,e)):0,C=[1.65,1.05,.42],w=`
varying vec3 vEnvironmentWorldPosition;
varying vec3 vEnvironmentWorldNormal;
`,T=`
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
`,E=`
uniform float environmentRain;
uniform float environmentSnow;
uniform float environmentGreenness;
`,D=e=>{let t=e===`ground`?`clamp(vSurfaceWeights.x, 0.0, 1.0)`:e===`solid`?`0.0`:`1.0`,n=e===`foliage`?`0.58 + 0.42 * abs(environmentNormal.y)`:e===`grass`?`0.4 + 0.6 * abs(environmentNormal.y)`:`smoothstep(0.15, 0.7, environmentNormal.y)`;return`
float environmentVegetationMask = ${t};
float environmentLuminance = dot(diffuseColor.rgb, vec3(0.2126, 0.7152, 0.0722));
vec3 environmentDryColor = environmentLuminance * vec3(${C.join(`, `)});
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
`},O=()=>{let e={environmentRain:{value:b.rain},environmentSnow:{value:b.snow},environmentGreenness:{value:b.greenness}},t=new Map;return{decorate(n,r){if(t.has(n))return;let i=n.onBeforeCompile,a=n.customProgramCacheKey,o=a.call(n),s=(t,a)=>{i.call(n,t,a),Object.assign(t.uniforms,e),t.vertexShader=w+t.vertexShader.replace(`#include <project_vertex>`,`#include <project_vertex>\n${T}`),t.fragmentShader=w+E+t.fragmentShader.replace(`#include <roughnessmap_fragment>`,`#include <roughnessmap_fragment>\n${D(r)}`)},c=()=>`${o}|terrain-art-environment-v1:${r}`;n.onBeforeCompile=s,n.customProgramCacheKey=c,t.set(n,{previousCompile:i,previousCacheKey:a,compile:s,cacheKey:c}),n.needsUpdate=!0},setState(t){e.environmentRain.value=S(t.rain),e.environmentSnow.value=S(t.snow),e.environmentGreenness.value=S(t.greenness)},dispose(){for(let[e,n]of t)e.onBeforeCompile===n.compile&&(e.onBeforeCompile=n.previousCompile),e.customProgramCacheKey===n.cacheKey&&(e.customProgramCacheKey=n.previousCacheKey),e.needsUpdate=!0;t.clear()}}}})))()}function ee(e,n,r){return e.wrapS=e.wrapT=t,e.colorSpace=n?u:``,e.anisotropy=Math.min(8,r),e}function te(e,t,r){let i=r.kind,a=r.kind===`reference-local`?r.waterLevel:0;if(i===`reference-local`&&!Number.isFinite(a))throw TypeError(`Reference water level must be finite`);let o=i===`reference-local`?`(1.0 - smoothstep(`+a.toFixed(2)+`, `+(a+.65).toFixed(2)+`, vTerrainPoint.y)) * vSurfaceWeights.w`:`0.0`,[s,c,l,u,d,m,h,g]=e,_=new f({map:s,normalMap:d,normalScale:new n(.45,.45),roughness:.94});return _.onBeforeCompile=e=>{Object.assign(e.uniforms,{terrainDirt:{value:c},terrainRock:{value:l},terrainSand:{value:u},terrainDirtNormal:{value:m},terrainRockNormal:{value:h},terrainSandNormal:{value:g}}),e.vertexShader=`attribute vec4 surfaceWeights; varying vec4 vSurfaceWeights; varying vec3 vTerrainPoint; varying vec3 vTerrainNormal;\n${e.vertexShader}`,e.vertexShader=e.vertexShader.replace(`#include <begin_vertex>`,i===`reference-local`?`#include <begin_vertex>
vSurfaceWeights = surfaceWeights; vTerrainPoint = position; vTerrainNormal = normal;`:`#include <begin_vertex>
vSurfaceWeights = surfaceWeights;`),i===`external-global`&&(e.vertexShader=e.vertexShader.replace(`#include <project_vertex>`,`#include <project_vertex>
vTerrainPoint = (modelMatrix * vec4(transformed, 1.0)).xyz; vTerrainNormal = inverseTransformDirection(transformedNormal, viewMatrix);`)),e.fragmentShader=`uniform sampler2D terrainDirt; uniform sampler2D terrainRock; uniform sampler2D terrainSand; uniform sampler2D terrainDirtNormal; uniform sampler2D terrainRockNormal; uniform sampler2D terrainSandNormal; varying vec4 vSurfaceWeights; varying vec3 vTerrainPoint; varying vec3 vTerrainNormal;\n${e.fragmentShader}`,e.fragmentShader=e.fragmentShader.replace(`#include <normal_fragment_maps>`,p.normal_fragment_maps.replace(`vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;`,`vec2 surfaceNormalUv = vTerrainPoint.xz / 6.0;
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
    `)},_.customProgramCacheKey=()=>i===`external-global`?`terrain-appearance-four-surfaces-v1:global:dry`:`terrain-art-four-surfaces-v2`+(a===.65?``:`:water:`+a),t.decorate(_,`ground`),_}function A(){return(A=y((()=>{d()})))()}function ne(){if(typeof createImageBitmap>`u`)return!1;let e=typeof navigator>`u`?``:navigator.userAgent;return!(/^((?!chrome|android).)*safari/i.test(e)&&Number(e.match(/Version\/(\d+)/)?.[1]??-1)<17||e.includes(`Firefox`)&&Number(e.match(/Firefox\/([0-9]+)\./)?.[1]??-1)<98)}function re(e,t){let n=t.endsWith(`/`)?t:`${t}/`,r=new ie(e,n),i=/(?:^|\/)(?:Bark_NormalTree(?:_Normal)?|Leaves_NormalTree_C|Leaf_Pine_C|Leaves_TwistedTree(?:_C)?|Rocks_Diffuse|Grass)\.png$/;e.addHandler(i,r);let a=new v(e),o=!1;return{async load(e){if(o)throw Error(`Nature asset loader has been disposed`);return(await a.loadAsync(`${n}${e}.gltf`)).scene},dispose(){o=!0,e.removeHandler(i),r.release()}}}var ie;function ae(){return(ae=y((()=>{d(),_(),ie=class extends a{root;sources=new Map;bitmaps;images;constructor(t,n){super(t),this.root=n,this.bitmaps=ne()?new c(t):void 0,this.images=new e(t)}load(e,t,n,r){e===`${this.root}Leaves_TwistedTree_C.png`&&(e=`${this.root}Leaves_TwistedTree.png`);let i=this.sources.get(e);i||(i=this.bitmaps?this.bitmaps.loadAsync(e).then(e=>{let t=new g(e);return t.needsUpdate=!0,t}):this.images.loadAsync(e),this.sources.set(e,i),i.catch(()=>{this.sources.delete(e)}));let a=new g;return i.then(e=>{a.copy(e),t?.(a)},r),a}release(){this.sources.clear()}}})))()}function j(e){return{sunAzimuth:(N(e.sunAzimuth,b.sunAzimuth)%360+360)%360,sunElevation:M(N(e.sunElevation,b.sunElevation),-90,90),rain:M(N(e.rain,b.rain),0,1),snow:M(N(e.snow,b.snow),0,1),greenness:M(N(e.greenness,b.greenness),0,1)}}function oe(e,t,n){let r=e*Math.PI/180,i=t*Math.PI/180;return[n*Math.cos(i)*Math.sin(r),n*Math.sin(i),-n*Math.cos(i)*Math.cos(r)]}function se(e){let t=j(e),n=P(-12,18,t.sunElevation),r=M(t.rain*.78+t.snow*.3,0,1),i=P(-12,0,t.sunElevation)*(1-P(8,32,t.sunElevation));return{daylight:n,overcast:r,direct:P(0,10,t.sunElevation)*(1-t.rain*.82)*(1-t.snow*.35),exposure:(.72+n*.4)*(1-t.rain*.26),warmth:i*(1-r*.85)}}function ce(e){let t=new m(`#1e303c`).lerp(new m(`#e6e9da`),e.daylight);t.lerp(new m(`#f2b17c`),e.warmth*.82),t.lerp(new m(`#54636b`),e.overcast*e.daylight*.62);let n=new m(`#fff0cd`).lerp(new m(`#ff8838`),e.warmth),r=new m(`#647e9a`).lerp(new m(`#dcebef`),e.daylight);r.lerp(new m(`#ffd1a0`),e.warmth*.72),r.lerp(new m(`#a5b4c0`),e.overcast*.5);let i=new m(`#25303b`).lerp(new m(`#8a845c`),e.daylight);return i.lerp(new m(`#b77d57`),e.warmth*.55),{background:t,sun:n,sky:r,ground:i}}var M,N,P;function F(){return(F=y((()=>{d(),x(),M=(e,t,n)=>Math.max(t,Math.min(n,e)),N=(e,t)=>Number.isFinite(e)?e:t,P=(e,t,n)=>{let r=M((n-e)/(t-e),0,1);return r*r*(3-2*r)}})))()}var I,L,R,z,B,V,H;function U(){return(U=y((()=>{I=.65,L={x:-22,z:-14},R=(e,t,n)=>{let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)},z=e=>({center:2+9*Math.sin(e*.065)+1.2*Math.sin(e*.2),width:2.35+.32*Math.sin(e*.13+.7)}),B=(e,t,n,r,i,a)=>Math.exp(-(((e-n)/i)**2)-((t-r)/a)**2),V=(e,t)=>{let n=z(t),r=Math.abs(e-n.center),i=.05+.025*Math.sin(t*.28);if(r<=n.width)return i+(I-i)*R(n.width*.45,n.width,r);let a=1.45+.24*Math.sin(e*.12)*Math.cos(t*.1)+.15*Math.sin((e+t)*.13)+.55*B(e,t,26,12,15,20),o=17*B(e,t,L.x,L.z,10,12)+6*B(e,t,-30,-5,8,10);return I+(a+o-I)*R(n.width,n.width+3,r)},H=(e,t)=>{let n=z(t),r=V(e,t),i=Math.max(0,Math.abs(e-n.center)-n.width),a=(1-R(0,2.1,i))*(1-R(1.35,2.75,r)),o=.35,s=Math.hypot((V(e+o,t)-V(e-o,t))/(2*o),(V(e,t+o)-V(e,t-o))/(2*o)),c=Math.min(1,.8*R(.45,1.3,s)+.75*R(7,14,r)),l=n.center-n.width-5.5-1.3*Math.sin(t*.16+.4),u=1-R(.55,1.35,Math.abs(e-l)),d=(1-a)*c,f=(1-a)*(1-c)*u;return[(1-a)*(1-c)*(1-u),f,d,a]}})))()}function W(e,t,n,r,i){return{azimuth:((e.azimuth+t/Math.max(1,r)*360)%360+360)%360,elevation:Math.max(-90,Math.min(90,e.elevation-n/Math.max(1,i)*180))}}function le(e,t){let[n,r,i]=oe(e,t,1);return{x:128+n*72,y:112+i*24-r*70}}function ue(e,t){return{x:128+e/40*50,y:112+t/32*25}}function de(e={kind:`legacy`}){return`
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
        <g transform="translate(${G.x} ${G.y})">
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
    </svg>`}function fe(e,t,n,r){e.innerHTML=de(r);let i=e.querySelector(`svg`),a=e.querySelector(`.sun-handle`),o=e.querySelector(`.sun-ray`),s={...t},c=null;function l(e){s={...e};let t=le(e.azimuth,e.elevation);a.setAttribute(`transform`,`translate(${t.x} ${t.y})`),a.setAttribute(`aria-label`,`Sol: azimut ${Math.round(e.azimuth)} grados, elevación ${Math.round(e.elevation)} grados. Usa las flechas para moverlo.`),i.dataset.night=String(e.elevation<0),o.setAttribute(`x2`,String(t.x)),o.setAttribute(`y2`,String(t.y))}function u(e){l(e),n({...e})}let d=e=>{if(e.button!==0)return;let t=i.getBoundingClientRect();c={pointer:e.pointerId,x:e.clientX,y:e.clientY,width:t.width,height:t.height,start:{...s}},i.setPointerCapture(e.pointerId),i.dataset.dragging=`true`,e.preventDefault()},f=e=>{c&&c.pointer===e.pointerId&&u(W(c.start,e.clientX-c.x,e.clientY-c.y,c.width,c.height))},p=e=>{c&&c.pointer===e.pointerId&&(c=null,delete i.dataset.dragging,i.hasPointerCapture(e.pointerId)&&i.releasePointerCapture(e.pointerId))},m=e=>{if(![`ArrowLeft`,`ArrowRight`,`ArrowUp`,`ArrowDown`].includes(e.key))return;e.preventDefault();let t=e.shiftKey?10:1;u(W(s,e.key===`ArrowLeft`?-t:e.key===`ArrowRight`?t:0,e.key===`ArrowUp`?-t:e.key===`ArrowDown`?t:0,360,180))};return i.addEventListener(`pointerdown`,d),i.addEventListener(`pointermove`,f),i.addEventListener(`pointerup`,p),i.addEventListener(`pointercancel`,p),i.addEventListener(`lostpointercapture`,p),a.addEventListener(`keydown`,m),l(t),{sync:l,dispose(){c&&i.hasPointerCapture(c.pointer)&&i.releasePointerCapture(c.pointer),i.removeEventListener(`pointerdown`,d),i.removeEventListener(`pointermove`,f),i.removeEventListener(`pointerup`,p),i.removeEventListener(`pointercancel`,p),i.removeEventListener(`lostpointercapture`,p),a.removeEventListener(`keydown`,m),e.replaceChildren()}}}var G;function K(){return(K=y((()=>{F(),U(),G=ue(L.x,L.z)})))()}function pe(e,t,n,r){e.innerHTML=`
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
    </details>`;let i=e.closest(`.environment-panel`);i&&(i.open=!window.matchMedia(`(max-width: 740px)`).matches);let a=t=>e.querySelector(t),o={...t},s=a(`#sun-azimuth`),c=a(`#sun-elevation`),l=a(`#rain`),u=a(`#snow`),d=a(`#greenness`),f=fe(a(`.sun-widget-mount`),{azimuth:o.sunAzimuth,elevation:o.sunElevation},e=>m({...o,sunAzimuth:e.azimuth,sunElevation:e.elevation}),r);function p(e){o={...e};let t=e=>`${Math.round(e)}°`;s.value=String(e.sunAzimuth),c.value=String(e.sunElevation),a(`#sun-azimuth-value`).value=t(e.sunAzimuth),a(`#sun-elevation-value`).value=t(e.sunElevation),a(`#sun-phase`).value=e.sunElevation<0?`Bajo el horizonte · noche`:e.sunElevation<6?`En el horizonte`:`Sobre el horizonte`;for(let[t,n,r]of[[l,e.rain,`#rain-value`],[u,e.snow,`#snow-value`],[d,e.greenness,`#greenness-value`]]){let e=Math.round(n*100);t.value=String(e),a(r).value=`${e} %`,t.setAttribute(`aria-valuetext`,`${e} por ciento`)}f.sync({azimuth:e.sunAzimuth,elevation:e.sunElevation})}function m(e){p(e),n({...o})}let h=[[s,`sunAzimuth`,1],[c,`sunElevation`,1],[l,`rain`,100],[u,`snow`,100],[d,`greenness`,100]].map(([e,t,n])=>{let r=()=>m({...o,[t]:Number(e.value)/n});return e.addEventListener(`input`,r),()=>e.removeEventListener(`input`,r)}),g=a(`#reset-environment`),_=()=>m({...b});g.addEventListener(`click`,_);let v=new Intl.NumberFormat(`es-ES`,{maximumFractionDigits:0});return p(t),{sync:p,setStats(e){a(`#environment-frame-status`).textContent=e.idle?`En reposo`:e.fps===null?`— FPS`:`${Math.round(e.fps)} FPS`,a(`#environment-cpu`).textContent=`${e.cpuMs.toFixed(2)} ms`,a(`#environment-draw-calls`).textContent=v.format(e.drawCalls),a(`#environment-triangles`).textContent=v.format(e.triangles),a(`#environment-particles`).textContent=v.format(e.particles)},dispose(){h.forEach(e=>e()),g.removeEventListener(`click`,_),f.dispose(),e.replaceChildren()}}}function q(){return(q=y((()=>{x(),K()})))()}function me(e,t,n){if(t.isEmpty())return;let r=e.shadow.camera;e.updateMatrixWorld(!0),e.target.updateMatrixWorld(!0),e.shadow.updateMatrices(e);let a=e.getWorldPosition(new i).sub(e.target.getWorldPosition(new i)).normalize(),o=new i,s=1/0,c=-1/0,l=1/0,u=-1/0,d=1/0,f=-1/0,p=-1/0;for(let e of[t.min.x,t.max.x])for(let i of[t.min.y,t.max.y])for(let m of[t.min.z,t.max.z])o.set(e,i,m).applyMatrix4(r.matrixWorldInverse),s=Math.min(s,o.x),c=Math.max(c,o.x),l=Math.min(l,o.y),u=Math.max(u,o.y),d=Math.min(d,-o.z),f=Math.max(f,-o.z),a.y>0&&(p=Math.max(p,-o.z+(i-n.min.y)/a.y));if(a.y>0&&!n.isEmpty()){let e=-1/0;for(let t of[n.min.x,n.max.x])for(let i of[n.min.z,n.max.z])o.set(t,n.min.y,i).applyMatrix4(r.matrixWorldInverse),e=Math.max(e,-o.z);f=Math.max(f,Math.min(p,e))}Object.assign(r,{left:s-2,right:c+2,bottom:l-2,top:u+2,near:Math.max(.1,d-2),far:f+2}),e.shadow.bias=-.08/(r.far-r.near),r.updateProjectionMatrix()}function J(){return(J=y((()=>{d()})))()}function he({domain:e,focus:t}){if(![e.uMin,e.uMax,e.vMin,e.vMax,t.u,t.v].every(Number.isFinite)||e.uMin>=e.uMax||e.vMin>=e.vMax)throw RangeError(`Invalid precipitation domain or focus`);let n={uMin:Math.max(e.uMin,t.u-Y),uMax:Math.min(e.uMax,t.u+Y),vMin:Math.max(e.vMin,t.v-X),vMax:Math.min(e.vMax,t.v+X)};return n.uMin<n.uMax&&n.vMin<n.vMax?n:null}function ge(e,t){return e===t||e!==null&&t!==null&&e.uMin===t.uMin&&e.uMax===t.uMax&&e.vMin===t.vMin&&e.vMax===t.vMax}function _e(e,t){let n=$(ve,!0,e,t);try{return[n,$(ye,!1,e,t)]}catch(e){throw n.dispose(),e}}var ve,ye,Y,X,Z,be,Q,xe,$,Se,Ce,we,Te,Ee;function De(){return(De=y((()=>{d(),ve=4200,ye=2200,Y=40,X=32,Z=45,be={domain:{uMin:-40,uMax:Y,vMin:-32,vMax:X},focus:{u:0,v:0},surfaceKey:Symbol(`legacy-precipitation-surface`)},Q=e=>Number.isFinite(e)?Math.max(0,Math.min(1,e)):0,xe=e=>{let t=e>>>0;return()=>(t=Math.imul(1664525,t)+1013904223>>>0,t/4294967296)},$=(e,t,n,r)=>{let i=xe(t?1246883881:1908002325),a=t?2:1,c=new Float32Array(e*a*3),l=new Float32Array(c.length),u=t?new Float32Array(e*2):null,d=0;for(let o=0;r&&o<e;o+=1){let e=r.uMin+i()*(r.uMax-r.uMin),o=r.vMin+i()*(r.vMax-r.vMin),s=n(e,o),f=i(),p=t?26+i()*12:1.8+i()*1.7,m=t?.95+i()*.9:3.8+i()*2.8;if(s===void 0||!Number.isFinite(s))continue;let h=s+.06;for(let t=0;t<a;t+=1){let n=d*a+t;c.set([e,h,o],n*3),l.set([f,p,m],n*3),u&&(u[n]=t)}d+=1}let f=new s,p=d*a;return f.setAttribute(`position`,new o(c.slice(0,p*3),3)),f.setAttribute(`aParameters`,new o(l.slice(0,p*3),3)),u&&f.setAttribute(`aEnd`,new o(u.slice(0,p),1)),f.setDrawRange(0,0),f},Se=`
  uniform float uTime;
  attribute vec3 aParameters;
  attribute float aEnd;
  void main() {
    // Both ends recycle together, so a segment never stretches across the column.
    float fall = mod(aParameters.x * ${Z.toFixed(1)} - uTime * aParameters.y, ${Z.toFixed(1)});
    vec3 point = position;
    point.y += fall + aEnd * aParameters.z;
    point.x += aEnd * 0.08;
    point.z -= aEnd * 0.025;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(point, 1.0);
  }
`,Ce=`
  uniform float uLight;
  void main() {
    vec3 color = vec3(0.37, 0.49, 0.58) * (0.24 + 0.76 * uLight);
    gl_FragColor = vec4(color, 0.48);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,we=`
  uniform float uTime;
  attribute vec3 aParameters;
  void main() {
    float fall = mod(aParameters.x * ${Z.toFixed(1)} - uTime * aParameters.y, ${Z.toFixed(1)});
    vec3 point = position;
    point.y += fall;
    vec4 viewPoint = modelViewMatrix * vec4(point, 1.0);
    gl_Position = projectionMatrix * viewPoint;
    float flutter = 0.9 + 0.1 * sin(uTime * 1.8 + aParameters.x * 6.283185);
    gl_PointSize = clamp(aParameters.z * flutter * 90.0 / max(35.0, -viewPoint.z), 2.8, 8.0);
  }
`,Te=`
  uniform float uLight;
  void main() {
    float radius = length(gl_PointCoord - vec2(0.5));
    float opacity = 1.0 - smoothstep(0.12, 0.5, radius);
    if (opacity < 0.03) discard;
    gl_FragColor = vec4(vec3(0.34 + 0.66 * uLight), opacity * 0.9);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`,Ee=(e,t,n=be)=>{let i=he(n),a=n.surfaceKey,[o,s]=_e(t,i),c={uTime:{value:0},uLight:{value:1}},u=new l({uniforms:c,vertexShader:Se,fragmentShader:Ce,transparent:!0,depthTest:!0,depthWrite:!1,toneMapped:!1}),d=new l({uniforms:c,vertexShader:we,fragmentShader:Te,transparent:!0,depthTest:!0,depthWrite:!1,toneMapped:!1}),f=new r(o,u),p=new h(s,d);f.name=`terrain-art-rain`,p.name=`terrain-art-snow`,f.renderOrder=2,p.renderOrder=2,f.frustumCulled=!1,p.frustumCulled=!1,f.visible=!1,p.visible=!1,e.add(f,p);let m=!1,g=0,_=0,v=Object.freeze({rain:0,snow:0}),y=()=>{v=Object.freeze({rain:Math.ceil(g*f.geometry.getAttribute(`position`).count/2),snow:Math.ceil(_*p.geometry.getAttribute(`position`).count)}),f.geometry.setDrawRange(0,v.rain*2),p.geometry.setDrawRange(0,v.snow),f.visible=v.rain>0,p.visible=v.snow>0};return{setSurface(e){if(m)return!1;let t=he(e);if(Object.is(e.surfaceKey,a)&&ge(t,i))return!1;let[n,r]=_e(e.floorAt,t),o=f.geometry,s=p.geometry;return f.geometry=n,p.geometry=r,i=t,a=e.surfaceKey,y(),o.dispose(),s.dispose(),!0},setAmounts(e,t){m||(g=Q(e),_=Q(t),y())},setLight(e){m||(c.uLight.value=Q(e))},update(e){!m&&(v.rain>0||v.snow>0)&&Number.isFinite(e)&&(c.uTime.value=Math.max(0,e))},get active(){return!m&&(v.rain>0||v.snow>0)},get counts(){return v},dispose(){m||(m=!0,v=Object.freeze({rain:0,snow:0}),f.visible=!1,p.visible=!1,f.geometry.setDrawRange(0,0),p.geometry.setDrawRange(0,0),e.remove(f,p),f.geometry.dispose(),p.geometry.dispose(),u.dispose(),d.dispose())}}}})))()}export{k as C,O as S,x as T,re as _,q as a,te as b,V as c,H as d,F as f,oe as g,j as h,J as i,U as l,ce as m,De as n,pe as o,se as p,me as r,I as s,Ee as t,z as u,ae as v,b as w,A as x,ee as y};