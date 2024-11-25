const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos desde la raíz
app.use(express.static(path.join(__dirname)));

// Middleware para parsear los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta principal para renderizar el archivo 'index.html' en la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para manejar el formulario de contacto
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'derlizdominguez@gmail.com', // Tu correo
            pass: 'begxwiqqyfmvbloc',         // Contraseña de aplicación de Gmail
        },
    });

    const mailOptions = {
        from: email,
        to: 'derlizdominguez@gmail.com',
        subject: `Nuevo mensaje de ${name}`,
        text: `Tienes un mensaje de ${name} (${email}):\n\n${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.send('Hubo un error al enviar el mensaje.');
        } else {
            console.log('Correo enviado: ' + info.response);
            res.send('<h1>Gracias por contactarnos. Pronto responderemos.</h1>');
        }
    });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
