const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate')
var Schema = mongoose.Schema;

const ReservationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ci: {
      type: String,
      required: true
  },
    dateFrom: {
        type: Date,
        // required: true
    },
    dateTo: {
        type: Date,
        // required: true
    },
    reserved: {
        type: Boolean,
        default: true
        // required: true
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Car',
      required: true
    }
    

});

ReservationSchema.plugin(mongoosePaginate);
const AutoReserved = mongoose.model('Reservation', ReservationSchema);
module.exports = AutoReserved;