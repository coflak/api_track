const express=require('express');
const app=express();
const Track=require("./../models/track");
const track = require('./../models/track');
const { findById } = require('./../models/track');

app.get('/',function(req,res){
    res.json({
        'success':true,
        'message':'Welcome to playlist',
        'data':[]
    })
});

app.get('/track',function(req,res){
    Track.find({})
              .exec((err,trackList)=>{
                  if(err){
                    return res.json({
                        'success': false,
                        'message' : err.message,
                        'data' : []
                    });
                  }
                  if(!trackList.length){
                    return res.json({
                        'succes':false,
                        'message':'No tracks found',
                        'data':[]
                    });
                  }
                  return res.json({
                      'succes':true,
                      'message':'track list',
                      'data':[trackList]

                  });
              });
});

app.post('/track',function(req,res){
    let data=req.body;
    let track=new Track({
       name_track:data.name_track,
       artist:data.artist,
       albun:data.albun,
       año_albun:data.año_albun,
       aritis_remix:data.aritis_remix,
       image_url:data.image_url
    });

    track.save((err,trackDB)=>{
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err,
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Track saved successfully',
            'data' : [trackDB]
        })
    });

});

app.get('/track/:id',function(req,res){
    let id=req.params.id;

    Track.findById(id)
             .exec((err,trackSpecific)=>{
                if(err){
                    return res.status(400).json({
                        'success': false,
                        'message' : err.message,
                        'data' : []
                    });
                }
                if(!trackSpecific){
                    return res.json({
                        'succes':false,
                        'message':'Track not found',
                        'data':[]
                    })
                }
                return res.json({
                    'success': true,
                    'message' : 'Track Detail',
                    'data' : [trackSpecific]
                })

             });
});

app.put('/track/:id',function(req,res){
    let id=req.params.id;
    let body=req.body;
    let data=({name_track:body.name_track,
               artist:body.artist,
               albun:body.albun,
               año_albun:body.año_albun,
               aritis_remix:body.aritis_remix,});
    
    Track.findByIdAndUpdate(id,data,{new:true,runValidators:true},(err,trackDB)=>{
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err.message,
                'data' : []
            });
        }
        if(!trackDB){
            return res.json({
                'succes':false,
                'message':'track not found',
                'data':[]
            });
        }  
        return res.json({
            'success': true,
            'message' : 'Track updated successfully',
            'data' : [trackDB]
        })
    });

});

app.delete('/track/:id',function(req,res){
    let id=req.params.id;
    Track.findById(id,function(err,trackDB){
        if(err){
            return res.status(400).json({
                'succes':false,
                'message':err.message,
                'data':[]
            });
        }
        if(!trackDB){
            return res.json({
                'success': false,
                'message' : 'Track doesnt found',
                'data' : []
            });
        }
trackDB.remove(function(err){
    
    if(err){
        return res.status(400).json({
            'succes':false,
            'message':err.message,
            'data':[]
        });
    }
    return res.json({
        'success': true,
        'message' : 'Track deleted successfully',
        'data' : [trackDB]
    })
   });
  });
})

app.patch('/track/:id',function(req,res){
    let id=req.params.id;
    let data={active:false};
    Track.findByIdAndUpdate(id,data,{ new:false,runValidators:true },(err,trackDB)=>{
        if(err){
            return res.status(400).json({
                'success': false,
                'message' : err.message,
                'data' : []
            });
        }
        if(!trackDB){
            return res.json({
                'success': false,
                'message' : 'Track doesnt found',
                'data' : []
            });
        }
        return res.json({
            'success': true,
            'message' : 'Track has changed status successfully',
            'data' : [trackDB]
        })
    });

});
 module.exports=app;