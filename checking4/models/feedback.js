var mongoose = require('mongoose');
var Schema = mongoose.Schema;

feedbackSchema = new Schema( {
	unique_id: Number,
	firstname: String,
	lastname:String,
	email: String,
	query: String,
	additionaldetails: String
}),
mongoose.models = {}

Feedback = mongoose.model('Feedback', artistSchema);
module.exports = Feedback;