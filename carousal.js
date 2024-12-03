const carouselContainer = document.querySelector('.carousel-container');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

// Function to update the carousel position
function updateCarousel() {
    const slideWidth = slides[0].clientWidth;
    carouselContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

// Event Listeners for Buttons
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
});

// Autoplay (optional)
setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateCarousel();
}, 3000);
