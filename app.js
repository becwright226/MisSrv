require('dotenv').config();

const Express = require('express');
const app = Express();
const dbConnection = require('./db');

app.use(Express.json());

const controllers = require('./controllers');
app.use(require('./middleware/headers'))
//


app.use('/user', controllers.userController);
app.use('/post', controllers.postController);
app.use('/order', controllers.orderController);
app.use('/recipe', controllers.recipeController);
app.use('/schedule', controllers.schedController);
app.use('/comment', controllers.commentController);
app.use('/log', controllers.logController);
app.use('/diary', controllers.diaryController)

dbConnection.authenticate()
.then(async () => await dbConnection.sync(/*{force: true}*/)) // force: true will drop all tables in pgAdmin and resync them. This is necessary after you make a change to a model, and need to sync any new table headers to the database.
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`[Server]: App is listening on ${process.env.PORT}`);

    });
})

.catch((err) => {
    console.log(`[server]: Server crashed. Error = ${err}`);
});

