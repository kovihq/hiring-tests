- Aldebaran N. Souza
- email: baranbnt@gmail.com

# Init project
- After to do the clone of project, you must to execute the following command:
```
npm install 
```

## Starting application offline
- You can start the application in offline mode executing the command below
```
npm run offline 
```

## Deploy the lambda
- Before you to do the deploy configure the aws credentials.

```
[dev]
aws_access_key_id=XXXXXXXXXXXX
aws_secret_access_key=YYYYYYYYYYYYYYYY
```
- [dev] -->> it's required because the command that's mapping in the package.json has this profile, if you have another profile mapped, update the package.json

- After that you can execute the command
```
npm run deployDev
```

## Call service
- After deploy or startin aplication in offline mode, copying the URL and execute the following request.

- The service will go to return an array with the numnber that there are in both arrays.

- POST - [URL]

REQUEST
```
    {
        "firstArray": [
            1,
            3,
            12
        ],
        "secondArray": [
            16,
            6,
            91,
            1,
            4,
            3,
            123,
            1,
            1,
            3
        ]
    }
```

RESPONSE
```
[
    1,
    3
]
```