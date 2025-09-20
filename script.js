 // ========== Typed.js Animation Effect ==========  
 var typed = new Typed('#element', {
    strings: ['Web Development..', 'App Development..', 'College Projects',' Crafting Innovative Web Experiences', 'UI/UX Design..'],
    typeSpeed: 35,
    backSpeed: 15,
    loop: true
});


// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks2 = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks2.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Portfolio Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Portfolio Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const parentItem = this.closest('.portfolio-item');
            
            // Remove active class from all tabs in this portfolio item
            parentItem.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Remove active class from all tab contents in this portfolio item
            parentItem.querySelectorAll('.tab-content').forEach(content => {
                content.classList.remove('active');
            });
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the form data to a server
            // For demonstration, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    // Chatbot Functionality
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbotBox = document.querySelector('.chatbot-box');
    const closeBtn = document.querySelector('.close-btn');
    const sendBtn = document.getElementById('sendMessage');
    const userInput = document.getElementById('userMessage');
    const chatMessages = document.getElementById('chatbotMessages');
    
    // Toggle chatbot visibility
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', function() {
            chatbotBox.style.display = 'block';
        });
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            chatbotBox.style.display = 'none';
        });
    }
    
    // Send message functionality
    if (sendBtn && userInput) {
        sendBtn.addEventListener('click', sendMessage);
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
    
    function sendMessage() {
        const message = userInput.value.trim();
        
        if (message === '') return;
        
        // Add user message to chat
        addMessage('user', message);
        
        // Clear input
        userInput.value = '';
        
        // Simulate bot response (in a real app, this would call an API)
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessage('bot', botResponse);
        }, 600);
    }
    
    function addMessage(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('message-content');
        
        const paragraph = document.createElement('p');
        paragraph.textContent = message;
        
        contentDiv.appendChild(paragraph);
        messageDiv.appendChild(contentDiv);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom of chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Simple bot responses based on keywords
    function getBotResponse(message) {
        message = message.toLowerCase();
        
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return 'Hello! How can I help you today?';
        } else if (message.includes('services') || message.includes('what do you offer')) {
            return 'We offer web development services including frontend, backend, database solutions, app development, and maintenance. Would you like to know more about any specific service?';
        } else if (message.includes('project') || message.includes('college project')) {
            return 'We offer ready-made college projects with PPTs and thesis documents. Our projects cover various domains like e-commerce, machine learning, IoT, and blockchain. Would you like more details?';
        } else if (message.includes('course') || message.includes('learn')) {
            return 'We offer courses in Full Stack Web Development, Data Science & Analytics, and Mobile App Development. Would you like to know more about our course structure?';
        } else if (message.includes('contact') || message.includes('reach')) {
            return 'You can reach us at info@hikinette.tech or call us at +91 98765 43210. Alternatively, you can fill out the contact form on our website.';
        } else if (message.includes('price') || message.includes('cost') || message.includes('fee')) {
            return 'Our pricing varies based on the service or product. For custom web development, we provide quotes after understanding your requirements. For courses and ready-made projects, you can find the pricing on our website.';
        } else if (message.includes('payment') || message.includes('pay')) {
            return 'We accept payments via credit/debit cards, UPI, and net banking. All transactions are secure and processed through Razorpay.';
        } else if (message.includes('thank')) {
            return 'You\'re welcome! Feel free to reach out if you have any other questions.';
        } else {
            return 'I\'m not sure I understand. Could you please rephrase or ask about our services, projects, courses, or contact information?';
        }
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            
            if (!email) {
                alert('Please enter your email address');
                return;
            }
            
            // Here you would typically send the email to a server
            // For demonstration, we'll just show a success message
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }
});


// Function to check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Function to animate elements when they come into view
function animateOnScroll() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        if (isInViewport(card)) {
            card.classList.add('animate');
        }
    });
}

// Initial check on page load
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
});

// Check on scroll
window.addEventListener('scroll', function() {
    animateOnScroll();
});

document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Stop form from reloading the page

    const scriptURL = "https://script.google.com/macros/s/AKfycbz9OQeeXb8l8-Gjg6sWktD16u7e7slNZteUfxw6OldweEVhcxuKHa2ywzpMBbPSFY3a0w/exec";
    const formData = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    };

    fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        alert("Message sent successfully!");
        document.getElementById("contactForm").reset();
    })
    .catch(error => {
        alert("Something went wrong. Try again!");
        console.error("Error!", error.message);
    });
});









