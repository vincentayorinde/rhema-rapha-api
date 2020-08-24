
require('dotenv/config');


const database = {
  development: "RhemaRaphaDb_Dev",
  production: 'postgres://oekccyrnxirqoc:7a6371bb950c828698ebe19bb939b1ff21d928ce264aeb1d226628faa597460f@ec2-52-71-231-180.compute-1.amazonaws.com:5432/dabl3kqo68sg4s',
  test: 'test-db'
}


module.exports = {
   "port": process.env.port || 3000,
  "entities": ["dist/**/*.entity{.ts,.js}"],
    "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "keepConnectionAlive": true,
  "autoLoadEntities": true,
  "username": "postgres",
  "password": "postgres",
  "database": database[process.env.NODE_ENV],
}

