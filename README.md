# RepoProvas

Por Rafael de Lima Bordoni

# Documentação

Essa API usa *prisma*. Antes de levantar o servidor, crie seu .env com as variáveis do .env.example e execute `npx prisma migrate dev` para criar o banco de dados.

## Rotas

#### POST /sign-in

Envie um corpo no formato abaixo para logar. As credenciais devem existir no banco de dados. Logando com sucesso, essa rota devolve uma token para ser usada nas rotas protegidas com o formato *bearer*.

    {
      "email": "string de email válido",
      "password": "string com a senha da conta"
    }

#### POST /sign-up

Envie um corpo no formato abaixo para criar uma conta no banco de dados.

    {
      "email": "string de email válido",
      "password": "string com uma senha de 6 a 24 caracteres",
      "passwordConfirm": "string igual a senha"
    }

#### POST /tests

Rota protegida, use uma token no formato *bearer* gerada pela rota POST /sign-in no header Authorization. Envie um corpo no formato abaixo para criar uma prova no banco de dados. Professor, categoria e disciplina devem já existir no banco, e a disciplina deve ser uma que o professor nomeado leciona.

    {
      "name": "string com nome da prova",
      "pdfUrl": "string URI válida que redireciona para o pdf da prova",
      "teacher": "string com nome do professor que vai dar a prova",
      "discipline": "string com nome da disciplina da prova",
      "category": "categoria da prova"
    }

#### GET /tests/by-discipline

Rota protegida, use uma token no formato *bearer* gerada pela rota POST /sign-in no header Authorization. Essa rota devolve todas as provas ordenadas por termo, disciplina, e categoria.


#### GET /tests/by-teacher

Rota protegida, use uma token no formato *bearer* gerada pela rota POST /sign-in no header Authorization. Essa rota devolve todas as provas ordenadas por professor e categoria.

## Testes

Estão inclusos um script de testes automatizados com *jest* e *supertest* e um .json para requisições manuais com *Thunder Client*.
 
Para rodar os testes automatizado, primeiro gere um .env.test com variáveis de ambiente para seus testes, incluindo conexão com um banco de dados próprio pra testes. Para criar o banco, basta criar a conexão no .env.test e executar o seguinte comando na sua linha de comando:
 
    npx dotenv-cli -e .env.test prisma migrate dev

Feito isso, basta executar `npm run test` para rodar o script de testes.

Já o .json do *Thunder Client*, basta abrir o seu *Thunder Client*, importar o .json e ter as variáveis de ambiente corretamente configurada com a porta correta.
