const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/Escents')
.then((x) => {
    console.log(`Successfully connected to "${x.connections[0].name}" Database in MongoDB`);
})
.catch((err) => {
    console.error(`Error connecting to MongoDB`, err);
});

module.exports = mongoose;