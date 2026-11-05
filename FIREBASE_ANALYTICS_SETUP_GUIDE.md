# 🔥 Google Firebase Analytics सेटअप मार्गदर्शक (Setup Guide)

सर्व 4 प्रोजेक्ट्समध्ये **Google Firebase Analytics (Google Analytics 4 / GA4)** जोडले गेले आहे:
1. 🚀 **JP DigiTech Solutions** (`JP/assets/js/firebase-analytics.js`)
2. ✍️ **Dhananjay Handwriting Classes** (`Dhananjay-Handwriting/firebase-analytics.js`)
3. 🐄 **New Seven Pharma** (`new-seven-pharma/js/firebase-analytics.js`)
4. 💧 **Royal H2O Luxury Bottles** (`water website/royal_h20_webapp-main/royal_h20_webapp-main/firebase-analytics.js`)

---

## 📌 पायरी १: Firebase Console वर प्रोजेक्ट तयार करा (Create Project)

1. [Google Firebase Console (https://console.firebase.google.com/)](https://console.firebase.google.com/) वर जा.
2. तुमच्या Google Account ने लॉगिन करा.
3. **"Add project"** (प्रोजेक्ट तयार करा) वर क्लिक करा.
4. प्रोजेक्टचे नाव द्या (उदा. `JP-DigiTech-Clients` किंवा प्रत्येक ॲपसाठी स्वतंत्र प्रोजेक्ट).
5. **Google Analytics सक्षम करा (Enable Google Analytics for this project):**
   - येथे टॉगल **Enable (ON)** ठेवा. (हे **100% मोफत** आहे).
   - "Default Account for Firebase" निवडा आणि **Create Project** वर क्लिक करा.

---

## 📌 पायरी २: Web App तयार करा आणि Config मिळवा (Get Firebase Config)

1. Firebase Project Overview स्क्रीनवर मध्यभागी **वेब आयकॉन `</>`** दिसेल, त्यावर क्लिक करा.
2. ॲपचे नाव द्या (उदा. `JP DigiTech Website`).
3. "Also set up Firebase Hosting" ची गरज नाही (अनचेक ठेवा), नंतर **Register app** वर क्लिक करा.
4. स्क्रीनवर तुम्हाला खालीलप्रमाणे `firebaseConfig` दिसेल:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyD-xxxxxxxxxxxxxxxxxxxxx",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890",
  measurementId: "G-XXXXXXXXXX" // 👈 हे Google Analytics 4 साठी आवश्यक आहे
};
```

---

## 📌 पायरी ३: तुमच्या फाईलमध्ये कीज (Keys) पेस्ट करा (Paste Keys)

संबंधित प्रोजेक्टच्या फाईलमध्ये जा आणि वरील मूल्ये (Values) पेस्ट करा:

| प्रोजेक्ट | फाईलचा मार्ग (File Path) |
|---|---|
| **JP DigiTech** | `JP/assets/js/firebase-analytics.js` |
| **Dhananjay Handwriting** | `Dhananjay-Handwriting/firebase-analytics.js` |
| **New Seven Pharma** | `new-seven-pharma/js/firebase-analytics.js` |
| **Royal H2O** | `water website/royal_h20_webapp-main/royal_h20_webapp-main/firebase-analytics.js` |

> 💡 **टीप**: प्रत्येक वेबसाईटसाठी स्वतंत्र Measurement ID (`G-XXXXXXXXXX`) वापरल्यास प्रत्येक वेबसाईटचा ट्रॅफिक, व्हिजिटर्स आणि ऑर्डर्स वेगवेगळ्या डॅशबोर्डवर स्पष्ट दिसतील. एकाच Firebase प्रोजेक्टमध्ये तुम्ही एकापेक्षा जास्त Web Apps (`</>`) तयार करू शकता.

---

## 📊 आपोआप ट्रॅक होणारे इव्हेंट्स (Auto-Tracked Events)

तुम्हाला कोणताच अतिरिक्त कोड लिहिण्याची गरज नाही. खालील सर्व गोष्टी आपोआप ट्रॅक होतात:

1. **Page Views (`page_view`)**: प्रत्येक पेज लोड आणि व्हिजिटरची माहिती (City, Country, Device, Browser).
2. **WhatsApp Inquiries (`whatsapp_click`)**: व्हॉट्सॲप बटनावर कोणी क्लिक केले.
3. **Phone Calls (`phone_call_click`)**: थेट कॉल बटनावर क्लिक करणारे ग्राहक.
4. **Form Submissions (`contact_form_submit` / `admission_inquiry_sent` / `prescription_order_sent`)**:
   - JP: कॉन्टॅक्ट फॉर्म व लीड्स
   - Dhananjay Handwriting: ऍडमिशन चौकशी व डेमो बुकिंग
   - New Seven Pharma: डॉक्टरांची चिठ्ठी (Prescription) व गोठा कॅल्क्युलेटर ऑर्डर्स
   - Royal H2O: सॅम्पल बॉटल्स व रिव्ह्यू
5. **Direct Functions**: तुमच्या कोणत्याही जावास्क्रिप्ट कोडमधून कधीही `window.trackEvent('event_name', { details })` कॉल करू शकता.

---

## 🔍 चाचणी कशी करावी (How to Test in Real-Time):

1. फाईलमध्ये कीज पेस्ट केल्यानंतर वेबसाईट ब्राउझरमध्ये उघडा.
2. [Google Analytics Dashboard (analytics.google.com)](https://analytics.google.com/) किंवा Firebase Console मध्ये डाव्या बाजूला **Analytics > Realtime** वर जा.
3. वेबसाईटवर व्हॉट्सॲप किंवा फोन बटनावर क्लिक करा; तुम्हाला 5 ते 10 सेकंदांत Realtime डॅशबोर्डवर लाईव्ह व्हिजिटर आणि इव्हेंट दिसतील!

