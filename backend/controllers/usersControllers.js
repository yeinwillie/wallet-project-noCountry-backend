const Users = require("../models/user.model");
require("dotenv").config();
const bcrypt = require ('bcrypt')
const jwt = require('jsonwebtoken');

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
    return res.status(400).json({ message: 'Ya existe un usuario con el mismo correo electrónico' });
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
    res.status(200).json({ usuario: newUser, accessToken, mensaje: "Usuario creado con exito" });                             // descomentar para el token
    
    
  } catch (error) {
    res.status(404).send(error);
  }
};

//Modificar usuario
const editUser = async (req, res) => {
    const id = req.params.id;
    const salt = bcrypt.genSaltSync(10);
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
        zipcode: req.body.address.zipcode
      },
      isActivated: req.body.isActivated,
      
    };
    try {
      const user = await Users.findByIdAndUpdate(id, userEdited);
      res
        .status(200)
        .send({ mensaje: "Usuario modificado con éxito", user: userEdited });
    } catch (error) {
      res.status(404).send(error);
    }
  }

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

const loginUser = async(req, res)=>{
  try {
      const email = req.body.email
      const userFind = await Users.findOne({email})
      if(userFind){
          const passwordEnterByUser = req.body.password
          const passwordStoredInDB = userFind.password
          const passwordMatch = bcrypt.compareSync(passwordEnterByUser, passwordStoredInDB)
          if(passwordMatch){


         const accessToken = jwt.sign({ id: userFind.email }, process.env.SECRET_KEY, {
          expiresIn: process.env.JWT_EXPIRE_LOGIN,
      });                                                                         
      // Enviar una respuesta al cliente
       res.status(200).json({ accessToken, mensaje: "Usuario logueado con éxito" });                                  
                
                  // comentar para el token
          }else{
              res.status(400).send({ mensaje: "Email o Contraseña incorrectos " })
          }
      }


  } catch (error) {
      res.send(error)
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
