const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const routes = require('./routes');
const { authMiddleware } = require('./middlewares/authMiddlewares');

const configExpress = require('./config/configExpress');
const configHandlebars = require('./config/configHandlebars');

const PORT = 3000;

const app = express();


configExpress(app);

app.use(cookieParser());
app.use(authMiddleware);

configHandlebars(app);



app.use(routes);
// Change scaffold for DB name depending on project name
mongoose.connect(`mongodb://127.0.0.1:27017/second-hand-electronics`)
    .then(() => {
        console.log('DB Connected');

        app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
    })
    .catch(err => console.log('Cannot connect to DB'));