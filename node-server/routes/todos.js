var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://manish:manish@ds111479.mlab.com:11479/meantodos_manish', ['todos']);

//Get Todos
router.get('/todos', function(req, res, next){
    // console.log("connected");
    db.todos.find(function(err, todos){
        if (err) {
            res.send(err);
        }
        else {
            res.json(todos);  
        }    
    });
});

//Get single todos
router.get('/todo/:id', function(req, res, next){
    db.todos.findOne({
        _id: mongojs.ObjectId(req.params.id)
    },function(err, todo){
        if (err) {
            res.send(err);
        }
        else {
            res.json(todo);  
        }    
    });
});

//Post Todo
router.post('/todo', function(req, res, next){
    var todo = req.body;
    if(!todo.text || !(todo.isCompleted + '')){
        res.status(400);
        res.json({
            "error": "Invalid data"
        });
        }else {
            db.todos.save(todo, function(err, result){
                if (err) {
                    res.send(err);
                }
                else {
                    res.json(result);  
                }   
            });
        }
});

//Update Todo
router.put('/todo/:id', function(req, res, next){
    var todo = req.body;
    var updateObj = {};

    if(todo.isCompleted){
        updateObj.isCompleted = todo.isCompleted;
    }

    if(todo.text){
        updateObj.text = todo.text;
    }

    if(!updateObj){
        res.status(400);
        res.json({
            "error": "Invalid data"
        });
    } else {
        db.todos.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updateObj, {}, function(err, result){

            if (err) {
                 res.send(err);
            }
            else {
                 res.json(result);  
                }    
        });
    }
        
});

//Delete Todo
router.delete('/todo/:id', function(req, res, next){
    // alert('The todo list will be deleted');
        db.todos.remove({
            _id: mongojs.ObjectId(req.params.id)
        },'', function(err, result){
            if (err) {
                 res.send(err);
            }
            else {
                 res.json(result);  
                }    
        });
});


module.exports.todos = router;