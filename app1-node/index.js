const express = require('express');
const promClient = require('prom-client');
const NodeCache = require('node-cache');
const path = require('path');

const app = express();
const cache = new NodeCache({ stdTTL: 10 }); // cache de 10 segundos

// Verificando o caminho absoluto do diretório de views
console.log('Caminho absoluto para views:', path.join(__dirname, 'app1-node', 'views'));

// Configuração do EJS e diretório de views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app1-node', 'views'));
//app.set('views', path.join(__dirname, 'views'));

// Servir arquivos estáticos (ex: imagens da pasta /docs)
//app.use('/docs', express.static(path.join(__dirname, 'docs')));
app.use('/docs', express.static('/app/docs'));


// Métricas Prometheus
const collectDefaultMetrics = promClient.collectDefaultMetrics;
collectDefaultMetrics();

const counter = new promClient.Counter({
  name: 'app1_requests_total',
  help: 'Contador de requisições por rota',
  labelNames: ['route']
});

// Rota principal com descrição
app.get('/', (req, res) => {
  counter.inc({ route: '/' });
  res.render('index', { message: 'Seja bem-vindo ao App1, desenvolvido com Node.js!' });
});

// Rota /hora (com cache e visual bonitinho)
app.get('/hora', (req, res) => {
  counter.inc({ route: '/hora' });

  if (cache.has("hora")) {
    const hora = cache.get("hora");
    return res.render('hora', { hora });
  }

  const horaAtual = new Date().toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  cache.set("hora", horaAtual);
  res.render('hora', { hora: horaAtual });
});

// Rota de métricas (para Prometheus)
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`App1 rodando na porta ${PORT}`);
});

