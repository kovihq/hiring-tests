# Execução
Para fazer a execução deste projeto basta executar o seguinte comando:
```
sls invoke local --function sort --data '{[3, 5, 6, 1, 2, 16], [16, 6, 91, 1, 4, 3, 123, 1, 1]}'
```
os valor entre aspas após o termo `--data` é a entrada de dados, usando o mesmo formato sugerido no desafio.

# Testes

Para a execução dos testes pode-se utilizar dois comandos:

```
npm run test
```

ou 

```
npm run test:coverage
```

O primeiro comando só executa os testes o segundo comando executa os testes e calcula a cobertura de código.

# Lint

Assim como nos testes existem dois comandos para verificação do lint:

```
npm run lint
```

ou 

```
npm run lint:fix
```

O primeiro simplesmente analisa erros de lint, já o segundo comando analisa e resolve problemas que podem ser resolvidos de forma automática.

