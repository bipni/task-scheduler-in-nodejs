const cron = require('node-cron');

var taskid = 1;

/*
*   Schedule a task in an interval of time
*   @params     {String, String} user, interval     --name of the user, interval time
*   @return     {None}
*/

function addTaskByInterval(user, interval) {

    const time = interval.split('-');
    const ara = [];
    let check = false;

    for (let i = 0; i < time.length; i++) {
        if (Number(time[i]) != 0) {
            if (check == false) {
                ara.push('*/' + Number(time[i]));
            }
            else {
                ara.push('' + Number(time[i]));
            }

            check = true;
        }
        else {
            if (check == true) {
                ara.push('0');
            }
            else {
                ara.push('*');
            }
        }
    }

    cron.schedule(`${ara[4]} ${ara[3]} ${ara[2]} ${ara[1]} ${ara[0]} * `, () => {
        console.log(`Task ${taskid} executed for ${user} in Server: ${process.pid}`);
        taskid++;
    })
}

/*
*   Schedule a task for specific time
*   @params     {String, String} user, timetoset     --name of the user, specific time for task
*   @return     {None}
*/

function addTaskByDate(user, timetoset) {

    const time = timetoset.split('-');
    const month = Number(time[1]);
    const date = Number(time[2]);
    const hours = Number(time[3]);
    const minutes = Number(time[4]);

    cron.schedule(`${minutes} ${hours} ${date} ${month} *`, () => {
        console.log(`Task ${taskid} executed for ${user} in Server: ${process.pid}`);
        taskid++;
    })
}

module.exports = { addTaskByInterval, addTaskByDate };

