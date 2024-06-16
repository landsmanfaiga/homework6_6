const express = require('express');
const participantRoutes = require('./routes/participants');
const billRoutes = require('./routes/bills');
// const routes = require('./routes');
const camelCaseDeep = require('camelcase-object-deep');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//make sure this is before any of the actual routes!!
app.use((req, res, next) => {
    const originalJson = res.json;
    res.json = function(data) {
        originalJson.call(this, camelCaseDeep(data));
    };
    next();
});

app.use('/api/participants', participantRoutes);
app.use('/api/bills', billRoutes);
// app.use('/api', routes);


app.listen(4000, () => console.log('server started'));