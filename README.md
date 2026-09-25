# ✈️ Travel Planner - Front-End

Este repositório contém o módulo de interface de usuário (Front-End) para a aplicação **Travel Planner**, desenvolvida como MVP para a disciplina de Arquitetura de Software.

A aplicação permite aos usuários gerenciar o planejamento das suas viagens (destinos, datas, orçamentos e bagagens) e pesquisar informações geográficas e demográficas de destinos através de uma API externa pública.

---

## 🏗️ Arquitetura da Solução

O projeto segue o **Cenário 1** das diretrizes da disciplina, no qual a Interface Front-End comunica diretamente com a API Back-End em Python (Flask) para operações de persistência de dados (CRUD) e consulta o serviço de destinos intermediado pelo Back-End.

![Diagrama de Arquitetura do Sistema](./assets/arquitetura-sistema.png)

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 & CSS3** (estruturado com Bootstrap 5.3)
- **JavaScript (ES6+)** utilizando a Fetch API para consumos assíncronos das rotas REST
- **NGINX** como servidor web leve para servir os arquivos estáticos da interface
- **Docker & Docker Compose** para containerização e orquestração do ambiente

---

## 🌐 Consumo das Rotas e APIs

### 1. API Back-End Principal (Operações CRUD)
- **`GET /viagens`**: Lista todos os roteiros de viagem cadastrados no banco de dados.
- **`POST /viagem`**: Cadastra um novo planejamento de viagem.
- **`PUT /viagem/{id}`**: Atualiza as informações de uma viagem existente pelo seu ID.
- **`DELETE /viagem/{id}`**: Remove um planejamento de viagem do sistema.
- **`GET /voos/{codigo_iata}`**: Consulta informações do destino (nome, país, estado e população) via integração com a API externa.

### 2. API Externa Pública Consumida
- **Serviço Consumido:** Open-Meteo Geocoding API (`https://geocoding-api.open-meteo.com/v1/search`)
- **Objetivo:** Permitir ao usuário pesquisar informações dinâmicas sobre qualquer cidade ou destino (região/estado e quantidade de habitantes) diretamente na interface, sem redirecionar a navegação.

---

## 🚀 Como Executar com Docker

### Pré-requisitos
- **Docker** e **Docker Compose** instalados e em execução na máquina local.

### Passos de Execução

1. **Clonar os repositórios e posicionar o `docker-compose.yml` na raiz.**

2. **Construir as imagens e iniciar os containers:**
   ```bash
   docker compose up --build

3. **Acessar a Aplicação no Navegador:**

   Interface Web (Front-End): http://localhost:8080

   Documentação da API (Swagger): http://localhost:5000

4. **Para encerrar os serviços:**
     docker compose down
