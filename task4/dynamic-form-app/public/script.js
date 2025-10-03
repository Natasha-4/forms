document.addEventListener('DOMContentLoaded', () => {
  const passwordInput = document.getElementById('password');
  const feedback = document.getElementById('feedback');
  const form = document.getElementById('userForm');

  passwordInput.addEventListener('input', () => {
    const value = passwordInput.value;
    const strong = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (strong.test(value)) {
      passwordInput.classList.add('valid');
      passwordInput.classList.remove('invalid');
      feedback.textContent = "Strong password ✅";
      feedback.style.color = "green";
    } else {
      passwordInput.classList.add('invalid');
      passwordInput.classList.remove('valid');
      feedback.textContent = "Password must be 8+ chars, include uppercase, number, and symbol.";
      feedback.style.color = "red";
    }
  });

  // Client-side routing simulation
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch('/submit', {
      method: 'POST',
      body: formData
    })
    .then(res => res.text())
    .then(html => {
      history.pushState({}, '', '/success');
      document.body.innerHTML = html;
    });
  });

  // Handle back/forward navigation
  window.addEventListener('popstate', () => {
    location.reload();
  });
});