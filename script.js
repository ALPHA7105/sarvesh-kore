<script>
// ---------- Hero Stars ----------
const starCanvas = document.getElementById('starfield');
const sctx = starCanvas.getContext('2d');
let stars = [];
const numStars = 300;

function resizeStarCanvas() {
  starCanvas.width = window.innerWidth;
  starCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeStarCanvas);
resizeStarCanvas();

for (let i = 0; i < numStars; i++) {
  stars.push({
    x: Math.random() * starCanvas.width,
    y: Math.random() * starCanvas.height,
    size: Math.random() * 2,
    speed: Math.random() * 0.5 + 0.1,
    alpha: Math.random()
  });
}

function drawStars() {
  sctx.clearRect(0,0,starCanvas.width, starCanvas.height);
  sctx.fillStyle = '#0b0c10';
  sctx.fillRect(0,0, starCanvas.width, starCanvas.height);
  
  stars.forEach(star => {
    star.alpha += (Math.random()-0.5)*0.05;
    if(star.alpha < 0.2) star.alpha = 0.2;
    if(star.alpha > 1) star.alpha = 1;

    sctx.fillStyle = `rgba(255,255,255,${star.alpha})`;
    sctx.beginPath();
    sctx.arc(star.x, star.y, star.size,0,Math.PI*2);
    sctx.fill();

    star.y += star.speed;
    if(star.y > starCanvas.height) star.y = 0;
  });
}

// ---------- Background Shapes + Particle Trails + Light Glows ----------
const bgCanvas = document.getElementById('shapes');
const bctx = bgCanvas.getContext('2d');

let shapes = [];
const numShapes = 40;
let particles = [];
const numParticles = 80;
let glows = [];
const numGlows = 15;

function resizeBGCanvas(){
  bgCanvas.width = window.innerWidth;
  bgCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeBGCanvas);
resizeBGCanvas();

// Shapes
for(let i=0;i<numShapes;i++){
  shapes.push({
    x: Math.random()*bgCanvas.width,
    y: Math.random()*bgCanvas.height,
    size: Math.random()*60+20,
    speed: Math.random()*0.2+0.05,
    type: Math.random()>0.5?'circle':'triangle',
    alpha: Math.random()*0.3+0.05
  });
}
// Particles
for(let i=0;i<numParticles;i++){
  particles.push({
    x: Math.random()*bgCanvas.width,
    y: Math.random()*bgCanvas.height,
    size: Math.random()*3+1,
    speedX: (Math.random()-0.5)*0.2,
    speedY: (Math.random()-0.5)*0.2,
    alpha: Math.random()*0.5+0.1
  });
}
// Light glows
for(let i=0;i<numGlows;i++){
  glows.push({
    x: Math.random()*bgCanvas.width,
    y: Math.random()*bgCanvas.height,
    radius: Math.random()*100+50,
    speedX: (Math.random()-0.5)*0.05,
    speedY: (Math.random()-0.5)*0.05,
    alpha: Math.random()*0.2+0.05
  });
}

function drawBG(){
  bctx.clearRect(0,0,bgCanvas.width,bgCanvas.height);

  // Shapes
  shapes.forEach(s=>{
    bctx.fillStyle = `rgba(102,252,241,${s.alpha})`;
    if(s.type==='circle'){
      bctx.beginPath();
      bctx.arc(s.x,s.y,s.size/2,0,Math.PI*2);
      bctx.fill();
    } else{
      bctx.beginPath();
      bctx.moveTo(s.x,s.y-s.size/2);
      bctx.lineTo(s.x-s.size/2,s.y+s.size/2);
      bctx.lineTo(s.x+s.size/2,s.y+s.size/2);
      bctx.closePath();
      bctx.fill();
    }
    s.y += s.speed;
    if(s.y>bgCanvas.height+s.size) s.y=-s.size;
  });

  // Particles
  particles.forEach(p=>{
    bctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
    bctx.beginPath();
    bctx.arc(p.x,p.y,p.size,0,Math.PI*2);
    bctx.fill();
    p.x += p.speedX;
    p.y += p.speedY;
    if(p.x>bgCanvas.width) p.x=0;
    if(p.x<0) p.x=bgCanvas.width;
    if(p.y>bgCanvas.height) p.y=0;
    if(p.y<0) p.y=bgCanvas.height;
  });

  // Glows
  glows.forEach(g=>{
    let gradient = bctx.createRadialGradient(g.x,g.y,0,g.x,g.y,g.radius);
    gradient.addColorStop(0, `rgba(102,252,241,${g.alpha})`);
    gradient.addColorStop(1, 'rgba(102,252,241,0)');
    bctx.fillStyle = gradient;
    bctx.beginPath();
    bctx.arc(g.x,g.y,g.radius,0,Math.PI*2);
    bctx.fill();
    g.x += g.speedX;
    g.y += g.speedY;
    if(g.x>bgCanvas.width) g.x=0;
    if(g.x<0) g.x=bgCanvas.width;
    if(g.y>bgCanvas.height) g.y=0;
    if(g.y<0) g.y=bgCanvas.height;
  });
}

// ---------- Animate All ----------
function animate(){
  drawStars();
  drawBG();
  requestAnimationFrame(animate);
}
animate();

const btn = document.getElementById('knowMoreBtn');
const about = document.getElementById('about');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  
  about.scrollIntoView({ behavior: 'smooth' });

  // Add the active class after a short delay for animation
  setTimeout(() => {
    about.classList.add('active');
  }, 300);
});

// On page load, scroll to top and clear any hash
window.addEventListener('load', () => {
  window.scrollTo(0, 0);
  if(window.location.hash){
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }
});

// ---------- Mobile Nav Toggle ----------
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Always scroll to top on reload
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

  
</script>
