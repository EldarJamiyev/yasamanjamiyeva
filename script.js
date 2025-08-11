// FORM VALIDATION + FORM STATUS FEEDBACK FOR FORMSPREE

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const statusEl = document.getElementById('form-status');

    // Display feedback message
    function showStatus(message, isError = false) {
        statusEl.textContent = message;
        statusEl.style.color = isError ? '#ff2e55' : '#ff89ac';
    }

    // Clear feedback
    function clearStatus() {
        statusEl.textContent = '';
    }

    // Input validation
    function validateInput(input) {
        if (!input.value.trim()) {
            input.classList.add('input-error');
            return false;
        }
        if (input.type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value.trim())) {
                input.classList.add('input-error');
                return false;
            }
        }
        input.classList.remove('input-error');
        return true;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearStatus();

        const inputs = [...form.querySelectorAll('input, textarea')].filter(el => el.name !== '_gotcha');
        let valid = true;

        inputs.forEach(input => {
            if (!validateInput(input)) valid = false;
        });

        if (!valid) {
            showStatus('Please fill out all fields correctly.', true);
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: form.method,
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                showStatus('Thank you for your message! Yasaman will respond soon.', false);
                form.reset();
            } else {
                const data = await response.json();
                if (data && data.errors) {
                    showStatus(data.errors.map(err => err.message).join(', '), true);
                } else {
                    showStatus('Oops! Something went wrong, please try again later.', true);
                }
            }
        } catch (error) {
            showStatus('Network error, please check your connection.', true);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
});
