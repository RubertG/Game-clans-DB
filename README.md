# Game DB

Database for the game with players, clans and categories of players and clans. This project was developed with nodeJS and mongoDB.

## Collection design

1. Players:
  - **_id**: string
  - **gamerTag**: string
  - **points**: number
  - **category**: ID PlayerCategory or PlayerCategory
  - **clan**: ID Clan or Clan

2. Clan:
  - **_id**: string
  - **name**: string
  - **description**: string
  - **points**: number
  - **clanCategory**: ID ClanCategory or ClanCategory

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
    "players": [
      {
        "_id": "id player",
        "gamertag": "pepitoGamer17",
        "points": 1213,
        "idCategory": "id Category or object"
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
    "description": "category description",
    "players": [
      {
        "_id": "id player",
        "gamertag": "pepitoGamer17",
        "points": 1213,
        "idClan": "id clan"
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
    "description": "category description",
    "clans": [
      {
        "_id": "id category",
        "name": "name category",
        "description": "category description",
        "points": 1213,
        "players": [
          {
            "_id": "id player",
            "gamertag": "pepitoGamer17",
            "points": 1213,
            "idClan": "id clan"
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

### [ ] Filter player by category
-> `/player?category=nameCategory`

### [ ] Filter player by clan
-> `/player?clan=nameClan`