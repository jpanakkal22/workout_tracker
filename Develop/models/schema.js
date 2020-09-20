//Require mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const Workout = new Schema({
    workoutType: {
        type: String, 
        required: true       
    },

    workoutName: {
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
        
    },
    
    date: { 
        type: Date,
        default: Date.now 
    }    
  });

  // Call mongoose model on schema
  const workouts = mongoose.model('workouts', Workout);

  module.exports = workouts