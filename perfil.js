const btnEditar = document.getElementById('btnEditar');
  const form = document.getElementById('perfilForm');
  const inputs = form.querySelectorAll('input, textarea, button.btn-salvar');
  const nomeDisplay = document.getElementById('nomeDisplay');

  let editando = false;

  function toggleEdit() {
    editando = !editando;
    inputs.forEach(el => {
      el.disabled = !editando;
    });
    btnEditar.textContent = editando ? 'Cancelar' : 'Editar Perfil';
  }

  window.onload = () => {
    const dados = JSON.parse(localStorage.getItem('dadosPerfil'));
    if(dados) {
      document.getElementById('email').value = dados.email || 'sla';
      document.getElementById('telefone').value = dados.telefone || '';
      document.getElementById('localizacao').value = dados.localizacao || '';
      document.getElementById('sobre').value = dados.sobre || '';
      nomeDisplay.textContent = dados.nome || 'Teus';
    }
  }

  btnEditar.addEventListener('click', () => {
    toggleEdit();
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    if(!editando) return;

    const dados = {
      nome: nomeDisplay.textContent,
      email: document.getElementById('email').value.trim(),
      telefone: document.getElementById('telefone').value.trim(),
      localizacao: document.getElementById('localizacao').value.trim(),
      sobre: document.getElementById('sobre').value.trim(),
    };

    localStorage.setItem('dadosPerfil', JSON.stringify(dados));
    alert('Perfil salvo com sucesso!');
    toggleEdit();
  });

  nomeDisplay.addEventListener('click', () => {
    if (!editando) return;

    const inputNome = document.createElement('input');
    inputNome.type = 'text';
    inputNome.value = nomeDisplay.textContent;
    inputNome.style.fontWeight = '700';
    inputNome.style.fontSize = '20px';
    inputNome.style.width = '100%';
    inputNome.style.background = 'transparent';
    inputNome.style.color = '#eee';
    inputNome.style.border = 'none';
    inputNome.style.borderBottom = '2px solid #bbb';
    inputNome.style.outline = 'none';

    nomeDisplay.replaceWith(inputNome);
    inputNome.focus();

    inputNome.addEventListener('blur', () => {
      if(inputNome.value.trim() === '') {
        inputNome.value = 'Teus';
      }
      nomeDisplay.textContent = inputNome.value.trim();
      inputNome.replaceWith(nomeDisplay);
    });

    inputNome.addEventListener('keydown', e => {
      if(e.key === 'Enter') {
        e.preventDefault();
        inputNome.blur();
      }
    });
  });