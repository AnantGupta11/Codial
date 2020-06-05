const Comment= require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res){
    Post.findById(req.body.post, function(err,post){
            if(err){
                console.log("Error in finding post",err);
                return res.redirect('back');
            }
            if(post){
                Comment.create({
                    content:req.body.content,
                    post:req.body.post,
                    user:req.user._id
                }, function(err,comment){
                    //handle err
                    if(err){
                        console.log('error in creating comments',err);
                        return;
                    }
                    console.log(comment);
                    post.comments.push(comment);
                    post.save();
                    res.redirect('/');
                });
            }
    });
}