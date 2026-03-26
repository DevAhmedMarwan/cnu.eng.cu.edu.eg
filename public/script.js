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
            var btnLogin = document.getElementById('btnLogin');
            if (btnLogin) btnLogin.click();
        }
    });
}

// ========== SECTION SWITCHING ==========
function showSection(sectionId) {
    document.getElementById('login-section').style.display = 'none';
    document.getElementById('desktop-section').style.display = 'none';
    document.getElementById('transcript-section').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function () {
    var path = window.location.pathname;
    if (path.indexOf('Transcript') !== -1) {
        showSection('transcript-section');
    } else if (path.indexOf('SIS') !== -1 || path.indexOf('Default') !== -1) {
        showSection('desktop-section');
        initDesktop();
    } else {
        showSection('login-section');
        document.title = 'جامعة القاهرة الأهلية - نظام معلومات إدارة الطلاب';
    }
});

// ========== LOGIN VALIDATION ==========
var loginForm = document.getElementById('form1');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var txtUsername = document.getElementById('txtUsername').value.trim();
        var txtPassword = document.getElementById('txtPassword').value;
        var loginErrorMsg = document.getElementById('loginErrorMsg');

        var validUsername = '80250028';
        var validPassword = '9959720';

        if (txtUsername !== validUsername || txtPassword !== validPassword) {
            if (loginErrorMsg) loginErrorMsg.style.display = 'block';
        } else {
            showSection('desktop-section');
            document.title = 'Student Information System';
            history.pushState(null, '', '/SIS/Default.aspx');
            initDesktop();
        }
    });
}

// ========== DESKTOP LOGIC ==========
var desktopInitialized = false;

function initDesktop() {
    if (desktopInitialized) return;
    desktopInitialized = true;

    var startBtn = document.getElementById('start-btn');
    var startMenu = document.getElementById('start-menu');

    // Start button toggle
    startBtn.addEventListener('click', function () {
        startMenu.classList.toggle('active');
    });

    // Close start menu on outside click
    document.addEventListener('click', function (e) {
        if (startMenu && startBtn && !startMenu.contains(e.target) && !startBtn.contains(e.target)) {
            startMenu.classList.remove('active');
        }
    });

    // Desktop shortcut clicks
    var shortcuts = document.querySelectorAll('.shortcut-item');
    shortcuts.forEach(function (item) {
        item.addEventListener('click', function () {
            var title = this.getAttribute('data-window');
            handleShortcut(title);
        });
    });

    // Start menu item clicks
    var menuItems = document.querySelectorAll('.start-menu-item[data-window]');
    menuItems.forEach(function (item) {
        item.addEventListener('click', function () {
            var title = this.getAttribute('data-window');
            startMenu.classList.remove('active');
            handleShortcut(title);
        });
    });

    // Logout
    var logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
            showSection('login-section');
            document.title = 'جامعة القاهرة الأهلية - نظام معلومات إدارة الطلاب';
            history.pushState(null, '', '/');
        });
    }

    // Back to desktop from transcript
    var backBtn = document.getElementById('backToDesktopBtn');
    if (backBtn) {
        backBtn.addEventListener('click', function () {
            showSection('desktop-section');
            history.pushState(null, '', '/SIS/Default.aspx');
        });
    }
}

function handleShortcut(title) {
    if (title === 'شهادة التقديرات') {
        showSection('transcript-section');
        history.pushState(null, '', '/SIS/Transcript.aspx');
    }
    // Other shortcuts can be added here later
}

// ========== FORGOT PASSWORD ==========
var resetLinks = document.querySelectorAll('a.reset-link, a.forgot-password');
resetLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        history.pushState(null, '', '/forgotpassword.aspx');

        var loginBox = document.querySelector('.login-box');
        if (loginBox) {
            loginBox.innerHTML =
                '<div class="login-header">' +
                '    <div id="sitemessage" class="message-text">' +
                '         اكتب كود المستخدم الخاص بك أو عنوان بريدك الإلكتروني سيتم إرسال بريد إلكتروني إليك<br />' +
                '    </div>' +
                '</div>' +
                '<div id="div_cont" class="form-group">' +
                '    <label for="txtUserName"></label>' +
                '    <input name="txtUserName" type="text" id="txtUserName" class="form-control" placeholder="كود المستخدم أو البريد الإلكتروني" style="width:100%;" />' +
                '</div>' +
                '<div id="div_button">' +
                '    <input type="submit" name="Button1" value="إرسال بريد التحقق" id="Button1" class="btn-primary" />' +
                '</div>';
        }
    });
});
