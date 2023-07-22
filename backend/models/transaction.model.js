const  {Schema, model}  = require ('mongoose');

const transactionSchema = new Schema({
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User",

  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  amount: {
    //se utiliza para almacenar simplemente el valor numérico del monto transferido en la transacción, sin información sobre la moneda.
    type: Number,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, //Es la fecha y hora en que se realizó la transacción. Se establece automáticamente en la fecha actual si no se proporciona.
  },
});

module.exports = model( "Transaction", transactionSchema)