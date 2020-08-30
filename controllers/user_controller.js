const express=require('express');
const app= express();
const User=require("./../models/user");


/*app.get('/user',function(req,res){
    User.find({})
              .exec((err,userList)=>{
                  if(err){
                    return res.json({
                        'success': false,
                        'message' : err.message,
                        'data' : []
                    });
                  }
                  if(!userList.length){
                    return res.json({
                        'succes':false,
                        'message':'No user found',
                        'data':[]
                    });
                  }
                  return res.json({
                      'succes':true,
                      'message':'user list',
                      'data':[userList]

                  });
              });
});*/


app.post('/user',function(req,res){
    let data =req.body;
    let user=new User({
        name:data.name,
        surname:data.surname,
        city:data.city,
        email:data.email,
        user:data.user,
        password:data.password,
    });
  
     user.save((err,userDB)=>{
    
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err,
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'User saved successfully',
            'data' : [userDB]
        })
    });
    
       
});


app.post('/user/userespecific',function(req,res){
    let data = req.body;
    
  User.find({user:data.user,password:data.password})
    .exec((err,userOne)=>{
       if(err){
           return res.status(400).json({
               'success': false,
               'message' : err.message,
               'data' : []
           });
       }
       if(!userOne.length){
           return res.json({
               'succes':false,
               'message':'user not found',
               'data':[]
           })
       }
       return res.json({
           'success': true,
           'message' : ' registered user ',
           'data' : [userOne]
       })

    });
});


    
 module.exports=app;