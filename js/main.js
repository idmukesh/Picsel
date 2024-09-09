document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.getElementById("menu-toggle");
    const menu = document.getElementById("menu");
    const closeBtn = document.getElementById("close-button");
    const body = document.body;
    const menuLinks = document.querySelectorAll("#menu a");

    function updateMenuVisibility() {
        if (window.innerWidth >= 768) {
            menu.classList.remove("show");
            body.classList.remove("no-scroll");
            menuToggle.style.display = "none";
            closeBtn.style.display = "none";
        } else {
            menuToggle.style.display = menu.classList.contains("show") ? "none" : "block";
            closeBtn.style.display = menu.classList.contains("show") ? "block" : "none";
        }
    }

    function setActiveLink() {
        menuLinks.forEach(link => {
            link.addEventListener("click", function () {
                menuLinks.forEach(link => link.classList.remove("active"));
                this.classList.add("active");
                if (window.innerWidth < 768) {
                    menu.classList.remove("show");
                    body.classList.remove("no-scroll");
                    menuToggle.style.display = "block";
                    closeBtn.style.display = "none";
                }
            });
        });
    }

    function activateLinkInView() {
        const sections = document.querySelectorAll('section');
        let currentSectionId = '';

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 2 && rect.bottom > 0) {
                currentSectionId = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
    }

    function scrollToHomeSection() {
        const homeSection = document.getElementById("Home");
        if (homeSection) {
            homeSection.scrollIntoView({ behavior: "smooth" });
        }
    }

    menuToggle.addEventListener("click", function () {
        menu.classList.toggle("show");
        body.classList.toggle("no-scroll");
        updateMenuVisibility();
    });

    closeBtn.addEventListener("click", function () {
        menu.classList.toggle("show");
        body.classList.toggle("no-scroll");
        updateMenuVisibility();
    });

    setActiveLink();
    window.addEventListener("resize", updateMenuVisibility);
    updateMenuVisibility();

    // Add scroll event listener for activating links
    window.addEventListener('scroll', activateLinkInView);
    activateLinkInView(); // Initial call to set the active link on page load

    // Scroll to Home section on page load
    scrollToHomeSection();
});

let currentIndex = 0;
let cardWidth;
let autoPlayInterval;
let autoPlayActive = false;
let autoPlayDelay = 500; // Delay before restarting auto-play (in milliseconds)

function updateCardWidth() {
    const card = document.querySelector('.card');
    cardWidth = card.offsetWidth + parseInt(getComputedStyle(card).marginRight, 10); // Ensure margin-right is considered
}

function moveSlide(direction) {
    const slider = document.querySelector('.slider');
    const cards = document.querySelectorAll('.card');
    const totalSlides = cards.length;

    // Calculate the number of visible cards based on screen width
    let visibleCards;
    if (window.innerWidth >= 1024) { // Large screens
        visibleCards = 3;
    } else if (window.innerWidth >= 768) { // Medium screens
        visibleCards = 2;
    } else { // Small screens
        visibleCards = 1;
    }

    // Update the card width in case of resize
    updateCardWidth();

    const maxIndex = Math.max(0, totalSlides - visibleCards);

    if (direction === 1) { // Moving forward
        currentIndex = (currentIndex + 1) % (totalSlides - visibleCards + 1);
    } else if (direction === -1) { // Moving backward
        currentIndex = (currentIndex - 1 + (totalSlides - visibleCards + 1)) % (totalSlides - visibleCards + 1);
    }

    slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

    // Pause auto-play on button click
    stopAutoPlay();
    // Restart auto-play after a delay
    setTimeout(startAutoPlay, autoPlayDelay);
}

function startAutoPlay() {
    if (autoPlayActive) return;
    autoPlayActive = true;
    autoPlayInterval = setInterval(() => {
        moveSlide(1);
    }, 1500); // Change slide every 1.5 seconds
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
    autoPlayActive = false;
}

function handleIntersection(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startAutoPlay();
        } else {
            stopAutoPlay();
        }
    });
}

// Initialize Intersection Observer
const observer = new IntersectionObserver(handleIntersection, {
    root: null,
    rootMargin: '0px',
    threshold: 0.5 // Start auto-play when at least 50% of the section is visible
});

// Start observing the section
const section = document.querySelector('#Our_work');
observer.observe(section);

// Update the slider on window resize
window.addEventListener('resize', () => {
    updateCardWidth();
    moveSlide(0); // Reset slide position if needed
});

// Initialize card width on page load
document.addEventListener('DOMContentLoaded', () => {
    updateCardWidth();
});

// Stop auto-play when mouse is over the slider and restart on mouse leave
document.querySelector('.slider-wrapper').addEventListener('mouseover', stopAutoPlay);
document.querySelector('.slider-wrapper').addEventListener('mouseleave', startAutoPlay);

// Ensure button event listeners are set up correctly
document.querySelector('.prev').addEventListener('click', () => moveSlide(-1));
document.querySelector('.next').addEventListener('click', () => moveSlide(1));



// code for recieving email
document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    emailjs.sendForm('service_3pzbm3r', 'template_k3y5cke', this)
        .then(function (response) {
            console.log('Sent successfully:', response);
            alert('Your message has been sent successfully!');
        }, function (error) {
            console.log('Failed to send:', error);
            alert('Oops! Something went wrong.');
        });
});

// code for clear form :-
document.addEventListener('DOMContentLoaded', function () {
    // Get the form element
    const form = document.getElementById('contact-form');

    // Add an event listener for the form submission
    form.addEventListener('submit', function (event) {
        // Prevent the default form submission
        event.preventDefault();

        // Here you can handle the form data submission (e.g., send data via AJAX)

        // Clear the form fields
        form.reset();

        // Optionally, show a success message
        alert('Thank you for your message! We will get back to you soon.');

        // Optionally, you could redirect or perform other actions here
    });
});

// team section overlay

function toggleOverlay(event) {
    const overlay = event.currentTarget.querySelector('.client-card-overlay');
    overlay.classList.toggle('show-overlay');
  }