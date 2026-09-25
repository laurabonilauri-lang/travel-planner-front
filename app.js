const API_URL = 'http://localhost:5000';

// Armazena temporariamente a viagem que está sendo editada
let idViagemEmEdicao = null;

// 1. Função para buscar e exibir viagens (GET)
function carregarViagens() {
    const listElement = document.getElementById('lista-viagens');
    if (!listElement) return;

    fetch(`${API_URL}/viagens`)
        .then(response => {
            if (!response.ok) throw new Error('Erro ao buscar viagens');
            return response.json();
        })
        .then(data => {
            listElement.innerHTML = '';
            const viagens = data.viagens || [];
            
            if (viagens.length === 0) {
                listElement.innerHTML = '<div class="alert alert-info">Nenhuma viagem cadastrada ainda.</div>';
                return;
            }

            viagens.forEach(v => {
                const item = document.createElement('div');
                item.className = 'card mb-3 shadow-sm';
                item.innerHTML = `
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start">
                            <h5 class="card-title text-primary font-weight-bold mb-2">${v.destino}</h5>
                            <div>
                                <button class="btn btn-sm btn-outline-warning mr-1" onclick="prepararEdicao(${v.id}, '${v.destino}', '${v.data_inicio}', '${v.data_fim}', ${v.orcamento}, '${v.bagagem}')">
                                    Editar
                                </button>
                                <button class="btn btn-sm btn-outline-danger" onclick="excluirViagem(${v.id})">
                                    Excluir
                                </button>
                            </div>
                        </div>
                        <p class="card-text mb-1"><strong>Período:</strong> ${v.data_inicio} até ${v.data_fim}</p>
                        <p class="card-text mb-1"><strong>Orçamento:</strong> R$ ${Number(v.orcamento).toFixed(2)}</p>
                        <p class="card-text mb-0"><strong>Bagagem:</strong> ${v.bagagem}</p>
                    </div>
                `;
                listElement.appendChild(item);
            });
        })
        .catch(error => {
            console.error('Erro no GET /viagens:', error);
            listElement.innerHTML = '<div class="alert alert-danger">Servidor Back-End indisponível. Inicie a API Python Flask.</div>';
        });
}

// 2. Função para cadastrar (POST) ou atualizar (PUT) uma viagem
function salvarViagem(event) {
    if (event) event.preventDefault();

    const destinoInput = document.getElementById('destino') || document.querySelector('input[placeholder*="Miami"]');
    const dataInicioInput = document.getElementById('data_inicio') || document.getElementById('dataInicio') || document.querySelectorAll('input[type="date"]')[0];
    const dataFimInput = document.getElementById('data_fim') || document.getElementById('dataFim') || document.querySelectorAll('input[type="date"]')[1];
    const orcamentoInput = document.getElementById('orcamento') || document.querySelector('input[type="number"]');
    const bagagemSelect = document.getElementById('bagagem') || document.querySelector('select');

    if (!destinoInput || !dataInicioInput || !dataFimInput) {
        alert('Erro: Não foi possível localizar os campos do formulário.');
        return;
    }

    const payload = {
        destino: destinoInput.value,
        data_inicio: dataInicioInput.value,
        data_fim: dataFimInput.value,
        orcamento: parseFloat(orcamentoInput ? orcamentoInput.value : 0) || 0,
        bagagem: bagagemSelect ? bagagemSelect.value : 'Apenas Mala de Mão'
    };

    // Define a rota e o método dependendo se é cadastro (POST) ou edição (PUT)
    const isEdicao = idViagemEmEdicao !== null;
    const url = isEdicao ? `${API_URL}/viagem/${idViagemEmEdicao}` : `${API_URL}/viagem`;
    const method = isEdicao ? 'PUT' : 'POST';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(async response => {
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.message || `Erro ${response.status} ao processar viagem`);
        }
        return response.json();
    })
    .then(data => {
        alert(isEdicao ? 'Viagem atualizada com sucesso!' : 'Viagem cadastrada com sucesso!');
        limparFormulario();
        carregarViagens();
    })
    .catch(error => {
        console.error(`Erro no ${method} /viagem:`, error);
        alert(`Falha ao salvar viagem: ${error.message}`);
    });
}

// 3. Prepara o formulário para edição (PUT)
function prepararEdicao(id, destino, dataInicio, dataFim, orcamento, bagagem) {
    idViagemEmEdicao = id;

    const destinoInput = document.getElementById('destino') || document.querySelector('input[placeholder*="Miami"]');
    const dataInicioInput = document.getElementById('data_inicio') || document.getElementById('dataInicio') || document.querySelectorAll('input[type="date"]')[0];
    const dataFimInput = document.getElementById('data_fim') || document.getElementById('dataFim') || document.querySelectorAll('input[type="date"]')[1];
    const orcamentoInput = document.getElementById('orcamento') || document.querySelector('input[type="number"]');
    const bagagemSelect = document.getElementById('bagagem') || document.querySelector('select');
    const btnSalvar = document.getElementById('btn-salvar') || document.querySelector('button[type="submit"]');

    if (destinoInput) destinoInput.value = destino;
    if (dataInicioInput) dataInicioInput.value = dataInicio;
    if (dataFimInput) dataFimInput.value = dataFim;
    if (orcamentoInput) orcamentoInput.value = orcamento;
    if (bagagemSelect) bagagemSelect.value = bagagem;

    if (btnSalvar) {
        btnSalvar.textContent = 'Atualizar Viagem';
        btnSalvar.classList.remove('btn-success', 'btn-primary');
        btnSalvar.classList.add('btn-warning');
    }

    // Rola a página até o formulário para facilitar a edição
    const formElement = document.getElementById('form-viagem') || destinoInput;
    if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth' });
    }
}

// 4. Função para excluir viagem (DELETE)
function excluirViagem(id) {
    if (!confirm(`Tem certeza de que deseja remover a viagem #${id}?`)) {
        return;
    }

    fetch(`${API_URL}/viagem/${id}`, {
        method: 'DELETE'
    })
    .then(async response => {
        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            throw new Error(errData.message || `Erro ${response.status} ao excluir viagem`);
        }
        return response.json();
    })
    .then(data => {
        alert(data.message || 'Viagem removida com sucesso!');
        carregarViagens();
    })
    .catch(error => {
        console.error('Erro no DELETE /viagem:', error);
        alert(`Falha ao remover viagem: ${error.message}`);
    });
}

// 5. Limpa o formulário e restaura o estado de inclusão
function limparFormulario() {
    idViagemEmEdicao = null;
    const formViagem = document.getElementById('form-viagem') || document.querySelector('form');
    if (formViagem) formViagem.reset();

    const btnSalvar = document.getElementById('btn-salvar') || document.querySelector('button[type="submit"]');
    if (btnSalvar) {
        btnSalvar.textContent = 'Cadastrar Viagem';
        btnSalvar.classList.remove('btn-warning');
        btnSalvar.classList.add('btn-success');
    }
}

// 6. Função para pesquisar destinos na API Externa
function pesquisarVoosExterna(event) {
    if (event) event.preventDefault();

    const inputIata = document.getElementById('codigo-iata') || document.querySelector('input[placeholder*="IATA"]');
    const containerResultado = document.getElementById('resultado-voos');

    if (!inputIata || !inputIata.value.trim()) {
        alert('Por favor, digite um destino para pesquisar (ex: Paris, Miami, Curitiba).');
        return;
    }

    const termo = inputIata.value.trim();

    if (containerResultado) {
        containerResultado.innerHTML = '<div class="spinner-border spinner-border-sm text-primary" role="status"></div> A consultar informações do destino...';
    }

    fetch(`http://localhost:5000/voos/${encodeURIComponent(termo)}`)
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `Erro HTTP ${response.status}`);
            }
            return data;
        })
        .then(data => {
            if (containerResultado) {
                containerResultado.innerHTML = `
                    <div class="alert alert-success mt-2 py-2 mb-0">
                        <small><strong>${data.aeroporto}</strong></small><br>
                        <small>${data.status}</small><br>
                        <small>Rota: ${data.origem} ➔ ${data.destino}</small>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Erro na consulta:', error);
            if (containerResultado) {
                containerResultado.innerHTML = `
                    <div class="alert alert-danger mt-2 py-2 mb-0">
                        <small><strong>Erro na busca:</strong> ${error.message}</small>
                    </div>
                `;
            }
        });
}

// 7. Inicialização dos eventos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    carregarViagens();

    const btnSalvar = document.getElementById('btn-salvar') || document.querySelector('button.btn-success') || document.querySelector('button[type="submit"]');
    if (btnSalvar) {
        btnSalvar.addEventListener('click', salvarViagem);
    }
    
    const formViagem = document.getElementById('form-viagem') || document.querySelector('form');
    if (formViagem) {
        formViagem.addEventListener('submit', salvarViagem);
    }

    const btnBuscarVoo = document.getElementById('btn-buscar-voo') || document.getElementById('btn-pesquisar-voo');
    if (btnBuscarVoo) {
        btnBuscarVoo.addEventListener('click', pesquisarVoosExterna);
    }
});
