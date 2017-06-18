# Base image
FROM node:7.2.1

MAINTAINER manishsingla

LABEL com.app.description="App server" \
      com.app.version="0.1.0"

ENV PORT=3200 NODE_ENV=development OUT_DIR=/var/out

# Update .bashrc
RUN echo 'export PS1="\[\033[90m\]\u@iris.node\[\033[m\]: \[\033[33;1m\]\W\[\033[m\] $> "' >> /root/.bashrc

WORKDIR /var/application

# Test should run within docker container (but tests should not be part of published artifact)
COPY build build
COPY node_modules node_modules
COPY public public

# remove nodemon because docker should die when node die (And nodemon won't let it die)
# And an external reconciliation engine like kubernetes to re-start
RUN npm install -g nodemon

VOLUME [$OUT_DIR]

#EXPOSE $PORT
EXPOSE 3200


ENTRYPOINT ["nodemon", "build/app/server.js"]