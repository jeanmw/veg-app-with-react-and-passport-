var db = require('../models');

//all veggies
function index(req, res) {
	db.Vegetable.find({}, function(err, allVeg){
		res.json(allVeg);
	});
};

//one veggie
function show(req, res) {
	var vegetableId = req.params.vegetable_id;
	db.Vegetable.find({_id:vegetableId}, function(err, foundVeggie){
		if(err){res.send(err)}
		res.json(foundVeggie);
	});
	console.log('veggie id is: ', req.params.vegetable_id);
};

//create
function create(req, res) {
	var vegetable = new db.Vegetable();
	vegetable.name = req.body.name;
	vegetable.description = req.body.description;
	var id = req.body.userId;
	db.User.findOne({_id: id}, function(err, user){
		if(err){
			console.log('no user');
			console.log(err);
		}
		console.log('user found: ', user);

		vegetable.user = user;
		vegetable.username = user.username;
		vegetable.save(function(err) {
			if(err){res.send(err)}
			console.log('created ', req.body.name);
			res.json('created a vegetable');
		});
	})
};

//destroy
function destroy(req, res) {
	var vegetableId = req.params.vegetable_id;
	db.Vegetable.remove({_id:vegetableId}, function(err, foundVeggie){
		if(err){res.send(err)}
		res.json('deleted a veggie');
	})
};

function nuke(req,res) {
	db.Vegetable.remove(function(err, succ){
		res.json(succ);
	})
};


module.exports = {
	index: index,
	show: show,
	create: create,
	destroy: destroy,
	nuke: nuke
};
