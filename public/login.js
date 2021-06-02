const formLogin = document.getElementById('form-login');
const loginUser = document.getElementById('username');
const loginPassword = document.getElementById('password');
const contLogout = document.getElementById('cont-logout');

function isLoggedIn() {
  return Boolean(localStorage.getItem('token'));
}

function updateLoginStatus() {
  if (isLoggedIn()) {
    // Usuarrio autenticado
    formLogin.classList.add('hidden');
    contLogout.classList.remove('hidden');
  } else {
    // Usuario SIN autenticar
    formLogin.classList.remove('hidden');
    contLogout.classList.add('hidden');
  }
}

function logout() {
  localStorage.clear();
  updateLoginStatus();
}

async function login() {
  const username = loginUser.value;
  const password = loginPassword.value;

  const response = await api('post', '/login', { username, password });

  if (response.status === 'error') {
    alert(response.error);
  } else {
    // Guardo el Token en mi sesion actual
    localStorage.setItem('token', response.accessToken);

    updateLoginStatus();

    // Cargo datos del sitio
    loadTable();
  }
}

updateLoginStatus();
