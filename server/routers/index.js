// const newsRouter = require('./news');
import conversation from './Conversations.js';
import message from './messages.js';

function route(app) {
    app.use('/conversation', conversation);
    app.use('/message', message);
}

export default route;