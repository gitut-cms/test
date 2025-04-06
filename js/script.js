// --- Horizontal Post Card Slider Navigation ---
document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.post-card-slider-container');
    const prevButton = document.querySelector('.slider-prev');
    const nextButton = document.querySelector('.slider-next');
    const firstCard = document.querySelector('.slider-card'); // Get one card to measure

    if (sliderContainer && prevButton && nextButton && firstCard) {
        prevButton.addEventListener('click', () => {
            // Scroll left by approx one card width + gap
            const cardWidth = firstCard.offsetWidth;
            const gap = parseInt(window.getComputedStyle(firstCard.parentElement).gap) || 16; // 1rem default gap
            sliderContainer.scrollLeft -= (cardWidth + gap);
        });

        nextButton.addEventListener('click', () => {
            // Scroll right by approx one card width + gap
            const cardWidth = firstCard.offsetWidth;
            const gap = parseInt(window.getComputedStyle(firstCard.parentElement).gap) || 16; // 1rem default gap
            sliderContainer.scrollLeft += (cardWidth + gap);
        });

        // Optional: Hide/show buttons based on scroll position
        const checkScrollButtons = () => {
            if (!sliderContainer) return;
            const maxScrollLeft = sliderContainer.scrollWidth - sliderContainer.clientWidth;
            prevButton.style.display = sliderContainer.scrollLeft > 10 ? 'flex' : 'none'; // Show if not at start
            nextButton.style.display = sliderContainer.scrollLeft < (maxScrollLeft - 10) ? 'flex' : 'none'; // Show if not at end
        };

        sliderContainer.addEventListener('scroll', checkScrollButtons, { passive: true });
        // Check initially and on resize
        checkScrollButtons();
        window.addEventListener('resize', checkScrollButtons);

    } else {
        // If elements aren't found, hide the buttons
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
        console.log('Slider elements not found, buttons hidden.');
    }
});

console.log("Custom script loaded.");