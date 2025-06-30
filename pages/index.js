import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Animate counters on load
    function animateCounters() {
      const joinedElement = document.getElementById('joinedCount');
      const spotsLeftElement = document.getElementById('spotsLeft');
      const progressFill = document.getElementById('progressFill');
      const progressPercent = document.getElementById('progressPercent');
      let joined = 0;
      const targetJoined = 47;
      const increment = targetJoined / 50;
      const timer = setInterval(() => {
        joined += increment;
        if (joined >= targetJoined) {
          joinedElement.textContent = targetJoined;
          spotsLeftElement.textContent = 100 - targetJoined;
          progressFill.style.width = targetJoined + '%';
          progressPercent.textContent = targetJoined + '%';
          clearInterval(timer);
        } else {
          const currentJoined = Math.floor(joined);
          joinedElement.textContent = currentJoined;
          spotsLeftElement.textContent = 100 - currentJoined;
          progressFill.style.width = currentJoined + '%';
          progressPercent.textContent = currentJoined + '%';
        }
      }, 30);
    }
    animateCounters();

    // Waitlist form submission
    const form = document.getElementById('waitlistForm');
    const formContent = document.querySelector('.form-content');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    if (form) {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        if (!name || !email) return;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Claiming Spot...';
        const requestData = {
          name: name,
          email: email,
          timestamp: new Date().toISOString(),
          source: 'FoundersHUB Founding Members'
        };
        try {
          await fetch('https://script.google.com/macros/s/AKfycbwCK5oLciAg-n3fc00t6yIGhehbkUxa0TMMj77c4fu8MRaWlnfylazPNgWkz4NylS7s4A/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
          });
          setTimeout(() => {
            formContent.style.opacity = '0';
            setTimeout(() => {
              formContent.style.display = 'none';
              successMessage.classList.add('active');
            }, 500);
            // Update counters
            const joinedElement = document.getElementById('joinedCount');
            const spotsLeftElement = document.getElementById('spotsLeft');
            const progressFill = document.getElementById('progressFill');
            const progressPercent = document.getElementById('progressPercent');
            const newJoined = parseInt(joinedElement.textContent) + 1;
            joinedElement.textContent = newJoined;
            spotsLeftElement.textContent = 100 - newJoined;
            progressFill.style.width = newJoined + '%';
            progressPercent.textContent = newJoined + '%';
          }, 1500);
        } catch (error) {
          console.error('Error submitting form:', error);
        } finally {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Claim My Founding Spot';
        }
      });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });

    // Add subtle mouse tracking effect
    document.addEventListener('mousemove', (e) => {
      const particles = document.querySelectorAll('.particle');
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.5;
        const xOffset = (x - 0.5) * speed * 20;
        const yOffset = (y - 0.5) * speed * 20;
        particle.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
      });
    });

    // Analytics tracking
    fetch('https://script.google.com/macros/s/AKfycbwCK5oLciAg-n3fc00t6yIGhehbkUxa0TMMj77c4fu8MRaWlnfylazPNgWkz4NylS7s4A/exec', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'pageview',
        url: window.location.href,
        referrer: document.referrer,
        userAgent: navigator.userAgent,
        language: navigator.language,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height
      })
    });
  }, []);

  return (
    <>
      <div className="background"></div>
      <div className="grid-overlay"></div>
      <div className="particle" style={{top: '20%', left: '10%'}}></div>
      <div className="particle" style={{top: '60%', right: '15%'}}></div>
      <div className="particle" style={{top: '80%', left: '20%'}}></div>
      <div className="container">
        <section className="waitlist-form">
          <div className="form-content">
            <h2>Join the Founding Members Waitlist</h2>
            <form id="waitlistForm">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-input" 
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="email">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-input" 
                  placeholder="founder@startup.com"
                  required
                />
              </div>
              <button type="submit" className="submit-btn" id="submitBtn">
                Claim My Founding Spot
              </button>
            </form>
            <div className="success-message" id="successMessage">
              🎉 Welcome to the Founding Members Waitlist! We'll notify you with exclusive early access when we launch.
            </div>
          </div>
        </section>
      </div>
    </>
  );
} 