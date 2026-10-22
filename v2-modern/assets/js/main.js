/**
 * Sustune Care - Version 2 (Modern, Interactive & Accessible)
 * Main JavaScript Engine
 * Strictly follows WCAG 2.1 AA standards, modular event listeners, and safe DOM manipulation.
 */

// Centralized Consultation Form URL
const GOOGLE_FORM_URL = "https://forms.gle/o1y5bqXmaM8fCLvF8";

// Stepper Data (Safe strings for programmatic DOM population)
const STEPS_DATA = [
  {
    number: "Phase 1 of 4",
    timeline: "Timeline: Days 1 – 3",
    title: "Confidential Discovery & Requirements Review",
    desc: "We conduct an in-depth consultation tailored to your international time zone. We review your exact property condition, tenant profile, or your parents' specific health histories, mobility concerns, emergency hospital preferences, and daily assistance needs.",
    checklist: [
      "Convenient time-zone scheduling (US, UK, Gulf, APAC)",
      "Comprehensive health & asset intake review",
      "Initial documentation checklist and emergency contact setup",
      "Dedicated director consultation call"
    ]
  },
  {
    number: "Phase 2 of 4",
    timeline: "Timeline: Day 4",
    title: "Dedicated Care Manager Assigned",
    desc: "A permanent, vetted Sustune Care Manager is dedicated to your family as your singular point of local accountability. No routing through impersonal call centers or shifting outsourced representatives.",
    checklist: [
      "Direct mobile and WhatsApp line to your assigned manager",
      "Thoroughly background-checked executive personnel",
      "Single point of contact for both Aegis & Sparsh if needed",
      "Local operational base in Hyderabad or Bengaluru"
    ]
  },
  {
    number: "Phase 3 of 4",
    timeline: "Timeline: Week 1",
    title: "Baseline Audit & Physical On-Ground Assessment",
    desc: "We perform a comprehensive 50-point physical inspection of your real estate or an introductory health and domestic safety review for your parents, establishing benchmark records with high-resolution photography.",
    checklist: [
      "Detailed structural, electrical, and plumbing inspection",
      "Home safety audit (grab bars, anti-slip, lighting checks)",
      "Registration of preferred hospital and consulting physicians",
      "Full digital baseline report delivered to you"
    ]
  },
  {
    number: "Phase 4 of 4",
    timeline: "Timeline: Ongoing Stewardship",
    title: "Continuous Active Oversight & Transparent Reporting",
    desc: "Scheduled photographic inspection audits, prompt rental reconciliations, doctor visit escorts, and 24/7 rapid emergency dispatch remain active all year round with zero hidden markups.",
    checklist: [
      "Timestamped photographic audit reports after every visit",
      "Direct hospital liaison and ambulance dispatch on standby",
      "Vendor repairs pre-approved by you at actual invoice cost",
      "Monthly itemized statements and video review check-ins"
    ]
  }
];

// Need Selector Data
const SELECTOR_DATA = {
  property: {
    badge: "Recommended Plan: Aegis Property Stewardship",
    badgeClass: "text-cerulean bg-cerulean/10 dark:bg-cerulean/20",
    title: "Complete Real Estate Protection in Hyderabad & Bengaluru",
    desc: "Designed for NRIs seeking stress-free ownership. We inspect your home, vet potential tenants thoroughly, manage monthly rental deposits into your accounts, and resolve maintenance issues with zero hidden markups.",
    btnText: "Enquire for Property",
    btnClass: "enquiry-cta btn-primary px-6 py-3 text-sm font-semibold whitespace-nowrap shadow-sm",
    highlights: [
      "Vetted Tenant Placement & Registered Leases",
      "Timestamped Photographic Audit Reports",
      "Escrow & Automated Rent Collection",
      "Pre-approved Maintenance at Actual Cost"
    ]
  },
  parents: {
    badge: "Recommended Plan: Sparsh Elder Parent Care",
    badgeClass: "text-emerald-care bg-emerald-care/10 dark:bg-emerald-care/20",
    title: "Clinical-Grade Support & Dignity for Aging Parents",
    desc: "Designed for overseas sons and daughters. We provide round-the-clock emergency hospital accompaniment, doctor visit escorts with transcribed clinical summaries, routine errand runs, and warm companionship.",
    btnText: "Enquire for Parents",
    btnClass: "enquiry-cta btn-secondary px-6 py-3 text-sm font-semibold whitespace-nowrap shadow-sm",
    highlights: [
      "24/7 Rapid SOS & Hospital Admission Liaison",
      "Doctor Visit Escort & Prescription Refills",
      "Companionship & Periodic Home Wellness Visits",
      "Direct WhatsApp Line to Assigned Care Manager"
    ]
  },
  both: {
    badge: "Recommended Plan: Unified Sustune Care Family Plan",
    badgeClass: "text-burnished-bronze bg-amber-100 dark:bg-amber-900/30 dark:text-amber-300",
    title: "Integrated Property & Parent Stewardship Under One Lead Manager",
    desc: "Our complete NRI solution. A single dedicated Senior Care Manager coordinates both your residential asset security and your parents' health, safety, and daily logistics with harmonized reporting.",
    btnText: "Enquire for Both Services",
    btnClass: "enquiry-cta btn-primary px-6 py-3 text-sm font-semibold whitespace-nowrap shadow-sm",
    highlights: [
      "Single Dedicated Care Manager for Property & Family",
      "Combined Monthly Executive Summary Report",
      "24/7 Emergency Medical Dispatch & Fast Escalation",
      "Continuous Property Protection & Tenant Management"
    ]
  }
};

/**
 * Initialize application when DOM is ready
 */
document.addEventListener("DOMContentLoaded", () => {
  initThemeToggle();
  initEnquiryCTAs();
  initScrollProgressBar();
  initNavbarScroll();
  initHeroToggle();
  initMobileMenu();
  initServicesTabs();
  initStepper();
  initNeedSelector();
  initEstimator();
  initFaqAccordion();
  initScrollReveal();
  initCounters();
  initHeroVideo();
  initReducedMotionHandling();
  updateCurrentYear();
});

/**
 * Theme toggle: Light / Dark Mode with localStorage and system preference sync
 */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById("themeToggleBtn");
  const sunIcon = document.getElementById("themeSunIcon");
  const moonIcon = document.getElementById("themeMoonIcon");

  // Determine initial theme
  const savedTheme = localStorage.getItem("sustune_theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

  applyTheme(isDark);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const currentlyDark = document.documentElement.classList.contains("dark");
      applyTheme(!currentlyDark);
      localStorage.setItem("sustune_theme", !currentlyDark ? "dark" : "light");
    });
  }

  function applyTheme(enableDark) {
    if (enableDark) {
      document.documentElement.classList.add("dark");
      if (sunIcon) sunIcon.classList.remove("hidden");
      if (moonIcon) moonIcon.classList.add("hidden");
      if (themeToggleBtn) themeToggleBtn.setAttribute("aria-label", "Switch to light theme");
    } else {
      document.documentElement.classList.remove("dark");
      if (sunIcon) sunIcon.classList.add("hidden");
      if (moonIcon) moonIcon.classList.remove("hidden");
      if (themeToggleBtn) themeToggleBtn.setAttribute("aria-label", "Switch to dark theme");
    }
  }

  // Listen to system changes if user hasn't explicitly set a preference
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
    if (!localStorage.getItem("sustune_theme")) {
      applyTheme(e.matches);
    }
  });
}

/**
 * Dynamically binds all enquiry CTAs to the Google Form URL
 */
function initEnquiryCTAs() {
  const enquiryElements = document.querySelectorAll(".enquiry-cta");
  enquiryElements.forEach(el => {
    el.setAttribute("href", GOOGLE_FORM_URL);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener noreferrer");
  });
}

/**
 * Scroll Progress Bar
 */
function initScrollProgressBar() {
  const progressBar = document.getElementById("scrollProgressBar");
  if (!progressBar) return;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = scrollPercent + "%";
  }, { passive: true });
}

/**
 * Sticky Glass Navbar: shrink on scroll
 */
function initNavbarScroll() {
  const navbar = document.getElementById("mainNavbar");
  if (!navbar) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.remove("py-3", "md:py-4", "bg-[#0D3B66]/90");
      navbar.classList.add("py-2", "md:py-2.5", "bg-[#0D3B66]/98", "shadow-lg", "border-cerulean/20");
    } else {
      navbar.classList.remove("py-2", "md:py-2.5", "bg-[#0D3B66]/98", "shadow-lg", "border-cerulean/20");
      navbar.classList.add("py-3", "md:py-4", "bg-[#0D3B66]/90");
    }
  }, { passive: true });
}

/**
 * Hero Toggle (Aegis Property vs Sparsh Parents)
 */
function initHeroToggle() {
  const toggleAegis = document.getElementById("heroToggleAegis");
  const toggleSparsh = document.getElementById("heroToggleSparsh");
  const heroHeadline = document.getElementById("heroHeadline");
  const heroSubtext = document.getElementById("heroSubtext");
  const heroPrimaryCTA = document.getElementById("heroPrimaryCTA");

  if (!toggleAegis || !toggleSparsh || !heroHeadline || !heroSubtext || !heroPrimaryCTA) return;

  toggleAegis.addEventListener("click", () => {
    toggleAegis.className = "px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 bg-cerulean text-white shadow-md";
    toggleSparsh.className = "px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 text-slate-300 hover:text-white";
    toggleAegis.setAttribute("aria-selected", "true");
    toggleSparsh.setAttribute("aria-selected", "false");

    heroHeadline.style.opacity = '0';
    heroSubtext.style.opacity = '0';
    setTimeout(() => {
      heroHeadline.textContent = "Institutional Stewardship for Your Property in Hyderabad & Bengaluru";
      heroSubtext.textContent = "Comprehensive tenant vetting, rental escrow management, routine maintenance, and timestamped inspection audits while you live abroad.";
      heroPrimaryCTA.innerHTML = "";
      
      const span = document.createElement("span");
      span.textContent = "Enquire for Aegis";
      const icon = createSvgArrow();
      heroPrimaryCTA.appendChild(span);
      heroPrimaryCTA.appendChild(icon);
      
      heroPrimaryCTA.className = "enquiry-cta btn-primary px-8 py-4 text-base font-bold shadow-lg hover:shadow-glow-cerulean inline-flex items-center justify-center gap-3 w-full sm:w-auto";
      heroHeadline.style.opacity = '1';
      heroSubtext.style.opacity = '1';
      initEnquiryCTAs();
    }, 150);
  });

  toggleSparsh.addEventListener("click", () => {
    toggleSparsh.className = "px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 bg-emerald-care text-white shadow-md";
    toggleAegis.className = "px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-300 text-slate-300 hover:text-white";
    toggleSparsh.setAttribute("aria-selected", "true");
    toggleAegis.setAttribute("aria-selected", "false");

    heroHeadline.style.opacity = '0';
    heroSubtext.style.opacity = '0';
    setTimeout(() => {
      heroHeadline.textContent = "Clinical-Grade Eldercare & Dignity for Your Parents Back Home";
      heroSubtext.textContent = "24/7 emergency SOS dispatch, doctor escorts, medication management, and daily companionship delivered by dedicated care managers.";
      heroPrimaryCTA.innerHTML = "";
      
      const span = document.createElement("span");
      span.textContent = "Enquire for Sparsh";
      const icon = createSvgArrow();
      heroPrimaryCTA.appendChild(span);
      heroPrimaryCTA.appendChild(icon);

      heroPrimaryCTA.className = "enquiry-cta btn-secondary px-8 py-4 text-base font-bold shadow-lg hover:shadow-glow-emerald inline-flex items-center justify-center gap-3 w-full sm:w-auto";
      heroHeadline.style.opacity = '1';
      heroSubtext.style.opacity = '1';
      initEnquiryCTAs();
    }, 150);
  });
}

/**
 * Mobile Navigation Drawer with ARIA & Keyboard Support (Below 1024px)
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById("mobileMenuToggle");
  const menu = document.getElementById("mobileMenu");
  const hamburgerIcon = document.getElementById("hamburgerIcon");
  const closeIcon = document.getElementById("closeIcon");

  if (!toggleBtn || !menu) return;

  function openMenu() {
    menu.classList.remove("hidden");
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.setAttribute("aria-label", "Close menu");
    if (hamburgerIcon) hamburgerIcon.classList.add("hidden");
    if (closeIcon) closeIcon.classList.remove("hidden");
    document.body.style.overflow = "hidden";

    // Focus first interactive element in menu
    const firstLink = menu.querySelector("a, button");
    if (firstLink) firstLink.focus();
  }

  function closeMenu(restoreFocus = true) {
    if (menu.classList.contains("hidden")) return;
    menu.classList.add("hidden");
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Open menu");
    if (hamburgerIcon) hamburgerIcon.classList.remove("hidden");
    if (closeIcon) closeIcon.classList.add("hidden");
    document.body.style.overflow = "";
    if (restoreFocus) toggleBtn.focus();
  }

  toggleBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    if (isExpanded) {
      closeMenu(false);
    } else {
      openMenu();
    }
  });

  // Close when tapping outside the menu and toggle button
  document.addEventListener("click", (e) => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    if (isExpanded && !menu.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeMenu(false);
    }
  });

  // Close on link click and allow smooth scroll to section
  menu.querySelectorAll(".mobile-nav-link, a").forEach(link => {
    link.addEventListener("click", () => {
      closeMenu(false);
    });
  });

  // Keyboard accessibility: Escape key and focus trapping
  document.addEventListener("keydown", (e) => {
    const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
    if (!isExpanded) return;

    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu(true);
      return;
    }

    if (e.key === "Tab") {
      const focusables = Array.from(menu.querySelectorAll("a[href], button:not([disabled])"));
      if (!focusables.length) return;
      const firstItem = focusables[0];
      const lastItem = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === firstItem) {
        e.preventDefault();
        toggleBtn.focus();
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        toggleBtn.focus();
      }
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      const isExpanded = toggleBtn.getAttribute("aria-expanded") === "true";
      if (isExpanded) closeMenu(false);
    }
  });
}

/**
 * Services Section: Aegis vs Sparsh Tab switcher
 */
function initServicesTabs() {
  const btnAegis = document.getElementById("tabBtnAegis");
  const btnSparsh = document.getElementById("tabBtnSparsh");
  const panelAegis = document.getElementById("tabContentAegis");
  const panelSparsh = document.getElementById("tabContentSparsh");

  if (!btnAegis || !btnSparsh || !panelAegis || !panelSparsh) return;

  btnAegis.addEventListener("click", () => {
    btnAegis.className = "px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 bg-cerulean text-white shadow-sm";
    btnSparsh.className = "px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 text-slate-600 dark:text-slate-300 hover:text-deep-marine dark:hover:text-white";
    btnAegis.setAttribute("aria-selected", "true");
    btnSparsh.setAttribute("aria-selected", "false");
    panelSparsh.classList.add("hidden");
    panelAegis.classList.remove("hidden");
  });

  btnSparsh.addEventListener("click", () => {
    btnSparsh.className = "px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all duration-200 bg-emerald-care text-white shadow-sm";
    btnAegis.className = "px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 text-slate-600 dark:text-slate-300 hover:text-deep-marine dark:hover:text-white";
    btnSparsh.setAttribute("aria-selected", "true");
    btnAegis.setAttribute("aria-selected", "false");
    panelAegis.classList.add("hidden");
    panelSparsh.classList.remove("hidden");
  });
}

/**
 * Interactive Stepper: Clean DOM updates without innerHTML
 */
function initStepper() {
  const stepButtons = document.querySelectorAll(".step-nav-btn");
  if (!stepButtons.length) return;

  stepButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const stepNum = parseInt(btn.getAttribute("data-step"), 10);
      updateStepView(stepNum);
    });
  });

  function updateStepView(stepNum) {
    const data = STEPS_DATA[stepNum - 1];
    if (!data) return;

    stepButtons.forEach(btn => {
      const bNum = parseInt(btn.getAttribute("data-step"), 10);
      if (bNum === stepNum) {
        btn.className = "step-nav-btn p-5 rounded-card border transition-all text-left step-active cursor-pointer";
        btn.setAttribute("aria-selected", "true");
      } else {
        btn.className = "step-nav-btn p-5 rounded-card border border-slate-200 dark:border-slate-700 transition-all text-left step-inactive bg-mist dark:bg-slate-800 hover:bg-white dark:hover:bg-slate-700 cursor-pointer";
        btn.setAttribute("aria-selected", "false");
      }
    });

    const badge = document.getElementById("stepNumberBadge");
    const timeline = document.getElementById("stepTimeline");
    const title = document.getElementById("stepTitle");
    const desc = document.getElementById("stepDescription");
    const checklist = document.getElementById("stepChecklist");

    if (badge) badge.textContent = data.number;
    if (timeline) timeline.textContent = data.timeline;
    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.desc;

    if (checklist) {
      checklist.innerHTML = "";
      data.checklist.forEach(itemText => {
        const row = document.createElement("div");
        row.className = "flex items-center gap-2";
        const icon = createSvgCheck();
        const span = document.createElement("span");
        span.textContent = itemText;
        row.appendChild(icon);
        row.appendChild(span);
        checklist.appendChild(row);
      });
    }
  }
}

/**
 * Interactive "What do you need?" Selector
 */
function initNeedSelector() {
  const needButtons = document.querySelectorAll(".selector-btn");
  if (!needButtons.length) return;

  needButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const needType = btn.getAttribute("data-need");
      updateNeedView(needType);
    });
  });

  function updateNeedView(type) {
    const data = SELECTOR_DATA[type];
    if (!data) return;

    needButtons.forEach(btn => {
      const bType = btn.getAttribute("data-need");
      const baseClass = "selector-btn p-6 rounded-card border-2 transition-all duration-200 text-center bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-slate-300 cursor-pointer";
      if (bType === type) {
        if (type === "property") {
          btn.className = "selector-btn p-6 rounded-card border-2 transition-all duration-200 text-center bg-white dark:bg-slate-800 border-cerulean shadow-glow-cerulean cursor-pointer";
        } else if (type === "parents") {
          btn.className = "selector-btn p-6 rounded-card border-2 transition-all duration-200 text-center bg-white dark:bg-slate-800 border-emerald-care shadow-glow-emerald cursor-pointer";
        } else {
          btn.className = "selector-btn p-6 rounded-card border-2 transition-all duration-200 text-center bg-white dark:bg-slate-800 border-imperial-gold shadow-glow-gold cursor-pointer";
        }
        btn.setAttribute("aria-selected", "true");
      } else {
        btn.className = baseClass;
        btn.setAttribute("aria-selected", "false");
      }
    });

    const badge = document.getElementById("selectorBadge");
    const title = document.getElementById("selectorResultTitle");
    const desc = document.getElementById("selectorResultDesc");
    const cta = document.getElementById("selectorResultCTA");
    const highlights = document.getElementById("selectorHighlights");

    if (badge) {
      badge.textContent = data.badge;
      badge.className = `text-xs font-bold uppercase tracking-wider px-3 py-1 rounded ${data.badgeClass}`;
    }
    if (title) title.textContent = data.title;
    if (desc) desc.textContent = data.desc;
    if (cta) {
      cta.textContent = data.btnText;
      cta.className = data.btnClass;
      initEnquiryCTAs();
    }
    if (highlights) {
      highlights.innerHTML = "";
      data.highlights.forEach(itemText => {
        const row = document.createElement("div");
        row.className = "flex items-center gap-2";
        const icon = createSvgCheck();
        const span = document.createElement("span");
        span.textContent = itemText;
        row.appendChild(icon);
        row.appendChild(span);
        highlights.appendChild(row);
      });
    }
  }
}

/**
 * Simple, Realistic Sample Estimator (Zero invented stats; clear illustrative sample logic)
 */
function initEstimator() {
  const propertyCount = document.getElementById("estPropertyCount");
  const parentCareType = document.getElementById("estParentCareType");
  const hoursSavedResult = document.getElementById("estHoursSaved");
  const inspectionVisitsResult = document.getElementById("estInspectionVisits");

  if (!propertyCount || !parentCareType || !hoursSavedResult || !inspectionVisitsResult) return;

  function calculateEstimate() {
    const props = parseInt(propertyCount.value, 10) || 1;
    const careLevel = parentCareType.value; // 'none', 'errands', 'comprehensive'

    // Illustrative hours saved per month based on property oversight + family coordination
    let propHours = props * 12; // ~12 hours / month tenant & maintenance coordination per property
    let careHours = 0;
    if (careLevel === "errands") careHours = 10;
    else if (careLevel === "comprehensive") careHours = 28;

    const totalHours = propHours + careHours;
    const totalVisits = props * 2; // 2 comprehensive physical audits/visits per property per quarter

    hoursSavedResult.textContent = `~${totalHours} hrs / mo`;
    inspectionVisitsResult.textContent = `${totalVisits} scheduled visits`;
  }

  propertyCount.addEventListener("change", calculateEstimate);
  parentCareType.addEventListener("change", calculateEstimate);
  calculateEstimate();
}

/**
 * FAQ Accordion with Keyboard Navigation
 */
function initFaqAccordion() {
  const faqToggles = document.querySelectorAll(".faq-toggle");
  faqToggles.forEach(toggle => {
    toggle.addEventListener("click", () => {
      const isExpanded = toggle.getAttribute("aria-expanded") === "true";
      const answer = toggle.nextElementSibling;
      const icon = toggle.querySelector(".faq-icon");

      // Close all others
      faqToggles.forEach(other => {
        if (other !== toggle) {
          other.setAttribute("aria-expanded", "false");
          other.nextElementSibling.classList.add("hidden");
          const otherIcon = other.querySelector(".faq-icon");
          if (otherIcon) otherIcon.classList.remove("rotate-180");
        }
      });

      if (isExpanded) {
        toggle.setAttribute("aria-expanded", "false");
        if (answer) answer.classList.add("hidden");
        if (icon) icon.classList.remove("rotate-180");
      } else {
        toggle.setAttribute("aria-expanded", "true");
        if (answer) answer.classList.remove("hidden");
        if (icon) icon.classList.add("rotate-180");
      }
    });

    // Keyboard accessibility: Enter or Space
    toggle.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle.click();
      }
    });
  });
}

/**
 * Scroll Reveal Animations (IntersectionObserver)
 */
function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal-on-scroll");
  if (!reveals.length) return;

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    reveals.forEach(el => revealObserver.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("is-revealed"));
  }
}

/**
 * Animated Number Counters
 */
function initCounters() {
  const counters = document.querySelectorAll(".counter-value");
  if (!counters.length) return;

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute("data-target"), 10);
          let current = 0;
          const step = Math.max(1, Math.floor(target / 25));
          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              el.textContent = target;
              clearInterval(timer);
            } else {
              el.textContent = current;
            }
          }, 35);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.3 });

    counters.forEach(counter => counterObserver.observe(counter));
  } else {
    counters.forEach(counter => counter.textContent = counter.getAttribute("data-target"));
  }
}

/**
/**
 * Robust Hero Video Autoplay with Muted Audio Enforcement and Interaction Fallback
 */
function initHeroVideo() {
  const heroVid = document.getElementById("heroVideo");
  if (!heroVid) return;

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (motionQuery.matches) {
    heroVid.pause();
    return;
  }

  // Enforce DOM muted properties required by modern autoplay security policies
  heroVid.muted = true;
  heroVid.defaultMuted = true;
  heroVid.playsInline = true;

  const attemptPlay = () => {
    const playPromise = heroVid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback: Autoplay prevented until first user gesture
        const onFirstInteraction = () => {
          heroVid.play().catch(() => {});
          window.removeEventListener("click", onFirstInteraction);
          window.removeEventListener("touchstart", onFirstInteraction);
          window.removeEventListener("scroll", onFirstInteraction);
        };
        window.addEventListener("click", onFirstInteraction, { passive: true, once: true });
        window.addEventListener("touchstart", onFirstInteraction, { passive: true, once: true });
        window.addEventListener("scroll", onFirstInteraction, { passive: true, once: true });
      });
    }
  };

  attemptPlay();
}

/**
 * Respect prefers-reduced-motion for background video & animations
 */
function initReducedMotionHandling() {
  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const heroVid = document.getElementById("heroVideo");

  function applyMotionPreference(reduced) {
    if (!heroVid) return;
    if (reduced) {
      heroVid.pause();
      heroVid.currentTime = 0;
      heroVid.removeAttribute("autoplay");
    } else {
      heroVid.muted = true;
      heroVid.play().catch(() => {});
    }
  }

  if (motionQuery.matches) {
    applyMotionPreference(true);
  }

  motionQuery.addEventListener("change", (e) => {
    applyMotionPreference(e.matches);
  });
}

/**
 * Helper: dynamically update copyright year
 */
function updateCurrentYear() {
  const yearEl = document.getElementById("currentYear");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

/**
 * Safe SVG Helpers (Zero raw innerHTML injection)
 */
function createSvgArrow() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "w-5 h-5");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("viewBox", "0 0 24 24");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("d", "M14 5l7 7m0 0l-7 7m7-7H3");
  svg.appendChild(path);
  return svg;
}

function createSvgCheck() {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "w-4 h-4 text-emerald-care flex-shrink-0");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("viewBox", "0 0 24 24");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("d", "M5 13l4 4L19 7");
  svg.appendChild(path);
  return svg;
}
