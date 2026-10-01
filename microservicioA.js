const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

// URL base del Microservicio B (para despliegue en nube o local)
const MICROSERVICIO_B_URL = process.env.URL_MICROSERVICIO_B || 'http://localhost:3002';

// 1. BODY PARAMS
app.post('/sumar-body', async (req, res) => {
    try {
        const { dato1, dato2 } = req.body;
        const respuesta = await fetch(`${MICROSERVICIO_B_URL}/sumar-body`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dato1, dato2 })
        });
        const data = await respuesta.json();
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Error comunicando con Microservicio B' });
    }
});

// 2. PATH PARAMS
app.get('/sumar-path/:dato1/:dato2', async (req, res) => {
    try {
        const { dato1, dato2 } = req.params;
        const respuesta = await fetch(`${MICROSERVICIO_B_URL}/sumar-path/${dato1}/${dato2}`);
        const data = await respuesta.json();
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Error comunicando con Microservicio B' });
    }
});

// 3. QUERY PARAMS
app.get('/sumar-query', async (req, res) => {
    try {
        const { dato1, dato2 } = req.query;
        const respuesta = await fetch(`${MICROSERVICIO_B_URL}/sumar-query?dato1=${dato1}&dato2=${dato2}`);
        const data = await respuesta.json();
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Error comunicando con Microservicio B' });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Microservicio A corriendo en el puerto ${PORT}`);
});