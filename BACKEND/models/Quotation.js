const mongoose = require('mongoose');

const quotationItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  height: { type: Number, required: true },
  length: { type: Number, required: true },
  cost: { type: Number, required: true },
}, {_id: false});

const quotationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [quotationItemSchema],
  grandTotal: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Quotation', quotationSchema);