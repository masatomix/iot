FROM ubuntu:16.04
LABEL maintainer "masatomix <masatomix@ki-no.org>"


# nodejs インストール
RUN apt update
RUN apt-get update
RUN apt install -y curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_8.x |  bash -
RUN apt install -y nodejs
RUN apt install -y git
RUN apt install -y vim


# libpcap インストール
RUN apt install -y build-essential
RUN apt install -y libpcap-dev

ARG user="iot"
ARG homeDir="/home/${user}"

RUN useradd ${user}
WORKDIR ${homeDir}

# RUN git clone https://github.com/masatomix/iot.git
# RUN chown -R ${user}:${user} ${homeDir}
# RUN mv iot/* ./

# WORKDIR ${homeDir}
COPY ./ ./

RUN npm install

CMD  ["node", "index.js"]