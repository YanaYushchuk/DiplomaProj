// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();

            const target = document.querySelector(link.getAttribute('href'));

            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Photo gallery functionality
// This example sets up a click event listener for each photo to open in a lightbox view
document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.photo-gallery img');

    galleryImages.forEach(image => {
        image.addEventListener('click', event => {
            // Open the clicked image in a lightbox view
            openLightbox(event.target.src);
        });
    });
});

// Function to open a lightbox view for the image
function openLightbox(imageUrl) {
    // Create a lightbox container
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.style.position = 'fixed';
    lightbox.style.top = 0;
    lightbox.style.left = 0;
    lightbox.style.width = '100%';
    lightbox.style.height = '100%';
    lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    lightbox.style.display = 'flex';
    lightbox.style.justifyContent = 'center';
    lightbox.style.alignItems = 'center';
    lightbox.style.zIndex = 1000;
    
    // Create an image element for the lightbox
    const img = document.createElement('img');
    img.src = imageUrl;
    img.style.maxWidth = '80%';
    img.style.maxHeight = '80%';

    // Append the image to the lightbox container
    lightbox.appendChild(img);

    // Append the lightbox container to the body
    document.body.appendChild(lightbox);

    // Add a click event listener to close the lightbox
    lightbox.addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });
}
