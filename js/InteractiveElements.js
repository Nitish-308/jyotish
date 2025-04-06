// // Tab functionality for resources section
// const tabs = document.querySelectorAll('.category-tabs .tab');
// tabs.forEach(tab => {
//   tab.addEventListener('click', () => {
//     // Remove active class from all tabs
//     tabs.forEach(t => t.classList.remove('active'));
//     // Add active class to clicked tab
//     tab.classList.add('active');
    
//     const category = tab.dataset.category;
//     filterResources(category);
//   });
// });

// function filterResources(category) {
//   const resources = document.querySelectorAll('.resource-card');
//   resources.forEach(resource => {
//     if (category === 'all' || resource.dataset.category === category) {
//       resource.style.display = 'block';
//     } else {
//       resource.style.display = 'none';
//     }
//   });
// }



document.addEventListener('DOMContentLoaded', function() {
  // Initialize particles.js
  particlesJS('particles-js', {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 3,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 2,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 140,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });

  // Mood switcher functionality
  const moodButtons = document.querySelectorAll('.mood-btn');
  
  moodButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      moodButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Set the theme attribute on the html element
      document.documentElement.setAttribute('data-theme', this.dataset.theme);
      
      // Save theme preference to localStorage
      localStorage.setItem('community-theme', this.dataset.theme);
      
      // Update particles color based on theme
      updateParticlesColor(this.dataset.theme);
    });
  });
  
  // Check for saved theme preference
  const savedTheme = localStorage.getItem('community-theme') || 'vibrant';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Activate the corresponding button
  const activeButton = document.querySelector(`.mood-btn[data-theme="${savedTheme}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
    updateParticlesColor(savedTheme);
  }
  
  // Scroll indicator functionality
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', function() {
      window.scrollTo({
        top: document.querySelector('.value-prop').offsetTop,
        behavior: 'smooth'
      });
    });
  }
  
  // Animate cards when they come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = entry.target.style.getPropertyValue('--delay') || '0s';
        entry.target.classList.add('slide-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.prop-card').forEach(card => {
    observer.observe(card);
  });
  
  // Update particles color based on theme
  function updateParticlesColor(theme) {
    let particleColor, lineColor;
    
    switch(theme) {
      case 'calm':
        particleColor = '#4b79cf';
        lineColor = '#a5dff9';
        break;
      case 'dark':
        particleColor = '#b24592';
        lineColor = '#4e4376';
        break;
      default: // vibrant
        particleColor = '#9d50bb';
        lineColor = '#4776e6';
    }
    
    if (window.pJSDom && window.pJSDom.length > 0) {
      const pJS = window.pJSDom[0].pJS;
      pJS.particles.color.value = particleColor;
      pJS.particles.line_linked.color = lineColor;
      pJS.fn.particlesRefresh();
    }
  }
  
  // Floating navigation highlight on scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id') || '';
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });
});