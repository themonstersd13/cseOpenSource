
document.addEventListener('DOMContentLoaded', () => {
    const targetDivs = document.querySelectorAll('.innerElements'); 
  
    const observerOptions = {
      root: null, 
      rootMargin: '0px',
      threshold: 0 
    };
  
    const observerCallback = (entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) {
          entry.target.classList.add('hidden');
        } else {
          entry.target.classList.remove('hidden');
        }
      });
    };
  
    const observer = new IntersectionObserver(observerCallback, observerOptions);
  
    targetDivs.forEach(div => observer.observe(div));
  });
  
  
  