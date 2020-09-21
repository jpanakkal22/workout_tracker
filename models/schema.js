//Require mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const workoutSchema = new Schema({
    exercises: [
        {type: {
        type: String, 
        required: true       
    },

    name: {
        type: String,
        required: true
    },

    weight: {
        type: Number,        
    },

    sets: {
        type: Number,       
    },

    reps: {
        type: Number,        
    },

    duration: {
        type: Number,        
    },

    distance: {
        type: Number,        
    }}],
    
    date: { 
        type: Date,
        default: Date.now 
    },

    totalDuration: {
        type: Number,
    }    
  });

  // Call mongoose model on schema
  const Workout = mongoose.model('workouts', workoutSchema);

  module.exports = Workout