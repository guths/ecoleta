import express from 'express';

const app = express();

app.get('/users', (req,res)=>{
    console.log('Listando os usuários');
})

app.listen(3333);