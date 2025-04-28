/*
 * Main JavaScript File
 * This file contains all the JavaScript functionality for the portfolio website
 */

// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader functionality - immediate removal for now
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.classList.add('fade-out');
        // Remove preloader immediately
        preloader.style.display = 'none';
    }

    // Typing effect in the home section
    const typingElement = document.querySelector('.typing-text');
    const roles = ['Web Developer', 'Full Stack Developer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 200;
    let erasingDelay = 100;
    let newTextDelay = 2000; // Delay between roles

    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            // Remove a character
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = erasingDelay;
        } else {
            // Add a character
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 200 - Math.random() * 100;
        }

        // If word is complete
        if (!isDeleting && charIndex === currentRole.length) {
            // Set a delay before starting to delete
            isDeleting = true;
            typingDelay = newTextDelay;
        } else if (isDeleting && charIndex === 0) {
            // Move to next role when deletion is complete
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }

        setTimeout(type, typingDelay);
    }

    // Start the typing effect
    setTimeout(type, 1000);

    // Sticky header on scroll
    const header = document.querySelector('#header');
    const scrollThreshold = 50;

    window.addEventListener('scroll', function() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    
    function setActiveNav() {
        let scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (
                scrollPosition >= sectionTop && 
                scrollPosition < sectionTop + sectionHeight
            ) {
                navLinksItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', setActiveNav);

    // Animate skill progress bars when in viewport
    const progressBars = document.querySelectorAll('.progress-bar');
    
    function animateProgressBars() {
        progressBars.forEach(bar => {
            const percent = bar.getAttribute('data-percent');
            bar.style.width = `${percent}%`;
        });
    }

    // Use Intersection Observer to check if skills section is in viewport
    const skillsSection = document.querySelector('#skills');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateProgressBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(skillsSection);


    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.querySelector('.form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                formStatus.textContent = 'Please fill out all fields.';
                formStatus.classList.add('error');
                formStatus.classList.remove('success');
                formStatus.style.display = 'block';
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                formStatus.textContent = 'Please enter a valid email address.';
                formStatus.classList.add('error');
                formStatus.classList.remove('success');
                formStatus.style.display = 'block';
                return;
            }
            
            // In a real application, you would send the form data to a server here
            // For demo purposes, we'll just show a success message
            formStatus.textContent = 'Message sent successfully!';
            formStatus.classList.add('success');
            formStatus.classList.remove('error');
            formStatus.style.display = 'block';
            
            // Reset the form
            contactForm.reset();
            
            // Hide the message after a delay
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        });
    }

    // Scroll reveal animation for sections
    const revealElements = document.querySelectorAll('.section-title, .about-content, .projects-container, .skills-container, .contact-content');
    
    const scrollReveal = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollReveal.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    revealElements.forEach(element => {
        element.classList.add('hidden');
        scrollReveal.observe(element);
    });

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
