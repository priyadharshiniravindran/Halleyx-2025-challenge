document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const backendURL = 'http://localhost:5000'; // Change if your backend URL differs

  // ==================== LOGIN ====================
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const errorMsg = document.getElementById('loginError');

      try {
        const res = await fetch(`${backendURL}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (res.ok) {
          // ✅ Login Success
          localStorage.setItem('userToken', data.token);
          localStorage.setItem('userEmail', data.email);
          localStorage.setItem('userRole', data.role);
          alert('✅ Login successful');
          errorMsg.textContent = '';

          if (data.role === 'admin' || email === 'admin@halix.com') {
            window.location.href = '/admin/dashboard.html';
          } else {
            window.location.href = '/customer/home.html';
          }
        } else {
          errorMsg.textContent = data.message || '❌ Invalid email or password.';
        }
      } catch (err) {
        console.error('Login Error:', err);
        errorMsg.textContent = '❌ Server error. Please try again.';
      }
    });
  }

  // ==================== REGISTER ====================
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const firstName = document.getElementById('firstName').value.trim();
      const lastName = document.getElementById('lastName').value.trim();
      const email = document.getElementById('email').value.trim();
      const password = document.getElementById('password').value.trim();
      const errorMsg = document.getElementById('registerMessage');

      try {
        const res = await fetch(`${backendURL}/api/auth/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ firstName, lastName, email, password })
        });

        const data = await res.json();

        if (res.ok) {
          alert('✅ Registration successful! Please log in.');
          errorMsg.textContent = '';
          window.location.href = 'login.html';
        } else {
          errorMsg.textContent = data.message || '❌ Registration failed.';
        }
      } catch (err) {
        console.error('Registration Error:', err);
        errorMsg.textContent = '❌ Server error. Please try again.';
      }
    });
  }
});
