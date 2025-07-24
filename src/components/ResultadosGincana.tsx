import React, { useEffect } from 'react';

export const ResultadosGincana: React.FC = () => {
  useEffect(() => {
    // Create floating particles
    const createParticles = () => {
      const particlesContainer = document.getElementById('particles');
      if (!particlesContainer) return;
      
      const particleCount = 50;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: #00f2fe;
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          animation: float ${Math.random() * 3 + 3}s ease-in-out infinite;
          animation-delay: ${Math.random() * 6}s;
          box-shadow: 0 0 10px #00f2fe;
        `;
        particlesContainer.appendChild(particle);
      }
    };

    // Scroll reveal animation
    const revealOnScroll = () => {
      const reveals = document.querySelectorAll('.reveal');
      reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          reveal.classList.add('active');
        }
      });
    };

    // Advanced confetti system
    const createAdvancedConfetti = () => {
      const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
      const shapes = ['circle', 'square', 'triangle'];
      const confettiCount = 100;

      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.cssText = `
          position: fixed;
          width: ${Math.random() * 10 + 5}px;
          height: ${Math.random() * 10 + 5}px;
          background-color: ${color};
          left: ${Math.random() * 100}vw;
          top: -10px;
          z-index: 1000;
          pointer-events: none;
          ${shape === 'circle' ? 'border-radius: 50%;' : ''}
        `;
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
          { transform: 'translateY(-10px) rotate(0deg)', opacity: 1 },
          { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
        ], {
          duration: Math.random() * 3000 + 2000,
          easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        animation.onfinish = () => confetti.remove();
      }
    };

    // Initialize
    createParticles();
    setTimeout(createAdvancedConfetti, 3000);
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();

    return () => {
      window.removeEventListener('scroll', revealOnScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        :root {
          --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          --success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          --warning-gradient: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
          --dark-bg: #0f0f23;
          --card-bg: rgba(255, 255, 255, 0.1);
          --text-light: #ffffff;
          --glow-color: #00f2fe;
        }

        body {
          font-family: 'Poppins', sans-serif;
          background: var(--dark-bg);
          color: var(--text-light);
          overflow-x: hidden;
          line-height: 1.6;
          margin: 0;
          padding: 0;
        }

        .animated-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          background: linear-gradient(45deg, #0f0f23, #1a1a3e, #2d2d5f);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0; }
          50% { transform: translateY(-100px) rotate(180deg); opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        @keyframes glow {
          from { filter: drop-shadow(0 0 20px rgba(0,242,254,0.5)); }
          to { filter: drop-shadow(0 0 30px rgba(0,242,254,0.8)); }
        }

        @keyframes rotate {
          from { transform: translateX(-50%) rotate(0deg); }
          to { transform: translateX(-50%) rotate(360deg); }
        }

        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }

        .particles {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          pointer-events: none;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        .header {
          text-align: center;
          padding: 80px 0;
          position: relative;
        }

        .header::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(0,242,254,0.1) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse 3s ease-in-out infinite;
        }

        .logo {
          font-size: 4rem;
          margin-bottom: 20px;
          animation: bounce 2s ease-in-out infinite;
          filter: drop-shadow(0 0 20px var(--glow-color));
        }

        .school-name {
          font-size: 1.8rem;
          font-weight: 300;
          margin-bottom: 15px;
          opacity: 0.9;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .event-title {
          font-size: 3.5rem;
          font-weight: 900;
          background: var(--success-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 20px;
          animation: glow 2s ease-in-out infinite alternate;
        }

        .event-date {
          font-size: 1.3rem;
          font-weight: 400;
          opacity: 0.8;
          letter-spacing: 1px;
        }

        .podium-section {
          margin: 100px 0;
          text-align: center;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 60px;
          background: var(--warning-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 50%;
          transform: translateX(-50%);
          width: 100px;
          height: 4px;
          background: var(--warning-gradient);
          border-radius: 2px;
          box-shadow: 0 0 20px rgba(0,242,254,0.5);
        }

        .podium {
          display: flex;
          justify-content: center;
          align-items: end;
          gap: 30px;
          margin-bottom: 80px;
          perspective: 1000px;
        }

        .podium-place {
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 40px 30px;
          text-align: center;
          border: 1px solid rgba(255,255,255,0.1);
          position: relative;
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          cursor: pointer;
          overflow: hidden;
        }

        .podium-place:hover {
          transform: translateY(-20px) rotateY(5deg);
          box-shadow: 0 30px 60px rgba(0,0,0,0.3);
        }

        .first-place {
          order: 2;
          background: linear-gradient(135deg, rgba(255,215,0,0.2), rgba(255,165,0,0.2));
          border: 2px solid #FFD700;
          transform: scale(1.1);
          box-shadow: 0 0 40px rgba(255,215,0,0.3);
        }

        .second-place {
          order: 1;
          background: linear-gradient(135deg, rgba(192,192,192,0.2), rgba(169,169,169,0.2));
          border: 2px solid #C0C0C0;
          box-shadow: 0 0 40px rgba(192,192,192,0.3);
        }

        .third-place {
          order: 3;
          background: linear-gradient(135deg, rgba(205,127,50,0.2), rgba(184,134,11,0.2));
          border: 2px solid #CD7F32;
          box-shadow: 0 0 40px rgba(205,127,50,0.3);
        }

        .place-number {
          font-size: 4rem;
          font-weight: 900;
          margin-bottom: 15px;
          background: var(--success-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .place-class {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 15px;
          letter-spacing: 1px;
        }

        .place-score {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--glow-color);
          text-shadow: 0 0 20px var(--glow-color);
        }

        .crown {
          position: absolute;
          top: -20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 2rem;
          animation: rotate 3s linear infinite;
        }

        .results-section {
          margin: 100px 0;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
          margin-top: 60px;
        }

        .class-card {
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 30px;
          border: 1px solid rgba(255,255,255,0.1);
          position: relative;
          transition: all 0.4s ease;
          cursor: pointer;
          overflow: hidden;
        }

        .class-card:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,242,254,0.2);
          border-color: var(--glow-color);
        }

        .class-name {
          font-size: 1.4rem;
          font-weight: 600;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .class-score {
          font-size: 3rem;
          font-weight: 800;
          text-align: center;
          background: var(--success-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 0 20px rgba(0,242,254,0.5);
        }

        .rank-badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: var(--secondary-gradient);
          color: white;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .congratulations {
          background: var(--card-bg);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 25px;
          padding: 50px;
          margin: 80px 0;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .congratulations h3 {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 20px;
          background: var(--warning-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .footer {
          text-align: center;
          padding: 60px 0;
          border-top: 1px solid rgba(255,255,255,0.1);
          margin-top: 100px;
        }

        .footer p {
          font-size: 1.1rem;
          opacity: 0.8;
          margin-bottom: 10px;
        }

        .loading {
          opacity: 0;
          transform: translateY(50px);
          animation: fadeInUp 0.8s ease forwards;
        }

        .reveal {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s ease;
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .event-title { font-size: 2.5rem; }
          .podium { flex-direction: column; align-items: center; }
          .podium-place { order: unset !important; transform: none !important; margin-bottom: 20px; width: 100%; max-width: 300px; }
          .results-grid { grid-template-columns: 1fr; }
          .congratulations { padding: 30px 20px; }
        }
      `}</style>

      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      <div className="animated-bg"></div>
      <div className="particles" id="particles"></div>

      <div className="container">
        <header className="header loading">
          <div className="logo">🏆</div>
          <h1 className="school-name">E.E.E.F. Inglês de Souza</h1>
          <h2 className="event-title">GINCANA DA ECOGAMIFICAÇÃO</h2>
          <p className="event-date">23 - 26 de Junho de 2025</p>
        </header>

        <section className="podium-section reveal">
          <h3 className="section-title">
            <i className="fas fa-trophy"></i> PÓDIO DOS CAMPEÕES
          </h3>
          
          <div className="podium">
            <div className="podium-place second-place">
              <div className="crown">🥈</div>
              <div className="place-number">2º</div>
              <div className="place-class">7º ano Manhã</div>
              <div className="place-score">56 pts</div>
            </div>
            
            <div className="podium-place first-place">
              <div className="crown">👑</div>
              <div className="place-number">1º</div>
              <div className="place-class">6º ano Manhã</div>
              <div className="place-score">59 pts</div>
            </div>
            
            <div className="podium-place third-place">
              <div className="crown">🥉</div>
              <div className="place-number">3º</div>
              <div className="place-class">7º ano Tarde</div>
              <div className="place-score">41 pts</div>
            </div>
          </div>
        </section>

        <div className="congratulations reveal">
          <h3><i className="fas fa-star"></i> PARABÉNS AOS VENCEDORES! <i className="fas fa-star"></i></h3>
          <p style={{fontSize: '1.3rem', marginBottom: '15px'}}>🎉 6º ano Manhã - CAMPEÕES DA ECOGAMIFICAÇÃO 2025! 🎉</p>
          <p style={{opacity: 0.9}}>Todos os participantes demonstraram excelência e comprometimento com o meio ambiente!</p>
        </div>

        <section className="results-section reveal">
          <h3 className="section-title">
            <i className="fas fa-chart-bar"></i> CLASSIFICAÇÃO COMPLETA
          </h3>
          
          <div className="results-grid">
            <div className="class-card">
              <div className="rank-badge">#1</div>
              <div className="class-name">
                <i className="fas fa-crown" style={{color: '#FFD700'}}></i>
                6º ano Manhã
              </div>
              <div className="class-score">59 <span style={{fontSize: '1rem', opacity: 0.7}}>pts</span></div>
            </div>
            
            <div className="class-card">
              <div className="rank-badge">#2</div>
              <div className="class-name">
                <i className="fas fa-medal" style={{color: '#C0C0C0'}}></i>
                7º ano Manhã
              </div>
              <div className="class-score">56 <span style={{fontSize: '1rem', opacity: 0.7}}>pts</span></div>
            </div>
            
            <div className="class-card">
              <div className="rank-badge">#3</div>
              <div className="class-name">
                <i className="fas fa-award" style={{color: '#CD7F32'}}></i>
                7º ano Tarde
              </div>
              <div className="class-score">41 <span style={{fontSize: '1rem', opacity: 0.7}}>pts</span></div>
            </div>
            
            <div className="class-card">
              <div className="rank-badge">#4</div>
              <div className="class-name">
                <i className="fas fa-leaf" style={{color: '#4CAF50'}}></i>
                4º ano
              </div>
              <div className="class-score">37 <span style={{fontSize: '1rem', opacity: 0.7}}>pts</span></div>
            </div>
            
            <div className="class-card">
              <div className="rank-badge">#5</div>
              <div className="class-name">
                <i className="fas fa-seedling" style={{color: '#8BC34A'}}></i>
                8º ano Manhã
              </div>
              <div className="class-score">35 <span style={{fontSize: '1rem', opacity: 0.7}}>pts</span></div>
            </div>
            
            <div className="class-card">
              <div className="rank-badge">#6</div>
              <div className="class-name">
                <i className="fas fa-tree" style={{color: '#4CAF50'}}></i>
                8º ano Tarde
              </div>
              <div className="class-score">35 <span style={{fontSize: '1rem', opacity: 0.7}}>pts</span></div>
            </div>
            
            <div className="class-card">
              <div className="rank-badge">#7</div>
              <div className="class-name">
                <i className="fas fa-globe" style={{color: '#2196F3'}}></i>
                6º ano Tarde
              </div>
              <div className="class-score">33 <span style={{fontSize: '1rem', opacity: 0.7}}>pts</span></div>
            </div>
            
            <div className="class-card">
              <div className="rank-badge">#8</div>
              <div className="class-name">
                <i className="fas fa-recycle" style={{color: '#FF9800'}}></i>
                3º ano
              </div>
              <div className="class-score">27 <span style={{fontSize: '1rem', opacity: 0.7}}>pts</span></div>
            </div>
            
            <div className="class-card">
              <div className="rank-badge">#9</div>
              <div className="class-name">
                <i className="fas fa-heart" style={{color: '#E91E63'}}></i>
                5º ano
              </div>
              <div className="class-score">25 <span style={{fontSize: '1rem', opacity: 0.7}}>pts</span></div>
            </div>
            
            <div className="class-card">
              <div className="rank-badge">#10</div>
              <div className="class-name">
                <i className="fas fa-star" style={{color: '#9C27B0'}}></i>
                901
              </div>
              <div className="class-score">22 <span style={{fontSize: '1rem', opacity: 0.7}}>pts</span></div>
            </div>
            
            <div className="class-card">
              <div className="rank-badge">#11</div>
              <div className="class-name">
                <i className="fas fa-gem" style={{color: '#607D8B'}}></i>
                902
              </div>
              <div className="class-score">10 <span style={{fontSize: '1rem', opacity: 0.7}}>pts</span></div>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer reveal">
        <p><i className="fas fa-earth-americas"></i> Obrigado a todos pela participação na Gincana da Ecogamificação!</p>
        <p style={{opacity: 0.6}}>E.E.E.F. Inglês de Souza © 2025</p>
      </footer>
    </>
  );
};