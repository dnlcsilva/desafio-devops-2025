FROM python:3.11-slim

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o arquivo requirements.txt para dentro do container
#COPY requirements.txt .
COPY . .
# Instalar as dependências do arquivo requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copiar o código da aplicação
#COPY app.py .

# Expor a porta que o Flask vai usar
EXPOSE 5002

# Comando para iniciar a aplicação
CMD ["python", "app.py"]

