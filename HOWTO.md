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

### User suggestions

| method | route | body | response |
| --- | --- | --- | --- |
| POST | gateway:3010/account/suggestion | {email: string} | |

#### User suggestions response

``` json
  [
    {
      "target": string,
      "id": number,
      "name": string,
      "email"?: string,
      "description"?: string,
    }
  ]  
```

__NB__ The target field accepts 3 values: School, Company or User

__NB__ The description, and email fields depends of the node's type. Namelly if the node is an user it contains an email otherwise if the node is a school or a company the node contains a description.



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

## Posts and comments

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

### Comment creation

|method| route | body | response |
| --- | --- | --- | --- |
| POST | gateway:3010/comment| {email: string, id: number, content: string}|

### List post's comment

|method| route | body | response | detail |
| --- | --- | --- | --- |
| POST | gateway:3010/post/comment/list| {id: number}|| List the comments of a post |
| POST | gateway:3010/comment/user | {email: string} || List the comments of an user

#### Post comment response

The list post routes return an array of object that respect the following shcema.

``` json
  [
    {
      "comment": {"id": number, "content": string},
      "user": {"id": number, "email": string},
      "post": {"id": number}
    },
    ...,
  ]
```
