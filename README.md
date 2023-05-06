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
npm start
```

4. You can now access the data via the REST API. For example:

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
