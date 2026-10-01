const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// Mensaje de bienvenida en la raíz
app.get('/', (req, res) => {
    res.send('Servidor de Microservicios activo y funcionando en la nube.');
});

// 1. BODY PARAMS (POST)
app.post('/sumar-body', (req, res) => {
    const { dato1, dato2 } = req.body;
    if (dato1 === undefined || dato2 === undefined) {
        return res.status(400).json({ error: 'Faltan datos en el body' });
    }
    const suma = Number(dato1) + Number(dato2);
    return res.json({ resultado: suma, metodo: 'Body Params' });
});

// 2. PATH PARAMS (GET) -> /sumar-path/5/6
app.get('/sumar-path/:dato1/:dato2', (req, res) => {
    const { dato1, dato2 } = req.params;
    const suma = Number(dato1) + Number(dato2);
    return res.json({ resultado: suma, metodo: 'Path Params' });
});

// 3. QUERY PARAMS (GET) -> /sumar-query?dato1=5&dato2=6
app.get('/sumar-query', (req, res) => {
    const { dato1, dato2 } = req.query;
    if (dato1 === undefined || dato2 === undefined) {
        return res.status(400).json({ error: 'Faltan datos en la query' });
    }
    const suma = Number(dato1) + Number(dato2);
    return res.json({ resultado: suma, metodo: 'Query Params' });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
    console.log(`Microservicio corriendo en el puerto ${PORT}`);
});
