# Game DB

Database for the game with players, clans and categories of players and clans. This project was developed with nodeJS and mongoDB.

## Collection design

1. Players:
  - **_id**: string
  - **gamerTag**: string
  - **points**: number
  - **category**: ID PlayerCategory 
  - **clan**: ID Clan or Clan

2. Clan:
  - **_id**: string
  - **name**: string
  - **description**: string
  - **points**: number
  - **clanCategory**: ID ClanCategory 

3. PlayerCategory:
  - **_id**: string
  - **name**: string
  - **minPoints**: number
  - **maxPoints**: number

4. ClanCategory:
  - **_id**: string
  - **name**: string
  - **minPoints**: number
  - **maxPoints**: number

## TODO

### [x] Methods GET basics

### [x] Retrieve all objects by id or name

### [x] Retrieve clans along with the gamertags of the main players  
-> `/clan`

#### Output
```json
[
  {
    "_id": "id clan",
    "name": "name clan",
    "description": "clan description",
    "points": 123,
    "clanCategory": {
      "_id": "id category",
      "name": "name category",
      "maxPoints": 123,
      "minPoints": 123,
    },
    "players": [
      {
        "_id": "id player",
        "gamertag": "pepitoGamer17",
        "points": 1213,
        "playerCategory": {
          "_id": "id category",
          "name": "name category",
          "maxPoints": 123,
          "minPoints": 123,
        }
      }
      // 5 players with the maximum score allowed
    ]
  }
]
```

### [x] Retrieve categories players along with the gamertags of the main players
-> `/category-player`

#### Output
```json
[
  {
    "_id": "id category",
    "name": "name category",
    "maxPoints": 123,
    "minPoints": 123,
    "players": [
      {
        "_id": "id player",
        "gamertag": "pepitoGamer17",
        "points": 1213,
        "clan": {
          "_id": "id clan",
          "name": "name clan",
          "description": "clan description",

          "points": 123
        }
      }
      // 5 players with the maximum score allowed
    ]
  }
]
```

### [x] Retrieve categories clans along with the gamertags of the main clans
-> `/category-clan`

#### Output
```json
[
  {
    "_id": "id category",
    "name": "name category",
    "maxPoints": 123,
    "minPoints": 123,
    "clans": [
      {
        "_id": "id clan",
        "name": "name clan",
        "description": "clan description",
        "points": 1213,
        "players": [
          {
            "_id": "id player",
            "gamertag": "pepitoGamer17",
            "points": 1213,
            "playerCategory": {
              "_id": "id category",
              "name": "name category",
              "maxPoints": 123,
              "minPoints": 123,
            }
          }
          // 5 players with the maximum score allowed
        ]
      }
      // 5 clans with the maximum score allowed
    ]
  }
]
```

### [x] POST 

### [x] PUT 

### [x] DELETE 

### [x] Filter player by category
-> `/player/filter?category=idCategory`

### [x] Filter player by clan
-> `/player/filter?clan=idClan`

### [x] Password encryption

### [X] JSON web tokens at Player