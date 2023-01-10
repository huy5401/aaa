import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

const slug_generator = require('mongoose-slug-generator')

const CourseSchema = new mongoose.Schema({
    name: {type:String, minLength:1, require:true},
    description: {type: String, maxLength: 500},
    img: {type: String, maxLength: 255},
    videoId: {type: String, maxLength: 255, require: true},
    level: {type: String, maxLength:255},
    slug:{type:String, slug:'name', unique: true},
},{
    timestamps: true
})

// Add plugin
mongoose.plugin(slug_generator);

const Course = mongoose.model("Course", CourseSchema);