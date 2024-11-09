# Write up

Disclaimer: Não existe uma ordem específica na qual o desafio precisa ser
resolvido, por esse motivo, é possível que, ao tentar por conta própria, você
encontre as flags em uma ordem completamente diferente.

## Welcome to the jungle

O primeiro acesso à aplicação indica que grande parte de seu conteúdo está
disponível apenas para membros. De forma não-autenticada, uma das
funcionalidades que podemos acessar é a de cadastro, mostrada na imagem abaixo.

![/register](/assets/flags-0.png)

No entanto, a funcionalidade está protegida por um código de convite. A
verificação deste código acontece ao clicar no botão de envio do formulário de
registro, como mostra a imagem abaixo:

![/api/invitation_code/<code>](/assets/flags-1.png)

Sempre que um código incorreto é inserido no formulário, a aplicação retorna um
erro HTTP/404. No entanto, usando uma ferramenta de proxy como o Burp Suite para
interceptar e inspecionar o tráfego da aplicação é possível modificar essa
resposta. No caso dessa funcionalidade, modificar a o código da resposta para
HTTP/200 é suficiente para que a aplicação o _front-end_ da aplicação entenda
que a validação foi bem sucedida e realize o envio do formulário de login.

![/api/invitation_code/<code>](/assets/flags-2.png)

![/api/signup](/assets/flags-3.png)

Após a realização do cadastro, a primeira flag pode ser encontrada no endereço
de e-mail fornecido no formulário de cadastro.

![Account activation](/assets/flags-4.png)

<details>
    <summary>Flag Welcome to the Jungle</summary>
TAC{welcome-to-the-jungle:5434ff051aa72bf58a998aded8b5a0b8c6df8ae1493c245dc0aeadcc124fb53a}
</details>

**Observação**: o processo de contorno do código de convite também pode ser
feito a partir da análise do código-fonte da página.

## Psycho Killer C'est Que Ce

Após ativação da conta usando o código recebido por e-mail no passo anteior, a
próxima flag pode ser encontrada durante o processo de reconhecimento e coleta
de informações. No menu **Store**, disponível em `/store` há uma lista de 
produtos gratuitos e disponíveis para o público. Dentre eles, o produto 10,
**StealthBrowser** possui um comentário do usuário **golden_coin**. Ao clicar no
_username_ 