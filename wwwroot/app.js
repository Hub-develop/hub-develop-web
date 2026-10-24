// hub-develop 核心站点：真 WebGL 极光背景（GLSL fragment shader）。
// 由 Blazor 组件 Background.razor 通过 JS 互操作调用 window.hubdevelop.initAurora(canvasId)。
// 这是当前的默认实现；Byta.GL 的 WebGL 后端就绪后会替换它。
(function () {
  const hubdevelop = {};

  hubdevelop.initAurora = function (canvasId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return 'no-canvas';

    const gl =
      canvas.getContext('webgl', { alpha: false, antialias: true }) ||
      canvas.getContext('experimental-webgl', { alpha: false, antialias: true });
    if (!gl) {
      console.warn('[hubdevelop] WebGL 不可用，背景降级为纯深色');
      return 'no-webgl';
    }

    const vsSrc = `
      attribute vec2 a_pos;
      void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
    `;

    const fsSrc = `
      #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      #else
      precision mediump float;
      #endif
      uniform float u_time;
      uniform vec2 u_res;
      const vec3 C0 = vec3(111.0, 238.0, 194.0) / 255.0;
      const vec3 C1 = vec3(43.0, 189.0, 134.0) / 255.0;
      const vec3 C2 = vec3(56.0, 132.0, 255.0) / 255.0;
      const vec3 C3 = vec3(124.0, 92.0, 255.0) / 255.0;
      float blob(vec2 p, vec2 c, float r) {
        float d = length(p - c);
        return exp(-d * d / (r * r));
      }
      void main() {
        vec2 uv = gl_FragCoord.xy / u_res.xy;
        vec2 p = uv;
        p.x *= u_res.x / u_res.y;
        float t = u_time * 0.16;
        vec3 col = vec3(0.0);
        vec2 a = vec2(0.30 + 0.25 * sin(t * 0.9), 0.40 + 0.20 * cos(t * 0.7));
        vec2 b = vec2(0.70 + 0.20 * cos(t * 0.6), 0.60 + 0.25 * sin(t * 0.8));
        vec2 c = vec2(0.50 + 0.30 * sin(t * 0.5 + 1.0), 0.30 + 0.30 * cos(t * 0.4 + 2.0));
        vec2 d = vec2(0.40 + 0.25 * cos(t * 0.7 + 3.0), 0.70 + 0.20 * sin(t * 0.6 + 1.5));
        float r = 0.55;
        col += C0 * blob(p, a, r) * 0.95;
        col += C1 * blob(p, b, r) * 0.85;
        col += C2 * blob(p, c, r) * 0.75;
        col += C3 * blob(p, d, r) * 0.85;
        col = col / (1.0 + col);
        col = pow(col, vec3(0.85));
        vec3 bg = vec3(0.039, 0.043, 0.063);
        gl_FragColor = vec4(bg + col, 1.0);
      }
    `;

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('[hubdevelop] shader compile error:', gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    }

    const vs = compile(gl.VERTEX_SHADER, vsSrc);
    const fs = compile(gl.FRAGMENT_SHADER, fsSrc);
    if (!vs || !fs) return 'shader-error';

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('[hubdevelop] program link error:', gl.getProgramInfoLog(prog));
      return 'link-error';
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'a_pos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uRes = gl.getUniformLocation(prog, 'u_res');

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.floor(window.innerWidth * dpr));
      const h = Math.max(1, Math.floor(window.innerHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize);
    resize();

    let running = true;
    let elapsed = 0;
    let last = performance.now();

    function frame(now) {
      if (!running) return;
      const dt = (now - last) / 1000;
      last = now;
      elapsed += dt;
      resize();
      gl.uniform1f(uTime, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);

    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) {
        last = performance.now();
        requestAnimationFrame(frame);
      }
    });

    return 'ok';
  };

  window.hubdevelop = hubdevelop;
})();
