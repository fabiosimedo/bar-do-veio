const clients = document.getElementById('clientes');
const emailAutorizado = "jaquesimedos@hotmail.com";
// const emailAutorizado = "jaquesimedos@hotmail.com";

clients.addEventListener('click', () => {
  const authUser = localStorage.getItem('auth_user');

  if (authUser && authUser.trim() === emailAutorizado) {
    window.location.href = "clientes.htm";

    window.location.reload()
  } else {
    $('#modalSenha').modal('show');
    localStorage.removeItem('clientes');
    localStorage.removeItem('auth_user');
  }
});

if (localStorage.getItem('clientes') === 'true' && window.location.pathname !== "/clientes.htm") {
  clients.innerHTML = '<a href="clientes.htm" class="nav-link text-danger">CLIENTES</a>';
}

(function verificarAcesso() {
  if (localStorage.getItem("clientes") !== 'true' && window.location.pathname === "/clientes.htm") {
    localStorage.removeItem("auth_user");
    localStorage.removeItem("clientes");

    window.location.href = "/";
  }
})();

document.addEventListener("DOMContentLoaded", function () {
  const formPassword = document.getElementById("formSenha");

  if (formPassword) {
    formPassword.addEventListener("submit", function (event) {
      event.preventDefault();

      const email = document.getElementById("senhaInput").value.trim().toLowerCase();

      if (email === emailAutorizado) {
        localStorage.setItem("auth_user", email);
        localStorage.setItem("clientes", "true");
        $('#modalSenha').modal('hide');
        window.location.href = "clientes.htm";
        alert('Você está prestes a acessar a página de clientes')
      } else {
        alert("Acesso negado. E-mail não autorizado.");
        localStorage.removeItem("auth_user");
        localStorage.removeItem("clientes");
      }
    });
  }
  // fetch('clients') // Altere a URL se necessário
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error('Erro na requisição: ' + response.status);
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     renderClientes(data);
  //   })
  //   .catch(error => {
  //     console.error('Erro ao buscar clientes:', error);
  //     const tbody = document.querySelector("#tabela-clientes tbody");
  //     tbody.innerHTML = "<tr><td colspan='2'>Erro ao carregar clientes.</td></tr>";
  //   });
  renderClientes(allClients);
});

function renderClientes(clientes) {
  const tbody = document.querySelector("#tabela-clientes tbody");
  tbody.innerHTML = "";

  if (clientes.length === 0) {
    tbody.innerHTML = "<tr><td colspan='2'>Nenhum cliente encontrado.</td></tr>";
    return;
  }

  clientes.forEach(cliente => {
    const tr = document.createElement("tr");

    tr.style.cursor = "pointer";
    tr.addEventListener("click", () => {
      if (cliente.id) {
        window.location.href = `clientdetails.htm?id=${cliente.id}`;
      } else {
        alert("ID do cliente não encontrado.");
      }
    });

    const tdNome = document.createElement("td");
    tdNome.textContent = cliente.nome || "-";

    const tdTelefone = document.createElement("td");
    tdTelefone.textContent = cliente.telefone || "-";

    tr.appendChild(tdNome);
    tr.appendChild(tdTelefone);
    tbody.appendChild(tr);
  });
}


const allClients = [
  { "id": 1, "nome": "Maria José de souza lima", "telefone": "11999998888" },
  { "id": 2, "nome": "João", "telefone": "34999990000" }
]

document.getElementById('salvarCliente').addEventListener('click', async function () {
  const nome = document.getElementById('inputNome').value.trim();
  const telefone = document.getElementById('inputTelefone').value.trim();

  if (!nome || !telefone) {
    alert('Preencha todos os campos.');
    return;
  }

  const cliente = {
    nome: nome,
    telefone: telefone
  };

  try {
    const resposta = await fetch('/client', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cliente)
    });

    if (!resposta.ok) {
      throw new Error(`Erro ao salvar cliente: ${resposta.status}`);
    }

    const resultado = await resposta.json();
    console.log('Cliente salvo com sucesso:', resultado);

    // Fecha o modal
    $('#modalNovoCliente').modal('hide'); // se estiver usando Bootstrap 4 com jQuery

    // Se estiver sem jQuery (pode usar com Bootstrap 5):
    // const modal = bootstrap.Modal.getInstance(document.getElementById('modalNovoCliente'));
    // modal.hide();

    // Limpa os campos
    document.getElementById('form-novo-cliente').reset();

    // Opcional: atualizar a tabela dinamicamente
    // Exemplo:
    const tbody = document.querySelector('#tabela-clientes tbody');
    const linha = document.createElement('tr');
    linha.innerHTML = `<td>${cliente.nome}</td><td>${cliente.telefone}</td>`;
    tbody.appendChild(linha);

  } catch (erro) {
    console.error('Erro ao salvar cliente:', erro);
    alert('Falha ao salvar cliente. Tente novamente.');
  }
});

document.getElementById('botaoBuscar').addEventListener('click', function () {
  const termo = document.getElementById('buscarCliente').value.trim();

  if (!termo) {
    alert('Digite um termo para buscar.');
    return;
  }

  fetch(`/search?termo=${encodeURIComponent(termo)}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro na busca');
      }
      return response.json();
    })
    .then(dados => {
      console.log('Resultados da busca:', dados);

      // Exemplo: atualizar a tabela
      const tbody = document.querySelector('#tabela-clientes tbody');
      tbody.innerHTML = ''; // limpa resultados antigos

      dados.forEach(cliente => {
        const linha = document.createElement('tr');
        linha.innerHTML = `<td>${cliente.nome}</td><td>${cliente.telefone}</td>`;
        tbody.appendChild(linha);
      });
    })
    .catch(erro => {
      console.error('Erro ao buscar clientes:', erro);
      alert('Erro ao buscar clientes. Tente novamente.');
    });
});

