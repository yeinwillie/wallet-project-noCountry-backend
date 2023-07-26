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

    
  } ;

   // Enviar correo de con clave temporal

async function sendrecoveryPasswordEmail(existingUser, recovPassword) {
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
      to: existingUser.email,  
      subject: "Recuperacion de contraseña Pocketpal",
      html: `<a href="https://ibb.co/hgMML36"><img src="https://i.ibb.co/6yZZrjM/Imagen-Email.png" alt="Imagen-Email" border="0"></a>,
      <p>Hola ${existingUser.firstName},        
      </p><p>Tu nueva contraseña es:${recovPassword}</p>,
      </p><p>Utiliza esta contraseña para ingresar al sitio <a href="https://pocket-pal.web.app/login">aquí</a>.</p>,
      </p><p>¡Muchas Gracias! </p>`, 
      
    };
  console.log("Enviando correo de recuperacion de contraseña..."); // para debuguear
 // console.log(registerToken+"a");

 result = await transporter.sendMail(mailOptions);  
  
} 
 

  
 module.exports = {
    sendVerificationEmail,
    sendrecoveryPasswordEmail
  }