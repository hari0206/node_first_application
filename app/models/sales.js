var mongoose = require('mongoose');
mongoose.set('useCreateindex', true);
var Schema = mongoose.Schema;

var salesSchema = new Schema({
    employeeId: {
        type: Schema.Types.ObjectId,
        ref: 'employees'
    },
    cart: [{
        _id: {
            type: Schema.Types.ObjectId,
            ref: 'items'
        },
        name: String,
        description: String,
        price: Number,
        quantity: Number,
        total: Number,
    }],
    grandTotal: Number,
    createdOn: {
        type: Date,
        default: new Date()
    },
    updatedOn: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('sales', salesSchema);
