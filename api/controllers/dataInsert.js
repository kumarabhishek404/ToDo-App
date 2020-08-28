// var swal = require('bootstrap-sweetalert')

module.exports = (Insert, knex) => {



    Insert.post('/', function (req, res, next) {
        let taskData = req.body

        // taskData = JSON.stringify(taskData)
        // Method 1 
        // var chars = { '{':'', '}':''};
        // taskData = taskData.replace(/[{}]/g, m => chars[m])

        // Method 2
        // taskData = taskData.replace(/{/g, '').replace(/}/g,'')

        // taskData = taskData.split(',')
        console.log((Object.values(taskData).toString()).length, "1");
        if ((Object.values(taskData).toString()).length > 5) {
            console.log(typeof taskData, "2")
            // Inserting data into table
            knex('task').insert(taskData)
                .then((data) => {
                    console.log(taskData, "4")
                    console.log("Data insert Successfully")
                    knex.select('*').from('task').orderBy('id', 'desc').then((data) => {
                        obj = { result: data }
                        res.send(data)
                    }).catch((err) => {
                        console.log(err.massage);
                    })
                }).catch((err) => {
                    console.log(err);
                    console.log("Data insert failed");
                })
        } else {
            console.log("Data not submitted")
            swal("Here's a message!")
        }
    });

    Insert.get('/getdata', (req, res) => {
        knex.select('*').from('task').orderBy('id', 'desc')
            .then((result) => { res.send(result) })
    })

    Insert.delete('/delete', (req, res) => {
        console.log(req.body.id, "AAya");
        knex('task').select('task').where('id', req.body.id)
            .then((rows) => knex('deleted').insert(rows))
            .then(() => knex('task').select('task').where('id', req.body.id).del())
            .then(() => {
                // console.log("Moved");
                res.send({
                    data: true
                })
            }).catch((err) => {
                console.log(err);
                console.log("Failed");
            })
    })

    Insert.put('/update', (req, res) => {
        console.log(req.body, "Editing");
        knex('task').where({ id: req.body.id }).update({ task: req.body.name })
            .then(() => {
                console.log("Edited");
            })
    })

    Insert.get('/getDeletedData', (req, res) => {
        console.log(req.body, "Deleted Data");
        knex.select('*').from('deleted').orderBy('id', 'desc')
            .then((result) => { res.send(result) })
    })
}