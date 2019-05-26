import React, { useEffect } from 'react';
import Particle from './utils/Particles';
import './styles/App.scss';

let mouse = { x: 0, y: 0 };
const particles = [];
let amount = 0;
let ctx;
let cw, ch;

function App() {
  let canvas = React.createRef();
  function particleRender() {
    requestAnimationFrame(particleRender);
    ctx.clearRect(0, 0, cw, ch);
    for (var i = 0; i < amount; i++) {
      particles[i].render();
    }
  }

  function init() {
    ctx = canvas.current.getContext('2d');
    cw = canvas.current.width;
    ch = canvas.current.height;
    ctx.clearRect(0, 0, cw, ch);

    ctx.font = 'bold ' + cw / 7 + 'px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Felix Wu', cw / 2.5, ch / 2);

    var data = ctx.getImageData(0, 0, cw, ch).data;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.globalCompositeOperation = 'screen';

    for (var i = 0; i < cw; i += Math.round(cw / 200)) {
      for (var j = 0; j < ch; j += Math.round(cw / 200)) {
        if (data[(i + j * cw) * 4 + 3] > 150) {
          particles.push(new Particle(i, j, cw, ch, ctx, mouse));
        }
      }
    }
    amount = particles.length;
  }

  useEffect(() => {
    window.addEventListener('resize', init);
    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('touchmove', e => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    });
    window.addEventListener('touchend', () => {
      mouse.x = -9999;
      mouse.y = -9999;
    });
    init();
    requestAnimationFrame(particleRender);
  });

  return (
    <div className="App">
      <canvas
        id="scene"
        ref={canvas}
        width={window.innerWidth}
        height={window.innerHeight}
      />
      <div className="App-1">
        <div>
          <span>
            Hey there <i className="ec ec-wave" />
          </span>
          <span>
            <span className="small">I'm</span>
          </span>
        </div>
        <div className="bio">
          I'm an 18-year-old <span className="blue">Software Engineer</span>{' '}
          focussed on <span className="red">JavaScript</span> and{' '}
          <span className="yellow">Python</span>
        </div>
      </div>
    </div>
  );
}

export default App;
