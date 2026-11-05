/**
 * ============================================================================
 * GOOGLE FIREBASE ANALYTICS & GOOGLE ANALYTICS 4 (GA4) INTEGRATION
 * Project: JP DigiTech Solutions
 * ============================================================================
 * 
 * 📌 कशा प्रकारे FIREBASE ANALYTICS चालू करावे (HOW TO ACTIVATE):
 * 1. Go to https://console.firebase.google.com/ and create/select your project.
 * 2. In Project Settings -> General -> "Your apps", click Web (</>).
 * 3. Register your app (e.g., "JP DigiTech Web").
 * 4. Copy your `firebaseConfig` and paste the values into the object below.
 * 5. Make sure "Google Analytics" is enabled in your Firebase Project.
 * ============================================================================
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics, logEvent, isSupported } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

// ⚙️ FIREBASE CONFIGURATION (REPLACE WITH YOUR PROJECT DETAILS):
const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_FIREBASE_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "G-XXXXXXXXXX" // Google Analytics 4 Measurement ID
};

const APP_NAME = "JP DigiTech Solutions";

// Check if actual configuration has been provided
const isConfigured = Boolean(
  firebaseConfig.apiKey &&
  !firebaseConfig.apiKey.includes("REPLACE_") &&
  !firebaseConfig.apiKey.includes("YOUR_")
);

let analytics = null;
let firebaseApp = null;

/**
 * Initialize Firebase & Google Analytics 4 safely
 */
async function initFirebase() {
  if (!isConfigured) {
    console.info(
      `%c[Firebase Analytics - ${APP_NAME}]%c\nℹ️ Ready for setup! Add your Firebase keys in 'assets/js/firebase-analytics.js' to stream live metrics to Google Analytics.`,
      "color: #06b6d4; font-weight: bold; font-size: 11px;",
      "color: #94a3b8; font-size: 11px;"
    );
    return;
  }

  try {
    const supported = await isSupported();
    if (supported) {
      firebaseApp = initializeApp(firebaseConfig);
      analytics = getAnalytics(firebaseApp);
      
      // Initial page view event
      logEvent(analytics, "page_view", {
        app_name: APP_NAME,
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
      });

      console.info(
        `%c[Firebase Analytics - Active]%c Connected to Google Analytics GA4 (${firebaseConfig.measurementId || 'Active'})`,
        "color: #10b981; font-weight: bold;",
        "color: #64748b;"
      );
    } else {
      console.warn(`[Firebase Analytics] Not supported in this browser environment.`);
    }
  } catch (error) {
    console.error(`[Firebase Analytics Init Error]:`, error);
  }
}

/**
 * Universal Event Tracker (Accessible globally across the entire app)
 * @param {string} eventName - e.g., 'whatsapp_click', 'contact_submit', 'portfolio_view'
 * @param {object} params - Additional event data
 */
export function trackEvent(eventName, params = {}) {
  try {
    const enriched = {
      app_name: APP_NAME,
      timestamp: new Date().toISOString(),
      ...params
    };

    if (analytics) {
      logEvent(analytics, eventName, enriched);
    } else {
      // In development / demo mode:
      // console.debug(`[Analytics Event Tracked]: ${eventName}`, enriched);
    }
  } catch (err) {
    console.warn(`[Analytics Logging Error] for '${eventName}':`, err);
  }
}

// Attach to window object for non-module scripts and HTML onclick handlers
window.trackEvent = trackEvent;
window.jpAnalytics = {
  trackEvent,
  getAnalytics: () => analytics,
  getApp: () => firebaseApp,
  isReady: () => Boolean(analytics)
};

// Initialize immediately
initFirebase();

/**
 * Automatic Event Tracking for interactive elements
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. WhatsApp Button Clicks
  document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"], #sendViaWhatsAppBtn, .btn-whatsapp').forEach(el => {
    el.addEventListener("click", () => {
      trackEvent("whatsapp_click", {
        button_id: el.id || 'whatsapp_link',
        destination: el.getAttribute("href") || "direct_chat",
        placement: el.closest("section")?.id || "header_or_nav"
      });
    });
  });

  // 2. Direct Phone Call Clicks
  document.querySelectorAll('a[href^="tel:"]').forEach(el => {
    el.addEventListener("click", () => {
      trackEvent("phone_call_click", {
        phone_number: el.getAttribute("href").replace("tel:", ""),
        placement: el.closest("section")?.id || "contact_section"
      });
    });
  });

  // 3. Email Inquiries
  document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
    el.addEventListener("click", () => {
      trackEvent("email_inquiry_click", {
        email: el.getAttribute("href").replace("mailto:", ""),
        placement: el.closest("section")?.id || "footer"
      });
    });
  });

  // 4. Form Submissions
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", () => {
      const serviceVal = document.getElementById("contactService")?.value || "Unspecified";
      trackEvent("contact_form_submit", {
        form_id: "contactForm",
        service_selected: serviceVal
      });
    });
  }

  const newsletterForm = document.getElementById("newsletterForm");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", () => {
      trackEvent("newsletter_subscribed", {
        form_id: "newsletterForm"
      });
    });
  }

  // 5. Portfolio Case Studies / Service Blueprint Modal Open
  document.querySelectorAll(".portfolio-card, [data-project]").forEach(card => {
    card.addEventListener("click", () => {
      const projectTitle = card.querySelector(".project-title, h3")?.textContent?.trim() || "Project";
      trackEvent("case_study_view", {
        project_name: projectTitle
      });
    });
  });

  // 6. Navigation Link Tracking
  document.querySelectorAll(".navbar .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      trackEvent("navigation_click", {
        section: link.getAttribute("href") || "unknown"
      });
    });
  });
});

