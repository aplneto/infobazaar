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
    <summary>Welcome to the Jungle</summary>
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
_username_, você é redirecionado para o perfil do usuário. A próxima flag pode
ser encontrada em sua Bio:

![golden_coin](/assets/flags-5.png)

<details>
    <summary>Psycho Killer C'est Que Ce</summary>
TAC{psycho-killer-c-est-que-ce:ec8d207507650c8c9c4cac17ddb1f4b424dfef6b6ab9b20449cf7a0d5d13a416}
</details>

## Baby you're a rich man

De volta ao seu perfil de usuário, note que o trecho referente aos seus
créditos, nesse caso "$ 0", é um link desabilitado para a página `/credits`,
usada pelos usuários para comprar créditos, exibida na imagem abaixo:

![/credits](/assets/flags-6.png)

Ao acessá-la manulmente e clicar em um dos botões de compra,
uma mensagem de erro é exibida e você é redirecionado para a página inicial da
aplicação. No entanto, ao examinar os quadros que oferecem as opções de compra,
podemos notar um formulário com os campos ocultos **credits**, **value** e 
**discount**, como mostra a imagem abaixo:

![Formulário de compra](/assets/flags-7.png)

Esses campos podem ser utilizados numa requisição POST para o endpoint
`/api/credits/`, como demonstra a próxima imagem:

![/api/credits/](/assets/flags-8.png)

Essa requisição, por sua ve\ resulta na adição de créditos a conta do usuário.
A compra de créditos é fianlizada com o envio do comprovante de pagamentos
exibido na imagem abaixo para o e-mail associado a conta:

![Formulário](/assets/flags-9.png)

Esse comprovante direciona o usuário para uma rota no frontend que não retorna
um QR Code. A flag desse desafio pode ser encontrada ao escanear o QR Code. Como
mostra a imagem a seguir:

![QR Code](/assets/flags-10.png)

<details>
    <summary>Baby you're a rich man</summary>
TAC{baby-you-re-a-rich-man:8438bc689a96c8da258b19ac8f8daf823e6cb72a63732f3f68a12a825884bd60}
</details>

## Somebody is Watching Me

De volta ao formulário de login, é possível também acessar a funcionalidade de
recuperação de senhas, diponível através do path `/reset`. Essa funcionalidade
opera nas duas etapas a seguir:

1. O usuário fornece como _input_ seu nome de usuário, que é usado pelo servidor
para recuperar seu endereço de e-mail.
2. Após confirmar o endereço, um e-mail é enviado para o usuário contendo um
segundo fator de autenticação.

No entantoé possível para o usuário manipular o endereço de e-mail para o qual o
token 2FA será enviado. Assim, é possível tomar o controle da conta de qualquer
usuário da aplicação.
A imagen a seguir, por exemplo, demonstram o envio do token de reset de senha do
usuário **admin** para o e-mail do atacante.

![Reset de senha](/assets/flags-11.png)

Além do token, o e-mail também contém a próxima flag do desafio.

![E-mail com o token](/assets/flags-12.png)

<details>
    <summary>Somebody's watching me</summary>
TAC{somebody-s-watching-me:cbefc39013cc57b03712e0b4bdd2029d04a7d9bbb1d0d31f16664bc920b37f2c}
</details>

## Unholy

De posse das credenciais de admin, é possível acessar o painel administrativo da
aplicação, disponível no _endpoint_ `/admin/`. Esse painel permite o download de
quaisquer arquivos de projetos, incluindo aqueles que não estão públicos.
Neles é possível encontrar a flag para o próximo desafio, como evidência a
próxima imagem:

![Arquivo privado](/assets/flags-13.png)

**Observação**: também é possível conseguir acesso aos arquivos de produtos
privados a partir do comprometimento de contas de usuários com créditos, a
partir da compra dos produtos, seja ela da conta criada pelo atacante ou de uma
outra comprometida por ele.

<details>
    <summary>Unholy</summary>
TAC{unholy:cbfb10d180bb1ce4334d1f1c69ce119a70658ba0ac5f0b9c381103b2a2e24be1}
</details>

## Left behind

A aplicação é dividida entre os _endpoints_ `/api/`, responsável pela lógica
do _back-end_. `/admin/`, que contém o painel administrativo do Django e o
`front-end` escrito em React, que engloba todos os demais _paths_ da aplicação a
partir da página inicial `/`.

Há, no entanto, um quarto endpoint, o `/py/`, que, quando acessado, retorna o
seguinte objeto JSON:

```JSON
{"status":"ok"}
```

Esse endpoint opera como uma API e a próxima flag do desafio pode ser encontrada
a partir de fuzzing no arquivo `/py/openapi.yaml`, como mostra a imagem a
seguir:

![Flag Left Behind](/assets/flags-14.png)

<details>
    <summary>Left Behind</summary>
TAC{left-behind:22603b74c263bb249d22b1620a4f2d7c6a92900835749de21fd4ff29ed5e19d8}
</details>

## gj

A partir do arquivo `openapi.yaml` é possível deduzir um terceiro path pelo qual
o endpoint é responsável, o `/py/ybnq_cl`. Usando rot 13, é possível decifrar o
valor de "ybnq_cl", que significa "load_py".


### Entendendo a funcionalidade load_py

De acordo com a descrição no arquivo yaml, o servidor disponível no endpoint
`/py` é um servidor de manutenção e o endpoint `/py/ybnq_cl` é uma função que
visa migrar o banco de dados da aplicação para um novo banco de dados, mas de
forma mais rápida. Essa função foi implementada usando criptografia, diferente
de sua versão anterior.

Ainda segundo o arquivo, a princípio, a informação recebe um parâmetro uuid, que
corresponde a um "_purchase receipt_".

Usuários que fizeram a compra de produos receberam um e-mail com um link para o
_path_ `/api/purchase/{uuid}`, que contém um recibo de compra de produto
identificado pelo uuid no link. Usuários com privilégios administrativos também
possuem acesso aos recibos de compra salvos na aplicação através do painel
`/admin/`.

Acessar um desses recibos através do endpoint especificado, ou do painel
adiministrativo, revela um conteúdo codificado em base64 que, quando
decodificado, contém texto binário resultante de uma cifra, como demonstr a
próxima imagem:

![/api/purchase/8d803990-f92f-4f6f-8dd4-05a0acfb01bc/](/assets/flags-15.png)

Por outro lado, usar o uuid como parâmetro para a função `/py/ybnq_cl` resulta
no erro a seguir:

![/py/ybnq_cl?uuid=8d803990-f92f-4f6f-8dd4-05a0acfb01bc](/assets/flags-16.png)

Ainda, usar um valor inválido no parâmetro **uuid**, como a string "AAAAA"
também resulta em um erro HTTP/500. Um erro mais específico, que deixa clara a
função da funcionalidade load_py, acontece ao adicionar uma barra ao final de
um valor válido do parâmetro uuid:

![/py/ybnq_cl?uuid=8d803990-f92f-4f6f-8dd4-05a0acfb01bc/](/assets/flags-17.png)

Como dmeonstra o erro na imagem, a biblioteca de serialização [pickle] está sendo
utilizada para carregar os recibos no novo banco de dados. 

### Entendendo a criptografia

Uma outra funcionalidade que também utiliza criptografia é a de envio de
mensagens, disponível no path `/support`. Quando uma mensagem é enviada através
desse path, a aplicação retorna um uuid que, quando inserido no path
`/api/message/` retorna a versão criptografada da mensagem.

A chave para prosseguir neste desafio está em entender a criptografia utilizada.
Através de experimentos e informações disponibilizadas pela própria aplicação,
é possível concluir o seguinte:

1. A criptografia utilizada é a AES, como cita a página inicial do infobazaar;
2. O algoritimo não aparenta usar criptografia em blocos, uma vez que o tamanho
do cifrotexto varia diretamente com o tamanho da mensagem, não aparentando haver
padding de mensagem;
3. Além de resultarem em cifras de mesmo tamanho, quando duas mensagens de mesmo
tamanho são usadas em uma operação XOR com a cifra gerada pelo algoritmo de
criptografia, a _keystream_ gerada é igual para ambas as mensagens.

Dadas as informações a cima, é possível concluir que o padrão criptográfico mais
provável de ser utilizado é o AES no modo CTF. Esse padrão, especificamente,
está suscetível a um ataque de [reutilização de chave de Cifra de Fluxo],
que pode ser conduzido quando se têm acesso, tanto ao texto plano, quando ao
cifrotexto resultante do processo de criptografia.

### Exploit

Agora que sabemos como a funcionalidade **load_py** funciona e como codificar
nossos payloads, é necessário descobrir uma forma de forçar o carregamento deles
pela funcionalidade.

Para realizar este ataque, podemos seguir os passos a seguir:

1. Gerar uma mensagem cifrada a parir de um texto conhecido;
2. Obter a chave da cifra de fluo realizando uma operação XOR entre o cifrotexto
do passo anterior e o texto plano usado para gerá-lo;
3. Gerar um payload válido;
4. Cifrar o payload usando a chave da cifra de fluxo obtida no passo 2 a partir
de uma oepração XOR.
5. Armazenar o payload em um lugar acessível para a funcionalidade load_py.
Algumas opções são:
    - A criação de um Receipt válido contendo o payload a partir do painel
    administrativo;
    - Fazer o upload do payload como um arquivo de produto. Para isso pode ser
    necessário a manipulação do parâmetro **uuid** da funcionaldiade
    **load_py** (veja mais detalhes adiante);

Esse [script] foi escrito para facilitar a criação do payload seguindo os passos
descritos acima. Note que, possivelmente, você precisará modificar o endereço ip
no script para o endereço ip do seu host docker. Revise o código-fonte do script
para maiores detalhes. Ao executar o script, os quatro primeiros passos
descritos acima estarão concluídos.

Para armazenar o payload em um lugar acessível pela funcionalidade **load_py**,
podemos fazer o upload do script para um produto da aplicação. Note que, para
realizar esse passo é necessário acesso administrativo ou a uma conta de usuário
que possua um produto cadastrado (o usuário **golden_coin** identificado
anteriormente, pode ser utilizado).

![upload do payload](/assets/flags-18.png)

Por fim, podemos forçar o carregamento do payload a partir da manipulação do
parâmetro **uuid** na requisição para a funcionalidade **load_py**. Uma vez que
os recibos estão acessíveis a partir do path a seguir:

- `/api/purchase/{uuid}`

Se assumirmos que o parâmetro **uuid** está sendo concatenado diretamente na URL
e que a aplicação faz uma requisição para recuperar o valor do recibo, podemos
tentar forçar a aplicação a baixar o nosso payload a partir da manipulação desse
parâmetro. Se usarmos o valor "../media/project_files/pypayload_xJtJJqC.txt", a
concatenação do parâmetro resultará nas seguintes transformações:

- `/api/purchase/../media/project_files/pypayload_xJtJJqC.txt`

Que por fim se transforma em:

- `/api/media/project_files/pypayload_xJtJJqC.txt`

Dessa forma, forçamos o pickle a carregar nosso payload, a partir da requisição
descrita na imagem a seguir:

![Carregamento do payload](/assets/flags-19.png)

Note que o servidor demorar a enviar a resposta indica que o payload foi
processado e carregado pelo pickle, logo a conexão foi estabelecida.

Por fim, de posse da conexão shell aberta no passo anteior, podemos encontrar a
flag "gj" no arquivo crypto.py, que contém a função de decifragem das mensagens.

![Shell](/assets/flags-20.png)

<details>
    <summary>gj</summary>
TAC{gj:1b7ae9e240dc2ada761761745eca2c43471220bc36569fc12f881ca0cbcad208}
</details>

## Help is on the way

Por fim, de posse da função de decifragem e dos valores **CRYPTO_KEY** e
**CRYPTO_NONCE**, disponíveis no arquivo app.py, a última flag pode ser
encontrada a partir da decifragem das mensagens no painel administrativo da
aplicação, como mostra a próxima imagem:

![Mensagens](/assets/flags-21.png)

Usando a função de decifragem e os valores **CRYPTO_KEY** e **CRYPTO_NONCE**, é
possível decifrar a mensagem e obter o texto a seguir contendo a última flag:

![Help is on the way](/assets/flags-22.png)

<details>
    <summary>Help is on the way</summary>
TAC{help-is-on-the-way:063c3a20c004fea3108933d2617b64810f47293c786a9202df2714841569740e}
</details>

[path traversal]: https://owasp.org/www-community/attacks/Path_Traversal
[reutilização de chave de Cifra de Fluxo]: https://pt.wikipedia.org/wiki/Ataques_a_cifras_de_fluxo
[pickle]: https://docs.python.org/3/library/pickle.html
[script]: /receipt-env/picklepayload.py