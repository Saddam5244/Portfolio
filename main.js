/**
 * SADDAM AHMAD - PORTFOLIO INTERACTION ENGINE
 * Features:
 * - Dynamic Hero Typing Effect
 * - Interactive Constellation Particle Canvas
 * - Live WeatherGPT Simulator (Real-time agricultural forecast & AI crop advisory)
 * - Project Filter & Dynamic Case Study Modal
 * - Interactive Resume Viewer Modal
 * - Contact Form Validation & Toast Notifications
 * - Web Audio Sound Synthesizer (Optional Cyber Sound FX)
 * - Navigation Scrollspy & Mobile Drawer
 */

function initAll() {
  initParticles();
  initTypingEffect();
  initNavbarScroll();
  initMobileDrawer();
  initWeatherGPTSimulator();
  initProjectFilters();
  initProjectModal();
  initResumeModal();
  initContactForm();
  initAudioFeedback();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

/* ==========================================================================
   1. DYNAMIC HERO TYPING EFFECT
   ========================================================================== */
function initTypingEffect() {
  const typingElement = document.getElementById('typing-text');
  if (!typingElement) return;

  const phrases = [
    'MERN Stack Developer',
    'Creator of WeatherGPT AI',
    'AI & Machine Learning Enthusiast',
    '54+ LeetCode DSA Problem Solver',
    'Front-End Intern (CodeAlpha)',
    'B.Tech CSE @ UPTTI Kanpur'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 45;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end of phrase
      isDeleting = true;
      typingSpeed = 1600;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   2. INTERACTIVE CONSTELLATION CANVAS PARTICLES
   ========================================================================== */
function initParticles() {
  const canvas = document.getElementById('canvas-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: null, y: null, radius: 120 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(Math.floor((width * height) / 16000), 65);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.speedX = (Math.random() - 0.5) * 0.8;
      this.speedY = (Math.random() - 0.5) * 0.8;
      this.color = Math.random() > 0.4 ? '#06b6d4' : '#8b5cf6';
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > width) this.speedX *= -1;
      if (this.y < 0 || this.y > height) this.speedY *= -1;

      // Mouse interactive repelling / attraction
      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = (dx / distance) * force * 3;
          const directionY = (dy / distance) * force * 3;
          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function connect() {
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 110) {
          const opacity = 1 - distance / 110;
          ctx.strokeStyle = `rgba(6, 182, 212, ${opacity * 0.22})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. NAVBAR SCROLL & ACTIVE SCROLLSPY
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .drawer-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Scrollspy
    const scrollY = window.pageYOffset;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* ==========================================================================
   4. MOBILE DRAWER NAVIGATION
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const backdrop = document.querySelector('.drawer-backdrop');
  const closeBtn = document.querySelector('.drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link, .btn-drawer-cta');

  function openDrawer() {
    drawer?.classList.add('open');
    backdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer?.classList.remove('open');
    backdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  toggleBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });
}

/* ==========================================================================
   5. INTERACTIVE WEATHERGPT LIVE SIMULATOR
   ========================================================================== */
const weatherDataStore = {
  Kanpur: {
    state: 'Uttar Pradesh',
    temp: '29°C',
    condition: 'Optimal Sun & Humid',
    humidity: '68%',
    wind: '12 km/h NE',
    rainRisk: '15% Low Risk',
    advisoryTitle: '🌾 Crop Advisory for Kanpur (Wheat & Mustard)',
    advisoryText: 'Soil moisture is optimal for germination. Low precipitation chance over 48 hours; irrigation is balanced. Ideal window for early morning fertilization.'
  },
  Azamgarh: {
    state: 'Uttar Pradesh (Home Town)',
    temp: '28°C',
    condition: 'Partially Cloudy',
    humidity: '72%',
    wind: '9 km/h E',
    rainRisk: '25% Mild',
    advisoryTitle: '🌱 Agricultural Guidance for Azamgarh District',
    advisoryText: 'High ambient humidity observed. Monitor paddy and vegetable crops for early leaf blight. Hold off nitrogen spraying until tomorrow noon.'
  },
  Lucknow: {
    state: 'Uttar Pradesh',
    temp: '30°C',
    condition: 'Sunny & Clear',
    humidity: '58%',
    wind: '14 km/h WNW',
    rainRisk: '5% Minimal',
    advisoryTitle: '🚜 Farming Intelligence for Central UP',
    advisoryText: 'Dry weather expected for the next 72 hours. Recommend light evening drip irrigation to preserve root vitality under rising afternoon temperatures.'
  },
  Delhi: {
    state: 'National Capital Region',
    temp: '31°C',
    condition: 'Mild Haze & Warm',
    humidity: '52%',
    wind: '16 km/h W',
    rainRisk: '10% Dry',
    advisoryTitle: '🌾 Peri-Urban Agronomy Insights',
    advisoryText: 'Low rainfall likelihood. Soil evaporation is elevated; ensure timely mulch covering for sensitive horticulture crops.'
  },
  Bengaluru: {
    state: 'Karnataka',
    temp: '24°C',
    condition: 'Scattered Showers',
    humidity: '82%',
    wind: '18 km/h SW',
    rainRisk: '75% High Rain',
    advisoryTitle: '🌧️ Heavy Moisture Protocol',
    advisoryText: 'High rainfall probability. Check field drainage channels immediately to prevent waterlogging around root crops and pulse fields.'
  },
  Mumbai: {
    state: 'Maharashtra',
    temp: '32°C',
    condition: 'Humid & Breezy',
    humidity: '85%',
    wind: '22 km/h W',
    rainRisk: '40% Moderate',
    advisoryTitle: '🌊 Coastal Agricultural Advisory',
    advisoryText: 'High humidity and gusty coastal breezes. Anchor greenhouse plastic shields and ensure fungal spray preparedness.'
  }
};

function initWeatherGPTSimulator() {
  const input = document.getElementById('sim-city-input');
  const searchBtn = document.getElementById('sim-search-btn');
  const presetPills = document.querySelectorAll('.preset-pill');

  const locNameEl = document.getElementById('sim-loc-name');
  const locStateEl = document.getElementById('sim-loc-state');
  const tempValEl = document.getElementById('sim-temp-val');
  const condEl = document.getElementById('sim-cond');
  const humEl = document.getElementById('sim-hum');
  const windEl = document.getElementById('sim-wind');
  const rainEl = document.getElementById('sim-rain');
  const advTitleEl = document.getElementById('sim-adv-title');
  const advTextEl = document.getElementById('sim-adv-text');

  function renderCityData(city) {
    const data = weatherDataStore[city] || generateCustomCityData(city);

    if (locNameEl) locNameEl.textContent = city;
    if (locStateEl) locStateEl.textContent = data.state;
    if (tempValEl) tempValEl.textContent = data.temp.replace('°C', '');
    if (condEl) condEl.textContent = data.condition;
    if (humEl) humEl.textContent = data.humidity;
    if (windEl) windEl.textContent = data.wind;
    if (rainEl) rainEl.textContent = data.rainRisk;
    if (advTitleEl) advTitleEl.textContent = data.advisoryTitle;
    if (advTextEl) advTextEl.textContent = data.advisoryText;

    // Pulse effect
    const card = document.querySelector('.sim-weather-card');
    if (card) {
      card.style.transform = 'scale(0.98)';
      setTimeout(() => (card.style.transform = 'scale(1)'), 150);
    }
  }

  function generateCustomCityData(cityName) {
    const randomTemp = Math.floor(Math.random() * 12) + 22;
    const randomHumidity = Math.floor(Math.random() * 30) + 55;
    const randomWind = Math.floor(Math.random() * 15) + 8;
    const randomRain = Math.floor(Math.random() * 60) + 10;

    return {
      state: 'Regional Analysis via WeatherGPT AI',
      temp: `${randomTemp}°C`,
      condition: randomRain > 45 ? 'Overcast & Rainy' : 'Fair Skies & Moderate Breeze',
      humidity: `${randomHumidity}%`,
      wind: `${randomWind} km/h`,
      rainRisk: `${randomRain}% Risk`,
      advisoryTitle: `🌾 Custom Crop & Weather Advisory for ${cityName}`,
      advisoryText: `AI climate analysis indicates average temperatures of ${randomTemp}°C with ${randomHumidity}% humidity. Soil nitrogen uptake is stable. Optimize harvest schedules around expected ${randomRain}% precipitation forecast.`
    };
  }

  presetPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      presetPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      const city = pill.dataset.city;
      if (input) input.value = city;
      renderCityData(city);
      showToast(`WeatherGPT forecast updated for ${city}`);
    });
  });

  searchBtn?.addEventListener('click', () => {
    const cityName = input?.value?.trim();
    if (cityName) {
      renderCityData(cityName);
      showToast(`WeatherGPT forecast loaded for ${cityName}`);
    }
  });

  input?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const cityName = input.value.trim();
      if (cityName) {
        renderCityData(cityName);
        showToast(`WeatherGPT forecast loaded for ${cityName}`);
      }
    }
  });
}

/* ==========================================================================
   6. PROJECT FILTER TABS
   ========================================================================== */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      projectCards.forEach((card) => {
        const categories = card.dataset.category || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(15px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/* ==========================================================================
   7. PROJECT CASE STUDY MODAL SYSTEM
   ========================================================================== */
const projectDetailsDB = {
  weathergpt: {
    title: 'WeatherGPT - AI Agriculture & Weather Intelligence',
    category: 'AI & Python Forecast System',
    repoUrl: 'https://github.com/Saddam5244/weatherGPT',
    badge: 'Flagship AI Project',
    summary:
      'An intelligent weather forecasting platform tailored for farmers and agriculture ("for farmer\'s"), integrating live meteorological data with OpenAI GPT intelligence to generate actionable crop advisories and localized climate alerts.',
    features: [
      'Natural language weather question answering for farmers',
      'Real-time temperature, humidity, wind, and precipitation risk radar analysis',
      'Automated crop protection advisories (soil moisture, fertilizer timing, pest warning)',
      'Satellite precipitation projection and multi-day agricultural planning'
    ],
    techStack: ['Python', 'OpenAI GPT API', 'Weather API', 'Climate Analytics', 'Streamlit / Web UI'],
    impact:
      'Empowers agricultural communities with easy-to-understand climate decisions, preventing crop damage caused by unexpected rain and optimized watering schedules.'
  },
  phishing: {
    title: 'AI-Based Phishing Detection & Prevention System',
    category: 'Full Stack MERN & Cyber Security',
    repoUrl: 'https://github.com/Saddam5244/cyberphising',
    badge: 'MERN Stack Security Platform',
    summary:
      'A full-stack cybersecurity defense platform built using MongoDB, Express.js, React.js, and Node.js that inspects communication channels and alerts users against modern social engineering and cyber threats.',
    features: [
      'Multi-channel threat scanning across Emails, SMS, and WhatsApp messages',
      'Heuristic URL inspection and look-alike domain detection (spoofed domains)',
      'Instant real-time alerts warning users before they click malicious links',
      'MongoDB threat history storage with user-awareness educational popups',
      'Secure RESTful backend APIs with responsive React frontend'
    ],
    techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs', 'HTML5', 'CSS3', 'JavaScript'],
    impact:
      'Successfully flags sophisticated spoofed domains and phishing links with high accuracy, protecting non-technical users from credential theft.'
  },
  placement: {
    title: 'Student Placement Prediction System',
    category: 'Machine Learning & Predictive Analytics',
    repoUrl: 'https://github.com/Saddam5244',
    badge: '100,000 Records ML Model',
    summary:
      'A machine learning classification pipeline that analyzes academic metrics, technical proficiencies, internships, and project histories across 100,000 student records to predict placement probabilities.',
    features: [
      'Exhaustive EDA, encoding, scaling, and correlation analysis on 100k data points',
      'Trained and benchmarked 4 models: Random Forest, Support Vector Machine (SVM), Logistic Regression, and KNN',
      'Hyperparameter tuning and feature importance ranking (CGPA, Internships, Technical skills)',
      'Actionable placement risk insights and skill enhancement recommendations'
    ],
    techStack: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn'],
    impact:
      'Delivered 91.2% classification accuracy on test sets, providing academic counselors with early identification of at-risk students.'
  },
  laundry: {
    title: 'Laundry Services Web Application',
    category: 'Responsive Web Application with EmailJS',
    repoUrl: 'https://github.com/Saddam5244',
    badge: 'Commercial Web Application',
    summary:
      'A user-friendly digital booking and cart management web application designed for laundry and dry-cleaning services with automated email receipts.',
    features: [
      'Interactive service catalog with dynamic price calculation',
      'Real-time add/remove cart drawer with automatic tax and total calculation',
      'Integrated EmailJS to dispatch instant booking confirmation emails to customers',
      'Mobile-first responsive interface with calendar date & time slot reservation'
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'EmailJS', 'DOM Manipulation'],
    impact:
      'Streamlined manual phone bookings into an automated digital workflow with instant email dispatch.'
  },
  agridmart: {
    title: 'Agridmart-AI / Smart Agriculture Platform',
    category: 'Smart Agri-Tech Web Solution',
    repoUrl: 'https://github.com/Saddam5244/Agridmart-AI',
    badge: 'AI Agriculture Platform',
    summary:
      'A comprehensive agriculture digital assistant supporting farming management, disease prevention, and marketplace resources.',
    features: [
      'Diagnostic tips for crop health and seasonal planting guides',
      'Clean interactive web portal tailored for rural and suburban farmers',
      'Resource directory for seeds, organic fertilizers, and tools'
    ],
    techStack: ['JavaScript', 'HTML5', 'CSS3', 'REST APIs'],
    impact:
      'Bridges the gap between modern agricultural science and local farming practices.'
  },
  visitorpass: {
    title: 'Visitor Pass Management System',
    category: 'Administrative Web Application',
    repoUrl: 'https://github.com/Saddam5244/visitor-pass-management-system1',
    badge: 'Full Stack Management System',
    summary:
      'A digital gate pass issuance and tracking system designed for educational institutions, corporate offices, and gated communities.',
    features: [
      'Digital visitor pass generation with unique ID and photo capture capability',
      'Check-in and check-out timestamp logs with purpose of visit tracking',
      'Administrative analytics dashboard for daily and monthly visitor trends'
    ],
    techStack: ['JavaScript', 'Node.js', 'Express.js', 'LocalStorage / Database'],
    impact:
      'Eliminated paper logbooks, enhancing security and visitor traceability.'
  },
  codealpha: {
    title: 'CodeAlpha Front-End Development Internship Suite',
    category: 'Front-End Engineering (3 Projects)',
    repoUrl: 'https://github.com/Saddam5244/CodeAlpha_FrontendDeveloper',
    badge: 'Internship Production Work',
    summary:
      'A suite of three modern front-end web applications constructed during the CodeAlpha Front-End Developer internship (Feb-Mar 2026).',
    features: [
      'Task 1: Dynamic Image Gallery with responsive filters, lightboxes, and smooth hover zooms',
      'Task 2: Interactive Music Player with play/pause, playlist navigation, progress scrubber, and audio synthesis',
      'Task 3: Modern Developer Portfolio with responsive mobile architecture'
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'Web APIs', 'Responsive Design'],
    impact:
      'Demonstrated high mastery of vanilla front-end techniques without external framework bloat.'
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('btn-close-project-modal');
  const detailButtons = document.querySelectorAll('.btn-card-details');

  const modalTitle = document.getElementById('modal-project-title');
  const modalCategory = document.getElementById('modal-project-category');
  const modalSummary = document.getElementById('modal-project-summary');
  const modalFeatures = document.getElementById('modal-project-features');
  const modalTech = document.getElementById('modal-project-tech');
  const modalImpact = document.getElementById('modal-project-impact');
  const modalRepoLink = document.getElementById('modal-project-repo');

  function openProjectModal(projectId) {
    const data = projectDetailsDB[projectId];
    if (!data) return;

    if (modalTitle) modalTitle.textContent = data.title;
    if (modalCategory) modalCategory.textContent = data.category;
    if (modalSummary) modalSummary.textContent = data.summary;
    if (modalImpact) modalImpact.textContent = data.impact;
    if (modalRepoLink) {
      modalRepoLink.href = data.repoUrl;
      modalRepoLink.textContent = `View Repository on GitHub (${data.repoUrl.split('/').pop()})`;
    }

    if (modalFeatures) {
      modalFeatures.innerHTML = data.features.map((f) => `<li><i class="fas fa-check-circle"></i> <span>${f}</span></li>`).join('');
    }

    if (modalTech) {
      modalTech.innerHTML = data.techStack.map((t) => `<span class="p-tag">${t}</span>`).join('');
    }

    modalOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal() {
    modalOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  detailButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.dataset.project;
      openProjectModal(projectId);
    });
  });

  closeBtn?.addEventListener('click', closeProjectModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeProjectModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectModal();
  });
}

/* ==========================================================================
   8. RESUME MODAL & PRINT/DOWNLOAD
   ========================================================================== */
function initResumeModal() {
  const resumeModal = document.getElementById('resume-modal');
  const openButtons = document.querySelectorAll('.btn-open-resume');
  const closeBtn = document.getElementById('btn-close-resume-modal');
  const printBtn = document.getElementById('btn-print-resume');
  const downloadBtn = document.getElementById('btn-download-resume');

  function openResume() {
    resumeModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeResume() {
    resumeModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openResume();
    });
  });

  closeBtn?.addEventListener('click', closeResume);
  resumeModal?.addEventListener('click', (e) => {
    if (e.target === resumeModal) closeResume();
  });

  downloadBtn?.addEventListener('click', () => {
    showToast('📄 Downloading Saddam Ahmad Resume (PDF)...');
  });

  printBtn?.addEventListener('click', () => {
    showToast('🖨️ Preparing print preview / Save as PDF...');
    setTimeout(() => {
      window.print();
    }, 200);
  });
}

/* ==========================================================================
   9. CONTACT FORM VALIDATION & TOAST
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const subject = document.getElementById('contact-subject')?.value.trim();
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !email || !message) {
      showToast('⚠️ Please fill out all required fields.');
      return;
    }

    // Direct mailto trigger fallback
    const mailtoUrl = `mailto:ahmadsaddam443@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`)}`;

    showToast('🚀 Opening your email client to connect with Saddam...');
    setTimeout(() => {
      window.location.href = mailtoUrl;
    }, 800);

    form.reset();
  });
}

/* Toast notification helper */
function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas fa-bell" style="color:#06b6d4;"></i> <span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 50);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

/* ==========================================================================
   10. WEB AUDIO CYBER CLICK SYNTHESIZER
   ========================================================================== */
function initAudioFeedback() {
  let audioCtx = null;
  let isSoundEnabled = true;

  const soundToggleBtn = document.getElementById('btn-sound-toggle');
  const soundIcon = document.getElementById('sound-icon');

  function playTone(freq = 600, duration = 0.04) {
    if (!isSoundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (err) {
      // Audio autoplay policy fallback
    }
  }

  soundToggleBtn?.addEventListener('click', () => {
    isSoundEnabled = !isSoundEnabled;
    if (soundIcon) {
      soundIcon.className = isSoundEnabled ? 'fas fa-volume-up' : 'fas fa-volume-mute';
    }
    showToast(isSoundEnabled ? '🔊 Sound effects enabled' : '🔇 Sound effects muted');
  });

  // Attach gentle audio feedback on interactive elements
  const clickables = document.querySelectorAll('button, .nav-link, .preset-pill, .filter-btn, .social-icon-btn, .social-stick-pill, .tech-sticker-badge');
  clickables.forEach((el) => {
    el.addEventListener('click', () => playTone(el.classList.contains('btn-primary') ? 800 : 520));
  });
}
