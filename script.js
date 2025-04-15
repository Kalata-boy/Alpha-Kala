document.addEventListener('DOMContentLoaded', function() {
  // Loader
  window.addEventListener('load', function() {
      const loader = document.querySelector('.loader');
      loader.classList.add('hidden');
  });

  // Mobile menu toggle
  const menuToggle = document.getElementById('mobile-menu');
  const nav = document.querySelector('.nav');
  
  menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      menuToggle.classList.toggle('active');
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
              
              // Close mobile menu if open
              if (nav.classList.contains('active')) {
                  nav.classList.remove('active');
                  menuToggle.classList.remove('active');
              }
          }
      });
  });

  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
          header.classList.add('scrolled');
      } else {
          header.classList.remove('scrolled');
      }
  });

  // Animate stats counting
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateStats() {
      statNumbers.forEach(stat => {
          const target = parseInt(stat.getAttribute('data-count'));
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;
          
          const counter = setInterval(() => {
              current += step;
              if (current >= target) {
                  clearInterval(counter);
                  current = target;
              }
              stat.textContent = Math.floor(current).toLocaleString();
          }, 16);
      });
  }
  
  // Intersection Observer for animations
  const observerOptions = {
      threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animated');
              
              // Animate stats when about section is visible
              if (entry.target.id === 'about') {
                  animateStats();
              }
              
              observer.unobserve(entry.target);
          }
      });
  }, observerOptions);
  
  document.querySelectorAll('[data-aos]').forEach(element => {
      observer.observe(element);
  });

  // Load YouTube videos (this would need to be replaced with actual YouTube API calls)
  function loadVideos() {
      const videoGrid = document.querySelector('.video-grid');
      
      // Mock data - replace with actual YouTube API data
      const videos = [
          { title: "EPIC VALORANT CLUTCH", views: "15K", thumbnail: "https://via.placeholder.com/300x200/333/eee?text=Valorant+Clutch" },
          { title: "FORTNITE WIN", views: "10K", thumbnail: "https://via.placeholder.com/300x200/333/eee?text=Fortnite+Win" },
          { title: "MINECRAFT BUILD", views: "8K", thumbnail: "https://via.placeholder.com/300x200/333/eee?text=Minecraft+Build" },
          { title: "NEW GAME REACTION", views: "12K", thumbnail: "https://via.placeholder.com/300x200/333/eee?text=New+Game" }
      ];
      
      videos.forEach(video => {
          const videoItem = document.createElement('div');
          videoItem.className = 'video-item';
          videoItem.innerHTML = `
              <div class="video-thumbnail">
                  <img src="${video.thumbnail}" alt="${video.title}">
                  <div class="play-button"><i class="fas fa-play"></i></div>
              </div>
              <div class="video-info">
                  <h3>${video.title}</h3>
                  <span class="video-views">${video.views} гледания</span>
              </div>
          `;
          videoGrid.appendChild(videoItem);
      });
  }
  
  loadVideos();
});

// Simple AOS (Animate On Scroll) implementation
document.addEventListener('DOMContentLoaded', function() {
  const aosElements = document.querySelectorAll('[data-aos]');
  
  function checkAOS() {
      aosElements.forEach(element => {
          const elementTop = element.getBoundingClientRect().top;
          const windowHeight = window.innerHeight;
          
          if (elementTop < windowHeight - 100) {
              const animation = element.getAttribute('data-aos');
              element.style.opacity = '1';
              
              switch(animation) {
                  case 'fade-up':
                      element.style.transform = 'translateY(0)';
                      break;
                  case 'fade-down':
                      element.style.transform = 'translateY(0)';
                      break;
                  case 'fade-left':
                      element.style.transform = 'translateX(0)';
                      break;
                  case 'fade-right':
                      element.style.transform = 'translateX(0)';
                      break;
              }
          }
      });
  }
  
  // Set initial styles
  aosElements.forEach(element => {
      const animation = element.getAttribute('data-aos');
      element.style.opacity = '0';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      
      switch(animation) {
          case 'fade-up':
              element.style.transform = 'translateY(20px)';
              break;
          case 'fade-down':
              element.style.transform = 'translateY(-20px)';
              break;
          case 'fade-left':
              element.style.transform = 'translateX(20px)';
              break;
          case 'fade-right':
              element.style.transform = 'translateX(-20px)';
              break;
      }
      
      const delay = element.getAttribute('data-aos-delay');
      if (delay) {
          element.style.transitionDelay = delay + 'ms';
      }
  });
  
  window.addEventListener('scroll', checkAOS);
  window.addEventListener('load', checkAOS);
  checkAOS(); // Run once on load
});