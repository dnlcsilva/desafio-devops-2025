from flask import Flask, render_template, send_from_directory
from flask_caching import Cache
from prometheus_flask_exporter import PrometheusMetrics
from datetime import datetime
import pytz
import os

app = Flask(__name__, template_folder='templates', static_folder='static')

# Configuração do cache (60 segundos)
app.config['CACHE_TYPE'] = 'SimpleCache'
app.config['CACHE_DEFAULT_TIMEOUT'] = 60
cache = Cache(app)

# Exporta métricas para Prometheus
metrics = PrometheusMetrics(app)

@app.route('/')
@cache.cached()
def home():
    return render_template('index.html', message='Seja bem-vindo ao App2, desenvolvido com Python!')

@app.route('/hora')
@cache.cached()
def hora():
    fuso_brasilia = pytz.timezone('America/Sao_Paulo')
    hora_atual = datetime.now(fuso_brasilia).strftime("%d/%m/%Y %H:%M:%S")
    return render_template('hora.html', hora=hora_atual)
    #hora_atual = datetime.now().strftime("%d/%m/%Y %H:%M:%S")
    #return render_template('hora.html', hora=hora_atual)

@app.route('/docs/<path:filename>')
def custom_static(filename):
    return send_from_directory('/app/docs', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
