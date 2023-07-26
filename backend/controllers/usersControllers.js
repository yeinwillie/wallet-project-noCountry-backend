const Users = require("../models/user.model");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {generarCbuCompleto} = require("../utils/cbuUtils.js");
const { v4: uuidv4 } = require('uuid');
const { sendVerificationEmail , sendrecoveryPasswordEmail } = require('../utils/mail.config.js');
const { generateRandomPassword } = require('../utils/randomPassword.js');

//Obtener todos los usuario
const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.send(users);
  } catch (error) {
    res.status(404).send(error);
  }
};

//Obtener usuario por ID
const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await Users.findById(id);
    res.send(user);
  } catch (error) {
    res.status(404).send(error);
  }
};

//Crear Usuario
const createUser = async (req, res) => {
  // Verificando si el usuario existe
  const email = req.body.email;
  const existingUser = await Users.findOne({ email });
  if (existingUser) {
    return res
      .status(400) 
      .json({
        message: "Ya existe un usuario con el mismo correo electrónico",
      });
  }

  // Generar el código para validar email
  const code = uuidv4();

  const salt = bcrypt.genSaltSync(10); //cantidad de saltos que da para encriptar, entre mas vuelta da es mas segura.
  const passwordHash = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passwordHash,
      isActivated: req.body.isActivated || false,
      code: code,
      emailstatus: "UNVERIFIED",
    };   

    /*// Obtener un template
      const template = getTemplate(newUser.firstName, accessToken);*/

    // se guarda el usuario
      const user = await Users.create(newUser);

    // genera el token
    const registerToken = jwt.sign({ id: newUser.email, code: newUser.code }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_REGISTER,
    });

    // Enviar el email
      await sendVerificationEmail(user, registerToken);
      
    //Enviar una respuesta al cliente
    res
      .status(200)
      .json({
        mensaje: "Usuario creado con exito",
        usuario: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          //code: user.code,
        },
        registerToken,
      }); 
  } catch (error) {
    res.status(404).send(error);
  }
};

// Confirmacion de correo electronico valido

const emailConfirm = async (req, res) => {
  try { 
    // Obtener el token
    const  registerToken  = req.params.registertoken;
    console.log(registerToken+"b")

    // Verificar la data
    const data = jwt.verify(registerToken, process.env.SECRET_KEY);

    const { id, code } = data;

    // Verificar existencia del usuario
    const user = await Users.findOne({ email: id });

    if (!user) {
      return res.json({
        success: false,
        msg: 'Usuario no existe',
      });
    } 

    // Verificar el código
    if (code !== user.code) {
      return res.redirect('/error.html');
    }

    // Actualizar usuario
    user.emailstatus = "VERIFIED";
    await user.save();

    // Redireccionar a la confirmación
    return res.redirect('/confirm.html');
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      msg: 'Error al confirmar usuario',
    });
  }
};

//Modificar usuario
const editUser = async (req, res) => {   
  const email = req.body.email;
  const user = await Users.findOne({ email: email });

  // Si el usuario no esta registrado
  if (!user) {
    return res.status(404).send({ mensaje: "Usuario no encontrado" });
  };

   // Verificando si el dni del usuario existe
   const dni = req.body.dni;
   const existingDni = await Users.findOne({ dni });
   if (existingDni) {
     return res
       .status(400) 
       .json({
         message: "Ya existe un usuario con el mismo Dni",
       });
   }

  const checkBalance = user.balance;
  let finalCbu = user.cbu;
  let giftBalance;
  // Verificar si el CBU existe para no editarlo
  if (!finalCbu) {
    finalCbu = await generarCbuCompleto();
  }  
  // Verificar si el saldo esta en 0 para entregar regalo de activaciono o recargarle el saldo para que siga operando
  if (!checkBalance || checkBalance === 0 ) { // si activa por primera vez o el saldo le llega a cero se le regala 10000
    giftBalance =  12000;
  }   
  
  // verificar edad 

  const dateOfBirth = new Date(req.body.dateOfBirth);
  const currentDate = new Date();
  const userAge = currentDate.getFullYear() - dateOfBirth.getFullYear();

  // Si el usuario es menos de 18 años no se puede registrar
  if (userAge < 18) {
    return res.status(400).send({ mensaje: "Debes ser mayor de 18 años para registrarte." });
  }

  const userEdited = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dateOfBirth: req.body.dateOfBirth,
    dni: req.body.dni,
    nacionality: req.body.nacionality,
    address: {
      street: req.body.address.street,
      number: req.body.address.number,
      zipcode: req.body.address.zipcode,
    },
    isActivated: true,
    cbu: finalCbu,
    balance: giftBalance || user.balance,
  };
 
  try {
    // Buscar al usuario por su correo electrónico y actualizar los datos
    const user = await Users.findOneAndUpdate({ email: email }, userEdited);
    
   
    res.status(200).send({ mensaje: "Usuario modificado con éxito", userEdited });
  } catch (error) {
    
    res.status(500).send({ mensaje: "Error al actualizar el usuario" });
  }
};

//Eliminar usuario
const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await Users.findByIdAndDelete(id);
    res
      .status(200)
      .send({ mensaje: "Usuario eliminado con éxito", user: user });
  } catch (error) {
    res.status(404).send(error);
  }
};

//Login usuario

const loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const userFind = await Users.findOne({ email });
    if (userFind) {
      const passwordEnterByUser = req.body.password;
      const passwordStoredInDB = userFind.password;
      const passwordMatch = bcrypt.compareSync(
        passwordEnterByUser,
        passwordStoredInDB
      );
      if (passwordMatch) {
        const payload = {
          email: userFind.email,
          firstName: userFind.firstName,
          lastName: userFind.lastName,
          isActivated: userFind.isActivated,
          emailstatus: userFind.emailstatus,
          cbu: userFind.cbu,
          balance: userFind.balance,
          dateOfBirth: userFind.dateOfBirth,
          nacionality: userFind.nacionality,
          address: userFind.address,
          dni: userFind.dni,
        };
        const accessToken = jwt.sign(
          { id: userFind.email },
          process.env.SECRET_KEY,
          {
            expiresIn: process.env.JWT_EXPIRE_LOGIN,
          }
        );
        // Enviar una respuesta al cliente
        res
          .status(200)
          .json({
            mensaje: "Usuario logueado con éxito",
            ...payload,
            accessToken,
          });
      } else {
        res.status(400).send({ mensaje: "Email y/o Contraseña incorrectos " });
      }
    }
  } catch (error) {
    res.send(error);
  }
};

//Reset password

const resetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;    

    let userFind = await Users.findOne({ email });

    if (!userFind) {
      return res.status(400).send({ mensaje: "Usuario no encontrado" });
    }
   
    const passwordEnterByUser = req.body.password;
    const passwordStoredInDB = userFind.password;
    const passwordMatch = bcrypt.compareSync(
        passwordEnterByUser,
        passwordStoredInDB
      )

    if (!passwordMatch) {
      return res.status(400).send({ mensaje: "Contraseña actual incorrecta" });
    }
      
    if (userFind && passwordMatch) {
      const newPassword = req.body.newPassword;
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(newPassword, salt);
      userFind.password = passwordHash;
      userFind.save();
      res.status(200).send({ mensaje: "Contraseña cambiada con exito" });
    } else {
      res.status(400).send({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error en la función resetPassword:", error);
    res.status(500).send({ mensaje: "Error interno del servidor" });
  }
};
//recovery password 

const recoverypassword = async (req,res) => {
  try {

    // Verificando si el usuario existe

    const email = req.body.email;
    const existingUser = await Users.findOne({email});
    if (!existingUser) {
      res.status(400).send({message:"Verifica tu correo electronico",});
    }

    console.log(existingUser);
    // Creando nueva clave para el usuario (6 numero, 1 mayuscula y 1minuscula)

    const recovPassword = generateRandomPassword();

    console.log(recovPassword);
    // Hasheando la clave creada
    
    const salt = bcrypt.genSaltSync(10); //cantidad de saltos que da para encriptar, entre mas vuelta da es mas segura.
    const recovPasswordHash = bcrypt.hashSync(recovPassword, salt);
    
    console.log(recovPasswordHash);
    // Guardando la nueva clave en la base de datos

    existingUser.password = recovPasswordHash;
    existingUser.save();

    

    // enviar la clave por correo
    await sendrecoveryPasswordEmail(existingUser, recovPassword);

    // Se envia la respuesta positiva

    res.status(200).send({ mensaje: "Nueva contraseña enviada al correo del usuario"});

  } catch (error) {
    res.status(400).send({message:"Intento de recuperacion de contraseña invalido"})
  }
};

module.exports = {
  loginUser,
  resetPassword,
  getUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
  emailConfirm,
  recoverypassword,
  
  
};