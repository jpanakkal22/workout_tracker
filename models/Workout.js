//Require mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create schema
const workoutSchema = new Schema({
    exercises: [
        {
            type: {
                type: String, 
                trim: true       
            },

            name: {
                type: String,
                trim: true
            },

            weight: {
                type: Number,
                default: 0        
            },

            sets: {
                type: Number, 
                default: 0      
            },

            reps: {
                type: Number, 
                default: 0       
            },

            duration: {
                type: Number,
                default: 0        
            },

            distance: {
                type: Number,
                default: 0        
            }
        }
    ],
    
    date: { 
        type: Date,
        default: Date.now 
    },

    totalDuration: {
        type: Number,
        default: 0
    }    
  });

  // Call mongoose model on schema
  const Workout = mongoose.model('Workout', workoutSchema);

  module.exports = Workout