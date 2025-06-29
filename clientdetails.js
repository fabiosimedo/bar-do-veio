let id;
let vendaSelecionada = null;


document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  id = params.get("id");

  if (!id) {
    alert("ID do cliente não fornecido na URL.");
    return;
  }

  fetch(`clients/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Cliente não encontrado.");
      }
      return response.json();
    })
    .then(cliente => {
      document.getElementById("cliente-nome").textContent = cliente.nome || "-";
      document.getElementById("nome-cliente-topo").textContent = cliente.nome || "-";
      document.getElementById("cliente-telefone").textContent = cliente.telefone || "-";

      if (!cliente.vendas || cliente.vendas.length === 0) {
        return;
      }

      let totalCentavos = 0;

      cliente.vendas.forEach(venda => {
        // Garante que a venda tenha uma data válida
        if (!venda.data) {
          venda.data = new Date().toISOString().split('T')[0];
        }

        adicionarLinhaVenda(venda, venda.id);
        totalCentavos += venda.preco;
      });

      // Atualiza total e valor do pagamento
      const totalFormatado = (totalCentavos / 100).toFixed(2).replace('.', ',');
      document.getElementById("cliente-total").textContent = totalFormatado;
      document.getElementById("valorPago").value = (totalCentavos / 100).toFixed(2);
    })

});

document.getElementById('confirmarPagamento').addEventListener('click', function () {
  const valorStr = document.getElementById('valorPago').value.trim();
  const valorInt = parseInt(valorStr);

  if (isNaN(valorInt) || valorInt <= 0) {
    alert('Informe um valor maior que zero.');
    return;
  }

  alert(id)

  // fetch(`/pagamentos/${id}`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({ valor: valorInt })
  // })
  // .then(response => {
  //   if (!response.ok) throw new Error('Erro ao processar pagamento');
  //   return response.json();
  // })
  // .then(dados => {
  //   alert('Pagamento realizado com sucesso!');
  //   $('#modalPagamento').modal('hide');
  //   document.getElementById('form-pagamento').reset();
  // })
  // .catch(erro => {
  //   console.error(erro);
  //   alert('Erro ao confirmar pagamento.');
  // });
});


document.getElementById('salvarVenda').addEventListener('click', function () {
  const nome = document.getElementById('produtoNome').value.trim();
  const precoStr = document.getElementById('produtoPreco').value.trim();
  const intValor = parseInt(precoStr);

  // Validações
  if (!nome) {
    alert('Informe o nome do produto.');
    return;
  }

  if (isNaN(intValor) || intValor <= 0) {
    alert('Informe um preço válido maior que zero.');
    return;
  }

  fetch(`/vendas/${id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: nome,
      preco: intValor
    })
  })
    .then(response => {
      if (!response.ok) throw new Error('Erro ao salvar venda');
      return response.json();
    })
    .then(dados => {
      alert('Venda registrada com sucesso!');
      $('#modalVendas').modal('hide'); // fecha o modal
      document.getElementById('form-venda').reset();

      // Opcional: adicionar à tabela
      const tbody = document.getElementById('tabela-produtos');
      const linha = document.createElement('tr');
      const hoje = new Date().toISOString().split('T')[0];
      adicionarLinhaVenda({
        nome,
        preco: intValor,
        data: new Date().toISOString().split('T')[0]
      }, dados.id);
      tbody.appendChild(linha);

      // Atualiza total na tela
      const totalAtual = parseFloat(document.getElementById('cliente-total').textContent.replace(',', '.'));
      const novoTotal = totalAtual + precoCentavos / 100;
      document.getElementById('cliente-total').textContent = novoTotal.toFixed(2).replace('.', ',');
    })
    .catch(erro => {
      console.error(erro);
      alert('Erro ao registrar venda.');
    });
});

function adicionarLinhaVenda(venda, vendaId) {
  const tbody = document.getElementById('tabela-produtos');
  const linha = document.createElement('tr');
  const precoReais = (venda.preco / 100).toFixed(2).replace('.', ',');

  linha.innerHTML = `
    <td>${venda.nome}</td>
    <td>${precoReais}</td>
    <td>${venda.data}</td>
  `;

  linha.style.cursor = 'pointer';
  linha.addEventListener('click', () => {
    vendaSelecionada = { ...venda, id: vendaId };
    document.getElementById('editarProdutoNome').value = venda.nome;
    document.getElementById('editarProdutoPreco').value = venda.preco;
    $('#modalEditarVenda').modal('show');
  });

  tbody.appendChild(linha);
}

document.getElementById('atualizarVenda').addEventListener('click', () => {
  const nome = document.getElementById('editarProdutoNome').value.trim();
  const preco = parseInt(document.getElementById('editarProdutoPreco').value.trim());

  if (!nome || isNaN(preco) || preco <= 0) {
    alert('Preencha os campos corretamente.');
    return;
  }

  fetch(`/vendas/${id}/${vendaSelecionada.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome, preco })
  })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao atualizar venda');
      return res.json();
    })
    .then(() => {
      alert('Venda atualizada com sucesso!');
      location.reload(); // ou atualize dinamicamente a linha
    })
    .catch(err => {
      console.error(err);
      alert('Erro ao atualizar venda.');
    });
});

document.getElementById('excluirVenda').addEventListener('click', () => {
  if (!confirm('Tem certeza que deseja excluir esta venda?')) return;

  fetch(`/vendas/${id}/${vendaSelecionada.id}`, {
    method: 'DELETE'
  })
    .then(res => {
      if (!res.ok) throw new Error('Erro ao excluir venda');
      return res.json();
    })
    .then(() => {
      alert('Venda excluída com sucesso!');
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert('Erro ao excluir venda.');
    });
});


function gerarVendasMockadas(qtd = 30) {
  const produtos = ['Cerveja', 'Água', 'Refrigerante', 'Porção de Batata', 'Pastel', 'Coxinha', 'Hambúrguer', 'Pinga', 'Gin', 'Energético'];
  let totalCentavos = 0;

  for (let i = 0; i < qtd; i++) {
    const produto = produtos[Math.floor(Math.random() * produtos.length)];
    const preco = Math.floor(Math.random() * 2000) + 300; // entre 3.00 e 23.00 reais
    const data = gerarDataAleatoria();
    const venda = {
      id: `mock-${i}`, // ID fictício para simular a identificação
      nome: produto,
      preco: preco,
      data: data
    };

    adicionarLinhaVenda(venda, venda.id);
    totalCentavos += preco;
  }

  document.getElementById('cliente-total').textContent = (totalCentavos / 100).toFixed(2).replace('.', ',');
  document.getElementById('valorPago').value = (totalCentavos / 100).toFixed(2);
}


// Função para gerar datas aleatórias
function gerarDataAleatoria() {
  const hoje = new Date();
  const diasAtras = Math.floor(Math.random() * 30); // até 30 dias atrás
  const data = new Date(hoje);
  data.setDate(hoje.getDate() - diasAtras);
  return data.toISOString().split('T')[0];
}

// Executar após DOM carregado
document.addEventListener('DOMContentLoaded', function () {
  gerarVendasMockadas(40); // quantidade suficiente para scroll
});
