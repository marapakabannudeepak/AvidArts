//blog routes
var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Artist = require('../models/artist');
const services = require('../server/services/render');
const controller = require('../server/controller/controller');
const Blog = require('./../models/Blog');
const multer = require('multer');

//define storage for the images

const storage = multer.diskStorage({
  //destination for files
  destination: function (request, file, callback) {
    callback(null, './assets/public/uploads/images');
  },

  //add back the extension
  filename: function (request, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

//upload parameters for multer
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});

router.get('/',function(req,res,next){
	return res.render('avidarts_start.ejs')
})
router.get('/homeaft',function(req,res,next){
	return res.render('homeaft.ejs')
})

router.get('/register', function (req, res, next) {
	return res.render('index.ejs');
});



router.post('/register', function(req, res, next) {
	console.log(req.body);
	var personInfo = req.body;

	if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
		res.send();
	} else {
		if (personInfo.password == personInfo.passwordConf) {

			User.findOne({email:personInfo.email},function(err,data){
				if(!data){
					var c;
					User.findOne({},function(err,data){

						if (data) {
							c = data.unique_id + 1;
						}else{
							c=1;
						}

						var newPerson = new User({
							unique_id:c,
							email:personInfo.email,
							username: personInfo.username,
							password: personInfo.password,
							passwordConf: personInfo.passwordConf
						});

						newPerson.save(function(err, Person){
							if(err)
								console.log(err);
							else
								console.log('Success');
						});

					}).sort({_id: -1}).limit(1);
					res.send({"Success":"You are regestered,You can login now."});
				}else{
					res.send({"Success":"Email is already used."});
				}

			});
		}else{
			res.send({"Success":"password is not matched"});
		}
	}
});



router.get('/login', function (req, res, next) {
	return res.render('login.ejs');
});

router.post('/login', function (req, res, next) {
	User.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
			//	req.session.userId = data.unique_id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});
				
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});




router.get('/profile', function (req, res, next) {
//	console.log("profile");
//	User.findOne({unique_id:req.session.userId},function(err,data){
//		console.log("data");
//		console.log(data);
//		if(!data){
			//res.redirect('/');
	//	}else{
			//console.log("found");
			return res.render('data.ejs');//, {"name":data.username,"email":data.email});
	//	}
	//});
});

router.get('/logout', function (req, res, next) {
	console.log("logout")
//	if (req.session) {
    // delete session object
   // req.session.destroy(function (err) {
  //  	if (err) {
    //		return next(err);
   // 	} else {
    		return res.redirect('/register');
    //	}
   // });
//}
});

router.get('/home', function (req, res, next) {
	console.log("Home")
	//if (req.session) {
    // delete session object
  // req.session.destroy(function (err) {
    //	if (err) {
    	//	return next(err);
    	//} else {
    		return res.render("home.ejs");
    //	}
    //});
//}
});

router.get('/forgetpass', function (req, res, next) {
	res.render("forget.ejs");
});

router.post('/forgetpass', function (req, res, next) {
	//console.log('req.body');
	//console.log(req.body);
	User.findOne({email:req.body.email},function(err,data){
		console.log(data);
		if(!data){
			res.send({"Success":"This Email Is not regestered!"});
		}else{
			if (req.body.password==req.body.passwordConf) {
			data.password=req.body.password;
			data.passwordConf=req.body.passwordConf;

			data.save(function(err, Person){
				if(err)
					console.log(err);
				else
					console.log('Success');
					res.send({"Success":"Password changed!"});
			});
		}else{
			res.send({"Success":"Password does not matched! Both Password should be same."});
		}
		}
	});
});


router.get('/artistfinal', function (req, res, next) {
	console.log("Artist Final")
	//if (req.session) {
    // delete session object
   // req.session.destroy(function (err) {
    //	if (err) {
    		//return next(err);
    	//} else {
    		return res.render("artistfinal.ejs");
    //	}
  //  });
//}
});

router.get('/artworksfinal', function (req, res, next) {
	console.log("Artworks Final")
	//if (req.session) {
    // delete session object
    //req.session.destroy(function (err) {
    	//if (err) {
    		//return next(err);
    //	} else {
    		return res.render("artworksfinal.ejs");
    //	}
   // });
//}
});


router.get('/artworksfinal', function (req, res, next) {
	console.log("Artist Final")
//	if (req.session) {
    // delete session object
  //  req.session.destroy(function (err) {
    //	if (err) {
   // 		return next(err);
   // 	} else {
    		return res.render("artworksfinal.ejs");
  //  	}
  //  });
//}
});

router.get('/faq', function (req, res, next) {
	console.log("Faq")
//	if (req.session) {
    // delete session object
  //  req.session.destroy(function (err) {
    //	if (err) {
    	//	return next(err);
    	//} else {
    		return res.render("faq.ejs");
    //	}
    //});
//}
});



router.get('/help', function (req, res, next) {
	console.log("Help")
	//if (req.session) {
    // delete session object
    //req.session.destroy(function (err) {
    //	if (err) {
    //		return next(err);
    //	} else {
    		return res.render("help.ejs");
    //	}
  //  });
//}
});


router.get('/purchase', function (req, res, next) {
	console.log("Help")
//	if (req.session) {
    // delete session object
  //  req.session.destroy(function (err) {
    //	if (err) {
   // 		return next(err);
   // 	} else {
    		return res.render("purchase.ejs");
   // 	}
   // });
//}
});



router.get('/signup', function (req, res, next) {
	console.log("SignUp")
	//if (req.session) {
    // delete session object
   // req.session.destroy(function (err) {
    //	if (err) {
    	//	return next(err);
    //	} else {
    		return res.render("index.ejs");
    //	}
   // });
//}
});

router.get('/registerartist', function (req, res, next) {
	return res.render('registerartist.ejs');
});


router.get("/contactus",function(req,res){
	res.render('contactus.ejs');
});


router.get('/loginasartist', function (req, res, next) {
	return res.render('loginasartist.ejs');
});



router.post('/registerartist',function(req,res){
//	console.log("ghgaj");
	var name= req.body.username;
	var id;
})

router.post('/loginasartist', function (req, res, next) {
	//console.log(req.body);
	Artist.findOne({email:req.body.email},function(err,data){
		if(data){
			
			if(data.password==req.body.password){
				//console.log("Done Login");
				req.session.artistId = data.unique_id;
				//console.log(req.session.userId);
				res.send({"Success":"Success!"});			
			}else{
				res.send({"Success":"Wrong password!"});
			}
		}else{
			res.send({"Success":"This Email Is not regestered!"});
		}
	});
});

/**
 *  @description Root Route
 *  @method GET /
 */
router.get('/admin', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
router.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
router.get('/update-user', services.update_user)


// API
router.post('/api/users', controller.create);
router.get('/api/users', controller.find);
router.put('/api/users/:id', controller.update);
router.delete('/api/users/:id', controller.delete);


router.get('/new', (request, response) => {
  response.render('new');
});

//view route
router.get('/:slug', async (request, response) => {
  let blog = await Blog.findOne({ slug: request.params.slug });

  if (blog) {
    response.render('show', { blog: blog });
  } else {
    response.redirect('/');
  }
});

//route that handles new post
router.post('/', upload.single('image'), async (request, response) => {
  console.log(request.file);
  // console.log(request.body);
  let blog = new Blog({
    title: request.body.title,
    artist: request.body.artist,
    cost:request.body.cost,
    description: request.body.description,
    img: request.file.filename,
  });

  try {
    blog = await blog.save();
    response.redirect(`index/${blog.slug}`);
  } catch (error) {
    console.log(error);
  }
});




router.get('/edit/:id', async (request, response) => {
  let blog = await Blog.findById(request.params.id);
  response.render('edit', { blog: blog });
});

//route to handle updates
router.put('/:id', async (request, response) => {
  request.blog = await Blog.findById(request.params.id);
  let blog = request.blog;
  blog.title = request.body.title;
  blog.artist=request.body.artist;
  blog.cost=request.body.cost;
  blog.description = request.body.description;

  try {
    blog = await blog.save();
    //redirect to the view route
    response.redirect(`/index/${blog.slug}`);
  } catch (error) {
    console.log(error);
    response.redirect(`/seblogs/edit/${blog.id}`, { blog: blog });
  }
});

///route to handle delete
router.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.redirect('/artworks');
});


module.exports = router;
