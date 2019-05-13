# LinkedTek

## Initialisation

In order to initialise the databases, once the docker containers are up run:

``` bash
  ./scripts/init_db.sh -i
```

## User

### User registration

| method | route | body | response |
| --- | --- | --- | --- |
| GET | gateway:3010/auth/register | {email: string, password: string}|   - 200: succes - 4XX: error |

### User login

| method | route | body | response |
| --- | --- | --- | --- |
|POST| gateway:3010/auth/login | {email: string, password: string} | - 200: succes - 4XX: error |

## Country

### List

| method | route | body | response |
| --- | --- | --- | --- |
|GET| gateway:3010/country/list | N/A | - 200: succes - 4XX: error |

## School

### School creation

|method| route | body | response |
| --- | --- | --- | --- |
| gateway:3010/school/create| {name: string, description: string, country: string}|

