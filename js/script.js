// Wait for DOM to be fully loaded before executing any code
document.addEventListener('DOMContentLoaded', function() {
    initializePageSpecificCode();
});

// global functions

function signIn() {
    // Add sign in functionality here
    console.log('Sign in button clicked');
    alert('Sign in functionality coming soon.');
}

function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
        // Reset ALL possible ways the popup can be shown
        popup.classList.remove('active');
        popup.style.display = 'none';
        
        const popupContent = popup.querySelector('.popup-content');
        if (popupContent) {
            popupContent.style.transform = 'scale(0.95)';
            popupContent.style.opacity = '0';
        }
    }
}

function registerClicked() {
    const confirmLeave = confirm("You are about to leave the 351 Silver Star Squadron website to visit the official Canadian Cadet Organizations site. Do you want to continue?");
    if (confirmLeave) {
        window.location.href = 'https://www.canada.ca/en/department-national-defence/services/cadets-junior-canadian-rangers/cadets/join-us.html';
    }
}

function scrollToAnnouncements() {
    const announcements = document.getElementById('announcements');
    if (announcements) {
        const yOffset = -(window.innerHeight * 0.2);
        const y = announcements.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({
            top: y,
            behavior: 'smooth'
        });
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
// Initialize page-specific code based on which page we're on
function initializePageSpecificCode() {
    setupGlobalEventListeners();    
    // Check which page we're on and initialize accordingly
    if (document.querySelector('.announcement-card')) {
        initializeHomePage();
    }
    if (document.querySelector('.section-card')) {
        initializeAboutPage();
    }
    if (document.getElementById('calendarFrame')) {
        initializeCalendarPage();
    }
    if (document.querySelector('.location-card')) {
        initializeContactPage();
    }
    if (document.querySelector('.team-card') && document.getElementById('teamsFilter')) {
        initializeTeamsPage();
    }
    if (document.querySelector('.supporter-logo')) {
        initializeSupportersPage();
    }
}

// Global event listeners that work on all pages
function setupGlobalEventListeners() {
    // Close popup with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });

    // Scroll to top button functionality
    window.addEventListener('scroll', function() {
        const scrollBtn = document.querySelector('.floating-btn');
        if (scrollBtn) {
            if (window.scrollY > 300) {
                scrollBtn.style.display = 'block';
            } else {
                scrollBtn.style.display = 'none';
            }
        }
    });

    // Setup floating button if it exists
    const floatingBtn = document.querySelector('.floating-btn');
    if (floatingBtn) {
        floatingBtn.addEventListener('click', scrollToTop);
    }
}

// HOME PAGE CODE
function initializeHomePage() {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupDetails = document.getElementById('popup-details');

    if (!popup || !popupTitle || !popupDetails) return;

    function openPopup(title, details) {
        popupTitle.textContent = title;
        popupDetails.textContent = details;
        popup.style.display = 'flex';
        
        // Add entrance animation
        setTimeout(() => {
            const popupContent = popup.querySelector('.popup-content');
            if (popupContent) {
                popupContent.style.transform = 'scale(1)';
                popupContent.style.opacity = '1';
            }
        }, 50);
    }

    // Set up event listeners for cards
    function setupCardListeners(selector) {
        document.querySelectorAll(selector).forEach(card => {
            card.addEventListener('click', () => {
                const title = card.getAttribute('data-title');
                const details = card.getAttribute('data-details');
                openPopup(title, details);
            });
        });
    }

    setupCardListeners('.announcement-card');
    setupCardListeners('.team-card');

    // Close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Mandatory dates functionality
    const mandatoryDates = [
        { image: "assets/mandatorydates/mandatorydate1.jpg", title: "351 Birthday", subtitle: "September 10, 2025", time: "All Day" },
        { image: "assets/mandatorydates/mandatorydate2.jpg", title: "ACR", subtitle: "September 17, 2025", time: "6:30 PM - 9:30 PM" },
        { image: "assets/mandatorydates/mandatorydate3.jpg", title: "ACR", subtitle: "September 24, 2025", time: "6:30 PM - 9:30 PM" },
        { image: "assets/mandatorydates/mandatorydate4.jpg", title: "ACR", subtitle: "October 1, 2025", time: "6:30 PM - 9:30 PM" },
        { image: "assets/mandatorydates/mandatorydate5.jpg", title: "ACR", subtitle: "October 8, 2025", time: "6:30 PM - 9:30 PM" },
        { image: "assets/mandatorydates/mandatorydate6.jpg", title: "ACR", subtitle: "October 15, 2025", time: "6:30 PM - 9:30 PM" },
        { image: "assets/mandatorydates/mandatorydate7.jpg", title: "ACR", subtitle: "October 22, 2025", time: "6:30 PM - 9:30 PM" },
        { image: "assets/mandatorydates/mandatorydate8.jpg", title: "ACR", subtitle: "November 5, 2025", time: "6:30 PM - 9:30 PM" }
    ];

    let page = 0;
    const perPage = 4;

    function renderMandatoryDates() {
        const list = document.getElementById('featured-side-list');
        if (!list) return;
        
        list.innerHTML = '';
        const start = page * perPage;
        const end = Math.min(start + perPage, mandatoryDates.length);
        
        for (let i = start; i < end; i++) {
            const a = mandatoryDates[i];
            const card = document.createElement('div');
            card.className = 'featured-side-card';
            card.innerHTML = `
                <div class="featured-side-bg" style="background-image:url('${a.image}')"></div>
                <div class="featured-side-content">
                    <div class="featured-side-title">${a.title}</div>
                    <div class="featured-side-subtitle">${a.subtitle}</div>
                    <div class="featured-side-time">${a.time}</div>
                </div>
            `;
            list.appendChild(card);
        }
    }

    function navigateDates(direction) {
        const totalPages = Math.ceil(mandatoryDates.length / perPage);
        
        if (direction === 'next') {
            page = (page + 1) * perPage < mandatoryDates.length ? page + 1 : 0;
        } else {
            page = page > 0 ? page - 1 : totalPages - 1;
        }
        
        renderMandatoryDates();
    }

    // Initialize date navigation
    const datesLeft = document.getElementById('dates-left');
    const datesRight = document.getElementById('dates-right');
    
    if (datesLeft && datesRight) {
        datesLeft.addEventListener('click', () => navigateDates('prev'));
        datesRight.addEventListener('click', () => navigateDates('next'));
        renderMandatoryDates();
    }

    // Enhanced animations for page elements
    function animateOnScroll() {
        const elements = document.querySelectorAll('.announcement-card, .featured-main, .featured-side');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    }

    // Initialize animations
    function initializeAnimations() {
        document.querySelectorAll('.announcement-card').forEach(card => {
            card.style.opacity = "0";
            card.style.transform = "translateY(30px)";
            card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        });
        
        const featuredMain = document.querySelector('.featured-main');
        const featuredSide = document.querySelector('.featured-side');
        
        if (featuredMain) {
            featuredMain.style.opacity = "0";
            featuredMain.style.transform = "translateX(-30px)";
            featuredMain.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        }
        
        if (featuredSide) {
            featuredSide.style.opacity = "0";
            featuredSide.style.transform = "translateX(30px)";
            featuredSide.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        }
        
        setTimeout(animateOnScroll, 100);
    }

    // Initialize animations
    window.addEventListener('scroll', animateOnScroll);
    initializeAnimations();
}

// ABOUT US PAGE CODE
function initializeAboutPage() {
    // Scroll animations
    function checkScroll() {
        const sections = document.querySelectorAll('.section-card');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('visible');
            }
        });
    }

    // Add hover effects to staff members
    document.querySelectorAll('.staff-member').forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #f8f9fa, #e9ecef)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.background = '#f8f9fa';
        });
    });

    // Initialize animations
    window.addEventListener('scroll', checkScroll);
    checkScroll();
}

// CALENDAR PAGE CODE
function initializeCalendarPage() {
    class CalendarManager {
        constructor() {
            this.calendarFrame = document.getElementById('calendarFrame');
            this.loadingOverlay = document.getElementById('loadingOverlay');
            if (this.calendarFrame && this.loadingOverlay) {
                this.init();
            }
        }

        init() {
            this.setupEventListeners();
            this.setupAnimations();
            this.hideLoading();
        }

        setupEventListeners() {
            // View option buttons
            document.querySelectorAll('.view-option').forEach(button => {
                button.addEventListener('click', (e) => {
                    this.switchView(e.target.dataset.view);
                    this.setActiveViewButton(e.target);
                });
            });

            // Calendar frame load event
            this.calendarFrame.addEventListener('load', () => {
                this.hideLoading();
            });
        }

        switchView(view) {
            const baseUrl = 'https://calendar.google.com/calendar/u/0/embed?src=351silverstar.com_944h308s2ij7v7jshrvqm822e4@group.calendar.google.com&ctz=America/Toronto';
            let mode = 'MONTH';
            
            switch(view) {
                case 'week':
                    mode = 'WEEK';
                    break;
                case 'agenda':
                    mode = 'AGENDA';
                    break;
                default:
                    mode = 'MONTH';
            }

            this.showLoading();
            this.calendarFrame.src = `${baseUrl}&mode=${mode}`;
        }

        setActiveViewButton(activeButton) {
            document.querySelectorAll('.view-option').forEach(button => {
                button.classList.remove('active');
            });
            activeButton.classList.add('active');
        }

        showLoading() {
            this.loadingOverlay.style.display = 'flex';
            setTimeout(() => {
                this.loadingOverlay.style.opacity = '1';
            }, 10);
        }

        hideLoading() {
            this.loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                this.loadingOverlay.style.display = 'none';
            }, 500);
        }

        setupAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            // Observe elements for animation
            const elementsToAnimate = [
                '#calendarControls',
                '#calendar',
                '#calendarTips'
            ];

            elementsToAnimate.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    observer.observe(element);
                }
            });

            // Animate calendar immediately after load
            setTimeout(() => {
                const calendar = document.getElementById('calendar');
                if (calendar) {
                    calendar.classList.add('visible');
                }
            }, 1000);
        }
    }

    // Initialize calendar manager
    window.calendarManager = new CalendarManager();

    // Add loading state to iframe
    const calendarFrame = document.getElementById('calendarFrame');
    if (calendarFrame) {
        calendarFrame.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        calendarFrame.style.opacity = '0';
        calendarFrame.style.transition = 'opacity 0.5s ease';
    }
}

// CONTACT PAGE CODE
function initializeContactPage() {
    class ContactManager {
        constructor() {
            this.init();
        }

        init() {
            this.setupAnimations();
        }

        setupAnimations() {
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            // Observe elements for animation
            const elementsToAnimate = [
                ...document.querySelectorAll('.location-card'),
                '#contactInfo'
            ];

            elementsToAnimate.forEach(element => {
                if (element) {
                    observer.observe(element);
                }
            });
        }
    }

    // Initialize contact manager
    window.contactManager = new ContactManager();

    // Add hover effects to location cards
    document.querySelectorAll('.location-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 40px rgba(0,0,0,0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('visible')) {
                this.style.transform = 'translateY(0)';
            }
            this.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)';
        });
    });
}

// TEAMS PAGE CODE
function initializeTeamsPage() {
    class TeamsManager {
        constructor() {
            this.teams = document.querySelectorAll('.team-card');
            this.filterButtons = document.querySelectorAll('.filter-btn');
            if (this.teams.length > 0 && this.filterButtons.length > 0) {
                this.init();
            }
        }

        init() {
            this.setupEventListeners();
            this.setupAnimations();
            this.setupEnhancedPopup();
            
            // Let CSS handle the initial display - don't force styles
            this.teams.forEach(team => {
                team.classList.add('visible');
            });
        }

        setupEventListeners() {
            // Filter buttons
            this.filterButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    this.filterTeams(e.target.dataset.filter);
                    this.setActiveFilter(e.target);
                });
            });

            // Team card clicks
            this.teams.forEach(team => {
                team.addEventListener('click', () => {
                    const title = team.getAttribute('data-title');
                    const details = team.getAttribute('data-details');
                    this.showTeamPopup(title, details, team);
                });
            });
        }

        filterTeams(category) {
            this.teams.forEach((team, index) => {
                // Use CSS classes instead of inline styles
                if (category === 'all' || team.dataset.category === category) {
                    setTimeout(() => {
                        team.classList.add('visible');
                        team.style.display = ''; // Let CSS handle display
                    }, index * 100);
                } else {
                    team.classList.remove('visible');
                    setTimeout(() => {
                        team.style.display = 'none';
                    }, 300);
                }
            });
        }

        setActiveFilter(activeButton) {
            this.filterButtons.forEach(button => {
                button.classList.remove('active');
            });
            activeButton.classList.add('active');
        }

        setupAnimations() {
            // Remove any inline styles that might interfere with CSS
            this.teams.forEach(team => {
                team.style.opacity = '';
                team.style.transform = '';
                team.style.transition = '';
            });

            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, 100);
                    }
                });
            }, observerOptions);

            // Observe filter and team cards
            const filterSection = document.getElementById('teamsFilter');
            if (filterSection) observer.observe(filterSection);
            
            this.teams.forEach(team => {
                observer.observe(team);
            });
        }

        setupEnhancedPopup() {
            // Add schedule data to team cards
            document.querySelectorAll('.team-card').forEach(team => {
                const subtitle = team.querySelector('.team-subtitle');
                if (subtitle && !team.dataset.schedule) {
                    team.dataset.schedule = subtitle.textContent;
                }
            });
        }

        showTeamPopup(title, details, team) {
            const popup = document.getElementById('popup');
            const popupTitle = document.getElementById('popup-title');
            const popupDetails = document.getElementById('popup-details');
            
            if (!popup || !popupTitle || !popupDetails) {
                console.error('Popup elements not found');
                return;
            }

            // Set popup content
            popupTitle.textContent = title;
            
            // Include schedule if available
            const schedule = team.dataset.schedule;
            if (schedule) {
                popupDetails.innerHTML = `${details}<br><br><strong>Schedule:</strong> ${schedule}`;
            } else {
                popupDetails.innerHTML = details;
            }

            // Use BOTH methods to ensure popup shows
            popup.style.display = 'flex';
            popup.classList.add('active');
            
            // Reset animation for popup content
            const popupContent = popup.querySelector('.popup-content');
            if (popupContent) {
                setTimeout(() => {
                    popupContent.style.transform = 'scale(1)';
                    popupContent.style.opacity = '1';
                }, 50);
            }
        }
    }


    // Initialize teams manager
    window.teamsManager = new TeamsManager();

    // Set up Teams-specific popup close handler
    const teamsPopup = document.getElementById('popup');
    if (teamsPopup) {
        teamsPopup.addEventListener('click', function(e) {
            if (e.target === this) {
                closePopup();
            }
        });
    }
}

// SUPPORTERS PAGE CODE
function initializeSupportersPage() {
    // Scroll animations for supporter cards
    function checkScroll() {
        const sections = document.querySelectorAll('.supporter-logo');
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('visible');
            }
        });
    }

    // Add hover effects to supporter logos
    document.querySelectorAll('.supporter-logo').forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #0057b8, #003d82)';
            this.style.color = 'white';
            this.style.transform = 'scale(1.05)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.background = 'white';
            this.style.color = 'inherit';
            this.style.transform = 'scale(1)';
        });
    });

    // Initialize animations
    window.addEventListener('scroll', checkScroll);
    
    // Initial check on page load
    setTimeout(checkScroll, 100);
}


window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");

    // Keep transparent at top (scrollY <= 0), add background after scrolling
    if (window.scrollY > 0) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
