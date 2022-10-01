# Task Scheduler in Node JS

## How to Run
```
cd backend
npm run server
```

## Tools
* Node JS
* Mongo DB
* Node Packages
    * Body Parser
    * Express
    * Mongo DB
    * Node Cron
    * Cluster
    * OS

## API
In my project, there are 2 APIs defined.

```
http://localhost:3001/interval
http://localhost:3001/timetoset
```

### Interval
This API accepts a JSON object which schedules the task for a user in an interval of time.

The request prototype is:
```
POST http://localhost:3001/interval

{
	"user": "user 1",
	"interval": "00-00-00-01-05" //mm-dd-hh-mm
}
```

### Specific Time
This API accepts a JSON object which schedules the task for a user at a particular time.

The request prototype is:
```
POST http://localhost:3001/timetoset

{
	"user": "user 1",
	"timetoset": "2022-10-01-01-06-00" //yyyy-mm-dd-hh-mm-ss
}
```

## Architecture and Explanation
This project consists of 3 parts.

* Server
* Scheduler
* Database

### Server
I have used the Node JS Cluster module to create a master server and several worker servers. The number of worker servers depends on the number of CPU cores.

* Master
    * Worker 1
    * Worker 2
    * .
    * .
    * Worker n

The Master process listening on a port (i.e. 3001) and takes the request, and then distributes the request across the worker for further processing. If one worker is down due to overload or something else, the master server creates a new worker. So that the server will always be up and can take the request. 

### Database
I have used Mongo DB as database. The request is stored in the database to use later if there are some other actions to be completed.

```
DB Connection String: mongodb://localhost:27017
DB Name: assignment
Collection Name: tasks
```

### Scheduler
This task has been done by Node Cron. A scheduler module for Node JS. It has two functions.

    addTaskByInterval(user, interval)
    addTaskByDate(user, timetoset)

The scheduler is called by the server.