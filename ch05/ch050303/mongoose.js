let mongoose = require('mongoose');

const option = { useNewUrlParser: true };
mongoose.connect('mongodb://localhost:27017/tasks', option);

let Schema = mongoose.Schema;
let Tasks = new Schema({
    project: String,
    description: String
});
mongoose.model('Task', Tasks);

let Task = mongoose.model('Task');
let task = new Task();
task.project = 'Bikeshed';
task.description = 'Paint the bikeshed red.';
task.save(function (err) {
    if (err) throw err;
    console.log('Task saved.');
});

Task = mongoose.model('Task');
Task.find({'project': 'Bikeshed'}, function (err, tasks) {
    for (let i = 0; i < tasks.length; i++) {
        console.log('ID:' + tasks[i]._id);
        console.log(tasks[i].description);
    }
});
