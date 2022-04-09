const mongoose = require('mongoose');

const FilterSchema = new mongoose.Schema({
    
    category: {
        type: Array,
        required: true,
        // enum:['Pequeño', 'Mediano', 'Grande', "Minivan"]
    },
    priceRange: {
        type: Array,
        required: true,
        // enum:[50, 600]
    },
});

const Filter = mongoose.model('Filter', FilterSchema);
module.exports = Filter;