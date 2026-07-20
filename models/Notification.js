const mongoose = require ("mongoose");
const notificationSchema = new mongoose.Schema ({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        titre : String, 
        message:String ,
        type : String , 
        isRead : Boolean,

    },
{ timestamps: true })

module.exports = mongoose.model("Notification", notificationSchema);