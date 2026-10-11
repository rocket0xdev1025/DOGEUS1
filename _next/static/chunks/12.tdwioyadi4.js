(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,47071,e=>{"use strict";var t=e.i(71645),r=e.i(90072),o=e.i(28600),i=e.i(60602);let a=e=>e===Object(e)&&!Array.isArray(e)&&"function"!=typeof e;function s(e,s){let n=(0,o.useThree)(e=>e.gl),l=(0,i.useLoader)(r.TextureLoader,a(e)?Object.values(e):e);return(0,t.useLayoutEffect)(()=>{null==s||s(l)},[s]),(0,t.useEffect)(()=>{if("initTexture"in n){let e=[];Array.isArray(l)?e=l:l instanceof r.Texture?e=[l]:a(l)&&(e=Object.values(l)),e.forEach(e=>{e instanceof r.Texture&&n.initTexture(e)})}},[n,l]),(0,t.useMemo)(()=>{if(!a(e))return l;{let t={},r=0;for(let o in e)t[o]=l[r++];return t}},[e,l])}s.preload=e=>i.useLoader.preload(r.TextureLoader,e),s.clear=e=>i.useLoader.clear(r.TextureLoader,e),e.s(["useTexture",0,s])},12935,e=>{"use strict";var t=e.i(43476),r=e.i(71645),o=e.i(25234),i=e.i(28600),a=e.i(43257),s=e.i(48455),n=e.i(31067),l=e.i(90072),u=e.i(67335);let c=parseInt(l.REVISION.replace(/\D+/g,""));class m extends l.ShaderMaterial{constructor(){super({uniforms:{time:{value:0},pixelRatio:{value:1}},vertexShader:`
        uniform float pixelRatio;
        uniform float time;
        attribute float size;  
        attribute float speed;  
        attribute float opacity;
        attribute vec3 noise;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vOpacity;

        void main() {
          vec4 modelPosition = modelMatrix * vec4(position, 1.0);
          modelPosition.y += sin(time * speed + modelPosition.x * noise.x * 100.0) * 0.2;
          modelPosition.z += cos(time * speed + modelPosition.x * noise.y * 100.0) * 0.2;
          modelPosition.x += cos(time * speed + modelPosition.x * noise.z * 100.0) * 0.2;
          vec4 viewPosition = viewMatrix * modelPosition;
          vec4 projectionPostion = projectionMatrix * viewPosition;
          gl_Position = projectionPostion;
          gl_PointSize = size * 25. * pixelRatio;
          gl_PointSize *= (1.0 / - viewPosition.z);
          vColor = color;
          vOpacity = opacity;
        }
      `,fragmentShader:`
        varying vec3 vColor;
        varying float vOpacity;
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
          float strength = 0.05 / distanceToCenter - 0.1;
          gl_FragColor = vec4(vColor, strength * vOpacity);
          #include <tonemapping_fragment>
          #include <${c>=154?"colorspace_fragment":"encodings_fragment"}>
        }
      `})}get time(){return this.uniforms.time.value}set time(e){this.uniforms.time.value=e}get pixelRatio(){return this.uniforms.pixelRatio.value}set pixelRatio(e){this.uniforms.pixelRatio.value=e}}let d=e=>e&&e.constructor===Float32Array,v=e=>e instanceof l.Vector2||e instanceof l.Vector3||e instanceof l.Vector4,f=e=>Array.isArray(e)?e:v(e)?e.toArray():[e,e,e];function p(e,t,o){return r.useMemo(()=>{if(void 0!==t)if(d(t))return t;else{if(t instanceof l.Color){let r=Array.from({length:3*e},()=>[t.r,t.g,t.b]).flat();return Float32Array.from(r)}if(v(t)||Array.isArray(t)){let r=Array.from({length:3*e},()=>f(t)).flat();return Float32Array.from(r)}return Float32Array.from({length:e},()=>t)}return Float32Array.from({length:e},o)},[t])}let g=r.forwardRef(({noise:e=1,count:t=100,speed:a=1,opacity:s=1,scale:c=1,size:v,color:g,children:h,...x},y)=>{r.useMemo(()=>(0,u.extend)({SparklesImplMaterial:m}),[]);let j=r.useRef(null),b=(0,i.useThree)(e=>e.viewport.dpr),M=f(c),D=r.useMemo(()=>Float32Array.from(Array.from({length:t},()=>M.map(l.MathUtils.randFloatSpread)).flat()),[t,...M]),U=p(t,v,Math.random),S=p(t,s),A=p(t,a),T=p(3*t,e),E=p(void 0===g?3*t:t,d(g)?g:new l.Color(g),()=>1);return(0,o.useFrame)(e=>{j.current&&j.current.material&&(j.current.material.time=e.clock.elapsedTime)}),r.useImperativeHandle(y,()=>j.current,[]),r.createElement("points",(0,n.default)({key:`particle-${t}-${JSON.stringify(c)}`},x,{ref:j}),r.createElement("bufferGeometry",null,r.createElement("bufferAttribute",{attach:"attributes-position",args:[D,3]}),r.createElement("bufferAttribute",{attach:"attributes-size",args:[U,1]}),r.createElement("bufferAttribute",{attach:"attributes-opacity",args:[S,1]}),r.createElement("bufferAttribute",{attach:"attributes-speed",args:[A,1]}),r.createElement("bufferAttribute",{attach:"attributes-color",args:[E,3]}),r.createElement("bufferAttribute",{attach:"attributes-noise",args:[T,3]})),h||r.createElement("sparklesImplMaterial",{transparent:!0,pixelRatio:b,depthWrite:!1}))}),h={uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`
      varying vec2 vUv;

      void main() {

        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

      }
  `,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform float h;

    varying vec2 vUv;

    void main() {

    	vec4 sum = vec4( 0.0 );

    	sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
    	sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

    	gl_FragColor = sum;

    }
  `},x={uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`
    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }
  `,fragmentShader:`

  uniform sampler2D tDiffuse;
  uniform float v;

  varying vec2 vUv;

  void main() {

    vec4 sum = vec4( 0.0 );

    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
    sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

    gl_FragColor = sum;

  }
  `},y=r.forwardRef(({scale:e=10,frames:t=1/0,opacity:a=1,width:s=1,height:u=1,blur:c=1,near:m=0,far:d=10,resolution:v=512,smooth:f=!0,color:p="#000000",depthWrite:g=!1,renderOrder:y,...j},b)=>{let M,D,U=r.useRef(null),S=(0,i.useThree)(e=>e.scene),A=(0,i.useThree)(e=>e.gl),T=r.useRef(null);s*=Array.isArray(e)?e[0]:e||1,u*=Array.isArray(e)?e[1]:e||1;let[E,R,z,w,P,C,B]=r.useMemo(()=>{let e=new l.WebGLRenderTarget(v,v),t=new l.WebGLRenderTarget(v,v);t.texture.generateMipmaps=e.texture.generateMipmaps=!1;let r=new l.PlaneGeometry(s,u).rotateX(Math.PI/2),o=new l.Mesh(r),i=new l.MeshDepthMaterial;i.depthTest=i.depthWrite=!1,i.onBeforeCompile=e=>{e.uniforms={...e.uniforms,ucolor:{value:new l.Color(p)}},e.fragmentShader=e.fragmentShader.replace("void main() {",`uniform vec3 ucolor;
           void main() {
          `),e.fragmentShader=e.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( ucolor * fragCoordZ * 2.0, ( 1.0 - fragCoordZ ) * 1.0 );")};let a=new l.ShaderMaterial(h),n=new l.ShaderMaterial(x);return n.depthTest=a.depthTest=!1,[e,r,i,o,a,n,t]},[v,s,u,e,p]),L=e=>{w.visible=!0,w.material=P,P.uniforms.tDiffuse.value=E.texture,P.uniforms.h.value=e/256,A.setRenderTarget(B),A.render(w,T.current),w.material=C,C.uniforms.tDiffuse.value=B.texture,C.uniforms.v.value=e/256,A.setRenderTarget(E),A.render(w,T.current),w.visible=!1},F=0;return(0,o.useFrame)(()=>{T.current&&(t===1/0||F<t)&&(F++,M=S.background,D=S.overrideMaterial,U.current.visible=!1,S.background=null,S.overrideMaterial=z,A.setRenderTarget(E),A.render(S,T.current),L(c),f&&L(.4*c),A.setRenderTarget(null),U.current.visible=!0,S.overrideMaterial=D,S.background=M)}),r.useImperativeHandle(b,()=>U.current,[]),r.createElement("group",(0,n.default)({"rotation-x":Math.PI/2},j,{ref:U}),r.createElement("mesh",{renderOrder:y,geometry:R,scale:[1,-1,1],rotation:[-Math.PI/2,0,0]},r.createElement("meshBasicMaterial",{transparent:!0,map:E.texture,opacity:a,depthWrite:g})),r.createElement("orthographicCamera",{ref:T,args:[-s/2,s/2,u/2,-u/2,m,d]}))});var j=e.i(47071),b=e.i(78140);e.i(37962);var M=e.i(63743),D=e.i(46215),U=e.i(60203);let S=r.forwardRef(({children:e,enabled:t=!0,speed:i=1,rotationIntensity:a=1,floatIntensity:s=1,floatingRange:n=[-.1,.1],autoInvalidate:u=!1,...c},m)=>{let d=r.useRef(null);r.useImperativeHandle(m,()=>d.current,[]);let v=r.useRef(1e4*Math.random());return(0,o.useFrame)(e=>{var r,o;if(!t||0===i)return;u&&e.invalidate();let c=v.current+e.clock.elapsedTime;d.current.rotation.x=Math.cos(c/4*i)/8*a,d.current.rotation.y=Math.sin(c/4*i)/8*a,d.current.rotation.z=Math.sin(c/4*i)/20*a;let m=Math.sin(c/4*i)/10;m=l.MathUtils.mapLinear(m,-.1,.1,null!=(r=null==n?void 0:n[0])?r:-.1,null!=(o=null==n?void 0:n[1])?o:.1),d.current.position.y=m*s,d.current.updateMatrix()}),r.createElement("group",c,r.createElement("group",{ref:d,matrixAutoUpdate:!1},e))});function A({intensity:e=1.2,coreScale:i=1}){let a=(0,r.useRef)(null);return(0,o.useFrame)((e,t)=>{a.current&&(a.current.rotation.y+=.4*t)}),(0,t.jsx)(S,{speed:2,rotationIntensity:.25,floatIntensity:.7,children:(0,t.jsxs)("group",{ref:a,scale:[1,1.5,1],children:[(0,t.jsxs)("mesh",{children:[(0,t.jsx)("octahedronGeometry",{args:[1,0]}),(0,t.jsx)("meshPhysicalMaterial",{color:"#aab4d4",metalness:0,roughness:.04,transmission:1,thickness:2.2,ior:2.1,reflectivity:1,clearcoat:1,clearcoatRoughness:.08,attenuationColor:"#627EEA",attenuationDistance:1.3,envMapIntensity:1.6})]}),(0,t.jsxs)("mesh",{scale:[.42*i,.62*i,.42*i],children:[(0,t.jsx)("octahedronGeometry",{args:[1,0]}),(0,t.jsx)("meshStandardMaterial",{color:"#8aa0ff",emissive:"#627EEA",emissiveIntensity:2*e,toneMapped:!1})]}),(0,t.jsxs)("mesh",{scale:1.004,children:[(0,t.jsx)("octahedronGeometry",{args:[1,0]}),(0,t.jsx)("meshBasicMaterial",{color:"#aebcff",wireframe:!0,transparent:!0,opacity:.4,toneMapped:!1})]})]})})}var T=e.i(12531);let E={color:"#C9A96E",metalness:.96,roughness:.28,envMapIntensity:1.5},R={color:"#cdc3a8",metalness:.06,roughness:.7,envMapIntensity:.7};function z(){return(0,t.jsxs)("group",{position:[0,0,-7.3],children:[(0,t.jsxs)("mesh",{position:[0,-2.95,0],children:[(0,t.jsx)("cylinderGeometry",{args:[4.4,4.7,.5,48]}),(0,t.jsx)("meshStandardMaterial",{...R})]}),(0,t.jsxs)("mesh",{position:[0,-2.55,0],children:[(0,t.jsx)("cylinderGeometry",{args:[3.7,3.9,.4,48]}),(0,t.jsx)("meshStandardMaterial",{...R})]}),(0,t.jsxs)("mesh",{position:[0,-2.25,0],children:[(0,t.jsx)("cylinderGeometry",{args:[3.2,3.3,.3,48]}),(0,t.jsx)("meshStandardMaterial",{...R})]}),(0,t.jsxs)("mesh",{position:[0,-2.08,0],rotation:[-Math.PI/2,0,0],children:[(0,t.jsx)("torusGeometry",{args:[3.25,.06,12,64]}),(0,t.jsx)("meshStandardMaterial",{...E})]})]})}function w({x:e}){return(0,t.jsxs)("group",{position:[e,-3.2,-3.6],children:[(0,t.jsx)(U.default,{url:"/models/brazier.glb",targetSize:2.4,spin:0,anchorBottom:!0}),(0,t.jsx)(g,{count:12,scale:[.7,1.9,.7],position:[0,2,0],size:2.5,speed:.5,color:"#ffb24d"}),(0,t.jsx)("pointLight",{position:[0,1.9,0],intensity:2.6,distance:17,decay:2,color:"#ff9a3c"})]})}function P(){let{camera:e}=(0,i.useThree)(),n=(0,r.useRef)(new l.Vector3(0,1.6,-6.8)),u=(0,j.useTexture)("/images/floor-spqr.jpg");u.wrapS=u.wrapT=l.RepeatWrapping,u.repeat.set(4,7),u.colorSpace=l.SRGBColorSpace,u.anisotropy=8;let c=window.matchMedia("(max-width: 640px)").matches,m=c?[2.5,-7.5]:[2.5,-2.5,-7.5,-12.5],d=c?[1.4]:[1.4,-2.6,-6.6];return(0,o.useFrame)((t,r)=>{M.easing.damp3(e.position,[1.3*t.pointer.x,2.7+.4*t.pointer.y,15.5],.6,r),e.lookAt(n.current)}),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("fog",{attach:"fog",args:["#0a0510",20,88]}),(0,t.jsx)("ambientLight",{intensity:.5,color:"#3a1830"}),(0,t.jsx)("directionalLight",{position:[5,10,7],intensity:1.6,color:"#ffd9a0"}),(0,t.jsx)("directionalLight",{position:[-8,5,-6],intensity:1,color:"#627EEA"}),(0,t.jsx)("directionalLight",{position:[0,6,-12],intensity:.6,color:"#8aa0ff"}),(0,t.jsxs)(a.Environment,{resolution:128,frames:1,children:[(0,t.jsx)(s.Lightformer,{intensity:2.2,color:"#fff0cf",position:[0,8,-6],scale:[14,7,1]}),(0,t.jsx)(s.Lightformer,{intensity:1,color:"#C9A96E",position:[-7,1,3],scale:[6,6,1]}),(0,t.jsx)(s.Lightformer,{intensity:.9,color:"#627EEA",position:[6,2,3],scale:[6,6,1]})]}),m.map(e=>(0,t.jsx)("group",{position:[-8,-3.2,e],children:(0,t.jsx)(U.default,{url:"/models/column.glb",targetSize:11,spin:0,anchorBottom:!0})},`cl${e}`)),m.map(e=>(0,t.jsx)("group",{position:[8,-3.2,e],children:(0,t.jsx)(U.default,{url:"/models/column.glb",targetSize:11,spin:0,anchorBottom:!0})},`cr${e}`)),(c?[-4,4]:[-6.4,-2.7,2.7,6.4]).map(e=>(0,t.jsx)("group",{position:[e,-3.2,-10.8],children:(0,t.jsx)(U.default,{url:"/models/aquila.glb",targetSize:6.2,spin:0,anchorBottom:!0})},e)),!c&&[-3.4,3.4].map(e=>(0,t.jsx)("group",{position:[e,-3.2,-12.8],children:(0,t.jsx)(U.default,{url:"/models/canine-legion.glb",targetSize:5.8,spin:0,anchorBottom:!0})},`legion${e}`)),!c&&(0,t.jsx)("group",{position:[0,-3.2,-30],children:(0,t.jsx)(U.default,{url:"/models/rotunda.glb",targetSize:20,spin:0,anchorBottom:!0})}),(0,t.jsx)("group",{position:[0,-3.2,-9.1],children:(0,t.jsx)(U.default,{url:"/models/laurel-arch.glb",targetSize:10,spin:0,anchorBottom:!0})}),d.map(e=>(0,t.jsx)("group",{position:[-6.1,-3.2,e],rotation:[0,.7,0],children:(0,t.jsx)(U.default,{url:"/models/victory.glb",targetSize:5,spin:0,anchorBottom:!0})},`vl${e}`)),d.map(e=>(0,t.jsx)("group",{position:[6.1,-3.2,e],rotation:[0,-.7,0],children:(0,t.jsx)(U.default,{url:"/models/victory.glb",targetSize:5,spin:0,anchorBottom:!0})},`vr${e}`)),(0,t.jsx)("group",{position:[-3.9,-3.2,-.4],rotation:[0,.55,0],children:(0,t.jsx)(U.default,{url:"/models/treasure.glb",targetSize:2.6,spin:0,anchorBottom:!0})}),(0,t.jsx)("group",{position:[3.9,-3.2,-.4],rotation:[0,-1.25,0],children:(0,t.jsx)(U.default,{url:"/models/treasure.glb",targetSize:2.6,spin:0,anchorBottom:!0})}),(0,t.jsx)(z,{}),(0,t.jsx)(w,{x:-3.9}),(0,t.jsx)(w,{x:3.9}),(0,t.jsx)("group",{position:[-2.7,-2,-7],rotation:[0,.25,0],children:(0,t.jsx)(U.default,{url:"/models/legionary.glb",targetSize:3,spin:0,anchorBottom:!0})}),(0,t.jsx)("group",{position:[2.7,-2,-7],rotation:[0,-.25,0],children:(0,t.jsx)(U.default,{url:"/models/legionary.glb",targetSize:3,spin:0,anchorBottom:!0})}),(0,t.jsx)("group",{position:[-5.5,-3.2,3.6],children:(0,t.jsx)(U.default,{url:"/models/bust.glb",targetSize:2.5,spin:0,anchorBottom:!0})}),(0,t.jsx)("group",{position:[5.5,-3.2,3.6],children:(0,t.jsx)(U.default,{url:"/models/bust.glb",targetSize:2.5,spin:0,anchorBottom:!0})}),(0,t.jsxs)("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-3.2,0],children:[(0,t.jsx)("planeGeometry",{args:[90,90]}),(0,t.jsx)("meshStandardMaterial",{map:u,color:"#f0e6cc",roughness:.45,metalness:.18,envMapIntensity:.6})]}),(0,t.jsx)(y,{position:[0,-3.15,-7.3],opacity:.55,scale:26,blur:2.8,far:10,color:"#000000",frames:1}),(0,t.jsx)(T.default,{count:100,radius:10}),(0,t.jsx)("group",{position:[0,2.6,-7.3],scale:.55,children:(0,t.jsx)(A,{intensity:1.7})}),(0,t.jsx)("group",{position:[0,5.2,-9.7],children:(0,t.jsx)(U.default,{url:"/models/golden-hound.glb",targetSize:4,spin:0})}),(0,t.jsx)("group",{position:[0,.1,-7.3],rotation:[0,0,0],children:(0,t.jsx)(U.default,{url:"/models/canine-caesar.glb",targetSize:4.3,spin:0})})]})}for(let e of(b.useGLTF.preload("/models/canine-caesar.glb","/draco/"),b.useGLTF.preload("/models/golden-hound.glb","/draco/"),["/models/column.glb","/models/aquila.glb","/models/laurel-arch.glb","/models/victory.glb","/models/treasure.glb","/models/brazier.glb","/models/legionary.glb","/models/bust.glb","/models/canine-legion.glb"]))b.useGLTF.preload(e,"/draco/");e.s(["default",0,function(){return(0,t.jsx)(D.default,{frameloop:"always",bloom:!1,cameraZ:15.5,className:"h-full w-full",children:(0,t.jsx)(P,{})})}],12935)},39968,e=>{e.n(e.i(12935))}]);