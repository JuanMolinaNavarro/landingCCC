const p=`#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`,w=`#version 300 es
precision highp float;
uniform vec2 resolution;
uniform float time;
uniform vec3 waveColor;
uniform vec3 backgroundColor;
out vec4 fragColor;

const float waveSpeed = 0.025;
const float waveFrequency = 4.2;
const float waveAmplitude = 0.25;
const float colorNum = 4.0;

vec4 mod289(vec4 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
vec2 fade(vec2 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

float cnoise(vec2 P) {
  vec4 Pi = floor(P.xyxy) + vec4(0.0,0.0,1.0,1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0,0.0,1.0,1.0);
  Pi = mod289(Pi);
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = fract(i * (1.0/41.0)) * 2.0 - 1.0;
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x, gy.x);
  vec2 g10 = vec2(gx.y, gy.y);
  vec2 g01 = vec2(gx.z, gy.z);
  vec2 g11 = vec2(gx.w, gy.w);
  vec4 norm = taylorInvSqrt(vec4(dot(g00,g00), dot(g01,g01), dot(g10,g10), dot(g11,g11)));
  g00 *= norm.x; g01 *= norm.y; g10 *= norm.z; g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  return 2.3 * mix(n_x.x, n_x.y, fade_xy.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 1.0;
  for (int i = 0; i < 4; i++) {
    value += amp * abs(cnoise(p));
    p *= waveFrequency;
    amp *= waveAmplitude;
  }
  return value;
}

float pattern(vec2 p) {
  vec2 p2 = p - time * waveSpeed;
  return fbm(p + fbm(p2));
}

const float bayer[64] = float[64](
  0.0, 48.0, 12.0, 60.0,  3.0, 51.0, 15.0, 63.0,
  32.0,16.0, 44.0, 28.0, 35.0, 19.0, 47.0, 31.0,
  8.0, 56.0,  4.0, 52.0, 11.0, 59.0,  7.0, 55.0,
  40.0,24.0, 36.0, 20.0, 43.0, 27.0, 39.0, 23.0,
  2.0, 50.0, 14.0, 62.0,  1.0, 49.0, 13.0, 61.0,
  34.0,18.0, 46.0, 30.0, 33.0, 17.0, 45.0, 29.0,
  10.0,58.0,  6.0, 54.0,  9.0, 57.0,  5.0, 53.0,
  42.0,26.0, 38.0, 22.0, 41.0, 25.0, 37.0, 21.0
);

vec3 toSRGB(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0/2.4)) - 0.055, step(0.0031308, c));
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution - 0.5;
  uv.x *= resolution.x / resolution.y;
  vec3 col = mix(backgroundColor, waveColor, pattern(uv));

  ivec2 b = ivec2(mod(floor(gl_FragCoord.xy), 8.0));
  col += (bayer[b.y * 8 + b.x] / 64.0 - 0.25) / (colorNum - 1.0);
  col = clamp(col - 0.2, 0.0, 1.0);
  col = floor(col * (colorNum - 1.0) + 0.5) / (colorNum - 1.0);
  fragColor = vec4(toSRGB(col), 1.0);
}`,g=[0,.2706,.7137],x={dark:{wave:g,bg:[.047,0,.047]},light:{wave:[.53,.53,.53],bg:g}};function h(t){const e=t.getContext("webgl2",{antialias:!1,depth:!1,alpha:!1});if(!e)return;const o=(l,i)=>{const c=e.createShader(l);return e.shaderSource(c,i),e.compileShader(c),c},r=e.createProgram();e.attachShader(r,o(e.VERTEX_SHADER,p)),e.attachShader(r,o(e.FRAGMENT_SHADER,w)),e.linkProgram(r);const n=e.getExtension("KHR_parallel_shader_compile"),a=()=>{if(n&&!e.getProgramParameter(r,n.COMPLETION_STATUS_KHR)){requestAnimationFrame(a);return}e.getProgramParameter(r,e.LINK_STATUS)&&b(e,r)};a()}function b(t,e){const o=t.canvas;t.useProgram(e);const r=t.getUniformLocation(e,"resolution"),n=t.getUniformLocation(e,"time"),a=t.getUniformLocation(e,"waveColor"),l=t.getUniformLocation(e,"backgroundColor"),i=matchMedia("(prefers-reduced-motion: reduce)").matches,c=performance.now();let s=!1,m=0;const f=()=>{t.uniform1f(n,i?0:(performance.now()-c)/1e3),t.drawArrays(t.TRIANGLES,0,3)},u=()=>{f(),m=s&&!i?requestAnimationFrame(u):0},d=()=>{const v=document.documentElement.classList.contains("light")?x.light:x.dark;t.uniform3fv(a,v.wave),t.uniform3fv(l,v.bg),f()};new MutationObserver(d).observe(document.documentElement,{attributes:!0,attributeFilter:["class"]}),new ResizeObserver(()=>{o.width=o.clientWidth,o.height=o.clientHeight,t.viewport(0,0,o.width,o.height),t.uniform2f(r,o.width,o.height),f()}).observe(o),new IntersectionObserver(([v])=>{s=v.isIntersecting,s&&!m&&u()}).observe(o),d()}const y=document.getElementById("dither");if(y){const t=()=>h(y),e=()=>"requestIdleCallback"in window?requestIdleCallback(t,{timeout:2e3}):setTimeout(t,200);document.readyState==="complete"?e():addEventListener("load",e,{once:!0})}
