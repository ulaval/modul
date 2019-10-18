# Taken from https://github.com/torstenwalter/openshift-nginx/blob/master/mainline/alpine/Dockerfile
FROM nginx:mainline-alpine

# support running as arbitrary user which belogs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
RUN chgrp -R root /var/cache/nginx

# Overwrite default config
COPY ./conf/openshift/default.conf /etc/nginx/conf.d/default.conf

COPY ./src/storybook/dist /usr/share/nginx/html/storybook
COPY ./src/modul-website/dist /usr/share/nginx/html/website

#copy favicon and index.html to root
COPY ./conf/openshift/index.html /usr/share/nginx/html
COPY ./conf/openshift/favicon.ico /usr/share/nginx/html

EXPOSE 5003

# comment user directive as master process is run as user in OpenShift anyhow
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

RUN addgroup nginx root
USER nginx
