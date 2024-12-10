<h1>Social Commerce</h1>
<p>
O Social Commerce tem como objetivo facilitar o processo de compra e venda de produtos de diversos tipos. Fornecendo uma aplicação leve e fácil de utilizar.
</p>

## Desenvolvido por:
[Marcos Vinícius Alves Goulart](https://www.linkedin.com/in/marcos-vinícius-goulart/)<br>
[Vinícius Steflitsch da Silva](https://www.linkedin.com/in/vinicius-steflitsch-b19a47259/)

[Vídeo do Projeto](https://youtu.be/eaFYJ6GKV2w)<br>
[Slides da Apresentação](https://www.canva.com/design/DAGXfgdr_MY/iIZ9wFHjJycsUyS5mvWPHA/edit?utm_content=DAGXfgdr_MY&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)


<hr>
## Ferramentas e Dependências

| **Frontend** | **Backend**            | **Banco de Dados e Infraestrutura** | 
|--------------|------------------------|-------------------------------------|
| Remix        | Java                   | MySQL                               | 
| React        | Spring Boot            | H2                                  | 
| TypeScript   | Maven                  | Docker                              |
| Node.js      | Spring Web             | GitHub                              |
| SASS         | Spring Boot DevTools   | Figma                               | 
| Zod          | Spring Boot Validation | Trello                              | 
| Axios        | Lombok                 |                                     | 
|              | Spring Data JPA        |                                     |
|              | Spring JDBC            |                                     | 
|              | JaCoCo                 |                                     |
|              | MySQL Connector        |                                     |
|              | H2 Database            |                                     | 

<hr>

## Especificações
<p>Existem dois tipos de usuários: Comprador e Vendedor.</p>

<h3>Vendedor</h3>
<p>O Vendedor pode criar uma publicação, excluir uma publicação, ver quem são seus seguidores, ver suas métricas de performance e colocar uma imagem de perfil.</p> 
<hr>
<h3>Comprador</h3>
<p>O Comprador pode seguir um vendedor, buscar por um vendedor, ver publicações, ordenar publicações por categoria, ordenar publicações por oferta, curtir uma publicação, salvar uma publicação para sua lista de desejos
ver quem ele está seguindo, deixar de seguir um vendedor, voltar para a página inicial e colocar uma imagem de perfil.
</p>
<hr>
<h3>Publicações</h3>
<p>Cada publicação pode ser personalizada por vendedor. A publicação deve ter os seguintes atributos: nome do produto, categoria, descrição e preço. Opcionalmente, é possível optar por colocar o produto como item de promoção e a porcentagem do desconto.</p>
<hr>
<h3>Registro</h3>
<p>O processo de registro é constituído por duas etapas: Registro inicial, onde é necessário escolher se a conta é para um vendedor ou comprador e inserir um email válido.
A segunda etapa envolve preencher informações gerais do cadastro: nome, sobrenome, CPF/CNPJ, senha e confirmar a senha. Caso tudo esteja correto, o usuário é redirecionado para a tela de login.</p>
<hr>
<h3>Login</h3>
<p>Na tela de login, o usuário pode inserir seu email e senha cadastrados para entrar no sistema e ser redirecionado de acordo com seu tipo de conta. Caso não esteja cadastrado, pode clicar para ser redirecionado para o cadastro.</p>
<hr>
<h3>Responsividade</h3>
<p>A aplicação foi desenvolvida para possibilitar qualquer usuário, independentemente de seu dispositivo, a ter uma experiência excelente durante sua navegação no Social Commerce. A página é responsiva em todas as rotas, funcionando corretamente até telas com 390px de largura, até telas com 2560px de largura.</p>
<hr>

<div align="center">
<img width="100%" height="100%" src="frontend\public\social-commerce-banner.png" >
</div>
