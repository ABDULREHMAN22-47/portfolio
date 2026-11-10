 tailwind.config = {
     theme: {
         extend: {
             keyframes: {
                 breathe: {
                     '0%, 100%': { transform: 'scale(1) translate(0px, 0px)', opacity: '0.3' },
                     '50%': { transform: 'scale(1.2) translate(10px, -15px)', opacity: '0.6' },
                 }
             },
             animation: {
                 'breathe-slow': 'breathe 8s infinite ease-in-out',
                 'breathe-slower': 'breathe 12s infinite ease-in-out',
             }
         },
     },
 };

 document.addEventListener('DOMContentLoaded', () => {
     const contactForm = document.getElementById('contactForm');
     const submitButton = document.getElementById('submitBtn');
     const popup = document.getElementById('successPopup');
     const popupMessage = document.getElementById('contactPopupMessage');
     const popupIcon = popup?.querySelector('path');
     let popupTimer;

     if (contactForm instanceof HTMLFormElement &&
         submitButton instanceof HTMLButtonElement &&
         popup instanceof HTMLElement &&
         popupMessage instanceof HTMLElement &&
         popupIcon instanceof SVGPathElement) {
         contactForm.addEventListener('submit', async (event) => {
             event.preventDefault();

             const originalButtonText = submitButton.textContent;
             submitButton.textContent = 'Sending...';
             submitButton.disabled = true;

             try {
                 const response = await fetch(contactForm.action, {
                     method: contactForm.method,
                     body: new FormData(contactForm),
                     headers: { Accept: 'application/json' },
                 });

                 if (!response.ok) {
                     throw new Error(`Contact form request failed with status ${response.status}`);
                 }

                 contactForm.reset();
                 showContactPopup(true, 'Success!', 'Your message has been sent.');
             } catch (error) {
                 console.error('Unable to submit the contact form:', error);
                 showContactPopup(false, 'Unable to send', 'Something went wrong. Please try again.');
             } finally {
                 submitButton.textContent = originalButtonText;
                 submitButton.disabled = false;
             }
         });
     }

     function showContactPopup(success, title, message) {
         window.clearTimeout(popupTimer);
         document.getElementById('contactPopupTitle').textContent = title;
         popupMessage.textContent = message;
         popupIcon.setAttribute('d', success ? 'M5 13l4 4L19 7' : 'M6 18 18 6M6 6l12 12');
         popup.classList.remove('translate-y-20', 'opacity-0');
         popup.classList.add('translate-y-0', 'opacity-100');

         popupTimer = window.setTimeout(() => {
             popup.classList.remove('translate-y-0', 'opacity-100');
             popup.classList.add('translate-y-20', 'opacity-0');
         }, 3000);
     }

     const menuToggle = document.getElementById('menu-toggle');
     const navigation = document.getElementById('primary-navigation');

     if (!menuToggle || !navigation) {
         return;
     }

     navigation.addEventListener('click', (event) => {
         if (event.target instanceof Element && event.target.closest('a')) {
             menuToggle.checked = false;
         }
     });
 });