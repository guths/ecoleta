import express from 'express';
import routes from './routes'
import cors from 'cors';
import path from 'path';

const app = express();

app.use(cors());
app.use(express.json()); //0 express não consegue ler json nativamente, se enviar um objeto json como post vai dar erro, sendo assim essa função é necessária
app.use(routes);
app.use('/uploads',express.static(path.resolve(__dirname,'..','uploads')))

app.listen(3333);   