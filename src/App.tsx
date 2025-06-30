import React from 'react';
import { useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import './style.css';

function App() {
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
          if (joinedElement && spotsLeftElement && progressFill && progressPercent) {
            joinedElement.textContent = String(targetJoined);
            spotsLeftElement.textContent = String(100 - targetJoined);
            progressFill.style.width = targetJoined + '%';
            progressPercent.textContent = targetJoined + '%';
          }
          clearInterval(timer);
        } else {
          const currentJoined = Math.floor(joined);
          if (joinedElement && spotsLeftElement && progressFill && progressPercent) {
            joinedElement.textContent = String(currentJoined);
            spotsLeftElement.textContent = String(100 - currentJoined);
            progressFill.style.width = currentJoined + '%';
            progressPercent.textContent = currentJoined + '%';
          }
        }
      }, 30);
    }
    animateCounters();

    // Waitlist form submission
    const form = document.getElementById('waitlistForm');
    const formContent = document.querySelector('.form-content');
    const submitBtn = document.getElementById('submitBtn');
    const successMessage = document.getElementById('successMessage');
    if (form && formContent && submitBtn && successMessage) {
      form.addEventListener('submit', async function(e) {
        e.preventDefault();
        const name = (document.getElementById('name') as HTMLInputElement).value.trim();
        const email = (document.getElementById('email') as HTMLInputElement).value.trim();
        if (!name || !email) return;
        (submitBtn as HTMLButtonElement).disabled = true;
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
            (formContent as HTMLElement).style.opacity = '0';
            setTimeout(() => {
              (formContent as HTMLElement).style.display = 'none';
              successMessage.classList.add('active');
            }, 500);
            // Update counters
            const joinedElement = document.getElementById('joinedCount');
            const spotsLeftElement = document.getElementById('spotsLeft');
            const progressFill = document.getElementById('progressFill');
            const progressPercent = document.getElementById('progressPercent');
            if (joinedElement && spotsLeftElement && progressFill && progressPercent) {
              const newJoined = parseInt(joinedElement.textContent) + 1;
              joinedElement.textContent = String(newJoined);
              spotsLeftElement.textContent = String(100 - newJoined);
              progressFill.style.width = newJoined + '%';
              progressPercent.textContent = newJoined + '%';
            }
          }, 1500);
        } catch (error) {
          console.error('Error submitting form:', error);
        } finally {
          (submitBtn as HTMLButtonElement).disabled = false;
          submitBtn.textContent = 'Claim My Founding Spot';
        }
      });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const href = (this as HTMLAnchorElement).getAttribute('href');
        if (href) {
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
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
        (particle as HTMLElement).style.transform = `translate(${xOffset}px, ${yOffset}px)`;
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
        <header className="header">
          <div className="logo">FoundersHUB</div>
          <a href="#waitlist" className="early-access-btn">Early Access</a>
        </header>

        <section className="hero-section">
          <h1 className="hero-title">Where Passionate<br />Builders Connect &amp; Grow</h1>
          <p className="hero-subtitle">The specialized space for entrepreneurs, solopreneurs &amp; SaaS builders</p>
          <p className="hero-platforms">Reddit + ProductHunt + IndieHackers + X = FoundersHUB</p>
          <p className="hero-description">
            Track progress, build momentum, and ship publicly in the community built 
            specifically for driven founders who refuse to build in silence.
          </p>
        </section>

        <section className="progress-section">
          <div className="progress-title">
            <span className="rocket-icon">🚀</span>
            Founding Members Progress
          </div>
          <div className="progress-stats">
            <div className="stat-item">
              <span className="stat-number" id="joinedCount">47</span>
              <span className="stat-label">Joined</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100</span>
              <span className="stat-label">Target</span>
            </div>
            <div className="stat-item">
              <span className="stat-number" id="spotsLeft">53</span>
              <span className="stat-label">Spots Left</span>
            </div>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar">
              <div className="progress-fill" id="progressFill"></div>
            </div>
            <div className="progress-info">
              <span className="progress-label">Founding Members</span>
              <span className="progress-percentage" id="progressPercent">47%</span>
            </div>
          </div>
        </section>

        <section className="benefits-section">
          <h2 className="benefits-title">Founding Member Benefits</h2>
          <div className="benefits-grid">
            <div className="benefit-card">
              <span className="benefit-icon">🏆</span>
              <div className="benefit-title">Founding Member Badge</div>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">💎</span>
              <div className="benefit-title">Lifetime Premium Access</div>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">🚀</span>
              <div className="benefit-title">Priority Dashboard Access</div>
            </div>
            <div className="benefit-card">
              <span className="benefit-icon">💬</span>
              <div className="benefit-title">Direct Founder Network</div>
            </div>
          </div>
        </section>

        <section className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <div className="feature-title">Public Progress Logs</div>
              <div className="feature-description">Track milestones, daily wins, and startup journey in one focused dashboard that's yours to own.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <div className="feature-title">XP &amp; Streak System</div>
              <div className="feature-description">Gamified motivation with daily XP, streaks, and visible momentum to keep you building consistently.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <div className="feature-title">Shareable Startup Card</div>
              <div className="feature-description">Your professional founder profile with metrics, milestones, and momentum in one beautiful card.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <div className="feature-title">Community &amp; Networking</div>
              <div className="feature-description">Connect with like-minded entrepreneurs, share insights, and build meaningful relationships.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <div className="feature-title">Product Showcases</div>
              <div className="feature-description">Launch your products to a community that gets it. Get feedback from fellow builders who've been there.</div>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <div className="feature-title">Co-founder Matching</div>
              <div className="feature-description">Find your perfect co-founder or collaborator based on skills, vision, and building momentum.</div>
            </div>
          </div>
        </section>

        <section className="cta-section" id="waitlist">
          <h2 className="cta-title">Join the Waitlist to become Founding Members</h2>
          <p className="cta-subtitle">
            Be part of the exclusive community where passionate builders turn 
            ideas into reality, together.
          </p>
          <div className="waitlist-form-container">
            <form id="waitlistForm" className="form-content">
              <div className="form-group">
                <label className="form-label" htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-input" 
                  placeholder="Your name"
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
      <Analytics />
    </>
  );
}

export default App; 