const { Schema, model } = require("mongoose")

const userSchema = new Schema({
    firstName: {
        type: String, 
        required: true
    }, 

    lastName: {
        type: String, 
        required: true
    },

    email:{
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String, 
        required: true
    }, 
   

    dateOfBirth: Date,
    dni: Number,
    nacionality: String,
    address: {
        street: String,
        number: Number,
        zipcode: String
    },
      isActivated: Boolean,
}, /* {
    timestamps:true
} */)

module.exports = model("User", userSchema)