// const newsRouter = require('./news');
import conversation from './Conversations.js';
import message from './messages.js';
import user from './Users.js';

function route(app) {
    app.use('/conversation', conversation);
    app.use('/message', message);
    app.use('/account', user);
}

export default route;