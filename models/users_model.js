var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: { type: String, unique: true },
    hashed_password: String,
      characterImage: String,
      characterTagline: String,
      characterType: String,
      def: {type: Number, default: 50},
      att: {type: Number, default: 50},
      hp: {type: Number, default: 50},
      mag: {type: Number, default: 50},
      ranged: {type: Number, default: 50},
      weakness: String,
});
mongoose.model('User', UserSchema);