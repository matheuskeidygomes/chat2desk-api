# Chat2Desk Back-end API

API Backend para sistema de cadastros. Desenvolvida utilizando: Node.js, Typescript e MongoDB.

![Node](https://img.shields.io/badge/Node-v16.14%20(LTS)-brightgreen)
![Npm](https://img.shields.io/badge/Npm-v8.3.1-blue) 
![License](https://img.shields.io/badge/License-MIT-red)
![Docker](https://img.shields.io/badge/Docker-v20.10.12-informational)
![Docker-Compose](https://img.shields.io/badge/Docker--compose-v1.29.2-blue)

<h2 align="center">
 <a href="#Status">Status</a> •
 <a href="#Features">Features</a> •
 <a href="#Pré-requisitos">Pré-requisitos</a> • 
 <a href="#Rodando-a-aplicação">Rodando a aplicação</a> • 
 <a href="#Rotas">Rotas</a> • 
 <a href="#Tecnologias">Tecnologias</a> • 
 <a href="#Autor">Autor </a>
</h2>

# Status

:heavy_check_mark: Finalizado

# Features

- [x] Cadastro de novos usuários no sistema.
- [x] Acesso de usuários no sistema.
- [x] Visualização, edição e deleção de dados de usuário.


# Pré-requisitos

Será necessário ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Docker](https://docs.docker.com/engine/install/) e [Docker-Compose](https://docs.docker.com/compose/install/). Também é aconselhável ter um editor para trabalhar com o código, como o [VSCode](https://code.visualstudio.com/).


# Rodando a aplicação

```bash

# Clone este repositório
$ git clone https://github.com/matheuskeidygomes/chat2desk-api.git

# Acesse a pasta do projeto no terminal/cmd
$ cd chat2desk-api

# Caso tenha o MongoDB instalado na máquina host, certifique-se que o serviço local esteja desativado antes de executar a aplicação

# Execute o comando para ativar a aplicação 
$ npm run docker

# O servidor iniciará na porta:3000 - acesse <http://localhost:3000>

```

# Rotas

## (Público) POST /register

Este endpoint é utilizado para realizar o processo de cadastro do usuário.

### PARÂMETROS

Nome, e-mail, data de nascimento e senha.

- Nome deve conter apenas espaços e letras.
- E-mail deve ser um e-mail válido.
- Data de nascimento não posterior ao dia atual, no formato DD/MM/YYYY
- Senha com no mínimo 8 caracteres, 1 Letra maiúscula, 1 Caractere especial e 1 número.

Exemplo:

```bash

{
    "name" : "Marcos",
    "email": "marcos@gmail.com",
    "password": "Marcos.1234",
    "birthdate": "11/12/1995"
}

```

Exemplo de resposta (Status 200 OK):

```bash

{
    {
        "name": "Marcos",
        "email": "marcos@gmail.com",
        "token": "eyJhskjGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzUwOTNiMzRjYzVlOTMzNDVhYmUzNCIsImVtYWlsIjoiYW5hQGdtYWlsLmNvbSIsImlhdCI6MTY0NzY1MDYzMn0.eP2zogD6-b2bWdLyVB8weT7PiwzR0273XQh7hG8mkK0"
    }
}

```

## (Público) POST /login        

Este endpoint é utilizado para realizar o processo de login do usuário.

### PARÂMETROS

E-mail e senha válidos.

Exemplo:

```bash

{
    "email": "marcos@gmail.com",
    "password": "Marcos.1234",
}

```

Exemplo de resposta (Status 200 OK):

```bash

{
    {
        "name": "Marcos",
        "email": "marcos@gmail.com",
        "token": "eyJhskjGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzUwOTNiMzRjYzVlOTMzNDVhYmUzNCIsImVtYWlsIjoiYW5hQGdtYWlsLmNvbSIsImlhdCI6MTY0NzY1MDYzMn0.eP2zogD6-b2bWdLyVB8weT7PiwzR0273XQh7hG8mkK0"
    }
}

```

## (Privado) GET /users        

Este endpoint é utilizado para buscar uma lista dos usuários cadastrados no sistema.

### PARÂMETROS

Para realizar esta requisição, não é necessário nenhum parâmetro.

### HEADERS

Para que a requisição seja efetuada com sucesso, é necessário antes, adquirir o token de acesso disponibilizado  
ao logar. Este token deverá ser inserido no Header Authorization da requisição no seguinte formato:

```bash
Exemplo:

Bearer eyJhskjGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzUwOTNiMzRjYzVlOTMzNDVhYmUzNCIsImVtYWlsIjoiYW5hQGdtYWlsLmNvbSIsImlhdCI6MTY0NzY1MDYzMn0.eP2zogD6-b2bWdLyVB8weT7PiwzR0273XQh7hG8mkK0
```

Caso o Token não seja fornecido no Header Authorization, a requisição retornará um Erro 403 Bad Request.

Exemplo de resposta (Status 200 OK):

```bash
[
    {
        "_id": "32198ga9023asda89031",
        "name": "Marcos",
        "email": "marcos@gmail.com",
        "birthdate": "11/12/1995"
    },
    {
        "_id": "32198ga9323ssda89031",
        "name": "Paulo",
        "email": "paulo@gmail.com",
        "birthdate": "11/06/1995"
    }
]
```

## (Privado) GET /users/:id       

Este endpoint é utilizado para buscar um usuário específico cadastrado no sistema.

### PARÂMETROS

Para realizar esta requisição, é necessário inserir o atributo "id" do usuário desejado, no endpoint da requisição. 

```bash
Exemplo:

http://localhost:3000/users/32198ga9323ssda89031

```

### HEADERS

Para que a requisição seja efetuada com sucesso, é necessário antes, adquirir o token de acesso disponibilizado  
ao logar. Este token deverá ser inserido no Header Authorization da requisição no seguinte formato:

```bash
Exemplo:

Bearer eyJhskjGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzUwOTNiMzRjYzVlOTMzNDVhYmUzNCIsImVtYWlsIjoiYW5hQGdtYWlsLmNvbSIsImlhdCI6MTY0NzY1MDYzMn0.eP2zogD6-b2bWdLyVB8weT7PiwzR0273XQh7hG8mkK0
```

Caso o Token não seja fornecido no Header Authorization, a requisição retornará um Erro 403 Bad Request.

Exemplo de resposta (Status 200 OK):

```bash
    {
        "_id": "32198ga9323ssda89031",
        "name": "Paulo",
        "email": "paulo@gmail.com",
        "birthdate": "11/06/1995"
    }
```


## (Privado) GET /profile      

Este endpoint é utilizado para buscar os dados do seu usuário logado no sistema.

### PARÂMETROS

Para realizar essa requisição, nenhum parâmetro é necessário.

### HEADERS

Para que a requisição seja efetuada com sucesso, é necessário antes, adquirir o token de acesso disponibilizado  
ao logar. Este token deverá ser inserido no Header Authorization da requisição no seguinte formato:

```bash
Exemplo:

Bearer eyJhskjGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzUwOTNiMzRjYzVlOTMzNDVhYmUzNCIsImVtYWlsIjoiYW5hQGdtYWlsLmNvbSIsImlhdCI6MTY0NzY1MDYzMn0.eP2zogD6-b2bWdLyVB8weT7PiwzR0273XQh7hG8mkK0
```

Caso o Token não seja fornecido no Header Authorization, a requisição retornará um Erro 403 Bad Request.

Exemplo de resposta (Status 200 OK):

```bash
    {
        "_id": "32198ga9323ssda89031",
        "name": "Paulo",
        "email": "paulo@gmail.com",
        "birthdate": "11/06/1995"
    }
```

## (Privado) DELETE /profile      

Este endpoint é utilizado para deletar seu cadastro logado no sistema.

### PARÂMETROS

Para realizar essa requisição, nenhum parâmetro é necessário.

### HEADERS

Para que a requisição seja efetuada com sucesso, é necessário antes, adquirir o token de acesso disponibilizado  
ao logar. Este token deverá ser inserido no Header Authorization da requisição no seguinte formato:

```bash
Exemplo:

Bearer eyJhskjGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzUwOTNiMzRjYzVlOTMzNDVhYmUzNCIsImVtYWlsIjoiYW5hQGdtYWlsLmNvbSIsImlhdCI6MTY0NzY1MDYzMn0.eP2zogD6-b2bWdLyVB8weT7PiwzR0273XQh7hG8mkK0
```

Caso o Token não seja fornecido no Header Authorization, a requisição retornará um Erro 403 Bad Request.

Exemplo de resposta (Status 200 OK):

```bash
    {
        message: "User deleted with sucess!"
    }
```


## (Privado) PUT /profile      

Este endpoint é utilizado para editar o seu cadastro logado no sistema.

### PARÂMETROS

Para realizar essa operação, deverá ser inserido ao menos um atributo diferente do já salvo no sistema.

Exemplo:

```bash

Exemplo 1 (Editando a senha e email):

{
    "email": "marcos.vinicius@gmail.com",
    "password": "Marcos.123567",
}

Exemplo 2 (Editando apenas o nome):

{
    "name": "Marcos Vinicius"
}

```

### HEADERS

Para que a requisição seja efetuada com sucesso, é necessário antes, adquirir o token de acesso disponibilizado  
ao logar. Este token deverá ser inserido no Header Authorization da requisição no seguinte formato:

```bash
Exemplo:

Bearer eyJhskjGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzUwOTNiMzRjYzVlOTMzNDVhYmUzNCIsImVtYWlsIjoiYW5hQGdtYWlsLmNvbSIsImlhdCI6MTY0NzY1MDYzMn0.eP2zogD6-b2bWdLyVB8weT7PiwzR0273XQh7hG8mkK0
```

Caso o Token não seja fornecido no Header Authorization, a requisição retornará um Erro 403 Bad Request.

Exemplo de resposta (Status 200 OK):

```bash
    {
        message: "Your user was updated with sucess!"
    }
```


# Tecnologias 

![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
  

# Autor

Desenvolvido por <a href="https://github.com/matheuskeidygomes"> Matheus Keidy </a>. Entre em contato!  
  
[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matheus-keidy-7b9886190/)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:matheuskeidygomes@gmail.com)




