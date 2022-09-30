const express = require('express');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const os = require('os');

const db = require('./database');
const task = require('./schedule');


db.connectDatabase();

const app = express();
const cpus = os.cpus().length   // to know the number of CPUs to run worker servers in multiple core

app.use(bodyParser.json());

if(cluster.isMaster) {
    for (let i = 0; i < cpus; i++) {
        cluster.fork();                 // fork the worker server in different cores
    }

    // if any worker stopped, then create a new one
    cluster.on('exit', (worker) => {
        console.log(`Server ${worker.process.pid} is stopped working!!!`);
        cluster.fork();
    });
}
else {
    app.listen(3001, function() {
        console.log(`Server ${process.pid} started at localhost:3001`);
    });
}


// default

app.get('/', (req, res) => {
    res.send(`Server ID ${process.pid}`);
});


// api for scheduling a task in an interval of time

app.post('/interval', (req, res) => {
    db.insert(req.body);
    
    let user = req.body.user;
    let interval = req.body.interval;

    task.addTaskByInterval(user, interval);

    res.send(`Server ID ${process.pid}`);
});


// api for scheduling a task for specific time

app.post('/timetoset', (req, res) => {
    db.insert(req.body);
    
    let user = req.body.user;
    let timetoset = req.body.timetoset;

    task.addTaskByDate(user, timetoset);

    res.send(`Server ID ${process.pid}`);
});