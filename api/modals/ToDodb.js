const knex = require('../util/dbConnection')

// Create todo_allTask table
knex.schema.hasTable('task').then((exists) => {
    if (exists) {
        console.log('table is already exists');
    } else {
        knex.schema.createTable('task', table => {
            table.increments('id').primary();
            table.timestamp('task_added_at').defaultTo(knex.fn.now())
            table.string('task').notNullable();
         }).then(() => {
            console.log("task table created successfully....")
         }).catch((err) => {
             console.log(err);
            console.log("task table is already exists!");
        });
    }
}).catch((err) => {
    console.log("Not entered");
})

knex.schema.hasTable('deleted').then((exists) => {
    if(exists) {
        console.log("deleted table is already exist");
    }else{
        knex.schema.createTable('deleted', table => {
            table.increments('id').primary();
            table.timestamp('task_added_at').defaultTo(knex.fn.now())
            table.string('task').notNullable();
         }).then(() => {
            console.log("deleted table created successfully....")
         }).catch((err) => {
             console.log(err);
            console.log("deleted table is already exists!"); 
        })
    }
}).catch((err) => {
    console.log("Not entered");
})
    

knex.schema.hasTable('done').then((exists) => {
    if(exists) {
        console.log("done table is already exist");
    }else{
        knex.schema.createTable('done', table => {
            table.increments('id').primary();
            table.timestamp('task_added_at').defaultTo(knex.fn.now())
            table.string('task').notNullable();
         }).then(() => {
            console.log("done table created successfully....")
         }).catch((err) => {
             console.log(err);
            console.log("done table is already exists!"); 
        })
    }
}).catch((err) => {
    console.log("Not entered");
})
    

module.exports = knex;