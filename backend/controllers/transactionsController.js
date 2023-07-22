const Transactions = require("../models/transaction.model");
const Users = require("../models/user.model");
require("dotenv").config();

//Obtener Historial de transacciones
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transactions.find();
    res.send(transactions);
  } catch (error) {
    res.status(404).send(error);
  }
};

//Obtener transaccion con ID
const getTransactionById = async (req, res) => {
  const transactionId = req.params.id;
  try {
    const transaction = await Transactions.findById(transactionId);
    
    if (!transaction) {
      return res.status(404).json({ mensaje: "Transacción no encontrada" });
    }
    
    res.status(200).json(transaction);
  } catch (error) {
    console.log(error); // Agrega este console.log para imprimir el error en la consola
    res.status(500).json({ mensaje: "Ha ocurrido un error al obtener la transacción" });
  }
};

// Enviar dinero
const createTransaction = async (req, res) => {
const senderIdentifier  = req.body.sender; // Puede ser el email, dni o cbu del remitente
  const recipientIdentifier = req.body.recipient; // Puede ser el email, dni o cbu del remitente
  const amount = req.body.amount;

 // Definimos una función para buscar al usuario por su identificador (email, dni o cbu)
 const findUserByIdentifier = async (identifier) => {
  const user = await Users.findOne({
    $or: [{ email: identifier },{ dni: identifier }, { cbu: identifier }],
  });
  return user;
};

try {
  // Buscamos al remitente y al destinatario en la base de datos
  const senderUser = await findUserByIdentifier(senderIdentifier);
  const recipientUser = await findUserByIdentifier(recipientIdentifier);

  // Verificamos si el remitente y el destinatario existen en la base de datos
  if (!senderUser) {
    return res.status(400).json({ message: "El remitente no existe" });
  }

  if (!recipientUser) {
    return res.status(400).json({ message: "El destinatario no existe" });
  }

   // Verificamos si el remitente tiene suficiente saldo para realizar la transacción
   if (senderUser.balance < amount) {
    return res.status(400).json({ message: "El remitente no tiene suficiente saldo" });
  }

   // Creamos la nueva transacción con el ID del remitente obtenido desde el modelo de usuario
   const newTransaction = {
    sender: senderUser.id,// Aquí utilizamos el campo '_id' del usuario como el valor del campo 'sender'
    recipient: recipientUser.id,
    amount: amount,
    detail: req.body.detail,
  };
  const transaction = await Transactions.create(newTransaction);

    // Actualizamos los saldos del remitente y del destinatario
    senderUser.balance -= amount;
    recipientUser.balance += amount;

        // Guardamos los cambios en la base de datos
        await senderUser.save();
        await recipientUser.save();
    
        res.status(200).json({ mensaje: "Transaccion creada con exito", transaction });

      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Ha ocurrido un error al procesar la transaccion" });
      }
    };



  // Definimos una función para buscar al usuario por su identificador (email, dni o cbu)
  /* const senderUser = await Users.findOne({ email: sender });
  if (!senderUser) {
    return res.status(400).json({
      message: "El remitente no existe",
    });
  }

  if (senderUser.balance < amount) {
    return res.status(400).json({ message: "El remitente no tiene suficiente saldo" });
  }

  const recipientUser = await Users.findOne({ email: recipient });
  if (!recipientUser) {
    return res.status(400).json({ message: "El destinatario no existe" });
  }

  try {
    const newTransaction = {
      recipient: recipient,
      amount: amount,
      detail: req.body.detail,
    };
    const transaction = await Transactions.create(newTransaction);

    // Actualizar los saldos del remitente y del destinatario
    senderUser.balance -= amount;
    recipientUser.balance += amount;

    // Guardar los cambios en la base de datos
    await senderUser.save();
    await recipientUser.save();

    res.status(200).json({
      mensaje: "Transaccion creada con exito",
      transaction: transaction,
    });
  } catch (error) {
    res.status(500).json({ message: "Ha ocurrido un error al procesar la transaccion" });
  } */ 


module.exports = {
  getTransactions,
  getTransactionById,
  createTransaction,
  // receiveTransaction
};
