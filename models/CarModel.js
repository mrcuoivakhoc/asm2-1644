const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema(
   {
      name : {
         type: String,
      },
      type: {
        type: String,
      },
      image:{
        type: String,
      },
      color:{
        type: String,
      },
      price : {
        type : String,
      },
      description :{
        type : String,
      },
      origin : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'origin'  // 'origin': collection
     }
    
   }
)
const CarModel = mongoose.model('car', CarSchema, 'car');

module.exports = CarModel;