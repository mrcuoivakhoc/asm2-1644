const mongoose = require('mongoose');

const OriginSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true,
         
      },
   }
);

// Chỉ định tên bảng là 'origin'
const OriginModel = mongoose.model('origin', OriginSchema, 'origin');

module.exports = OriginModel;
