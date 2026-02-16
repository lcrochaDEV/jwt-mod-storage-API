import express from 'express';
import cors from 'cors';
import connectDataBase from './src/roteamento/rotas.js';


const HOST = process.env.SERVER_IP || "localhost"; 
const PORT = process.env.SERVER_PORT || 3000;

// App
const app = express();
app.use(express.json());

// Cors
app.use(cors({ origin: '*' }));

app.get('/', (req,  res) => res.send({"mensagem": "Rota test API"}));

app.use("/home", connectDataBase);
app.use("/mencached", connectDataBase);


app.listen(PORT, HOST, () => console.log(`Servidor executando na URL http://${HOST}:${PORT}`));