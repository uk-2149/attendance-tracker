const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subjectSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    name: {type: String, required: true},
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    totalClasses: {type: Number, required: true},
    missedClasses: {type:Number, required: true},
    attendedClasses: {type: Number, default: 0},
    targetPercentage: {type: Number, required: true},
})

module.exports = mongoose.model('Subject', subjectSchema);