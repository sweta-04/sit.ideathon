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
        smartSpeed: 3000,
        items: 1,
        dots: false,
        loop: true,
        nav: false // Navigation buttons removed
    });

    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false, // Ensure no nav buttons here too
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
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


function openModal(img) {
    const modal = document.querySelector('.modal');
    const modalImage = document.getElementById('modal-image');
    modalImage.src = img.src;
    modal.style.display = "flex";
}

function closeModal(e) {
    const modal = document.querySelector('.modal');
    if (e.target === modal) {
        modal.style.display = "none";
    }
}