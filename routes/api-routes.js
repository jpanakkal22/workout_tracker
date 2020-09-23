// Require Dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Require Models folder
const db = require("../models");

module.exports = function(app) {    
    
    // GET Route for all workouts
    app.get('/api/workouts', (req, res) => {
        db.Workout.find({}).then(data => {
        data.forEach(workout => {
            var total = 0;
            workout.exercises.forEach(e => {
                total += e.duration;
            });
            workout.totalDuration = total;
        });
        res.json(data);
        }).catch(err => {
        res.json(err);
        });
    })
    
    // POST Route / posts an empty object with an id to be used for the update route
    app.post('/api/workouts', (req, res) => {  
        db.Workout.create({}).then((data => {
        res.json(data);
        console.log('Success!');
        })).catch(err => {
        res.json(err);
        });      
    });
    
    // Update Route for exercise page using id from post route
    app.put("/api/workouts/:id", (req, res) => {  
        db.Workout.findOneAndUpdate({_id: req.params.id}, 
        {
            $push: {exercises : req.body}
        },
        { new: true })    
            .then(dbWorkout => {
            return res.json(dbWorkout);
            }).catch(err => {
            res.json(err);
            });       
    });
    
    // Get route for Fitness Tracker Dashboard
    app.get('/api/workouts/range', (req, res) => {
        db.Workout.find({}).then(summary => {
        res.json(summary);
        }).catch(err => {
        res.json(err);
        });
    });    
        
}