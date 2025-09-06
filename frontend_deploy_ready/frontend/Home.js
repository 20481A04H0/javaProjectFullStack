// Sliding underline active state for navbar links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navLinks.forEach(l => l.classList.remove('active'));
      this.classList.add('active');
    });
  });
});

// Toggle radial social icons
document.addEventListener('DOMContentLoaded', function() {
  var shareWrapper = document.querySelector('.footer-share-wrapper');
  var shareToggle = document.getElementById('share-toggle');
  shareToggle.addEventListener('click', function(e) {
    shareWrapper.classList.toggle('active');
  });
  // Optional: Hide icons if click outside
  document.addEventListener('click', function(e) {
    if (!shareWrapper.contains(e.target)) {
      shareWrapper.classList.remove('active');
    }
  });
});