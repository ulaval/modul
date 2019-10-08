FROM nginx:mainline-alpine

# Do not start daemon for nginx
# RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# support running as arbitrary user which belogs to the root group
RUN chmod g+rwx /var/cache/nginx /var/run /var/log/nginx
RUN chgrp -R root /var/cache/nginx


# Overwrite default config
COPY ./conf/docker/nginx.conf /etc/nginx/conf.d/default.conf

COPY ./src/storybook/dist /usr/share/nginx/html/storybook
COPY ./src/website/dist /usr/share/nginx/html/website

# comment user directive as master process is run as user in OpenShift anyhow
RUN sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf

EXPOSE 8081
