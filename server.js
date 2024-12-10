import express from 'express'
import bodyParser from 'body-parser'
import { router  } from './routes.js';

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.use('/', router);

app.listen(4000, () => {
    console.log(`Server running at localhost:4000`);
})




