/* ============================================
   YOGA AND PEACE — Main JavaScript
   Mobile menu, smooth scroll, FAQ accordion,
   form validation. Lightweight & accessible.
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
  
  // ---------- Form Validation (Allows Formspree to handle submission) ----------
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
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
      
      // If invalid, stop Formspree from submitting
      if (!isValid) {
        e.preventDefault();
        alert('Please fill in all required fields correctly.');
      }
      // If valid, the form submits normally to Formspree and redirects to thank-you.html
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
