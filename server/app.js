const express = require('express');
const reviews = require('./routes/gamereviews');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const path = require('path');

const PORT = 1337;

const app = express();

app.use(cors());

app.use('/api', reviews);

const staticMiddleware = express.static(path.join(__dirname, 'dist'));

app.use(staticMiddleware);
app.use(history());
app.use(staticMiddleware);

app.listen(PORT, () => {
    console.log(`Started listening on port ${PORT}`);
});