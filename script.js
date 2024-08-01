// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Открытие/закрытие FAQ
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  });
});

// Анимация появления элементов при прокрутке
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function handleScroll() {
  document.querySelectorAll('.fade-in').forEach(el => {
    if (isElementInViewport(el)) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// Анимация для контактной формы
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();

  let isValid = true;
  this.querySelectorAll('input, textarea').forEach(el => {
    if (el.hasAttribute('required') && !el.value.trim()) {
      isValid = false;
      el.classList.add('shake');
      setTimeout(() => el.classList.remove('shake'), 500);
    }
  });

  if (isValid) {
    // Здесь можно добавить код для отправки формы
    alert('Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.');
    this.reset();
  }
});

// Плавное появление формы при прокрутке
const contactForm = document.querySelector('.contact-form');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = 1;
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, {threshold: 0.1});

observer.observe(contactForm);