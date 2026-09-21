# ✈️ Travel Planner - Front-End

Este repositório contém o módulo de interface de utilizador (Front-End) para a aplicação **Travel Planner**, desenvolvida como MVP para a disciplina de Arquitetura de Software.

A aplicação permite aos utilizadores gerir o planeamento das suas viagens (destinos, datas, orçamentos e bagagens) e consultar cotações/voos através de uma API externa.

---

## 🏗️ Arquitetura da Solução

O projeto segue o **Cenário 1** das diretrizes da disciplina, no qual a Interface Front-End comunica diretamente com a API Back-End em Python (Flask) para operações de persistência de dados e consome um serviço externo para consulta de passagens aéreas.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 & CSS3** (com Bootstrap 5.3)
- **JavaScript (ES6+)** utilizando `fetch` para consumos assíncronos
- **NGINX** no servidor Web para servir ficheiros estáticos
- **Docker** para containerização do ambiente

---

## 🌐 Consumo das Rotas e APIs

### 1. API Back-End Principal (4 Métodos HTTP)
- **GET `/viagens`**: Lista todos os roteiros de viagem registados.
- **POST `/viagem`**: Regista um novo planeamento de viagem.
- **PUT `/viagem/{id}`**: Atualiza o status e orçamento de uma viagem existente.
- **DELETE `/viagem/{id}`**: Remove uma viagem do catálogo.

### 2. API Externa Pública
- **Serviço Consumido:** Flight API / Public Flight Quotes API
- **Objetivo:** Permitir ao utilizador pesquisar cotações e horários de voos com base no código IATA do aeroporto de destino sem redirecionar a navegação fora da aplicação.

---

## 🚀 Como Executar com Docker

### Pré-requisitos
- Docker instalado e em execução na máquina local.

### Passos de Execução

1. **Construir a imagem Docker:**
   ```bash
   docker build -t travel-planner-front .