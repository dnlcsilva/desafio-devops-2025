FROM node:18
WORKDIR /app
COPY index.js .
RUN npm init -y && npm install express node-cache prom-client ejs moment-timezone
EXPOSE 5001
CMD ["node", "index.js"]

