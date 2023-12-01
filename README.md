# APIrestful-auth-jwt

# API de autenticação com Express e MongoDB Esta é uma API de autenticação simples construída com Node.js, Express, MongoDB e JWT (JSON Web Tokens).   
Uma API permite o registro de usuários, login e recuperação de informações do usuário autenticado.  ## Configuração Certifique-se de ter o Node.js e o MongoDB instalados em sua máquina antes de executar a aplicação.    
1. Clone o repositório: ```bash git clone https://github.com/seu-usuario/nome-do-repositorio.git ```  
2. Instale as dependências: ```bash cd nome-do-repositorio npm install ```  
3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis ​​de ambiente: ```env SECRET=sua_chave_secreta DB_USER=seu_usuario_mongo DB_PASS=sua_senha_mongo PORT=3000 ``` Certifique-se de substituir ` sua_chave_secreta`, `seu_usuario_mongo` e `sua_senha_mongo` pelos valores protegidos.  
4. Inicie o servidor: ```bash npm start ```  
## Rotas ###  
1. **Rota de Boas-Vindas** - **URL:** `/` - **Método:** ` GET` - **Descrição:** Retorna uma mensagem de boas-vindas. ###  
2. 2. **Registro de Usuário** - **URL:** `/auth/register` - **Método:** `POST` - **Descrição:** Registrar um novo usuário. - **Corpo da Requisição:** ```json




