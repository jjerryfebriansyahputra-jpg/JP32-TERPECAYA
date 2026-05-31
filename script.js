const loginFormContent = document.getElementById('loginFormContent');
const registerFormContent = document.getElementById('registerFormContent');
const verificationBox = document.getElementById('verificationBox');

const btnToRegister = document.getElementById('btnToRegister');
const btnToLogin = document.getElementById('btnToLogin');
const errorValidation = document.getElementById('errorValidation');
const errorOTP = document.getElementById('errorOTP');

let dataSementara = {};
let kodeOTPPalsu = "";

// Tombol pindah ke form daftar
if(btnToRegister) {
    btnToRegister.addEventListener('click', () => {
        loginFormContent.classList.add('hidden');       
        registerFormContent.classList.remove('hidden'); 
        verificationBox.classList.add('hidden');
        if(errorValidation) errorValidation.style.display = 'none';
    });
}

// Tombol kembali ke form login
if(btnToLogin) {
    btnToLogin.addEventListener('click', () => {
        registerFormContent.classList.add('hidden');    
        loginFormContent.classList.remove('hidden');   
        verificationBox.classList.add('hidden');
    });
}

// 1. PROSES PENDAFTARAN & VALIDASI KARAKTER
const registerForm = document.getElementById('registerForm');
if(registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        const usernameBaru = document.getElementById('regUsername').value.trim();
        const emailBaru = document.getElementById('regEmail').value.trim();
        const passwordBaru = document.getElementById('regPassword').value;
        
        // Pengecekan Syarat Batas Karakter
        if (usernameBaru.length < 5) return showError("Username minimal harus 5 karakter.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailBaru)) return showError("Format email tidak valid!");
        if (passwordBaru.length < 8) return showError("Password minimal harus 8 karakter.");
        if (!/\d/.test(passwordBaru) || !/[a-zA-Z]/.test(passwordBaru)) return showError("Password wajib gabungan huruf dan angka!");

        // Simpan sementara sebelum OTP valid
        dataSementara = { username: usernameBaru, password: passwordBaru };
        kodeOTPPalsu = Math.floor(1000 + Math.random() * 9000).toString();

        alert(`[SIMULASI GMAIL]\n\nKe: ${emailBaru}\nKode Verifikasi Anda adalah: ${kodeOTPPalsu}`);

        registerFormContent.classList.add('hidden');
        verificationBox.classList.remove('hidden');
    });
}

// 2. PROSES COCOKKAN OTP GMAIL
const verificationForm = document.getElementById('verificationForm');
if(verificationForm) {
    verificationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const inputUserOTP = document.getElementById('otpInput').value.trim();

        if (inputUserOTP === kodeOTPPalsu) {
            localStorage.setItem('savedUser', dataSementara.username);
            localStorage.setItem('savedPass', dataSementara.password);

            alert("Verifikasi Berhasil! Akun Anda telah aktif.");
            
            registerForm.reset();
            verificationForm.reset();
            verificationBox.classList.add('hidden');
            loginFormContent.classList.remove('hidden');
        } else {
            if(errorOTP) {
                errorOTP.textContent = "⚠️ Kode verifikasi salah! Periksa kembali.";
                errorOTP.style.display = 'block';
            }
        }
    });
}

function showError(pesan) {
    if(errorValidation) {
        errorValidation.textContent = "⚠️ " + pesan;
        errorValidation.style.display = 'block';
    }
}

// 3. PROSES LOGIN & AUTO PINDAH HALAMAN
const loginForm = document.getElementById('loginForm');
if(loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const userInput = document.getElementById('loginUsername').value.trim();
        const passInput = document.getElementById('loginPassword').value;

        const akunTerdaftar = localStorage.getItem('savedUser');
        const passTerdaftar = localStorage.getItem('savedPass');

        if (userInput === akunTerdaftar && passInput === passTerdaftar) {
            localStorage.setItem('isLoggedIn', 'true');
            alert("Login Berhasil! Menuju Dashboard...");
            window.location.href = "dashboard.html"; // Berpindah file
        } else if (userInput === "admin" && passInput === "12345") {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('savedUser', 'Admin');
            alert("Login Berhasil sebagai Admin!");
            window.location.href = "dashboard.html"; // Berpindah file
        } else {
            alert("Username atau Password salah!");
        }
    });
}