module.exports = {
  "development": {
    "username": process.env['ARCHERFALL_DB_USER'] || "root",
    "password": process.env['ARCHERFALL_DB_PASS'] || null,
    "database": "archerfall_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": process.env['ARCHERFALL_DB_USER'],
    "password": process.env['ARCHERFALL_DB_PASS'],
    "database": "archerfall_production",
    "host": process.env['ARCHERFALL_DB_HOST'],
    "dialect": "mysql",
    "logging": false
  }
}
