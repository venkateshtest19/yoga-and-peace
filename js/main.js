/* ============================================
   YOGA AND PEACE — Main JavaScript
   Mobile menu, smooth scroll, FAQ accordion,
   Google Sheets form submission. 
   Lightweight & accessible.
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  
  // ---------- Mobile Menu Toggle ----------
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      const isActive = nav.classList.toggle('active');
      menuToggle.setAttribute('aria-expanded', isActive);
    });
    
    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
  
  // ---------- FAQ Accordion ----------
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const answerInner = item.querySelector('.faq-answer-inner');
    
    if (question && answer) {
      question.addEventListener('click', function() {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherAnswer = otherItem.querySelector('.faq-answer');
            if (otherAnswer) otherAnswer.style.maxHeight = null;
          }
        });
        
        // Toggle current
        if (isActive) {
          item.classList.remove('active');
          answer.style.maxHeight = null;
        } else {
          item.classList.add('active');
          answer.style.maxHeight = answerInner.scrollHeight + 'px';
        }
      });
    }
  });
  
  // ---------- Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // ---------- Form Submission to Google Sheets ----------
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault(); // Stop page from reloading
      
      // 1. Basic Validation
      let isValid = true;
      const requiredFields = contactForm.querySelectorAll('[required]');
      
      requiredFields.forEach(field => {
        field.style.borderColor = ''; // Reset border color
        
        if (!field.value.trim()) {
          isValid = false;
          field.style.borderColor = '#E53E3E'; // Red border if empty
        }
        
        // Email validation
        if (field.type === 'email' && field.value.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(field.value.trim())) {
            isValid = false;
            field.style.borderColor = '#E53E3E'; // Red border if invalid email
          }
        }
      });

      // Stop if invalid
      if (!isValid) {
        alert('Please fill in all required fields correctly.');
        return;
      }

      // 2. Google Script URL
      const scriptURL = 'https://script.google.com/macros/s/AKfycbx-XL76xff180sJFTn1-G3i_hwtFOW_7SZIJPAMkPdYAlWPvp05cMoEwdBLr-ncDQfr0w/exec'; 
      
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      
      // 3. Change button text to show it's working
      const originalText = submitBtn.innerText;
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;

      // 4. Send data to Google Sheets
      // FIX: Added mode: 'no-cors' to prevent Google's redirect from triggering the catch block
      fetch(scriptURL, { 
        method: 'POST', 
        body: formData,
        mode: 'no-cors' 
      })
      .then(() => {
        // 5. Success! Clear form and redirect to Thank You page
        // Note: With no-cors, we can't read the response, but we know it sent.
        contactForm.reset();
        window.location.href = 'thank-you.html';
      })
      .catch(error => {
        // 6. If it truly fails (network down), show error
        alert('Oops! Something went wrong. Please try again or call us directly.');
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
        console.error('Error!', error.message);
      });
    });
  }

  // ---------- Header Shadow on Scroll ----------
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 12px rgba(45, 55, 72, 0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    }, { passive: true });
  }
  
});
