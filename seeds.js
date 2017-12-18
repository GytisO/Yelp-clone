var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Cloud's rest", 
        image: "https://cdn.grindtv.com/uploads/2015/02/shutterstock_242371765.jpg",
        description: "Lorem ipsum dolor sit amet, harum eleifend ne mea, pri ea homero causae, an vero nulla sea. Sea cu menandri explicari definitiones, ridens evertitur contentiones quo eu, mei ne partiendo interesset quaerendum. Cu ridens alienum pericula sit. Te sint idque his. No his salutandi laboramus mnesarchum, qui primis appareat no. Est ex petentium consectetuer, alienum maiestatis mnesarchum ne per, eu eius temporibus vis."
    },
    {
        name: "Zalieji ezerai", 
        image: "https://europe.huttopia.com/content/uploads/2016/11/Hebergement-camping-canadienne-exterieur.jpg",
        description: "Lorem ipsum dolor sit amet, harum eleifend ne mea, pri ea homero causae, an vero nulla sea. Sea cu menandri explicari definitiones, ridens evertitur contentiones quo eu, mei ne partiendo interesset quaerendum. Cu ridens alienum pericula sit. Te sint idque his. No his salutandi laboramus mnesarchum, qui primis appareat no. Est ex petentium consectetuer, alienum maiestatis mnesarchum ne per, eu eius temporibus vis."
    },
    {
        name: "Aura's sky", 
        image: "https://s-media-cache-ak0.pinimg.com/originals/fa/43/cc/fa43ccc71e7ae9aa590a6cf31112f2ad.jpg",
        description: "Lorem ipsum dolor sit amet, harum eleifend ne mea, pri ea homero causae, an vero nulla sea. Sea cu menandri explicari definitiones, ridens evertitur contentiones quo eu, mei ne partiendo interesset quaerendum. Cu ridens alienum pericula sit. Te sint idque his. No his salutandi laboramus mnesarchum, qui primis appareat no. Est ex petentium consectetuer, alienum maiestatis mnesarchum ne per, eu eius temporibus vis."
    }
    ]


function seedDB(){
    // Remove all campgrounds
       Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
            //Add few campgrounds
            data.forEach(function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("added a campground");
                        // Creating a comment
                        Comment.create({
                            
                            text: "this place is great!",
                            author: 'Gytis'
                            
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created new comment!");
                            }
                        });
                    };
                });
            });
        }); 


    
    // Add few comments
};

module.exports = seedDB;