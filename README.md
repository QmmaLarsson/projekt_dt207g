# Projektuppgift i kursen DT207G, Backend-baserad webbutveckling

Detta är en webbtjänst i form av ett API som är skapat för en restaurang. Det hanterar säkerhet och autentisering genom registreing av användare, inloggning och användning av JWT för sessionshantering. APIet används också för att hantera och lagra restaurangens meny, det använder sig av CRUD-operationer, det vill säga CREATE, READ, UPDATE och DELETE. Projektet är skapad med hjälp av NodeJs, Express, Mongoose och NoSQL-databasen MongoDB Atlas.

### Installation av databas

APIet är kopplat till en MongoDB Atlas-databas. För att komma igång, börja med att klona ned källkodsfilerna. Kör sedan kommandot "npm install" för att installera de nödvändiga npm-paketen. Slutligen, kör skriptet "index.js".

### Länk till API

https://projektdt207g.onrender.com/api

### Användning av API

Nedan finns en beskriving av hur man på olika sätt kan nå APIet:

| Metod | Ändpunkt | Beskrivning |
|---|---|---|
| POST | /register | Lägger till en ny användare. Exempel på JSON-data: { "username": "user", "password": "password" }. |
| POST | /login | Loggar in en användare. Exempel på JSON-data: { "username": "user", "password": "password" }. |
| GET | /menu | Hämtar items från menyn. Exempel på JSON-data: { "name": "Fanta", "type": "Dricka", "description": "Iskall apelsinläsk", "price": 20 }. |
| POST | /menu | Lägger till ett item på menyn. Detta är en skyddad route och kräver ett JWT-token för att kunna nås. Exempel på JSON-data: { "name": "Fanta", "type": "Dricka", "description": "Iskall apelsinläsk", "price": 20 }. |
| DELETE | /menu/id | Tar bort ett item från menyn. Detta är en skyddad route och kräver ett JWT-token för att kunna nås. |
| PUT | /menu/id | Uppdaterar ett item på menyn. Detta är en skyddad route och kräver ett JWT-token för att kunna nås. |