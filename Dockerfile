# Base image
FROM node:7.2.1

MAINTAINER manishsingla

LABEL com.app.description="App server" \
      com.app.version="0.1.0"

ENV PORT=3200 NODE_ENV=development VOLUME_LOG=/var/log

# Update .bashrc
RUN echo 'export PS1="\[\033[90m\]\u@iris.node\[\033[m\]: \[\033[33;1m\]\W\[\033[m\] $> "' >> /root/.bashrc

WORKDIR /var/application

VOLUME [$VOLUME_LOG]

#EXPOSE $PORT
EXPOSE 3200

# remove nodemon because docker should die when node die (And nodemon won't let it die)
# And an external reconciliation engine like kubernetes to re-start
ENTRYPOINT ["./node_modules/.bin/nodemon", "dist/app/server.js"]

# Test should run within docker container (but tests should not be part of published artifact)
COPY node_modules node_modules
#COPY public public
COPY dist dist
