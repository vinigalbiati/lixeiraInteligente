// Credenciais de acesso — substitua pela sua lógica real
const CREDENTIALS = { username: 'admin', password: '1234' };

const form      = document.getElementById('form');
const btnLabel  = document.getElementById('btn-label');
const btn       = document.getElementById('btn');
const inputUser = document.getElementById('username');
const inputPass = document.getElementById('password');
const fieldUser = document.getElementById('field-user');
const fieldPass = document.getElementById('field-pass');
const errUser   = document.getElementById('err-user');
const errPass   = document.getElementById('err-pass');
const togglePw  = document.getElementById('toggle-pw');

// Toggle mostrar senha
togglePw.addEventListener('click', () => {
  const show = inputPass.type === 'password';
  inputPass.type = show ? 'text' : 'password';
  togglePw.textContent = show ? 'ocultar' : 'mostrar';
});

// Limpa erro ao digitar
inputUser.addEventListener('input', () => clearErr(fieldUser, errUser));
inputPass.addEventListener('input', () => clearErr(fieldPass, errPass));

function setErr(field, el, msg) {
  field.classList.add('has-error');
  el.textContent = msg;
}
function clearErr(field, el) {
  field.classList.remove('has-error');
  el.textContent = '';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  clearErr(fieldUser, errUser);
  clearErr(fieldPass, errPass);

  const user = inputUser.value.trim();
  const pass = inputPass.value;
  let ok = true;

  if (!user) { setErr(fieldUser, errUser, 'Informe o usuário.'); ok = false; }
  if (!pass) { setErr(fieldPass, errPass, 'Informe a senha.');   ok = false; }
  if (!ok) return;

  // Loading
  btn.disabled = true;
  btnLabel.textContent = 'Aguarde...';

  setTimeout(() => {
    if (user === CREDENTIALS.username && pass === CREDENTIALS.password) {
      btnLabel.textContent = 'Acessando...';
      setTimeout(() => {
        window.location.href = '../lixeirainteligente/src/home.html';
      }, 600);
    } else {
      btn.disabled = false;
      btnLabel.textContent = 'Entrar';
      setErr(fieldPass, errPass, 'Usuário ou senha incorretos.');
      inputPass.value = '';
      inputPass.focus();

      // Shake no container
      const container = document.getElementById('container');
      container.classList.remove('shake');
      void container.offsetWidth;
      container.classList.add('shake');
    }
  }, 900);
});

// Foco inicial
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => inputUser.focus(), 300);
});
