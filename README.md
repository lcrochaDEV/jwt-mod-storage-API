### 🚀 JWT MOD STORAGE API

Este projeto demonstra um fluxo de autenticação seguro utilizando Node.js. A arquitetura foca em duas camadas de proteção: a primeira para a segurança da senha no banco de dados e a segunda para a integridade da sessão do usuário.

### 🛠️ Tecnologias e Dependências

Para garantir um ambiente de desenvolvimento ágil e seguro, utilizamos as seguintes "bicicletas" (bibliotecas):
 * **Express**: Framework web minimalista para gerenciar rotas e middlewares.
 * **Bcrypt**: Biblioteca para hashing de senhas usando a técnica de salt, tornando-as seguras contra ataques de força bruta.
 * **JSON Web Token** (JWT): Padrão da indústria para representar reivindicações de segurança entre duas partes.
 * **Dotenv**: Gerencia variáveis de ambiente (como chaves secretas), mantendo dados sensíveis fora do código-fonte.
 * **Nodemon**: Ferramenta de desenvolvimento que reinicia o servidor automaticamente a cada alteração.

### Instalação

```shell
# Dependências de produção
npm install bcryptjs
npm install dotenv 
npm install express 
npm install jsonwebtoken


# Dependências de desenvolvimento
npm install --save-dev nodemon
```

### 🔐 O Fluxo de Segurança

O código segue uma estratégia de criptografia em dois níveis, garantindo que mesmo se os dados forem interceptados, eles permaneçam ilegíveis.
1. Proteção de Dados Sensíveis (Bcrypt)
Antes de qualquer armazenamento ou transmissão, o campo chave (chave) passa por um processo de hashing. Ao contrário da criptografia comum, o hash é unidirecional.
 
O que acontece: O sistema gera um "salt" aleatório e o mistura com o campo user + passw, gerando uma chave única.

2. Blindagem do Objeto (JWT)
Após a validação da identidade, o objeto contendo as informações do usuário e a senha já hasheada é encapsulado em um Token JWT.

#### Estrutura do Token:

O objeto é montado da seguinte forma antes da assinatura:

```json
{
  "chave": "user+passw",
  "valor": {
    "user": "usuario",
    "passw": "password"
  },
  "expiracao": "300"
}
```

> Nota: O JWT é assinado com uma Secret Key definida no seu arquivo .env. Isso garante que o conteúdo do objeto não foi alterado por terceiros durante o tráfego.
> 

### ⚙️ Configuração

Certifique-se de criar um arquivo .env na raiz do projeto:

```env
HOST=localhost
PORT=3000
SECRET_KEY=sua_chave_secreta_super_segura
```


### 🚀 Como Executar

 * Clone o repositório.
 * Instale as dependências: npm install.
 * Inicie o servidor em modo de desenvolvimento:

```shell
npm run dev
```                                                                                                                                                                                                                                                                                                                                    
<img src="https://images.icon-icons.com/2699/PNG/512/nodemonio_logo_icon_168944.png"  height="60"/>
<img src="https://logowik.com/content/uploads/images/express-js1720895488.logowik.com.webp" height="60"/>
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvxDV-zIY4aQ36BtbEFRLE8Q4o9Ks5o1PxtA&s"  height="60"/>
<img src="https://repository-images.githubusercontent.com/139898859/9617c480-81c2-11ea-94fc-322231ead1f0"  width="100" height="60"/>
<img src="https://miro.medium.com/1*XkmnsJ6Joa6EDFVGUw0tfA.png" width="150" height="60"/>