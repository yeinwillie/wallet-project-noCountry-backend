const nodemailer = require('nodemailer');
require("dotenv").config();
const { google } = require('googleapis');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);

oAuth2client.setCredentials({ refresh_token: REFRESH_TOKEN });


 // Enviar correo de verificación
async function sendVerificationEmail(user, registerToken) {
    const accessToken = await oAuth2client.getAccessToken();

     const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "pocketpal.nocountry@gmail.com", // Reemplaza con tu dirección de Gmail
        clientId: CLIENT_ID, 
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });  
    
    const mailOptions = {
        from: "pocketpal.nocountry@gmail.com", // Reemplaza con tu dirección de Gmail
        to: user.email,  
        subject: "Verifica tu correo electrónico",
        html: `
        <a href="https://ibb.co/hgMML36"><img src="https://i.ibb.co/6yZZrjM/Imagen-Email.png" alt="Imagen-Email" border="0"></a>,
        <p>Hola ${user.firstName},        
        </p><p>Por favor, haz clic en el siguiente enlace para verificar tu correo electrónico:</p>
        <p><a href="https://wallet-project-nocountry-backend-production-y.up.railway.app/api/users/confirm/${registerToken}">Verificar Correo</a></p>`, 
        
      };
    console.log("Enviando correo de verificación..."); // para debuguear
    console.log(registerToken);

   result = await transporter.sendMail(mailOptions);  

    
  } 
  

  /*const getTemplate = (firstName, token) => {
      return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <img src="../public/ImagenEmail.png" alt="">
            <h2>Hola ${ firstName }</h2>
            <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
            <a
                href="https://wallet-project-nocountry-backend-production-y.up.railway.app/api/users/confirm/${ token }"
                target="_blank"
            >Confirmar Cuenta</a>
        </div>
      `;
  }*/

  module.exports = {
    sendVerificationEmail,
    /*getTemplate*/
  }