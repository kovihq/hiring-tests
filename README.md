# hiring-tests
**Autor:** Francílio Araújo da Costa

## Introdução

Implementação de uma função serverless para [Queue Message Array Challenge](https://github.com/kovihq/hiring-tests/blob/test-queue-message-array/).

## Requisitos
- node v8+
- npm 6.10+

## Bibliotecas usadas
### Execução

- Serverless 1.46.1

### Testes

- Jest 24.8.0
- Stryker 2.0.1

## Exemplo de execução

A função foi nomeada *intersectSorted* e configurada para um ambiente AWS. Também é possível rodar a função localmente.

A função aceita json no seguinte formato:

    {
        payload: {
            arrayA: [...],
            arrayB: [...]
        }
    }

E retorna json no seguinte formato:

    {
        statusCode: Int,
        payload: [...]
    }

Podemos executar a função localmente usando o framework serverless com o payload `{"payload":{"arrayA":[1,2,3],"arrayB":[2,3]}}` usando o seguinte comando:

    npx sls invoke local -f intersectSorted -d '{"payload":{"arrayA":[1,2,3],"arrayB":[2,3]}}'

Que retornará como resultado:

    {
        "statusCode": 200,
        "payload": [
            2,
            3
        ]
    }