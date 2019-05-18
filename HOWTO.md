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
| POST | gateway:3010/auth/register | {email: string, password: string}|   - 200: succes - 4XX: error |

### User login

| method | route | body | response |
| --- | --- | --- | --- |
|POST| gateway:3010/auth/login | {email: string, password: string} | - 200: succes - 4XX: error |

### User subscription

| method | route | body | response |
| --- | --- | --- | --- |
| POST | gateway:3010/account/subscription | {email: string, target: string, name: string} | |
| POST | gateway:3010/account/subscription | {email: string, target: string} | |
| DELETE | gateway:3010/account/subscription | {email: string, target: string, name: string} | |

__NB__: target possible values are company or school

### User relations

| method | route | body | response |
| --- | --- | --- | --- |
| POST | gateway:3010/account/leader | {follower: string, leader: string} | |
| POST | gateway:3010/account/leader/list | {email: string} | |
| DELETE | gateway:3010/account/leader | {follower: string, leader: string} | |

### User list

| method | route | body | response |
| --- | --- | --- | --- |
| POST | gateway:3010/user/list | {name: string} |

## Country

### List

| method | route | body | response |
| --- | --- | --- | --- |
|GET| gateway:3010/country/list | N/A | - 200: success - 4XX: error |

## School

### School creation

|method| route | body | response |
| --- | --- | --- | --- |
| POST | gateway:3010/school/create| {name: string, description: string, country: string}|

### School list

|method| route | body | response |
| --- | --- | --- | --- |
| GET | gateway:3010/school/list| {name: string, description: string, country: string}|

### Filter school

|method| route | body | response |
| --- | --- | --- | --- |
| POST | gateway:3010/school/filter| {name: string} | [{name: string, description: string}]

### Edit school

|method| route | body | response |
| --- | --- | --- | --- |
| PATCH | gateway:3010/school | {name: string, properties: {[{label: string, value: string}, ...]}} | [{name: string, description: string}]

## Company

### Company creation

|method| route | body | response |
| --- | --- | --- | --- |
| POST | gateway:3010/company/create| {name: string, description: string, country: string}|

### Company list

|method| route | body | response |
| --- | --- | --- | --- |
| GET | gateway:3010/company/list| {name: string, description: string, country: string}|

### Filter company

|method| route | body | response |
| --- | --- | --- | --- |
| POST | gateway:3010/company/filter| {name: string} | [{name: string, description: string}]

### Edit company

|method| route | body | response |
| --- | --- | --- | --- |
| PATCH | gateway:3010/company | {name: string, properties: {[{label: string, value: string}, ...]}} | [{name: string, description: string}]

## Posts

### Post creation

|method| route | body | response |
| --- | --- | --- | --- |
| POST | gateway:3010/post| {email: string, title: string, content: string}|

### Post list

|method| route | body | response |
| --- | --- | --- | --- |
| POST | gateway:3010/post/list| {email: string}| [{id: number, title: string, content: string}, ...]

### Post update

|method| route | body | response |
| --- | --- | --- | --- |
| PATCH | gateway:3010/post/| {id: number, properties: [{label: string, value: string}, ...]}|

### Post deletion

|method| route | body | response |
| --- | --- | --- | --- |
| DELETE | gateway:3010/post| {id: number}|
