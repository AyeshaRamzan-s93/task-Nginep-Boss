const hotels = document.querySelector('.hotels');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');

const cardWidth = 522 + 63; // card width + gap between cards
let isMoving = false;

function slideNext() {
  if (isMoving) return;
  isMoving = true;

  hotels.style.transition = 'transform 0.5s ease';
  hotels.style.transform = `translateX(-${cardWidth}px)`;

  hotels.addEventListener('transitionend', () => {
    hotels.style.transition = 'none';           // remove transition to move instantly
    hotels.appendChild(hotels.firstElementChild); // move first card to the end
    hotels.style.transform = 'translateX(0)';   // reset position
    isMoving = false;
  }, { once: true });  // event listener will run once and then remove itself
}

function slidePrev() {
  if (isMoving) return;
  isMoving = true;

  hotels.style.transition = 'none';
  hotels.insertBefore(hotels.lastElementChild, hotels.firstElementChild);
  hotels.style.transform = `translateX(-${cardWidth}px)`;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      hotels.style.transition = 'transform 0.5s ease';
      hotels.style.transform = 'translateX(0)';
    });
  });

  hotels.addEventListener('transitionend', () => {
    isMoving = false;
  }, { once: true });
}

nextBtn.addEventListener('click', slideNext);
prevBtn.addEventListener('click', slidePrev);






document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('.testimonial-track');
  const nextBtn = document.getElementById('t-next');
  const prevBtn = document.getElementById('t-prev');

  if (!track || !nextBtn || !prevBtn) return;

  const stepSize = () => {
    const firstCard = track.querySelector('.testimonial-card');
    if (!firstCard) return 0;
    const cardWidth = firstCard.getBoundingClientRect().width;
    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.gap || styles.columnGap || 0);
    return Math.round(cardWidth + gap);
  };

  let step = stepSize();
  window.addEventListener('resize', () => { step = stepSize(); setActiveCard(); });

  let isMoving = false;

  function setActiveCard() {
    const cards = Array.from(track.querySelectorAll('.testimonial-card'));
    cards.forEach(card => {
      card.classList.remove('active');
      card.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease';
      card.style.transform = 'scale(1) translateY(0)'; // reset
    });

    const viewportWidth = window.innerWidth;
    let activeIndex = 0;

    if (viewportWidth >= 1024 && cards.length >= 3) {
      activeIndex = 1; // middle card on desktop
    } else if (viewportWidth >= 768 && cards.length >= 2) {
      activeIndex = 0; // first visible card on tablet
    } else if (cards.length >= 1) {
      activeIndex = 0; // mobile: only card
    }

    const activeCard = cards[activeIndex];
    if (activeCard) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          activeCard.classList.add('active');
          activeCard.style.transform = 'scale(1.05) translateY(-10px)';
        });
      });
    }
  }

  function slideNext() {
    if (isMoving || step === 0) return;
    isMoving = true;

    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(-${step}px)`;

    track.addEventListener('transitionend', () => {
      track.style.transition = 'none';
      track.appendChild(track.firstElementChild);
      track.style.transform = 'translateX(0)';
      void track.offsetHeight;
      isMoving = false;
      setActiveCard();
    }, { once: true });
  }

  function slidePrev() {
    if (isMoving || step === 0) return;
    isMoving = true;

    track.style.transition = 'none';
    track.insertBefore(track.lastElementChild, track.firstElementChild);
    track.style.transform = `translateX(-${step}px)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        track.style.transition = 'transform 0.5s ease';
        track.style.transform = 'translateX(0)';
      });
    });

    track.addEventListener('transitionend', () => {
      track.style.transition = 'none';
      void track.offsetHeight;
      isMoving = false;
      setActiveCard();
    }, { once: true });
  }

  nextBtn.addEventListener('click', slideNext);
  prevBtn.addEventListener('click', slidePrev);

  setActiveCard(); // Initial state
});


document.getElementById("dashboardLink").addEventListener("click", function (e) {
  e.preventDefault(); // stop default link behavior if needed
  window.location.href = "dashboard.html"; // your dashboard page path
});
