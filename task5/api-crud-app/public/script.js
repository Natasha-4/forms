async function fetchUsers() {
  const res = await fetch('/api/users');
  const users = await res.json();
  const list = document.getElementById('userList');
  list.innerHTML = '';
  users.forEach(user => {
    const div = document.createElement('div');
    div.className = 'user';
    div.innerHTML = `
      <strong>${user.name}</strong> (${user.email})
      <button onclick="deleteUser('${user.id}')">Delete</button>
    `;
    list.appendChild(div);
  });
}

async function addUser() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!name || !email) return alert('Please fill in both fields');

  await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email })
  });

  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  fetchUsers();
}

async function deleteUser(id) {
  await fetch(`/api/users/${id}`, { method: 'DELETE' });
  fetchUsers();
}

fetchUsers();