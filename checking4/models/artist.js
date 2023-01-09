var mongoose = require('mongoose');
var Schema = mongoose.Schema;

artistSchema = new Schema( {
	unique_id: Number,
	email: String,
	phonenumber:String,
	artistname: String,
	password: String,
	passwordConf: String
}),
mongoose.models = {}

Artist = mongoose.model('Artist', artistSchema);
module.exports = Artist;