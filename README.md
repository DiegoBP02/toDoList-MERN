Projeto que permite o usuário administrar a sua lista de tarefas, permitindo-o adicionar tarefas, editá-las e removê-las e definir o seu nível de urgência. O projeto também conta com um sistema de login/registro utilizando cookies.

### Funcionalidades: 
- Sistema de login/registro que permite o usuário acessar as funcionalides do projeto, o usuário também pode se deslogar
- Criar tarefas informando o nome da tarefa e seu nível de urgência
- Por padrão, a urgência da tarefa será baixa, podendo ser alterada para média e alta
- É possível editar os dados de uma tarefa, incluindo a sua urgência, porém a data de criação permanecerá a mesma
- Possui um sistema de paginação, caso tenha mais de 10 tarefas, uma segunda página será criada e assim por diante.
- Projeto utiliza o banco de dados MongoDB através da biblioteca mongoose
- Senha criptografada com o bcryptjs para assegurar a segurança do usuário
- Quando o usuário se loga e passa na autenticação, um token é gerado através da biblioteca jsonwebtoken, que autoriza o usuário acessar as funcionalidades do projeto
- Possui um sistema de cookies, armazenando o token gerado e permitindo que o usuário não precise se logar novamente caso tenha acessado a página dentro de 24 horas
- Token armazenado nos cookies do navegador através da biblioteca cookie-parser
- Projeto implantado na nuvem através do sistema de nuvem Render
- Uso das bibliotecas seguintes bibliotecas para fornecer segurança ao projeto:
- helmet: responsável pela segurança relacionada aos "http response headers"
- cors: permite o acesso através de domínios diferentes
- xss-clean: "sanitize the user input"
- express-mongo-sanitize: protege contra injeções maliciosas direcionadas ao MongoDB

### Live: https://todolist-mern.onrender.com

![todolist-mern onrender com_landing(Nest Hub Max)](https://user-images.githubusercontent.com/103163622/211131267-bc7cf10f-ea00-4c00-83c9-6d97d6d99554.png)
![localhost_3000_register(Nest Hub Max) (1)](https://user-images.githubusercontent.com/103163622/211131553-c011dd7f-69dc-408e-adc3-951a3d2c6550.png)
![localhost_3000_(Nest Hub Max)](https://user-images.githubusercontent.com/103163622/211131715-756dd6e4-1d27-43ec-aef4-8ee9023c7c08.png)
![todolist-mern onrender com_registera(Nest Hub Max)](https://user-images.githubusercontent.com/103163622/211131727-4e121d39-f40c-4571-8d5e-9791e5d9ef74.png)

- Funcionalidades a serem adicionadas: Marcar a tarefa como completa e ordenar as tarefas com base na urgência e data de criação

INSTALLATION
install dependencies with 'npm install' command
create .env and provide correct values: MONGO_URI=<YOUR_MONGODB_URL> JWT_SECRET=<YOUR_JWTSECRET> JWT_LIFETIME=<e.g. "1d">

start the back-end and front-end with 'npm start'

you should see "Server is listening ..." text
