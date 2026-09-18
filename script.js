// Web Audio API Synthesizer Helper
class MagicalSoundEngine {
  constructor() {
    this.ctx = null;
    this.volumeNode = null;
    this.userVolume = 0.5;
    this.bgMusic = null;
    this.isPlayingMusic = false;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();
    this.volumeNode = this.ctx.createGain();
    this.volumeNode.gain.setValueAtTime(this.userVolume, this.ctx.currentTime);
    this.volumeNode.connect(this.ctx.destination);
  }

  setVolume(val) {
    this.userVolume = val;
    if (this.volumeNode) {
      this.volumeNode.gain.setValueAtTime(val, this.ctx.currentTime);
    }
    if (this.bgMusic) {
      this.bgMusic.volume = val;
    }
  }

  // Synthesize realistic page turning sound
  playPageTurn() {
    this.init();
    const now = this.ctx.currentTime;
    
    // Low frequency rustle
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(80, now);
    osc1.frequency.exponentialRampToValueAtTime(10, now + 0.5);
    
    gain1.gain.setValueAtTime(0.0, now);
    gain1.gain.linearRampToValueAtTime(0.3, now + 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    
    // High frequency rustle (white noise emulation)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(2000, now);
    osc2.frequency.setValueAtTime(1200, now + 0.1);
    
    gain2.gain.setValueAtTime(0.0, now);
    gain2.gain.linearRampToValueAtTime(0.04, now + 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    // Apply lowpass filter for Ghibli warmth
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);

    osc1.connect(gain1);
    osc2.connect(gain2);
    
    gain1.connect(filter);
    gain2.connect(filter);
    filter.connect(this.volumeNode);
    
    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.6);
    osc2.stop(now + 0.6);
  }

  // Synthesize soft magical sparkle sound
  playMagicalSparks() {
    this.init();
    const now = this.ctx.currentTime;
    
    // Play multiple chime-like notes quickly
    const notes = [880, 1100, 1320, 1760, 2200];
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      
      gain.gain.setValueAtTime(0.0, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.5);
      
      osc.connect(gain);
      gain.connect(this.volumeNode);
      
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.6);
    });
  }

  // Synthesize error buzzer/shake sound
  playErrorSound() {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.25);
    
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    osc.connect(gain);
    gain.connect(this.volumeNode);
    
    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Synthesize bow release arrow swoosh sound
  playArrowSwoosh() {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.4);
    
    gain.gain.setValueAtTime(0.0, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    
    osc.connect(gain);
    gain.connect(this.volumeNode);
    
    osc.start(now);
    osc.stop(now + 0.5);
  }

  // Synthesize heart explosion sound
  playHeartBloom() {
    this.init();
    const now = this.ctx.currentTime;
    
    // Sub-bass thump
    const subOsc = this.ctx.createOscillator();
    const subGain = this.ctx.createGain();
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(60, now);
    subOsc.frequency.linearRampToValueAtTime(30, now + 0.3);
    
    subGain.gain.setValueAtTime(0.3, now);
    subGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    
    subOsc.connect(subGain);
    subGain.connect(this.volumeNode);
    subOsc.start(now);
    subOsc.stop(now + 0.4);

    // Chime sweep upwards
    this.playMagicalSparks();
  }

  // Synthesize wood/rustle growth sound
  playTreeGrowth() {
    this.init();
    const now = this.ctx.currentTime;
    
    // Gentle recurring creaks
    for (let i = 0; i < 8; i++) {
      const delay = i * 0.4;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(120 + Math.random() * 40, now + delay);
      osc.frequency.exponentialRampToValueAtTime(50, now + delay + 0.2);
      
      gain.gain.setValueAtTime(0.0, now + delay);
      gain.gain.linearRampToValueAtTime(0.05, now + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + 0.25);
      
      osc.connect(gain);
      gain.connect(this.volumeNode);
      
      osc.start(now + delay);
      osc.stop(now + delay + 0.3);
    }
  }

  // Initialize and play background music
  startMusic() {
    if (this.isPlayingMusic) return;
    this.init();

    const musicUrl = BACKGROUND_MUSIC_URL;
    this.bgMusic = new Audio(musicUrl);
    this.bgMusic.loop = true;
    this.bgMusic.volume = this.userVolume;
    this.bgMusic.preload = 'auto';

    const playPromise = this.bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        this.isPlayingMusic = true;
      }).catch(() => {
        console.log('Background music URL unavailable; falling back to synth theme.');
        this.runSyntheticMusicLoop();
      });
    }
  }

  // A soft procedural music generator as fallback
  runSyntheticMusicLoop() {
    this.isPlayingMusic = true;
    const melody = [523.25, 587.33, 659.25, 783.99, 880.00, 987.77, 1046.50]; // C Major/Pentatonic Ghibli vibes
    let beat = 0;

    const playNextNote = () => {
      if (!this.isPlayingMusic) return;
      this.init();
      
      const now = this.ctx.currentTime;
      // Arpeggiate soft piano notes
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      // Pick dynamic peaceful notes
      const note = melody[Math.floor(Math.random() * melody.length)];
      osc.frequency.setValueAtTime(note / 2, now); // Low accompaniment
      
      gain.gain.setValueAtTime(0.0, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);
      
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      
      osc.connect(gain);
      gain.connect(filter);
      filter.connect(this.volumeNode);
      
      osc.start(now);
      osc.stop(now + 3.0);
      
      // Schedule next note (softly spaced)
      setTimeout(playNextNote, 1500 + Math.random() * 1000);
    };

    playNextNote();
  }

  toggleMusic() {
    if (this.isPlayingMusic) {
      if (this.bgMusic) {
        this.bgMusic.pause();
      }
      this.isPlayingMusic = false;
    } else {
      if (this.bgMusic && this.bgMusic.src && !this.bgMusic.src.includes('undefined')) {
        this.bgMusic.play().catch(() => this.runSyntheticMusicLoop());
      } else {
        this.runSyntheticMusicLoop();
      }
    }
    return this.isPlayingMusic;
  }
}

const BACKGROUND_MUSIC_URL = 'Paaro - NaaSongs.mp3';

const sounds = new MagicalSoundEngine();

// Ambient floating particles canvas system
class AmbientSystem {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  spawn() {
    if (this.particles.length < 80) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: this.canvas.height + 20,
        r: Math.random() * 4 + 1,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: -(Math.random() * 1.5 + 0.5),
        color: `hsla(${330 + Math.random() * 50}, 100%, 80%, ${Math.random() * 0.5 + 0.3})`, // pastel pink/lavender/peach
        alpha: Math.random() * 0.5 + 0.5,
        fadeSpeed: Math.random() * 0.005 + 0.002
      });
    }
  }

  update() {
    this.spawn();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.speedX;
      p.y += p.speedY;
      p.alpha -= p.fadeSpeed;
      
      if (p.alpha <= 0 || p.y < -10) {
        this.particles.splice(i, 1);
        continue;
      }
      
      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.shadowColor = p.color;
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  animate() {
    this.update();
    requestAnimationFrame(() => this.animate());
  }
}

const ambientBg = new AmbientSystem('ambient-particles');
ambientBg.animate();

// SCENE CONTROLLERS
let currentSceneIndex = 1;

function navigateToScene(sceneId) {
  document.querySelectorAll('.scene').forEach(scene => {
    scene.classList.remove('active');
  });
  const target = document.getElementById(sceneId);
  if (target) {
    target.classList.add('active');
  }
}

// Scene 1: Opening Book Click
const mainBook = document.getElementById('main-book');
const bookCover = document.getElementById('book-cover');

function openBookStory(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  if (bookCover.classList.contains('open')) return;

  sounds.playPageTurn();
  bookCover.classList.add('open');

  setTimeout(() => {
    sounds.playPageTurn();
    document.getElementById('intro-page').classList.add('turn');

    setTimeout(() => {
      navigateToScene('scene-password');
      document.getElementById('password-input').focus();
    }, 1200);
  }, 2800);
}

mainBook.addEventListener('click', openBookStory);
bookCover.addEventListener('click', openBookStory);

// Scene 2: Vintage Password Box
const passwordForm = document.getElementById('password-form');
const passwordInput = document.getElementById('password-input');
const vintageCard = document.querySelector('.vintage-page-card');

passwordInput.addEventListener('input', (e) => {
  const val = e.target.value.toUpperCase();
  e.target.value = val;
  
  if (val.length === 4) {
    if (val === 'M431') {
      // Correct!
      vintageCard.classList.remove('incorrect');
      vintageCard.classList.add('correct');
      sounds.playMagicalSparks();
      
      setTimeout(() => {
        // Spin page turn transition logic out
        gsap.to(vintageCard, {
          rotateY: -180,
          opacity: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          onComplete: () => {
            navigateToScene('scene-cupid');
            initCupidScene();
          }
        });
      }, 1000);
    } else {
      // Incorrect
      vintageCard.classList.add('incorrect', 'shake');
      sounds.playErrorSound();
      
      setTimeout(() => {
        vintageCard.classList.remove('shake');
      }, 500);
      
      // Clear input
      setTimeout(() => {
        passwordInput.value = '';
        vintageCard.classList.remove('incorrect');
      }, 1200);
    }
  }
});

// Start Overlay Click
const startExperienceBtn = document.getElementById('start-experience-btn');
const audioOverlay = document.getElementById('audio-overlay');

function startExperience() {
  audioOverlay.style.display = 'none';
  document.getElementById('music-widget').classList.add('visible');
  sounds.startMusic();
}

startExperienceBtn.addEventListener('click', (event) => {
  event.preventDefault();
  event.stopPropagation();
  startExperience();
});

// Music Toggle Widget
const musicToggleBtn = document.getElementById('music-toggle-btn');
const volumeSlider = document.getElementById('volume-slider');

musicToggleBtn.addEventListener('click', () => {
  const isPlaying = sounds.toggleMusic();
  musicToggleBtn.style.opacity = isPlaying ? 1 : 0.5;
});

volumeSlider.addEventListener('input', (e) => {
  sounds.setVolume(parseFloat(e.target.value));
});


// SCENE 3: Cupid Bow Arrow Shooting Game Physics
let cupidAnimId = null;
function initCupidScene() {
  const canvas = document.getElementById('cupid-canvas');
  const ctx = canvas.getContext('2d');
  
  function resizeCupidCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCupidCanvas();
  window.addEventListener('resize', resizeCupidCanvas);

  // Archery game states
  let isDragging = false;
  const bow = {
    x: 150,
    y: window.innerHeight / 2,
    radius: 70,
    pullX: 150,
    pullY: window.innerHeight / 2
  };
  
  const heart = {
    x: window.innerWidth - 200,
    y: window.innerHeight / 2 - 50,
    size: 45,
    glow: 0,
    glowDirection: 1,
    isHit: false,
    yVelocity: 0
  };

  const arrow = {
    x: bow.x,
    y: bow.y,
    vx: 0,
    vy: 0,
    length: 60,
    angle: 0,
    isShot: false,
    trail: []
  };

  // Drag physics logic
  function getMousePos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function handleStart(e) {
    const pos = getMousePos(e);
    // Click close to the bow string
    const dist = Math.hypot(pos.x - bow.x, pos.y - bow.y);
    if (dist < 100 && !arrow.isShot) {
      isDragging = true;
    }
  }

  function handleMove(e) {
    if (!isDragging) return;
    const pos = getMousePos(e);
    
    // Constrain pull distance
    const dx = pos.x - bow.x;
    const dy = pos.y - bow.y;
    const dist = Math.hypot(dx, dy);
    const maxPull = 90;
    
    if (dist > maxPull) {
      bow.pullX = bow.x + (dx / dist) * maxPull;
      bow.pullY = bow.y + (dy / dist) * maxPull;
    } else {
      bow.pullX = pos.x;
      bow.pullY = pos.y;
    }

    arrow.angle = Math.atan2(bow.y - bow.pullY, bow.x - bow.pullX);
  }

  function handleEnd() {
    if (!isDragging) return;
    isDragging = false;
    
    // Shoot physical arrow based on elastic pull strength
    sounds.playArrowSwoosh();
    const dx = bow.x - bow.pullX;
    const dy = bow.y - bow.pullY;
    const strength = 0.22;
    
    arrow.vx = dx * strength;
    arrow.vy = dy * strength;
    arrow.isShot = true;
  }

  canvas.addEventListener('mousedown', handleStart);
  canvas.addEventListener('mousemove', handleMove);
  canvas.addEventListener('mouseup', handleEnd);
  canvas.addEventListener('touchstart', handleStart);
  canvas.addEventListener('touchmove', handleMove);
  canvas.addEventListener('touchend', handleEnd);

  function drawHeart(x, y, size, color) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.quadraticCurveTo(x, y, x - size / 2, y);
    ctx.quadraticCurveTo(x - size, y, x - size, y + size / 2);
    ctx.quadraticCurveTo(x - size, y + size * 0.75, x - size / 2, y + size * 0.95);
    ctx.lineTo(x, y + size * 1.3);
    ctx.lineTo(x + size / 2, y + size * 0.95);
    ctx.quadraticCurveTo(x + size, y + size * 0.75, x + size, y + size / 2);
    ctx.quadraticCurveTo(x + size, y, x + size / 2, y);
    ctx.quadraticCurveTo(x, y, x, y + size / 4);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  function drawCupidArchery() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Glow effect
    heart.glow += 0.03 * heart.glowDirection;
    if (heart.glow > 1 || heart.glow < 0) heart.glowDirection *= -1;

    // Draw Target Glowing Heart
    ctx.save();
    ctx.shadowBlur = 20 + heart.glow * 15;
    ctx.shadowColor = '#ff4d79';
    drawHeart(heart.x, heart.y, heart.size, '#ff4d79');
    ctx.restore();

    // Draw Bow
    ctx.save();
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(bow.x - 20, bow.y, bow.radius, -Math.PI / 2.2, Math.PI / 2.2);
    ctx.stroke();

    // Draw Bow String
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(bow.x - 20, bow.y - bow.radius * 0.95);
    ctx.lineTo(bow.pullX, bow.pullY);
    ctx.lineTo(bow.x - 20, bow.y + bow.radius * 0.95);
    ctx.stroke();
    ctx.restore();

    // Draw Arrow
    if (!arrow.isShot) {
      arrow.x = bow.pullX;
      arrow.y = bow.pullY;
    } else {
      // Apply gravity physics slightly
      arrow.vy += 0.08;
      arrow.x += arrow.vx;
      arrow.y += arrow.vy;
      arrow.angle = Math.atan2(arrow.vy, arrow.vx);

      // Arrow Particle Trail
      arrow.trail.push({ x: arrow.x, y: arrow.y, alpha: 1 });
      if (arrow.trail.length > 15) arrow.trail.shift();

      ctx.save();
      arrow.trail.forEach((p, idx) => {
        p.alpha -= 0.05;
        ctx.fillStyle = `rgba(255, 141, 161, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3 * (idx / arrow.trail.length), 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    }

    // Draw Arrow body
    ctx.save();
    ctx.translate(arrow.x, arrow.y);
    ctx.rotate(arrow.angle);
    ctx.strokeStyle = '#e5c158';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(-arrow.length, 0);
    ctx.stroke();

    // Arrow feather
    ctx.fillStyle = '#ff7597';
    ctx.beginPath();
    ctx.moveTo(-arrow.length, 0);
    ctx.lineTo(-arrow.length - 10, -5);
    ctx.lineTo(-arrow.length - 8, 0);
    ctx.lineTo(-arrow.length - 10, 5);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Bow string back animation elastic recovery
    if (!isDragging && !arrow.isShot) {
      bow.pullX += (bow.x - bow.pullX) * 0.25;
      bow.pullY += (bow.y - bow.pullY) * 0.25;
    }

    // Collision Detection
    const collisionDist = Math.hypot(arrow.x - heart.x, arrow.y - (heart.y + heart.size / 2));
    if (collisionDist < heart.size && !heart.isHit) {
      heart.isHit = true;
      sounds.playHeartBloom();
      
      // Sparkle explosion triggers transition
      gsap.to(heart, {
        size: 100,
        y: canvas.height + 150,
        duration: 2.2,
        ease: 'power1.in',
        onComplete: () => {
          cancelAnimationFrame(cupidAnimId);
          navigateToScene('scene-garden');
          initGardenTreeScene();
        }
      });
    }

    // Reset if misses bounds
    if (arrow.x > canvas.width + 100 || arrow.y > canvas.height + 100) {
      arrow.isShot = false;
      arrow.trail = [];
      bow.pullX = bow.x;
      bow.pullY = bow.y;
    }

    cupidAnimId = requestAnimationFrame(drawCupidArchery);
  }
  
  drawCupidArchery();
}

// SCENE 4: Procedural Magical Growing Tree
let gardenAnimId = null;
function initGardenTreeScene() {
  const canvas = document.getElementById('tree-canvas');
  const ctx = canvas.getContext('2d');

  function resizeGarden() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeGarden();
  // We already have a listener, but this ensures it matches
  window.addEventListener('resize', resizeGarden);

  sounds.playTreeGrowth();

  const maxDepth = 6;
  let leavesSeeded = false;
  let treeGrowthComplete = false;

  class Branch {
    constructor(startX, startY, len, angle, width, color, depth) {
      this.startX = startX;
      this.startY = startY;
      this.len = len;
      this.angle = angle;
      this.width = width;
      this.color = color;
      this.depth = depth;
      this.currentLen = 0;
      this.children = [];
      this.isFullyGrown = false;
      this.endX = startX;
      this.endY = startY;
    }

    grow() {
      if (this.currentLen < this.len) {
        this.currentLen += (this.len - this.currentLen) * 0.08 + 0.5;
        if (this.currentLen > this.len) {
            this.currentLen = this.len;
        }
      } else {
        this.isFullyGrown = true;
      }

      this.endX = this.startX + Math.cos(this.angle) * this.currentLen;
      this.endY = this.startY + Math.sin(this.angle) * this.currentLen;
      
      if (this.isFullyGrown && this.depth < maxDepth && this.children.length === 0) {
        const branchesCount = Math.floor(Math.random() * 2) + 2; // 2 or 3 branches
        for (let i = 0; i < branchesCount; i++) {
          const spread = (Math.random() * 0.8 + 0.2); 
          const newAngle = this.angle + (i === 0 ? -spread : spread); 
          const newLen = this.len * (0.6 + Math.random() * 0.2);
          const newWidth = this.width * 0.7;
          this.children.push(new Branch(this.endX, this.endY, newLen, newAngle, newWidth, this.color, this.depth + 1));
        }
      }
    }
  }

  const isMobile = window.innerWidth <= 600;
  const treeRootX = window.innerWidth * (isMobile ? 0.75 : 0.75);
  const treeRootY = window.innerHeight;
  const initialLen = window.innerHeight * (isMobile ? 0.22 : 0.25);
  const treeStructure = new Branch(treeRootX, treeRootY, initialLen, -Math.PI / 2, isMobile ? 10 : 16, '#5e382a', 0);

  const leaves = [];
  const leafColors = ['#ff7597', '#ff4d79', '#ffd769', '#d88bff', '#7ea4ff', '#ffaa73', '#ffffff'];
  const terminalBranches = [];
  
  function drawTree(branch) {
    branch.grow();
    
    ctx.beginPath();
    ctx.moveTo(branch.startX, branch.startY);
    ctx.lineTo(branch.endX, branch.endY);
    ctx.strokeStyle = branch.color;
    ctx.lineWidth = branch.width;
    ctx.lineCap = 'round';
    ctx.stroke();

    if (branch.children.length > 0) {
      branch.children.forEach(child => drawTree(child));
    } else if (branch.isFullyGrown && branch.depth === maxDepth) {
      if (!terminalBranches.includes(branch)) {
        terminalBranches.push(branch);
      }
    }
  }

  function drawHeartLeaf(x, y, size, color, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.beginPath();
    ctx.moveTo(0, size / 4);
    ctx.quadraticCurveTo(0, 0, -size / 2, 0);
    ctx.quadraticCurveTo(-size, 0, -size, size / 2);
    ctx.quadraticCurveTo(-size, size * 0.75, -size / 2, size * 0.95);
    ctx.lineTo(0, size * 1.3);
    ctx.lineTo(size / 2, size * 0.95);
    ctx.quadraticCurveTo(size, size * 0.75, size, size / 2);
    ctx.quadraticCurveTo(size, 0, size / 2, 0);
    ctx.quadraticCurveTo(0, 0, 0, size / 4);
    ctx.closePath();

    const glowGrad = ctx.createRadialGradient(0, 0, size * 0.08, 0, 0, size * 1.2);
    glowGrad.addColorStop(0, '#ffffff');
    glowGrad.addColorStop(0.35, color);
    glowGrad.addColorStop(1, '#2c0c1b');
    ctx.fillStyle = glowGrad;
    ctx.shadowBlur = size * 0.9;
    ctx.shadowColor = color;
    ctx.fill();
    ctx.restore();
  }

  function checkTreeFullyGrown(branch) {
      if (!branch.isFullyGrown) return false;
      if (branch.depth < maxDepth && branch.children.length === 0) return false;
      for (let child of branch.children) {
          if (!checkTreeFullyGrown(child)) return false;
      }
      return true;
  }

  function seedHeartLeaves() {
    terminalBranches.forEach(branch => {
        const numLeaves = Math.floor(Math.random() * 4) + 4;
        for (let i = 0; i < numLeaves; i++) {
            const x = branch.endX + (Math.random() - 0.5) * 40;
            const y = branch.endY + (Math.random() - 0.5) * 40;
            
            // INCREASED LEAF SIZE as requested
            const leafBaseSize = isMobile ? (Math.random() * 8 + 14) : (Math.random() * 12 + 18);
            
            leaves.push({
                x,
                y,
                baseX: x,
                baseY: y,
                color: leafColors[Math.floor(Math.random() * leafColors.length)],
                size: leafBaseSize,
                rot: Math.random() * Math.PI * 2,
                growth: 0,
                falling: false,
                vy: 0,
                vx: 0,
                phase: Math.random() * Math.PI * 2,
                drift: (Math.random() - 0.5) * 0.9,
                rotVel: (Math.random() - 0.5) * 0.12,
                branch: branch
            });
        }
    });
  }

  function updateGarden() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const skyGlow = ctx.createRadialGradient(treeRootX, treeRootY * 0.38, 20, treeRootX, treeRootY * 0.38, window.innerWidth * 0.8);
    skyGlow.addColorStop(0, 'rgba(255, 210, 180, 0.22)');
    skyGlow.addColorStop(0.5, 'rgba(255, 128, 170, 0.08)');
    skyGlow.addColorStop(1, 'rgba(11, 7, 26, 0)');
    ctx.fillStyle = skyGlow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawTree(treeStructure);

    if (!treeGrowthComplete && checkTreeFullyGrown(treeStructure)) {
        treeGrowthComplete = true;
    }

    if (treeGrowthComplete && !leavesSeeded) {
        seedHeartLeaves();
        leavesSeeded = true;
        setTimeout(() => triggerFriendshipMessage(), 2500);
    }

    leaves.forEach((l, idx) => {
      if (l.growth < 1) l.growth += 0.015;
      const size = l.size * l.growth;
      const time = Date.now() * 0.002;
      const sway = Math.sin(time + l.phase + idx) * 0.22;

      if (!l.falling) {
        l.x = l.baseX + Math.sin(time * 1.5 + l.phase) * 3.2;
        l.y = l.baseY + Math.sin(time * 1.8 + l.phase) * 2.2;

        if (treeGrowthComplete && Math.random() < 0.003) {
          l.falling = true;
          l.vy = 0.15 + Math.random() * 0.28;
          l.vx = (Math.random() - 0.5) * 0.55 + l.drift * 0.5;
          l.rotVel = (Math.random() - 0.5) * 0.07;
        }
      }

      if (l.falling) {
        l.y += l.vy;
        l.x += l.vx + Math.sin(time + l.phase) * 0.08;
        l.vy += 0.008;
        l.rot += l.rotVel;

        if (l.y > window.innerHeight + 30 || l.x < 0 || l.x > window.innerWidth) {
          const branch = terminalBranches[Math.floor(Math.random() * terminalBranches.length)];
          if (branch) {
              l.baseX = branch.endX + (Math.random() - 0.5) * 40;
              l.baseY = branch.endY + (Math.random() - 0.5) * 40;
              l.x = l.baseX;
              l.y = l.baseY;
              l.growth = 0;
              l.falling = false;
              l.vy = 0;
              l.vx = 0;
              l.phase = Math.random() * Math.PI * 2;
              l.drift = (Math.random() - 0.5) * 0.9;
          }
        }
      }

      drawHeartLeaf(l.x + Math.sin(time + idx) * 1.2, l.y + Math.cos(time + idx) * 1.1, size, l.color, l.rot + sway);
    });

    gardenAnimId = requestAnimationFrame(updateGarden);
  }

  updateGarden();
}
// SCENE 5 & 6: Friendship Day Message & Polaroid Memory Gallery
function triggerFriendshipMessage() {
  const layer = document.getElementById('garden-message-layer');

  gsap.to(layer, {
    opacity: 1,
    duration: 2.2,
    ease: 'power2.out'
  });
}

const goToLetterBtn = document.getElementById('go-to-letter-btn');
if (goToLetterBtn) {
  goToLetterBtn.addEventListener('click', () => {
    sounds.playPageTurn();
    cancelAnimationFrame(gardenAnimId);
    navigateToScene('scene-letter');
  });
}

const goToGalleryBtn = document.getElementById('go-to-gallery-btn');
if (goToGalleryBtn) {
  goToGalleryBtn.addEventListener('click', () => {
    sounds.playPageTurn();
    navigateToScene('scene-gallery');
    setupPolaroids();
  });
}

function setupPolaroids() {
  const gallery = document.getElementById('polaroid-gallery');
  gallery.innerHTML = ''; // Prevent duplicates if clicked again
  
  const memories = [
    { src: 'manasa1.jpg', caption: 'Our favorite smile' },
    { src: 'manasa2.jpg', caption: 'Sweet memories' },
    { src: 'manasa3.jpg', caption: 'Always together' },
    { src: 'manasa4.jpg', caption: 'Happy moments' },
    { src: 'manasa5.jpg', caption: 'Best friend forever' }
  ];

  memories.forEach((mem, idx) => {
    const card = document.createElement('div');
    card.classList.add('polaroid');
    
    // Responsive coordinate mapping
    const isMobile = window.innerWidth <= 600;
    if (!isMobile) {
      const isLeft = idx % 2 === 0;
      const topVal = 18 + idx * 16; 
      const leftVal = isLeft ? (12 + Math.random() * 12) : (52 + Math.random() * 12);
      card.style.top = `${topVal}%`;
      card.style.left = `${leftVal}%`;

      const rotation = (Math.random() * 16 - 8);
      card.style.transform = `rotate(${rotation}deg)`;
      
      // Swing animation
      gsap.fromTo(card, {
        opacity: 0,
        scale: 0.5,
        y: 50
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        delay: idx * 0.3,
        duration: 1.2,
        ease: 'back.out(1.7)',
        onComplete: () => {
          gsap.to(card, {
            rotation: rotation + 3,
            repeat: -1,
            yoyo: true,
            duration: 3.5 + Math.random() * 1.5,
            ease: 'power1.inOut'
          });
        }
      });
    } else {
      // Mobile stack card entry
      gsap.fromTo(card, {
        opacity: 0,
        scale: 0.8,
        y: 30
      }, {
        opacity: 1,
        scale: 1,
        y: 0,
        delay: idx * 0.25,
        duration: 0.8,
        ease: 'power2.out'
      });
    }
    
    // Create Polaroid contents
    const img = document.createElement('img');
    img.src = mem.src;
    img.alt = mem.caption;
    
    img.onerror = () => {
      img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 100 100"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ff9eb5"/><stop offset="100%" stop-color="%23c0a9ff"/></linearGradient></defs><rect width="100" height="100" fill="url(%23g)"/><text x="50" y="55" font-family="sans-serif" font-size="25" fill="white" text-anchor="middle">❤️</text></svg>`;
    };

    const caption = document.createElement('div');
    caption.classList.add('polaroid-caption');
    caption.innerText = mem.caption;

    card.appendChild(img);
    card.appendChild(caption);
    gallery.appendChild(card);

    // Lightbox zoom trigger
    card.addEventListener('click', (e) => {
      e.stopPropagation();
      openLightbox(img.src, mem.caption);
    });
  });

  // Automatically load the beating heart ending after zoom clicks
  let viewedPhotos = new Set();
  const polaroids = document.querySelectorAll('.polaroid');
  polaroids.forEach((card, idx) => {
    card.addEventListener('click', () => {
      viewedPhotos.add(idx);
      if (viewedPhotos.size === polaroids.length) {
        setTimeout(triggerFinalEnding, 4000);
      }
    });
  });
}

// Lightbox zoom view
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');

function openLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxCaption.innerText = caption;
  lightbox.classList.add('active');
  sounds.playPageTurn();
}

function closeLightbox() {
  lightbox.classList.remove('active');
}

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', closeLightbox);

// SCENE 8: Final Beating Heart Ending View
function triggerFinalEnding() {
  // Fade out Polaroids and reveal ending layout
  gsap.to('.polaroid', {
    opacity: 0,
    scale: 0.8,
    duration: 1.5,
    stagger: 0.15,
    pointerEvents: 'none'
  });
  
  gsap.to('.gallery-header-layer', {
    opacity: 0,
    duration: 1.0
  });

  const ending = document.getElementById('ending-layer');
  gsap.to(ending, {
    opacity: 1,
    duration: 2.2,
    ease: 'power2.out'
  });
}

