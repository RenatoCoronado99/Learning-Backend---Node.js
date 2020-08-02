const mongoose = require("mongoose");
const { Schema } = mongoose;
const CommentSchema = new Schema({
  comment: { type: String },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
    autopopulate: true,
  }
});
//Antes de exportar el  modelo, es buena práctica setear los plugins
//Plugin: Métodos que le dan más poder a mongoose
CommentSchema.plugin(require('mongoose-autopopulate'));
module.exports = mongoose.model("comment", CommentSchema);
