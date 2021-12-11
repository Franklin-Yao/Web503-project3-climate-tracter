const moogoose = require('mongoose')

const ClimateEventSchema = new moogoose.Schema({
    userid:String,
    event_type: Number, // 1: Temperature Ris, 2: Shinking Ice Sheets, 3: Sea Leavel Rise
    emergency_level: Number, //1, 2, 3, 4, 5
    longitude: Number,
    latitude: Number,
    descriptions: String,
    url:String
});

module.exports = moogoose.model('ClimateEvent', ClimateEventSchema);