// Sign In functionality
document.addEventListener('DOMContentLoaded', function() {
    const signinForm = document.getElementById('signinForm');
    const signinBtn = document.getElementById('signinBtn');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const rememberMe = document.getElementById('rememberMe');

    // Load saved credentials if "Remember me" was checked
    loadSavedCredentials();

    signinForm.addEventListener('submit', handleSignIn);

    // Real-time validation
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);

    // Add input animations
    [emailInput, passwordInput].forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
});

function handleSignIn(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('rememberMe').checked;

    if (!validateForm()) {
        return;
    }

    // Show loading state
    setLoadingState(true);

    // Simulate API call (replace with actual authentication)
    setTimeout(() => {
        // For demo purposes - always succeed
        // In real implementation, validate against your backend
        if (authenticateUser(email, password)) {
            if (rememberMe) {
                saveCredentials(email, password);
            } else {
                clearSavedCredentials();
            }
            
            showSuccessMessage();
            redirectToDashboard();
        } else {
            showErrorMessage('Invalid email or password. Please try again.');
            setLoadingState(false);
        }
    }, 1500);
}

function authenticateUser(email, password) {
    // Demo authentication - replace with actual authentication logic
    // This is where you'd make an API call to your backend
    const demoAccounts = [
        { email: 'admin@351silverstar.ca', password: 'demo123' },
        { email: 'cadet@351silverstar.ca', password: 'demo123' },
        { email: 'staff@351silverstar.ca', password: 'demo123' }
    ];

    return demoAccounts.some(account => 
        account.email === email && account.password === password
    );
}

function validateForm() {
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    
    return isEmailValid && isPasswordValid;
}

function validateEmail() {
    const email = document.getElementById('email').value;
    const errorElement = document.getElementById('emailError');
    
    if (!email) {
        showError(errorElement, 'Email is required');
        return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showError(errorElement, 'Please enter a valid email address');
        return false;
    }
    
    clearError(errorElement);
    return true;
}

function validatePassword() {
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('passwordError');
    
    if (!password) {
        showError(errorElement, 'Password is required');
        return false;
    }
    
    if (password.length < 6) {
        showError(errorElement, 'Password must be at least 6 characters');
        return false;
    }
    
    clearError(errorElement);
    return true;
}

function showError(errorElement, message) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function clearError(errorElement) {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
}

function setLoadingState(loading) {
    const signinBtn = document.getElementById('signinBtn');
    const btnText = signinBtn.querySelector('.btn-text');
    const btnSpinner = signinBtn.querySelector('.btn-spinner');
    
    if (loading) {
        signinBtn.disabled = true;
        signinBtn.classList.add('loading');
        btnText.style.display = 'none';
        btnSpinner.style.display = 'block';
    } else {
        signinBtn.disabled = false;
        signinBtn.classList.remove('loading');
        btnText.style.display = 'block';
        btnSpinner.style.display = 'none';
    }
}

function showSuccessMessage() {
    const signinBtn = document.getElementById('signinBtn');
    const originalText = signinBtn.querySelector('.btn-text');
    
    originalText.textContent = 'Success! Redirecting...';
    signinBtn.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
    signinBtn.classList.add('success-check');
}

function showErrorMessage(message) {
    // Create temporary error display
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message global-error';
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #e63946;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(230, 57, 70, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    errorDiv.textContent = message;
    
    document.body.appendChild(errorDiv);
    
    setTimeout(() => {
        errorDiv.remove();
    }, 5000);
}

function saveCredentials(email, password) {
    // In a real application, use secure methods for storing credentials
    // This is a basic demo implementation
    localStorage.setItem('rememberedEmail', email);
    // Note: In production, never store passwords in localStorage
    // Use secure tokens instead
}

function loadSavedCredentials() {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
        document.getElementById('email').value = savedEmail;
        document.getElementById('rememberMe').checked = true;
    }
}

function clearSavedCredentials() {
    localStorage.removeItem('rememberedEmail');
}

function redirectToDashboard() {
    // Redirect to dashboard after successful login
    setTimeout(() => {
        // For demo - redirect to home page
        // In real implementation, redirect to actual dashboard
        window.location.href = '../index.html?login=success';
    }, 2000);
}

function goBack() {
    window.history.back();
}

// CSS for global error animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .form-group.focused label {
        color: #0057b8;
        transform: translateY(-5px);
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);