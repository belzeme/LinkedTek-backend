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

### User personal data edition

| method | route | body | response |
| --- | --- | --- | --- |
| POST | gateway:3010/account/profile | {email: string} | UserProfile
| PATCH | gateway:3010/account/profile | {email: string, properties: {[{label: string, value: string}, ...]}}| |
| PATCH | gateway:3010/account/profile/job | {email: string, company: string, title: string} | |
| PATCH | gateway:3010/account/profile/country | {email: string, conutry: string} ||

#### User edition patch content

For now the possible properties for an user edition are: name, and age.

``` json
  {
  "email": "test@email.com",
  "properties": [
    {"label": "name", "value": "foo"},
    {"label": "age", "value": 42}
  ]
}
```

#### User fetch profile response

``` json
{
    "id": 757,
    "name": "tati",
    "email": "test@email.com",
    "age": 15,
    "country": {
        "id": 578,
        "name": "France"
    },
    "company": {
        "id": 77,
        "name": "acme",
        "description": "Will E Coyotte Doom"
    },
    "job": {
        "since": "2019-06-01T14:02:53.437Z",
        "title": "loler"
    }
}
```

### User job history

| method | route | body | response |
| --- | --- | --- | --- |
|POST| gateway:3010/account/profile/history/job/list | {email: string} | User Job History response |
| POST | gateway:3010/account/profile/history/job/ | User Job History creation |

#### User Job history response

``` json
  [
    {
        "job": {
            "title": "procoder",
            "from": "2019-05-01T00:00:00.000Z",
            "to": "2019-07-01T00:00:00.000Z"
        },
        "company": {
            "id": 77,
            "name": "acme",
            "description": "Will E Coyotte Doom"
        }
    },
    {
        "job": {
            "title": "terraformer",
            "from": "2019-02-01T00:00:00.000Z",
            "to": "2019-04-01T00:00:00.000Z"
        },
        "company": {
            "id": 78,
            "name": "ficsit",
            "description": "construt, automate, explore and exploit"
        }
    },
    {
        "job": {
            "title": "rockstar",
            "from": "2019-01-01T00:00:00.000Z",
            "to": "2019-02-01T00:00:00.000Z"
        },
        "company": {
            "id": 77,
            "name": "acme",
            "description": "Will E Coyotte Doom"
        }
    }
]
```

#### User Job History creation

``` json
{
  "email": "test@email.com",
  "company": "acme",
  "job": {
    "from": "2019-05-01",
    "to": "2019-07-01",
    "title": "procoder"
  }
}
```

### User study history

|POST| gateway:3010/account/profile/history/study/list | {email: string} | User study History response |
| POST | gateway:3010/account/profile/history/study/ | User study History creation |

#### User study history response

``` json
[
    {
        "study": {
            "title": "x2 cursus bitches",
            "from": "2019-01-01T00:00:00.000Z",
            "to": "2023-01-01T00:00:00.000Z"
        },
        "school": {
            "id": 57,
            "name": "epitech",
            "description": "procoder"
        }
    },
    {
        "study": {
            "title": "from zero to 1",
            "from": "2019-01-01T00:00:00.000Z",
            "to": "2022-01-01T00:00:00.000Z"
        },
        "school": {
            "id": 57,
            "name": "epitech",
            "description": "procoder"
        }
    },
    {
        "study": {
            "title": "ennemy conversion",
            "from": "2014-01-01T00:00:00.000Z",
            "to": "2019-01-01T00:00:00.000Z"
        },
        "school": {
            "id": 91,
            "name": "Wololo",
            "description": "From Red to Blue"
        }
    }
]
```

#### User study history creation

```json
{
  "email": "test@email.com",
  "school": "epitech",
  "study": {
    "from": "2019-01-01",
    "to": "2023-01-01",
    "title": "x2 cursus bitches"
  }
}

```

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
| POST | gateway:3010/post/list| {email: string || id: number}| [{id: number, title: string, content: string}, ...]

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
| --- | --- | --- | --- | --- |
| POST | gateway:3010/post/comment/list| {id: number}|| List the comments of a post |
| POST | gateway:3010/comment/user | {email: string} || List the comments of an user

#### Post comment response

The list post routes return an array of object that respect the following shcema.

``` json
  [
    {
      "comment": {"id": number, "content": string},
      "user": {"id": number, "email": string, "name": string},
      "post": {"id": number},
      "owner": {"id": number, "email": string, "name": string}
    },
    ...,
  ]
```

### Comment update and deletion

|method| route | body | response | detail |
| --- | --- | --- | --- | --- |
| DELETE | gateway:3010/comment| {id: number}||  |
| PATCH | gateway:3010/comment | {id: number, properties: {[{label: string, value: string}, ...]}} | [{name: string, description: string}]

### Actuality feed

|method| route | body | response | detail |
| --- | --- | --- | --- | --- |
| POST | gateway:3010/account/feed| {email: string}|| Get the actuality feed. |

#### Actuality feed response

The list post routes return an array of object that respect the following shcema.

``` json
  [
    {
      "data": {"id": number, "content": string, "target": string, "title"?: string, "creation_time": string},
      "user": {"id": number, "email": string, "name": string},
      "post": {"id": number}
    },
    ...,
  ]
```

### Messages

|method| route | body | response | detail |
| --- | --- | --- | --- | --- |
| POST | gateway:3010/account/message | {sender: string, receiver: string, title: string, content: string}|| Creates a message. |
| POST | gateway:3010/account/inbox | {email: string}|| List the received messages. |
| POST | gateway:3010/account/outbox | {email: string}|| List the send messages. |

### Messages response

``` json
  [
    {
      "content": string,
      "creation_time": string,
      "id": number,
      "title": string,
      "sender" || "receiver": object,
    }
  ]
```
