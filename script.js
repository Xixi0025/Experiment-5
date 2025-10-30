// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get form and all input elements
    const form = document.getElementById('registrationForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');

    // Validation rules (matching the provided data)
    const validationRules = {
        name: {
            minLength: 3,
            errorEmpty: 'Name is required',
            errorLength: 'Name must be at least 3 characters long'
        },
        email: {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            errorEmpty: 'Email is required',
            errorInvalid: 'Please enter a valid email address'
        },
        password: {
            minLength: 8,
            errorEmpty: 'Password is required',
            errorLength: 'Password must be at least 8 characters long',
            errorUppercase: 'Password must contain at least one uppercase letter',
            errorLowercase: 'Password must contain at least one lowercase letter',
            errorNumber: 'Password must contain at least one number',
            errorSpecial: 'Password must contain at least one special character (@$!%*?&)'
        },
        confirmPassword: {
            errorEmpty: 'Please confirm your password',
            errorMismatch: 'Passwords do not match'
        },
        message: {
            minLength: 10,
            errorEmpty: 'Message is required',
            errorLength: 'Message must be at least 10 characters long'
        }
    };

    /**
     * Show error message and add error styling to input
     * @param {HTMLElement} input - The input element
     * @param {string} message - The error message to display
     */
    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        
        errorDisplay.textContent = message;
        errorDisplay.classList.add('show');
        input.classList.add('error');
        input.classList.remove('valid');
    }

    /**
     * Clear error message and remove error styling from input
     * @param {HTMLElement} input - The input element
     */
    function clearError(input) {
        const formGroup = input.parentElement;
        const errorDisplay = formGroup.querySelector('.error-message');
        
        errorDisplay.textContent = '';
        errorDisplay.classList.remove('show');
        input.classList.remove('error');
    }

    /**
     * Add valid styling to input
     * @param {HTMLElement} input - The input element
     */
    function setValid(input) {
        clearError(input);
        input.classList.add('valid');
    }

    /**
     * Validate name field
     * @param {HTMLElement} input - The name input element
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateName(input) {
        const value = input.value.trim();
        
        if (value === '') {
            showError(input, validationRules.name.errorEmpty);
            return false;
        }
        
        if (value.length < validationRules.name.minLength) {
            showError(input, validationRules.name.errorLength);
            return false;
        }
        
        setValid(input);
        return true;
    }

    /**
     * Validate email field
     * @param {HTMLElement} input - The email input element
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateEmail(input) {
        const value = input.value.trim();
        
        if (value === '') {
            showError(input, validationRules.email.errorEmpty);
            return false;
        }
        
        if (!validationRules.email.pattern.test(value)) {
            showError(input, validationRules.email.errorInvalid);
            return false;
        }
        
        setValid(input);
        return true;
    }

    /**
     * Validate password field
     * @param {HTMLElement} input - The password input element
     * @returns {boolean} - True if valid, false otherwise
     */
    function validatePassword(input) {
        const value = input.value;
        
        if (value === '') {
            showError(input, validationRules.password.errorEmpty);
            return false;
        }
        
        if (value.length < validationRules.password.minLength) {
            showError(input, validationRules.password.errorLength);
            return false;
        }
        
        if (!/[A-Z]/.test(value)) {
            showError(input, validationRules.password.errorUppercase);
            return false;
        }
        
        if (!/[a-z]/.test(value)) {
            showError(input, validationRules.password.errorLowercase);
            return false;
        }
        
        if (!/[0-9]/.test(value)) {
            showError(input, validationRules.password.errorNumber);
            return false;
        }
        
        if (!/[@$!%*?&]/.test(value)) {
            showError(input, validationRules.password.errorSpecial);
            return false;
        }
        
        setValid(input);
        return true;
    }

    /**
     * Validate confirm password field
     * @param {HTMLElement} input - The confirm password input element
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateConfirmPassword(input) {
        const value = input.value;
        const passwordValue = passwordInput.value;
        
        if (value === '') {
            showError(input, validationRules.confirmPassword.errorEmpty);
            return false;
        }
        
        if (value !== passwordValue) {
            showError(input, validationRules.confirmPassword.errorMismatch);
            return false;
        }
        
        setValid(input);
        return true;
    }

    /**
     * Validate message field
     * @param {HTMLElement} input - The message textarea element
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateMessage(input) {
        const value = input.value.trim();
        
        if (value === '') {
            showError(input, validationRules.message.errorEmpty);
            return false;
        }
        
        if (value.length < validationRules.message.minLength) {
            showError(input, validationRules.message.errorLength);
            return false;
        }
        
        setValid(input);
        return true;
    }

    /**
     * Validate individual field based on its ID
     * @param {HTMLElement} input - The input element to validate
     * @returns {boolean} - True if valid, false otherwise
     */
    function validateField(input) {
        switch(input.id) {
            case 'name':
                return validateName(input);
            case 'email':
                return validateEmail(input);
            case 'password':
                return validatePassword(input);
            case 'confirmPassword':
                return validateConfirmPassword(input);
            case 'message':
                return validateMessage(input);
            default:
                return true;
        }
    }

    /**
     * Validate entire form
     * @returns {boolean} - True if all fields are valid, false otherwise
     */
    function validateForm() {
        let isValid = true;
        
        // Validate all fields
        if (!validateName(nameInput)) isValid = false;
        if (!validateEmail(emailInput)) isValid = false;
        if (!validatePassword(passwordInput)) isValid = false;
        if (!validateConfirmPassword(confirmPasswordInput)) isValid = false;
        if (!validateMessage(messageInput)) isValid = false;
        
        return isValid;
    }

    /**
     * Focus on the first field with an error
     */
    function focusFirstError() {
        const firstError = form.querySelector('.error');
        if (firstError) {
            firstError.focus();
        }
    }

    // Event Listeners for blur events (validate when user leaves field)
    nameInput.addEventListener('blur', function() {
        validateField(this);
    });

    emailInput.addEventListener('blur', function() {
        validateField(this);
    });

    passwordInput.addEventListener('blur', function() {
        validateField(this);
        // Also revalidate confirm password if it has a value
        if (confirmPasswordInput.value !== '') {
            validateConfirmPassword(confirmPasswordInput);
        }
    });

    confirmPasswordInput.addEventListener('blur', function() {
        validateField(this);
    });

    messageInput.addEventListener('blur', function() {
        validateField(this);
    });

    // Event Listeners for input events (clear errors as user types correct input)
    nameInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateField(this);
        }
    });

    emailInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateField(this);
        }
    });

    passwordInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateField(this);
        }
        // Also revalidate confirm password if it was marked as error
        if (confirmPasswordInput.classList.contains('error') && confirmPasswordInput.value !== '') {
            validateConfirmPassword(confirmPasswordInput);
        }
    });

    confirmPasswordInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateField(this);
        }
    });

    messageInput.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validateField(this);
        }
    });

    // Form submit event listener
    form.addEventListener('submit', function(e) {
        // Prevent default form submission
        e.preventDefault();
        
        // Hide success message if it's showing
        successMessage.classList.remove('show');
        
        // Validate all fields
        const isFormValid = validateForm();
        
        if (!isFormValid) {
            // Focus on first error field
            focusFirstError();
            return false;
        }
        
        // If all validations pass, show success message
        successMessage.classList.add('show');
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Optional: Reset form after successful submission
        setTimeout(function() {
            form.reset();
            // Clear all valid states
            const allInputs = form.querySelectorAll('input, textarea');
            allInputs.forEach(input => {
                input.classList.remove('valid', 'error');
            });
            // Hide success message after 5 seconds
            setTimeout(function() {
                successMessage.classList.remove('show');
            }, 5000);
        }, 2000);
        
        return false;
    });
});