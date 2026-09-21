FROM nginx:alpine

# Apaga arquivos padrao do NGINX
RUN rm -rf /usr/share/nginx/html/*

# Copia todos os arquivos da pasta atual para o NGINX
COPY . /usr/share/nginx/html/

# Garante permissoes de leitura
RUN chmod -R 755 /usr/share/nginx/html

EXPOSE 80