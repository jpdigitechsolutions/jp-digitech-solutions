/**
 * JP DIGITECH SOLUTIONS - Main Application Logic
 * Animations, Navigation, Modals, Sliders, Contact Form, and Micro-interactions.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // 1. NAVBAR SCROLL EFFECT & SCROLLSPY
  // ==========================================================================
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Navbar glass blur background on scroll
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Scrollspy active state
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });

    // Scroll to Top visibility
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  // Scroll to top button action
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 2. MOBILE MENU DRAWER
  // ==========================================================================
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking on any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });

    // Close menu on click outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target) && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // ==========================================================================
  // 3. DYNAMIC TYPEWRITER EFFECT IN HERO
  // ==========================================================================
  const typewriterEl = document.getElementById('typewriterText');
  if (typewriterEl) {
    const words = [
      'Website Development',
      'Mobile App Development',
      'Custom Digital Solutions',
      'High-Speed Web Platforms',
      'Modern E-Commerce Stores'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
      const currentWord = words[wordIndex];
      if (isDeleting) {
        typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 90;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        typingSpeed = 2200; // Pause at end of word
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 400; // Pause before new word
      }

      setTimeout(type, typingSpeed);
    }

    type();
  }

  // ==========================================================================
  // 4. ANIMATED COUNTER (INTERSECTION OBSERVER)
  // ==========================================================================
  const counterElements = document.querySelectorAll('.stat-count');
  let countersStarted = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        counterElements.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000; // 2 seconds
          const stepTime = 30;
          const totalSteps = duration / stepTime;
          const increment = target / totalSteps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.querySelector('.stats-ribbon');
  if (statsSection) {
    counterObserver.observe(statsSection);
  }

  // ==========================================================================
  // 5. PORTFOLIO FILTERING
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==========================================================================
  // 6. TECH STACK TABS
  // ==========================================================================
  const techTabs = document.querySelectorAll('.tech-tab-btn');
  const techCards = document.querySelectorAll('.tech-card');

  techTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      techTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-tech-filter');

      techCards.forEach(card => {
        const cat = card.getAttribute('data-tech-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // ==========================================================================
  // 7. TESTIMONIALS SLIDER
  // ==========================================================================
  const track = document.querySelector('.testimonial-track');
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prevSlide');
  const nextBtn = document.getElementById('nextSlide');
  const dotsContainer = document.querySelector('.slider-dots');
  let currentSlide = 0;
  let slideInterval;

  if (track && slides.length > 0) {
    // Generate navigation dots dynamically
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.slider-dot');

    function updateSlider() {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
      });
    }

    function goToSlide(index) {
      currentSlide = index;
      updateSlider();
      resetAutoPlay();
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      updateSlider();
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      updateSlider();
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

    // Auto Play with pause on hover
    function startAutoPlay() {
      slideInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
      clearInterval(slideInterval);
      startAutoPlay();
    }

    const wrapper = document.querySelector('.testimonials-wrapper');
    if (wrapper) {
      wrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
      wrapper.addEventListener('mouseleave', startAutoPlay);
    }

    startAutoPlay();
  }

  // ==========================================================================
  // 8. FAQ ACCORDION
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-question-btn');
    const answer = item.querySelector('.faq-answer');

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other accordion items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAnswer = otherItem.querySelector('.faq-answer');
          if (otherAnswer) otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Open first FAQ by default
  if (faqItems.length > 0) {
    const firstItem = faqItems[0];
    firstItem.classList.add('active');
    const firstAnswer = firstItem.querySelector('.faq-answer');
    if (firstAnswer) firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
  }

  // ==========================================================================
  // 9. MODAL CONTROLS (Service Details & Case Studies)
  // ==========================================================================
  const modalOverlay = document.getElementById('detailsModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalTag = document.getElementById('modalTag');
  const modalTitle = document.getElementById('modalTitle');
  const modalBody = document.getElementById('modalBody');

  // Case study data dictionary
  const modalContentData = {
    web_service: {
      tag: 'Service Details',
      title: 'High-Performance Website & Web App Development',
      html: `
        <p>At JP DigiTech Solutions, we craft blazing-fast, SEO-optimized web applications tailored for conversion and enterprise scale. Our engineering approach guarantees 100/100 Lighthouse performance, bulletproof security, and seamless responsive behavior across all device viewports.</p>
        <h4>Key Technical Deliverables:</h4>
        <ul>
          <li><strong>Modern Frameworks:</strong> Next.js, React, Tailwind CSS, TypeScript, and Vue.js.</li>
          <li><strong>Architecture:</strong> Server-Side Rendering (SSR), Static Site Generation (SSG), and Edge API endpoints.</li>
          <li><strong>High Conversion:</strong> Conversion-rate optimized landing pages, lead capture funnels, and dynamic e-commerce checkouts.</li>
          <li><strong>Speed & SEO:</strong> Sub-second Largest Contentful Paint (LCP), rich structured data (Schema.org), and automated sitemaps.</li>
        </ul>
      `
    },
    mobile_service: {
      tag: 'Service Details',
      title: 'iOS & Android Mobile App Engineering',
      html: `
        <p>We build elegant, fluid native and cross-platform mobile apps for iOS and Android that users love using. From real-time state synchronization to offline caching and biometric security, your mobile product will be engineered for App Store and Google Play excellence.</p>
        <h4>Key Technical Deliverables:</h4>
        <ul>
          <li><strong>Cross-Platform Power:</strong> Flutter and React Native for single codebase efficiency without compromising on 60/120fps native fluidity.</li>
          <li><strong>Hardware Integration:</strong> Camera, Geolocation, Bluetooth, Push Notifications, and Biometrics (Face ID / Fingerprint).</li>
          <li><strong>Offline-First Capabilities:</strong> Local SQLite / WatermelonDB sync engines that keep your app working offline.</li>
          <li><strong>Store Launch Support:</strong> End-to-end guidance through Apple App Store and Google Play certification.</li>
        </ul>
      `
    },
    saas_service: {
      tag: 'Service Details',
      title: 'Custom Digital Solutions & Enterprise SaaS',
      html: `
        <p>Transform your operational bottlenecks into competitive advantages. JP DigiTech develops custom enterprise software, cloud-native SaaS systems, internal workflow portals, and automated data pipelines designed around your unique operational rules.</p>
        <h4>Key Technical Deliverables:</h4>
        <ul>
          <li><strong>Multi-Tenant Architecture:</strong> Secure isolation of data, subscription billing management, and role-based access control (RBAC).</li>
          <li><strong>API Ecosystem:</strong> Robust REST & GraphQL APIs, Webhooks, and third-party integrations (Stripe, Zapier, Salesforce, QuickBooks).</li>
          <li><strong>Data Pipelines:</strong> High-throughput PostgreSQL, MongoDB, and Redis caching for millisecond queries.</li>
          <li><strong>Monitoring & Reliability:</strong> Comprehensive logging, automated alerts, and 99.99% uptime guarantees.</li>
        </ul>
      `
    },
    case_shonem: {
      tag: 'Live Client Case Study • Custom Enterprise SaaS',
      title: 'SHONEM Herbals: Cloud Inventory Management & B2B Distribution Suite',
      html: `
        <p><strong>Client Overview:</strong> Shonem Herbals Private Limited (Pune, Maharashtra) manufactures and distributes pure, natural organic skincare, herbal powders (Sandalwood, Multani Mitti, Shikakai), and natural mehendi.</p>
        <p><strong>The Engineering Challenge:</strong> Rapidly expanding nationwide distributor demand led to inventory blindspots across multiple warehouses, raw material batching discrepancies, and manual invoicing delays across fragmented spreadsheets.</p>
        <p><strong>JP DigiTech Solution:</strong> We architected a high-speed Single-Page Application (SPA) using React, Vite, and modular state architecture. The system unifies real-time multi-warehouse stock balances, batch and expiry date logs, vendor purchase orders, dispatch tracking, and granular role-based access control (RBAC).</p>
        <h4>Core Modules & Features Delivered:</h4>
        <ul>
          <li>📦 <strong>Real-Time Stock Engine:</strong> Sub-second SKU search, warehouse stock movements, and automatic low-stock notifications.</li>
          <li>🏷️ <strong>Batch & Expiry Telemetry:</strong> End-to-end traceability from raw herbal processing to distributor dispatch.</li>
          <li>🤝 <strong>B2B Order & Vendor Portal:</strong> Supplier purchase order automation, client invoicing, and dispatch manifests.</li>
          <li>🔐 <strong>Role-Based Security:</strong> Strict isolation of financial audits, inventory edits, and operator credentials.</li>
        </ul>
        <h4>Measurable Business Impact:</h4>
        <ul>
          <li>🎯 <strong>Stock Accuracy:</strong> Elevated to 99.9% across all warehouse locations.</li>
          <li>⏱️ <strong>Time Saved:</strong> Eliminated 18+ hours per week of manual inventory reconciliations.</li>
          <li>🚀 <strong>Fulfillment Speed:</strong> Reduced order dispatch cycle by 45%.</li>
        </ul>
        <div style="margin-top: 1.5rem; padding-top: 1.2rem; border-top: 1px solid rgba(255,255,255,0.08); display: flex; gap: 0.8rem; flex-wrap: wrap;">
          <a href="https://crm.shonemherbals.com/" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 0.55rem 1.2rem; font-size: 0.85rem;">
            <span>Explore Live IMS Portal</span>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <a href="#contact" class="btn btn-secondary modal-close-cta" style="padding: 0.55rem 1.2rem; font-size: 0.85rem;">
            <span>Build Similar System</span>
            <i class="fa-solid fa-paper-plane"></i>
          </a>
        </div>
      `
    },
    case_dhananjay: {
      tag: 'Live Client Case Study • Ed-Tech Web Platform',
      title: 'Dhananjay Classes: High-Converting Bilingual Academic Platform',
      html: `
        <p><strong>Client Overview:</strong> Dhananjay Classes (Mahabal, Jalgaon, Maharashtra) is a premier handwriting improvement institute specializing in Devanagari (Marathi/Hindi), English Print, Cursive, and speed writing for students of all ages.</p>
        <p><strong>The Engineering Challenge:</strong> The academy relied on offline flyers and word-of-mouth. Parents couldn't view the remarkable student transformations, curriculum syllabus, or class schedules online, resulting in lost enrollment opportunities.</p>
        <p><strong>JP DigiTech Solution:</strong> We engineered a high-converting, modern bilingual (English & Marathi) web platform deployed with zero-latency edge delivery on Netlify. It features an interactive before-and-after student handwriting comparison gallery, comprehensive course explorer, branch geolocation, and a direct click-to-WhatsApp admission booking funnel.</p>
        <h4>Core Modules & Features Delivered:</h4>
        <ul>
          <li>✍️ <strong>Interactive Transformation Gallery:</strong> Real student before-and-after proof across Devanagari, Hindi, Cursive, and Print penmanship.</li>
          <li>🌐 <strong>Instant Bilingual Switch:</strong> Seamless toggle between English and Marathi for regional accessibility.</li>
          <li>💬 <strong>Instant WhatsApp Booking Funnel:</strong> Pre-filled WhatsApp inquiry routing directly to the head instructor.</li>
          <li>⚡ <strong>Zero Latency Performance:</strong> 100/100 Lighthouse score with sub-second page loads on mobile networks.</li>
        </ul>
        <h4>Measurable Business Impact:</h4>
        <ul>
          <li>📈 <strong>Admission Inquiries:</strong> +340% increase in student inquiries in the first 90 days.</li>
          <li>📱 <strong>Mobile Inquiries:</strong> 92% of new admission leads originated through the 1-click WhatsApp funnel.</li>
          <li>🏆 <strong>Search Visibility:</strong> Ranked #1 for handwriting improvement classes in Jalgaon.</li>
        </ul>
        <div style="margin-top: 1.5rem; padding-top: 1.2rem; border-top: 1px solid rgba(255,255,255,0.08); display: flex; gap: 0.8rem; flex-wrap: wrap;">
          <a href="https://dhananjayhandwritingclasses.netlify.app/" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 0.55rem 1.2rem; font-size: 0.85rem;">
            <span>Visit Live Website</span>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <a href="#contact" class="btn btn-secondary modal-close-cta" style="padding: 0.55rem 1.2rem; font-size: 0.85rem;">
            <span>Build Similar Website</span>
            <i class="fa-solid fa-paper-plane"></i>
          </a>
        </div>
      `
    },
    case_refabrico: {
      tag: 'Live Client Case Study • Sustainable D2C Platform',
      title: 'ReFabriCo: Circular Fashion & Upcycled Creations Platform',
      html: `
        <p><strong>Client Overview:</strong> ReFabriCo is an eco-conscious sustainable fashion enterprise that transforms pre-loved clothes and sentimental heirlooms (such as vintage wedding sarees and keepsake garments) into bespoke handcrafted lifestyle creations.</p>
        <p><strong>The Engineering Challenge:</strong> The brand needed to harmonize deep emotional nostalgia ("Every Piece of Fabric Tells a Story") with measurable ecological accountability, inspiring customers to trust them with their cherished garments and schedule upcycling pickups.</p>
        <p><strong>JP DigiTech Solution:</strong> We created an immersive, earth-toned, mobile-first web application. Features include a dynamic live Environmental Impact Counter, an interactive 4-step transformation story ("Cherished Garments → Artisan Craftsmanship → Timeless Creations"), curated design galleries, and an easy doorstep pickup order flow.</p>
        <h4>Core Modules & Features Delivered:</h4>
        <ul>
          <li>♻️ <strong>Live Environmental Impact Tracker:</strong> Real-time visualization of garments reused, landfill waste prevented, and water conserved.</li>
          <li>🧵 <strong>Interactive Transformation Journey:</strong> Visual step-by-step showcase illustrating the artisan craftsmanship process.</li>
          <li>🛍️ <strong>Curated Design Showcase:</strong> Silk Saree Totes, Eco Laptop Sleeves, and Patchwork Utility Pouches with custom material requests.</li>
          <li>📦 <strong>Doorstep Pickup Booking Funnel:</strong> Frictionless pickup scheduling optimized for touch devices.</li>
        </ul>
        <h4>Measurable Business Impact:</h4>
        <ul>
          <li>🌱 <strong>Environmental Milestones:</strong> 5,000+ garments diverted from landfills and 10M+ liters of water saved.</li>
          <li>📲 <strong>Mobile Conversions:</strong> 65% conversion rate on mobile pickup inquiries.</li>
          <li>❤️ <strong>Community Engagement:</strong> 4.9/5 satisfaction rate among eco-conscious consumers.</li>
        </ul>
        <div style="margin-top: 1.5rem; padding-top: 1.2rem; border-top: 1px solid rgba(255,255,255,0.08); display: flex; gap: 0.8rem; flex-wrap: wrap;">
          <a href="https://refabrico.netlify.app/" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 0.55rem 1.2rem; font-size: 0.85rem;">
            <span>Visit Live Website</span>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <a href="#contact" class="btn btn-secondary modal-close-cta" style="padding: 0.55rem 1.2rem; font-size: 0.85rem;">
            <span>Build Similar Platform</span>
            <i class="fa-solid fa-paper-plane"></i>
          </a>
        </div>
      `
    },
    case_newseven: {
      tag: 'Live Client Case Study • Veterinary Health Platform',
      title: 'New Seven Pharma: Animal Healthcare & Dairy Farm Equipment Platform',
      html: `
        <p><strong>Client Overview:</strong> New Seven Pharma (Parola Road, Lalbaug, Dhule, Maharashtra) is North Maharashtra's premier veterinary pharmacy and animal healthcare center, providing cattle & buffalo medicines, electric milking machines, ergonomic cow shed mats, chelated mineral mixtures, pet care, and poultry growth tonics.</p>
        <p><strong>The Engineering Challenge:</strong> Progressive dairy farmers and pet parents in rural and semi-urban Dhule needed a zero-friction channel to order specialized veterinary medicines, upload veterinarian prescription photos, calculate cattle herd nutritional supplement requirements, and schedule free farm delivery without complicated checkout steps.</p>
        <p><strong>JP DigiTech Solution:</strong> We engineered a high-converting, mobile-first web application deployed on Netlify Edge with instant global CDN caching. Features include an interactive Herd Supplement Consumption Estimator, 1-click WhatsApp Prescription Photo Upload, organized livestock categories (Dairy Cattle, Pets, Poultry), and store geolocation.</p>
        <h4>Core Modules & Features Delivered:</h4>
        <ul>
          <li>🐄 <strong>Interactive Herd Supplement Estimator:</strong> Algorithmic calculator allowing dairy farmers to estimate monthly mineral mixture and liquid calcium needs.</li>
          <li>📸 <strong>1-Click Prescription & WhatsApp Order Funnel:</strong> Instant WhatsApp order routing with attached prescription images sent directly to store pharmacists.</li>
          <li>🌾 <strong>Comprehensive Veterinary & Equipment Catalog:</strong> Milking machines, ergonomic rubber cow mats, deworming bolus, and pet nutrition.</li>
          <li>⚡ <strong>Ultra-Fast Rural Mobile Delivery:</strong> 100/100 Lighthouse performance optimized for low-bandwidth 3G/4G connections.</li>
        </ul>
        <h4>Measurable Business Impact:</h4>
        <ul>
          <li>📈 <strong>Order Growth:</strong> +260% increase in daily digital inquiries and direct delivery dispatches across rural Dhule and Jalgaon.</li>
          <li>📱 <strong>Mobile Adoption:</strong> 94% of farm orders placed directly via the 1-click WhatsApp prescription funnel.</li>
          <li>⭐ <strong>Customer Trust:</strong> 5-star rating from progressive dairy farmers and livestock breeders.</li>
        </ul>
        <div style="margin-top: 1.5rem; padding-top: 1.2rem; border-top: 1px solid rgba(255,255,255,0.08); display: flex; gap: 0.8rem; flex-wrap: wrap;">
          <a href="https://newsevenpharmadhule.netlify.app/" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="padding: 0.55rem 1.2rem; font-size: 0.85rem;">
            <span>Visit Live Website</span>
            <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
          <a href="#contact" class="btn btn-secondary modal-close-cta" style="padding: 0.55rem 1.2rem; font-size: 0.85rem;">
            <span>Build Similar Platform</span>
            <i class="fa-solid fa-paper-plane"></i>
          </a>
        </div>
      `
    },
    case_ecommerce: {
      tag: 'Featured Case Study',
      title: 'Aura Market: 4.8x Conversion Rate Growth',
      html: `
        <p><strong>Client Challenge:</strong> An established lifestyle brand was suffering from slow checkout loads (4.2 seconds) and high mobile cart abandonment rates on their legacy platform.</p>
        <p><strong>JP DigiTech Solution:</strong> We re-architected their digital storefront using Next.js and Headless Shopify, integrating instantaneous page transitions, 1-click Apple Pay/Google Pay checkout, and real-time inventory management.</p>
        <h4>Tangible Results:</h4>
        <ul>
          <li>🚀 <strong>Page Load Time:</strong> Reduced from 4.2s to 0.65s (84% improvement).</li>
          <li>📈 <strong>Mobile Conversions:</strong> Increased by +280% within 60 days of launch.</li>
          <li>💰 <strong>Average Order Value (AOV):</strong> Grew by 32% through dynamic AI-driven cross-selling modules.</li>
        </ul>
      `
    },
    case_fintech: {
      tag: 'Featured Case Study',
      title: 'NovaPay: Real-Time Mobile Banking Suite',
      html: `
        <p><strong>Client Challenge:</strong> A financial technology startup needed a bank-grade mobile application supporting instant peer-to-peer transfers, QR code invoicing, and biometric authentication with zero tolerance for downtime.</p>
        <p><strong>JP DigiTech Solution:</strong> Built with Flutter and an event-driven Node.js/Go backend, utilizing end-to-end AES-256 encryption, WebSocket-driven live transaction feeds, and automated KYC verification.</p>
        <h4>Tangible Results:</h4>
        <ul>
          <li>🔒 <strong>Security:</strong> 100% pass on SOC2 Type II and penetration testing.</li>
          <li>⚡ <strong>Transaction Speed:</strong> Sub-50ms balance updates.</li>
          <li>⭐ <strong>Store Rating:</strong> 4.9/5 stars across 15,000+ active user downloads.</li>
        </ul>
      `
    },
    case_saas: {
      tag: 'Featured Case Study',
      title: 'PulseOps: Multi-Tenant Enterprise CRM & ERP',
      html: `
        <p><strong>Client Challenge:</strong> A logistics enterprise had disparate spreadsheets, email chains, and manual dispatching, causing frequent order mix-ups and delayed client updates.</p>
        <p><strong>JP DigiTech Solution:</strong> Engineered a bespoke, cloud-native ERP dashboard with real-time GPS fleet tracking, automated invoice generation, customer notification triggers, and granular permission roles.</p>
        <h4>Tangible Results:</h4>
        <ul>
          <li>⏱️ <strong>Operational Time Saved:</strong> 22 hours per week per branch manager.</li>
          <li>📊 <strong>Order Dispatch Accuracy:</strong> Improved to 99.94%.</li>
          <li>💼 <strong>Scalability:</strong> Seamlessly handled 50,000+ daily events without server hiccups.</li>
        </ul>
      `
    }
  };

  // Open modal handlers
  document.querySelectorAll('[data-open-modal]').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalKey = trigger.getAttribute('data-open-modal');
      const data = modalContentData[modalKey];

      if (data && modalOverlay) {
        modalTag.textContent = data.tag;
        modalTitle.textContent = data.title;
        modalBody.innerHTML = data.html;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal
  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay || e.target.closest('.modal-close-cta')) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });

  // ==========================================================================
  // 10. COPY TO CLIPBOARD BUTTONS
  // ==========================================================================
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const copyText = btn.getAttribute('data-copy');
      if (copyText) {
        navigator.clipboard.writeText(copyText).then(() => {
          const originalHTML = btn.innerHTML;
          btn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
          btn.style.background = '#10b981';
          btn.style.color = '#fff';

          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.style.color = '';
          }, 2000);
        });
      }
    });
  });

  // ==========================================================================
  // 11. HIGH-CONVERTING CONTACT FORM SUBMISSION (Connected to Gmail)
  // ==========================================================================
  const contactForm = document.getElementById('contactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');
  const submitFormBtn = document.getElementById('submitFormBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const serviceSelect = document.getElementById('contactService');
      const service = serviceSelect ? serviceSelect.value : 'General Inquiry';
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !message) {
        alert('Please fill out all required fields (Name, Email, and Project Details).');
        return;
      }

      // Button loading state
      const originalBtnHTML = submitFormBtn ? submitFormBtn.innerHTML : '<span>Submit Inquiry</span>';
      if (submitFormBtn) {
        submitFormBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> <span>Sending to Email...</span>';
        submitFormBtn.disabled = true;
      }

      // Submit via FormSubmit AJAX directly to jpdigitechsolutions@gmail.com
      fetch('https://formsubmit.co/ajax/jpdigitechsolutions@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          'Client Name': name,
          'Client Email': email,
          'Service Requested': service || 'Website / Digital Solution',
          'Project Details': message,
          '_subject': `New Project Inquiry from ${name} - JP DIGITECH SOLUTIONS`
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('FormSubmit network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (submitFormBtn) {
            submitFormBtn.innerHTML = originalBtnHTML;
            submitFormBtn.disabled = false;
          }

          if (formSuccessAlert) {
            formSuccessAlert.className = 'form-alert success';
            formSuccessAlert.style.display = 'flex';
            formSuccessAlert.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you, <strong>${name}</strong>! Your project inquiry has been sent directly to <strong>jpdigitechsolutions@gmail.com</strong>. Our senior engineer will respond to <strong>${email}</strong> within 2-4 hours.`;
            formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }

          if (typeof window.trackEvent === 'function') {
            window.trackEvent('lead_generated', {
              lead_channel: 'email_form',
              service: service,
              client_name: name
            });
          }

          contactForm.reset();
        })
        .catch(error => {
          console.warn('FormSubmit AJAX fallback, submitting natively:', error);
          // Fallback: Submit natively via standard FormSubmit POST
          contactForm.submit();
        });
    });
  }

  // Direct WhatsApp Quick Submit Button on Contact Form
  const sendViaWhatsAppBtn = document.getElementById('sendViaWhatsAppBtn');
  if (sendViaWhatsAppBtn) {
    const handleWhatsAppSubmit = (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const serviceSelect = document.getElementById('contactService');
      const messageInput = document.getElementById('contactMessage');

      const name = nameInput && nameInput.value.trim() ? nameInput.value.trim() : 'Prospective Client';
      const email = emailInput && emailInput.value.trim() ? emailInput.value.trim() : 'Not specified';
      const service = serviceSelect && serviceSelect.value ? serviceSelect.value : 'Custom Digital Solution';
      const message = messageInput && messageInput.value.trim() ? messageInput.value.trim() : 'Looking forward to discussing project details.';

      const whatsappText = `Hello JP DigiTech Solutions! 🚀\n\n• Name: ${name}\n• Email: ${email}\n• Service: ${service}\n• Project Details:\n${message}`;
      const url = `https://wa.me/919999999999?text=${encodeURIComponent(whatsappText)}`;

      if (typeof window.trackEvent === 'function') {
        window.trackEvent('lead_generated', {
          lead_channel: 'whatsapp_direct',
          service: service,
          client_name: name
        });
      }

      // Direct redirection on mobile devices prevents popup blockers
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        window.location.href = url;
      } else {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    };

    sendViaWhatsAppBtn.addEventListener('click', handleWhatsAppSubmit);
  }

  // Newsletter subscription toast
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input && input.value) {
        alert(`Thank you for subscribing to JP DigiTech Tech Insights (${input.value})!`);
        input.value = '';
      }
    });
  }
});

