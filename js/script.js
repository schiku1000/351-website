// Wait for DOM to be fully loaded before executing any code
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
    initializePageSpecificCode();
});

// Global functions
function signIn() {
    console.log('Sign in button clicked');
    alert('Sign in functionality coming soon.');
}

function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
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
    console.log('Initializing page-specific code');
    setupGlobalEventListeners();
    
    // Check if we're on the home page by looking for specific elements
    const hasAnnouncements = document.getElementById('announcements') !== null;
    const hasMainLanding = document.getElementById('mainlandingpage') !== null;
    
    console.log('Has announcements element:', hasAnnouncements);
    console.log('Has main landing element:', hasMainLanding);
    
    if (hasAnnouncements || hasMainLanding) {
        console.log('Initializing home page');
        initializeHomePage();
    }
    
    // Initialize other pages
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

// Global event listeners
function setupGlobalEventListeners() {
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePopup();
        }
    });

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

    const floatingBtn = document.querySelector('.floating-btn');
    if (floatingBtn) {
        floatingBtn.addEventListener('click', scrollToTop);
    }
}

// HOME PAGE CODE
function initializeHomePage() {
    console.log('HOME PAGE: Starting initialization');
    
    // Load JSON data
    loadAnnouncements();
    loadMandatoryDates();
    
    // Setup popup
    const popup = document.getElementById('popup');
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === popup) {
                closePopup();
            }
        });
    }
}

// Load announcements from JSON
async function loadAnnouncements() {
    try {
        console.log('Loading announcements from data/announcements.json');
        const response = await fetch('data/announcements.json');
        
        if (!response.ok) {
            throw new Error('Failed to load announcements: ' + response.status);
        }
        
        const data = await response.json();
        console.log('Successfully loaded announcements data');
        renderAnnouncements(data.announcements);
    } catch (error) {
        console.error('Error loading announcements:', error);
        const container = document.getElementById('announcements');
        if (container) container.innerHTML = '';
    }
}

// Load mandatory dates from JSON
async function loadMandatoryDates() {
    try {
        console.log('Loading mandatory dates from data/mandatorydates.json');
        const response = await fetch('data/mandatorydates.json');
        
        if (!response.ok) {
            throw new Error('Failed to load mandatory dates: ' + response.status);
        }
        
        const data = await response.json();
        console.log('Successfully loaded mandatory dates data');
        renderMandatoryDates(data.mandatoryDates);
    } catch (error) {
        console.error('Error loading mandatory dates:', error);
        const container = document.getElementById('featured-side-list');
        if (container) container.innerHTML = '';
    }
}

// Render announcements to the page
function renderAnnouncements(announcements) {
    const container = document.getElementById('announcements');
    if (!container) {
        console.error('Announcements container not found');
        return;
    }
    
    console.log('Rendering ' + announcements.length + ' announcements');
    
    if (!announcements || announcements.length === 0) {
        container.innerHTML = '';
        return;
    }

    container.innerHTML = '';
    
    announcements.forEach(announcement => {
        const card = document.createElement('div');
        card.className = 'announcement-card';
        card.setAttribute('data-title', announcement.title);
        card.setAttribute('data-details', announcement.details);
        
        card.innerHTML = `
            <div class="announcement-bg" style="background-image: url('${announcement.image}');"></div>
            <div class="announcement-content">
                <div class="announcement-subtitle">${announcement.subtitle}</div>
                <div class="announcement-title">${announcement.title}</div>
            </div>
        `;
        
        card.addEventListener('click', () => {
            openAnnouncementPopup(announcement.title, announcement.details);
        });
        
        container.appendChild(card);
    });
}

// Render mandatory dates to the page
function renderMandatoryDates(mandatoryDates) {
    const container = document.getElementById('featured-side-list');
    if (!container) {
        console.error('Mandatory dates container not found');
        return;
    }
    
    console.log('Rendering ' + mandatoryDates.length + ' mandatory dates');
    
    if (!mandatoryDates || mandatoryDates.length === 0) {
        container.innerHTML = '';
        return;
    }

    let currentPage = 0;
    const itemsPerPage = 4;

    function renderCurrentPage() {
        container.innerHTML = '';
        const start = currentPage * itemsPerPage;
        const end = Math.min(start + itemsPerPage, mandatoryDates.length);
        
        for (let i = start; i < end; i++) {
            const date = mandatoryDates[i];
            const card = document.createElement('div');
            card.className = 'featured-side-card';
            card.innerHTML = `
                <div class="featured-side-bg" style="background-image:url('${date.image}')"></div>
                <div class="featured-side-content">
                    <div class="featured-side-title">${date.title}</div>
                    <div class="featured-side-subtitle">${date.subtitle}</div>
                    <div class="featured-side-time">${date.time}</div>
                </div>
            `;
            container.appendChild(card);
        }
    }

    const prevBtn = document.getElementById('dates-left');
    const nextBtn = document.getElementById('dates-right');
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentPage = currentPage > 0 ? currentPage - 1 : Math.ceil(mandatoryDates.length / itemsPerPage) - 1;
            renderCurrentPage();
        });
        
        nextBtn.addEventListener('click', () => {
            currentPage = (currentPage + 1) * itemsPerPage < mandatoryDates.length ? currentPage + 1 : 0;
            renderCurrentPage();
        });
        
        renderCurrentPage();
    } else {
        mandatoryDates.forEach(date => {
            const card = document.createElement('div');
            card.className = 'featured-side-card';
            card.innerHTML = `
                <div class="featured-side-bg" style="background-image:url('${date.image}')"></div>
                <div class="featured-side-content">
                    <div class="featured-side-title">${date.title}</div>
                    <div class="featured-side-subtitle">${date.subtitle}</div>
                    <div class="featured-side-time">${date.time}</div>
                </div>
            `;
            container.appendChild(card);
        });
    }
}

// Open announcement popup
function openAnnouncementPopup(title, details) {
    const popup = document.getElementById('popup');
    const popupTitle = document.getElementById('popup-title');
    const popupDetails = document.getElementById('popup-details');
    
    if (popup && popupTitle && popupDetails) {
        popupTitle.textContent = title;
        popupDetails.textContent = details;
        popup.style.display = 'flex';
        
        setTimeout(() => {
            const popupContent = popup.querySelector('.popup-content');
            if (popupContent) {
                popupContent.style.transform = 'scale(1)';
                popupContent.style.opacity = '1';
            }
        }, 50);
    }
}

// Rest of your page-specific code remains the same...
// [Keep all the other functions: initializeAboutPage, initializeCalendarPage, etc.]
// ... include all the other page initialization functions from your original code

// ABOUT US PAGE CODE
function initializeAboutPage() {
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

    document.querySelectorAll('.staff-member').forEach(member => {
        member.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #f8f9fa, #e9ecef)';
        });
        
        member.addEventListener('mouseleave', function() {
            this.style.background = '#f8f9fa';
        });
    });

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
            document.querySelectorAll('.view-option').forEach(button => {
                button.addEventListener('click', (e) => {
                    this.switchView(e.target.dataset.view);
                    this.setActiveViewButton(e.target);
                });
            });

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

            setTimeout(() => {
                const calendar = document.getElementById('calendar');
                if (calendar) {
                    calendar.classList.add('visible');
                }
            }, 1000);
        }
    }

    window.calendarManager = new CalendarManager();

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

    window.contactManager = new ContactManager();

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
            
            this.teams.forEach(team => {
                team.classList.add('visible');
            });
        }

        setupEventListeners() {
            this.filterButtons.forEach(button => {
                button.addEventListener('click', (e) => {
                    this.filterTeams(e.target.dataset.filter);
                    this.setActiveFilter(e.target);
                });
            });

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
                if (category === 'all' || team.dataset.category === category) {
                    setTimeout(() => {
                        team.classList.add('visible');
                        team.style.display = '';
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

            const filterSection = document.getElementById('teamsFilter');
            if (filterSection) observer.observe(filterSection);
            
            this.teams.forEach(team => {
                observer.observe(team);
            });
        }

        setupEnhancedPopup() {
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

            popupTitle.textContent = title;
            
            const schedule = team.dataset.schedule;
            if (schedule) {
                popupDetails.innerHTML = `${details}<br><br><strong>Schedule:</strong> ${schedule}`;
            } else {
                popupDetails.innerHTML = details;
            }

            popup.style.display = 'flex';
            popup.classList.add('active');
            
            const popupContent = popup.querySelector('.popup-content');
            if (popupContent) {
                setTimeout(() => {
                    popupContent.style.transform = 'scale(1)';
                    popupContent.style.opacity = '1';
                }, 50);
            }
        }
    }

    window.teamsManager = new TeamsManager();

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

    window.addEventListener('scroll', checkScroll);
    setTimeout(checkScroll, 100);
}

function signIn() {
    window.location.href = 'signin/signin.html';
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 0) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});