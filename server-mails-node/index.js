const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3050;
const filePath = './emails.txt';


// Middleware para parsear el cuerpo de la solicitud
app.use(express.json())
app.use(cors({
    origin:'*'
}));

// Ruta para recibir el correo electrónico y guardarlo en un archivo
app.post('/submit', (req, res) => {
    try {
        const email = req.body.mail;
    
        if (!email) {
            return res.status(400).send('No se proporcionó un correo electrónico');
        }
        console.log(email)
    
        fs.appendFile(filePath, email + '\n', (err) => {
            if (err) {
                console.error('Error al guardar el correo electrónico:', err);
                return res.status(500).send('Error interno del servidor');
            }
            console.log('Correo electrónico guardado:', email);
            res.json({
                data:{
                    message:'Correo electrónico guardado con éxito'


                }
            });
        });
        
    } catch (error) {
        console.log(error)
        
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
