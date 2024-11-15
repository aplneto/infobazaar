# infobazaar

Este repositório contém o código-fonte da aplicação `infobazaar.store`, parte do
CTF do Tempest Academy Conference 2024.

## Como usar esse repositório

Faça o donwload do repositório e uso o arquivo `docker-compose.yml` para
executar os desafios em uma instância do docker. O arquivo está configurado para
executar na porta 80 do seu dispositivo. Caso você queira executar o desafio em
uma porta diferente da 80, pode ser preciso modificar a linha 8 do arquivo
**docker-compose.yml*, alterando o valor de `- 80:80` para `- 8000:80`, por
exemplo, caso queira executar o desafio na porta 8000.

Execute o comando `docker-compose up` para iniciar os servidores do desafio.

Por fim, o desafio pode ser acessado pelo seu navegador da seguinte forma:

A aplicação principal fica acessível no endereço [http://localhost/](http://localhost/);

Como o desafio usava e-mail em sua resolução, qualquer mensagem de e-mail
enviada para o domínio `@attacker.local` pode ser visualizada em
[http://localhost/mail/](http://localhost/mail/);

<details>
    <summary>SPOILER</summary>
O servidor de desenvolvimento/backup dos administrador do Infobazaar fica disponível em <a>http://localhost/py/</a>.
</details>

## Referências

- [Write up](/write-up.md)
- [Cyberpol e KendrickLanDesktop](https://github.com/Shinji-Mimura/KendrickLanDesktop-CyberPolAPI)
