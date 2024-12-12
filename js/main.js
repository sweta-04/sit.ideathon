(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    // Initiate the wowjs
    new WOW().init();

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });

    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: false // Navigation buttons removed
    })
    
})(jQuery);


document.addEventListener("DOMContentLoaded", function () {
  const toggleButtons = document.querySelectorAll(".faq-toggle");

  toggleButtons.forEach(button => {
    button.addEventListener("click", function () {
      const currentAnswer = this.parentElement.nextElementSibling;

      // Collapse all other answers
      toggleButtons.forEach(btn => {
        if (btn !== this) {
          const otherAnswer = btn.parentElement.nextElementSibling;
          btn.classList.remove("open");
          otherAnswer.style.maxHeight = null;
        }
      });

      // Toggle the clicked answer
      if (currentAnswer.style.maxHeight) {
        // Collapse the clicked answer
        currentAnswer.style.maxHeight = null;
        this.classList.remove("open");
      } else {
        // Expand the clicked answer
        currentAnswer.style.maxHeight = currentAnswer.scrollHeight + "px";
        this.classList.add("open");
      }
    });
  });
});






let currentImageIndex = 0; 
const modal = document.querySelector('.modal');
const modalImage = document.getElementById('modal-image');
let imagesArray = [];
let isAnimating = false;

// Open modal and initialize navigation logic
function openModal(img) {
  modal.style.display = "flex";

  imagesArray = Array.from(document.querySelectorAll('.gallery-img')).map(img => img.getAttribute('src'));
  currentImageIndex = imagesArray.findIndex(src => src === img.getAttribute('src'));

  if (currentImageIndex === -1) return;

  modalImage.src = imagesArray[currentImageIndex];
  document.addEventListener('keydown', handleKeyNavigation);
  setupSwipeListeners();
}

// Handle modal close
function closeModal(e) {
  if (e.target === modal) {
    modal.style.display = "none";
    document.removeEventListener('keydown', handleKeyNavigation);
    removeSwipeListeners();
  }
}



// Handle keyboard navigation
function handleKeyNavigation(e) {
  if (isAnimating) return; 
  if (e.key === 'ArrowRight') navigateImage(1);
  if (e.key === 'ArrowLeft') navigateImage(-1);

  if (e.key === 'Escape') {
    modal.style.display = "none";
    document.removeEventListener('keydown', handleKeyNavigation);
    removeSwipeListeners();
  }
}

// Handle navigation with sliding animations
function navigateImage(direction) {
  if (isAnimating) return;
  isAnimating = true;

  const oldImageSrc = modalImage.src; // Store current image
  const newImageIndex = calculateNewIndex(direction);
  const newImageSrc = imagesArray[newImageIndex];

  // Add outgoing animation
  if (direction === 1) {
    modalImage.classList.add("slide-out-left");
  } else {
    modalImage.classList.add("slide-out-right");
  }

  setTimeout(() => {
    modalImage.src = newImageSrc; // Change the image source after slide-out animation
    modalImage.classList.remove("slide-out-left", "slide-out-right");

    // Add new incoming animation
    if (direction === 1) {
      modalImage.classList.add("slide-in-right");
    } else {
      modalImage.classList.add("slide-in-left");
    }

    setTimeout(() => {
      modalImage.classList.remove("slide-in-left", "slide-in-right");
      isAnimating = false;
    }, 300);
  }, 300);
}

// Logic to calculate next index safely
function calculateNewIndex(direction) {
  let newIndex = currentImageIndex + direction;

  if (newIndex >= imagesArray.length) {
    newIndex = 0;
  } else if (newIndex < 0) {
    newIndex = imagesArray.length - 1;
  }

  currentImageIndex = newIndex;
  return newIndex;
}

// Handle swipe logic for mobile
let touchStartX = 0;

function setupSwipeListeners() {
  const modalContainer = document.querySelector('.modal');

  const touchStartHandler = (e) => {
    touchStartX = e.touches[0].clientX;
  };

  const touchMoveHandler = (e) => {
    const touchEndX = e.touches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    if (deltaX > 30) navigateImage(1); 
    if (deltaX < -30) navigateImage(-1);
  };

  modalContainer.addEventListener('touchstart', touchStartHandler);
  modalContainer.addEventListener('touchmove', touchMoveHandler);

  removeSwipeListeners = () => {
    modalContainer.removeEventListener('touchstart', touchStartHandler);
    modalContainer.removeEventListener('touchmove', touchMoveHandler);
  };
}



// Show the popup when the page loads
window.onload = function() {
  setTimeout(function() {
    document.getElementById('popup').style.display = 'flex';
  }, 2000);
};

// Function to close the popup with a fade-out effect
function closePopup() {
  const popup = document.getElementById('popup');
  popup.classList.add('fade-out'); 

  setTimeout(function() {
    popup.style.display = 'none'; 
    popup.classList.remove('fade-out'); 
  }, 500); 
}

// Close the popup if the user clicks outside of the modal content
window.onclick = function(event) {
  const popup = document.getElementById('popup');
  if (event.target === popup) {
    closePopup();
  }
}

// Close the popup if the ESC key is pressed
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') { 
    closePopup();
  }
});