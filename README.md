## 🚀 Desafio DevOps 2025
Criação de um ambiente containerizado com observabilidade de aplicações Node.js e Flask

---

### 🧩 Visão Geral

Duas aplicações simples (Node.js e Python/Flask) com cache interno e exportação de métricas via Prometheus. Monitoradas por Grafana com dashboards prontos. Toda a infraestrutura é containerizada com Docker Compose.

---

## ✅ Pré-requisitos
- Docker e Docker Compose instalados
- Portas `3000`, `5001`, `5002` e `9090` livres

---

## 🛠️ Como Executar o Projeto

```bash
git clone <seu-repo>
cd desafio-devops-2025
docker-compose up --build -d
```

---

## 🌐 Acessos Rápidos

| Serviço       | URL                          | Descrição                            |
|---------------|------------------------------|----------------------------------------|
| 🟦 App1 (Node)| http://localhost:5001        | Aplicação em Node.js com cache        |
| 🐍 App2 (Flask)| http://localhost:5002       | Aplicação em Python com cache         |
| 📈 Prometheus | http://localhost:9090        | Coleta e consulta de métricas         |
| 📊 Grafana    | http://localhost:3000        | Dashboards (admin/desafio2025)        |

---

## 🧱 Arquitetura da Solução

📌 [Diagrama da Arquitetura](./docs/infra.png)

### Componentes:
- App1 (Node.js)
- App2 (Python/Flask)
- Rede Docker para comunicação entre containers
- Prometheus (coleta de métricas)
- Grafana (visualização de métricas)
- Docker Compose (orquestração local)

---

## 📁 Estrutura de Diretórios

```bash
desafio-devops-2025
├── README.md
├── app1-node
│   ├── Dockerfile
│   ├── docs
│   ├── index.js
│   └── views
│       ├── hora.ejs
│       └── index.ejs
├── app2-python
│   ├── Dockerfile
│   ├── app.py
│   ├── requirements.txt
│   └── templates
│       ├── hora.html
│       └── index.html
├── docker-compose.yml
├── docs
│   ├── desafio.png
│   ├── infra.png
│   ├── nodejs-logo.svg
│   └── python-logo.svg
└── observability
    ├── grafana
    │   ├── dashboards
    │   │   └── app2-dashboard.json
    │   └── provisioning
    │       ├── dashboards
    │       │   └── dashboard.yaml
    │       └── datasources
    │           └── prometheus.yaml
    └── prometheus.yml
```

---

## 📉 Métricas

- Ambas as aplicações expõem métricas em `/metrics`
- Contadores por rota e métodos HTTP
- Prometheus coleta periodicamente
- Grafana exibe gráficos em tempo real

---

## 🔄 Atualizações e Manutenção

### 🔁 Fluxo de Atualização

#### Código das aplicações
```bash
# Rebuild e reinício
docker-compose build app1   # ou app2
docker-compose restart app1 # ou app2
```

#### Infraestrutura
```bash
# Editar arquivos:
# - prometheus.yml
# - dashboards Grafana (.json)

docker-compose restart prometheus grafana
```

### 💡 Boas práticas sugeridas
- Versionar dashboards `.json`
- Usar volumes para Grafana
- Automatizar com CI/CD
- Testes de saúde para `/` e `/metrics`

---

## 🧠 Possíveis Evoluções

### 💾 Persistência de Dados
Atualmente tudo é volátil. Usar volumes nomeados para Prometheus e Grafana evitaria perda de configuração a cada `up`.

### 🔗 Cache com Redis
O cache está em memória. Um Redis centralizado permitiria compartilhamento entre instâncias, inspeção e maior controle.

### 🔐 Segurança
Senhas e portas estão fixas no código. Recomendado:
- `.env` para variáveis sensíveis
- `docker secrets` ou `Vault` para ambientes reais

### ⚡ Migração para FastAPI
Substituir Flask por FastAPI traria:
- Melhor desempenho com `asyncio`
- Autodocumentação via Swagger
- Tipagem forte com `Pydantic`
- Melhor escalabilidade

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais detalhes.

---

Desenvolvido com 💙 por [Danilo Carvalho e Silva](https://github.com/seuusuario)
