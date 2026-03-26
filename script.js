// Toggle password visibility
const togglePasswordBtn = document.getElementById('togglePassword');
if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener('click', function () {
        const passwordField = document.getElementById('txtPassword');
        if (passwordField) {
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🔒';
        }
    });
}

// Screen width detection
document.addEventListener('DOMContentLoaded', function () {
    const screenWidth = window.innerWidth;
    const scWdthInput = document.getElementById('scWdth');
    if (scWdthInput) {
        scWdthInput.value = screenWidth;
    }
});

// Handle Enter key press in password field
const txtPasswordField = document.getElementById('txtPassword');
if (txtPasswordField) {
    txtPasswordField.addEventListener('keyup', function (e) {
        if (e.key === 'Enter') {
            const btnLogin = document.getElementById('btnLogin');
            if (btnLogin) {
                btnLogin.click();
            }
        }
    });
}
