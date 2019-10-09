FROM nginx:mainline-alpine

# Taken from https://github.com/torstenwalter/openshift-nginx/blob/master/mainline/alpine/Dockerfile

# support running as arbitrary user which belogs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
RUN chgrp -R root /var/cache/nginx

# Overwrite default config
COPY ./conf/docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./src/storybook/dist /usr/share/nginx/html/storybook
COPY ./src/modul-website/dist /usr/share/nginx/html/website
#copy favicon to root
COPY ./src/storybook/dist/favicon.ico /usr/share/nginx/html

EXPOSE 8081

# comment user directive as master process is run as user in OpenShift anyhow
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

RUN addgroup nginx root
USER nginx
