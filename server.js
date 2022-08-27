const express = require("express");
const bodyParser = require("body-parser");


//const ejs = require("ejs");
var mongoose = require('mongoose');
//const newtanks = require('./User.js');

const schema = new mongoose.Schema({
	pro_id:  String,
	pro_name : String,
	pro_rate : Number,
	ret_name : String,
    ret_phone : Number,
    ret_address : String,
	ret_address : String
});
const newtank = mongoose.model('newtank', schema);
//mongodb+srv://Jagadheesan:<password>@cluster0.4l1d3.mongodb.net/?retryWrites=true&w=majority
mongoAtlasUri = 'mongodb+srv://Jagadheesan:jagan2002@cluster0.4l1d3.mongodb.net/test?retryWrites=true&w=majority'
try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => {
          
        console.log(" Mongoose is connected");
	}
    );

  } catch (e) {
    console.log("could not connect");
  }


const app = express();
//app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded());
app.use(express.static("public"));
app.get("/",function (req,res){
	res.sendFile(__dirname+"/index.html");

});
app.post("/login",function(req,res){

	var p_id=req.body.product_id;
	var p_name=req.body.product_name;
	var p_rate=req.body.product_rate;
	var r_name=req.body.retailer_name;
	var ph_no =req.body.retailer_phno ;
	var r_address=req.body.retailer_address;
	
	const small = new newtank({ 
		pro_id:  p_id,
    	pro_name: p_name,
        pro_rate  :p_rate,
    	ret_name : r_name,
    	ret_phone :ph_no,
    	ret_address :r_address
		
	 });
        
        small.save(function (err) {
          if (err) console.log(err);
        });
		res.send("<h2>thanks for adding your product on to common platform</h2>")
		
});



app.get("/userlogin",function(req,res){
	res.sendFile(__dirname+"/public/userlogin.html")
});
app.post("/userlogin",function(req,res){
	var nameofproduct=req.body.searchname;
	newtank.find({ pro_name: nameofproduct}, function (err, docs) {
		if (err){
			console.log(err);
		}
		else{
			//console.log("First function call : ", docs);
			console.log(docs);
		}
	}
	
)
res.send("your best offer will be displayed");
});

app.listen(3000 ,function(){
	console.log("server running on port 3000");
});