var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");


//INDEX - show all campgrounds
router.get("/", function(req, res){
    //Get all campgrounds from DB
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });

    //res.render("campgrounds", {campgrounds: campgrounds});
});

//CREATE - add new campgrounds to DB
router.post("/", middleware.isLoggedIn, function(req, res){
   //get data from form
   var name = req.body.name;
   var price = req.body.price;
   var image = req.body.image;
   var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
   var newCampground = {name: name, price: price, image: image, description: desc, author: author};
   //Create new campground and save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            console.log(newlyCreated);
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
        }
    });
});

//NEW - show fromt ot create new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new");
});

//SHOW - show details ID
router.get("/:id", function(req, res){
    //find the campground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash('error', 'Sorry, that campground does not exist!');
            return res.redirect('/campgrounds');
        } else {
            //render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
        Campground.findById(req.params.id, function(err, foundCampground){
                    res.render("campgrounds/edit", {campground: foundCampground});
        });
});




// UPDATE CAMPGROUND ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    // find and update
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, uptadedCampground){
        if(err){
            
            res.redirect("/campgrounds");
        } else {
        // redirect
        req.flash("success", "Campground has been updated");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

// DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndRemove(req.params.id, function(err){
       if(err){
            res.redirect("/campgrounds");
       } else {
            req.flash("success", "Campground has been deleted");
            res.redirect("/campgrounds");
       }
   }); 
});



module.exports = router;