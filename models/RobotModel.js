const mongoose = require('mongoose');
const RobotSchema = mongoose.Schema(
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
const RobotModel = mongoose.model('robot', RobotSchema, 'robot');
module.exports = RobotModel;