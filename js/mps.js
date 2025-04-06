document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Show corresponding content
        const tabId = this.dataset.tab;
        document.getElementById(`${tabId}-tab`).classList.add('active');
      });
    });
    
    // Animate progress rings
    const progressRings = document.querySelectorAll('.progress-ring-circle');
    
    // Set progress values (these would normally come from data)
    const progressValues = [75, 90, 60]; // Percentage values for each ring
    
    progressRings.forEach((ring, index) => {
      const radius = ring.r.baseVal.value;
      const circumference = radius * 2 * Math.PI;
      const offset = circumference - (progressValues[index] / 100) * circumference;
      
      ring.style.strokeDasharray = `${circumference} ${circumference}`;
      ring.style.strokeDashoffset = circumference;
      
      // Trigger animation after a short delay
      setTimeout(() => {
        ring.style.strokeDashoffset = offset;
        ring.style.animation = `progress 1.5s ease-in-out forwards`;
      }, index * 300);
    });
    
    // Initialize tooltips
    const badgeContainers = document.querySelectorAll('.badge-container');
    
    badgeContainers.forEach(container => {
      const badge = container.querySelector('.badge');
      const tooltip = container.querySelector('.tooltip');
      
      badge.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
        tooltip.style.marginBottom = '15px';
      });
      
      badge.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        tooltip.style.marginBottom = '10px';
      });
    });
    
    // Floating Action Button interactions
    const fabButton = document.querySelector('.fab-button');
    const fabOptions = document.querySelectorAll('.fab-option');
    
    fabButton.addEventListener('click', function() {
      // This would trigger the primary action (e.g., send message)
      console.log('Primary FAB action triggered');
    });
    
    fabOptions.forEach(option => {
      option.addEventListener('click', function(e) {
        e.stopPropagation();
        // Handle different FAB options
        const icon = this.querySelector('i').className;
        
        if (icon.includes('envelope')) {
          console.log('Email action triggered');
        } else if (icon.includes('user-plus')) {
          console.log('Add connection action triggered');
        } else if (icon.includes('flag')) {
          console.log('Report action triggered');
        }
      });
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  });