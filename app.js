var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var campgrounds = [
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020_1280.jpg"},
    {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg"},
    {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/29/04/17/bonfire-1867275_1280.jpg"},
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020_1280.jpg"},
    {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg"},
    {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/29/04/17/bonfire-1867275_1280.jpg"},
    {name: "Salmon Creek", image: "https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020_1280.jpg"},
    {name: "Granite Hill", image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_1280.jpg"},
    {name: "Mountain Goat's Rest", image: "https://cdn.pixabay.com/photo/2016/11/29/04/17/bonfire-1867275_1280.jpg"}
];

app.get("/", function(req, res){
    res.render("landing");
});

app.get("/campgrounds", function(req, res){
    res.render("campgrounds", {campgrounds: campgrounds});
});

app.post("/campgrounds", function(req, res){
    // res.send("YOU HIT THE POST ROUTE!");
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    
    campgrounds.push(newCampground);
    res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
    res.render("new.ejs");
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started!");
});