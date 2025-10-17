document.getElementById('formLogin').addEventListener('submit', function (e) {
  e.preventDefault();

  const emailOuUsuario = document.getElementById('emailLogin').value.trim();
  const senha = document.getElementById('senhaLogin').value;
  const msgErro = document.getElementById('msgErro');

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  const usuarioEncontrado = usuarios.find(u =>
    (u.usuario === emailOuUsuario || u.email === emailOuUsuario) && u.senha === senha
  );

  if (usuarioEncontrado) {
    msgErro.textContent = ''; // limpa mensagem
    window.location.href = 'Home.html'; // entra direto
  } else {
    msgErro.textContent = 'Usuário ou senha inválidos.';
  }
});
