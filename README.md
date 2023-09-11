# Trybe Futebol Clube

# Contexto

O `TFC` é um site informativo sobre partidas e classificações de futebol! ⚽️

## Técnologias usadas

Front-end:
> Desenvolvido usando: React, Redux, CSS3, HTML5, ES6

Back-end:
> Desenvolvido usando: NodeJS, TypeScript, MYSQL, Sequelize

## Configurações minimas para executar o projeto

Na sua máquina você deve ter:

 - Sistema Operacional Distribuição Unix
 - Node versão 16
 - Docker
 - Docker-compose versão >=1.29.2

➡️ O `node` deve ter versão igual ou superior à `16.14.0 LTS`:
  - Para instalar o nvm, [acesse esse link](https://github.com/nvm-sh/nvm#installing-and-updating);
  - Rode os comandos abaixo para instalar a versão correta de `node` e usá-la:
    - `nvm install 16.14 --lts`
    - `nvm use 16.14`
    - `nvm alias default 16.14`

➡️ O`docker-compose` deve ter versão igual ou superior à`ˆ1.29.2`:

## Instalando Dependências

```bash
npm install
```
Você pode instalar suas aplicações (front e back) rodando o comando npm run install:apps na pasta raiz do projeto;

## Executando aplicação

* Para rodar o back-end:

  ```
  cd app/backend && npm start
  ```
* Para rodar o front-end:

  ```
    cd app/frontend && npm start
  ```

## Executando Testes

* Para rodar todos os testes:
  ```
    npm test
  ```
Você pode rodar o avaliador mostrando as operações que o navegador vai fazer no front-end durante os testes E2E utilizando o comando npm run test:browser

## Observações

Este projeto tem o seu frontend feito pela trybe, e o seu objetivo é a pratica do back-end conectado com o front-end já feito pela escola. 
