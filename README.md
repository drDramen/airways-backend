# airways-backend

1. Clone repository:

```
git clone https://github.com/JiriSimonov/airways-backend.git
```

2. Install Dependencies 
```
npm i
```

3. Run JSON Server with the command:

```
npm run start-auth
```

4. You can now access the data via the REST API.  
> JSON Server is running on http://localhost:3000  
 
### For example:

**Registration:**

```
POST http://localhost:3000/auth/registration
Request body and Response: 
{
    "email": "chipkmchip@gmail.com",
    "password": 1111,
    "firstName": "Drob",
    "lastName": "Palchyn",
    "dateOfBirth": "4/5/1985, 12:00:00 AM",
    "gender": "male",
    "countryCode": "+3",
    "phone": "3056785",
    "citizenship": "Ukraine"
}
```

**Login:**

```
POST http://localhost:3000/auth/login
Request body: 
{
    "email": "chipkmchip@gmail.com",
    "password": 1111,
}

Response:
{
  "token": "XXXXXXXXXXXXX.XXXXXXXXXXXXXXXXXXXXX.XXXXXXXXX"
  "user": {
    "email": "chipkmchip@gmail.com",
    "password": 1111,
    "firstName": "Drob",
    "lastName": "Palchyn",
    "dateOfBirth": "4/5/1985, 12:00:00 AM",
    "gender": "male",
    "countryCode": "+3",
    "phone": "3056785",
    "citizenship": "Ukraine"
  }
}
```
---

**Get list of all airports:**

```
GET http://localhost:3000/airports
```

**Get list of all flights:**

```
GET http://localhost:3000/flights
```

**Get flight list from London:**

```
GET http://localhost:3000/flights?from.city=London
```

**Get flight list from London to Paris between May 1 and May 7, 2023:**

```
GET http://localhost:3000/flights?from.city=London&to.city=Paris&takeoffDate_gte=2023-05-01&takeoffDate_lte=2023-05-07
```
