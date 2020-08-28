var knex = require('knex')({
    client: 'mysql2',
    connection: {
        host: 'localhost',
        user: 'root',
        password: 'abhishek',
        database: 'todo_task'
    },
    pool: { min: 0, max: 7 }
})

module.exports = knex;