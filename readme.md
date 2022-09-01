# Node Mid : Pointage
Gestion du pointage des employés de l'école ABC

# Installation
```
  docker-compose up
```

# Test
```
docker-compose run app npm run test
```

# Conception de la base de données
La base de données utilisée : sqlite
Les tables existantes : **employees** et **employeeChecks**

**employees** :
- id : integer
- name : string
- firstName : string
- department : string
- dateCreated : date

**employeeChecks** :
- id : integer
- idEmployee : integer (FK id employee)
- checkIn : date
- checkOut : date
- comment : string
- checkDifference : integer (Différence en minutres entre le checkOut et le checkIn)

# Structure du projet
- Les fichiers tests se trouvent dans le dossier **\__tests__** et les fixtures nécessaires dans le dossier **fixtures**
- Dans le dossier **src** se trouve les models, les controllers, les routes et les services