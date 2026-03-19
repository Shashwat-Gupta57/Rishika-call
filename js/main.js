// main.js - Global Interactions and Effects

document.addEventListener('DOMContentLoaded', () => {
  createFloatingEffects();
  
  // Add smooth transitions for links
  const links = document.querySelectorAll('a.btn');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      if(this.getAttribute('href').startsWith('#') || this.getAttribute('target') === '_blank') return;
      e.preventDefault();
      const target = this.getAttribute('href');
      
      // Simple fade out effect
      document.body.style.transition = 'opacity 0.5s ease-out';
      document.body.style.opacity = '0';
      
      setTimeout(() => {
        window.location.href = target;
      }, 500);
    });
  });

  // Fade in on load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.6s ease-in';
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

function createFloatingEffects() {
  const container = document.createElement('div');
  container.id = 'fx-container';
  document.body.appendChild(container);

  // Set interval to spawn floating hearts
  setInterval(() => {
    if (Math.random() > 0.6) {
      const heart = document.createElement('div');
      heart.className = 'heart';
      heart.innerHTML = '✨'; // alternating sparkling
      if(Math.random() > 0.5) heart.innerHTML = '💖';
      
      heart.style.left = Math.random() * 100 + 'vw';
      heart.style.fontSize = (Math.random() * 1 + 1) + 'rem';
      heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
      
      container.appendChild(heart);
      
      // Clean up
      setTimeout(() => {
        heart.remove();
      }, 7000);
    }
  }, 800);
}
