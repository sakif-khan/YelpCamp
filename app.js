var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", {useNewUrlParser: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//     {
//         name: "Granite Hill",
//         image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg",
//         description: "bleh blah bleh"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         } else {
//             console.log("NEWLY CREATED CAMPGROUND: ");
//             console.log(campground);
//         }
//     });

// var campgrounds = [
//     {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020_1280.jpg"},
//     {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/29/04/17/bonfire-1867275_1280.jpg"},
//     {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020_1280.jpg"},
//     {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/29/04/17/bonfire-1867275_1280.jpg"},
//     {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020_1280.jpg"},
//     {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg"},
//     {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/29/04/17/bonfire-1867275_1280.jpg"}
// ];

app.get("/", function(req, res){
    res.render("landing");
});

// INDEX - show all campgrounds
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else {
            res.render("index", {campgrounds: allCampgrounds});
        }
    })
});

// CREATE - add new campground to DB
app.post("/campgrounds", function(req, res){
    // res.send("YOU HIT THE POST ROUTE!");
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
    // campgrounds.push(newCampground);
});

// NEW - show form to create new DB
app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});

// SHOW - shows more info about one campground
app.get("/campgrounds/:id", function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            res.render("show", {campground: foundCampground});
        }
    });
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});