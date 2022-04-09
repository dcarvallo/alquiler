const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')

const AutoSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    rentPrice: {
        type: Number,
        required: true
    },
    make: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    horsepower: {
        type: Number,
        required: true
    },
    img_url: {
      type: String,
    },
    category: {
        type: String,
        required: true,
        enum:['Pequeño', 'Mediano', 'Grande', "Minivan"]
    },
    type: {
        type: String,
        required: true,
        enum:['Mecanica', 'Automatica']
    },
    stock: {
        type: Number,
        default: 3
    },
    date: {
        type: Date,
        default: Date.now()
    },
    year: {
        type: Date,
    },
    capacity: {
        type: Number,
        default: 4
    }
});

AutoSchema.plugin(mongoosePaginate);
const Auto = mongoose.model('Auto', AutoSchema);
module.exports = Auto;