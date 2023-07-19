const Users = require("../models/user.model");
require("dotenv").config();
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken');
const {generarCbuCompleto} = require("../utils/cbuUtils");

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

  const salt = bcrypt.genSaltSync(10); //cantidad de saltos que da para encriptar, entre mas vuelta da es mas segura.
  const passwordHash = bcrypt.hashSync(req.body.password, salt);
  try {
    const newUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: passwordHash,
      isActivated: req.body.isActivated || false,
    };
    const user = await Users.create(newUser);
    const accessToken = jwt.sign({ id: user.email }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE_REGISTER,
    });

    //Enviar una respuesta al cliente
    res
      .status(200)
      .json({
        mensaje: "Usuario creado con exito",
        usuario: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
        },
        accessToken,
      }); // descomentar para el token
  } catch (error) {
    res.status(404).send(error);
  }
};


//Modificar usuario
const editUser = async (req, res) => {   
  const email = req.body.email;
  const user = await Users.findOne({ email: email });

  // Si el usuario no esta registrado
  if (!user) {
    return res.status(404).send({ mensaje: "Usuario no encontrado" });
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
      const passwordMatch = bcrypt.compareSync(passwordEnterByUser, passwordStoredInDB);
      
      if (passwordMatch) {
        const payload = {
          email: userFind.email,
          firstName: userFind.firstName,
          lastName: userFind.lastName,
          isActivated: userFind.isActivated,
          cbu: userFind.cbu,
          balance: userFind.balance,
          dateOfBirth: userFind.dateOfBirth,
          nacionality: userFind.nacionality,
          address: userFind.address,
          dni: userFind.dni, 
        };
        const accessToken = jwt.sign({ id: userFind.email }, process.env.SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRE_LOGIN,
        });
        
        res.status(200).json({ accessToken,...payload, mensaje: "Usuario logueado con éxito" });
      } else {
        res.status(400).send({ mensaje: "Email y/o Contraseña incorrectos" });
      }
    } else {
      res.status(400).send({ mensaje: "El usuario no existe" });
    }
  } catch (error) {
    res.send(error);
  }
};


//Reset password

const resetPassword = async (req, res) => {
  try {
    const email = req.body.email;
    let userFind = await Users.findOne({ email });
    console.log(userFind);
    if (userFind) {
      const password = req.body.password;
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);
      userFind.password = passwordHash;
      userFind.save();
      res.status(200).send({ mensaje: "Contraseña reseteada con exito" });
    } else {
      res.status(400).send({ mensaje: "Usuario no encontrado" });
    }
  } catch (error) {
    res.send(error);
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
};
