const express = require('express');
const app = express()
const port = 3000
const expressLayouts = require('express-ejs-layouts');
const fs = require ('fs');
const {body, check, validationResult} = require('express-validator');
const validator = require('validator');
const folder ='/data'
const filepath ="./data/db.json"

// View engine 'ejs'
app.set('view engine','ejs')
app.use(expressLayouts);
app.use(express.urlencoded({ extended : false}));
app.use(express.json());


// if (!fs.existsSync(folder)){
// 	fs.mkdirSync(folder)
// }

// if (!fs.existsSync(filepath)){
// 	fs.writeFileSync(filepath,'[]')
// }

const cekDuplikat = (name) => {
	const contacts = getUserData();
	return contacts.find((contact) => contact.name === name);
};

const saveUserData = (data) =>{
	const stringifyData =JSON.stringify(data)
	fs.writeFileSync('data/db.json', stringifyData)
};
const getUserData = () => {
	const jsonData = fs.readFileSync('data/db.json')
	return JSON.parse(jsonData)
};

const findContact = (name) => {
	const contacts = getUserData();
	const contact = contacts.find((contact) => contact.name === name);
};



// App Get for all
app.get('/',(req,res) => {
	res.render('index', {
		name : "Dani",
		title : "Web express EJS",
		layout: "layout/main",
	}),
	res.status(200);
});

app.get('/about',(req,res) => {
	res.render('about',{
		title : "About - Web express EJS",
		layout: "layout/mainAbout",
	});
	
});

app.get('/contact',(req,res) => {
	const dbPath = require ('./data/db.json');
	res.render('contact', {
		title : "Contact - Web express EJS",
		layout: "layout/mainContact",
		dbPath,
});
});

app.get('/add', (req, res) => {
	res.render ('add', {
		title : " AddContact - Web express EJS",
		layout:"layout/mainAdd",
	});
});
app.get('/contact/edit/:name',(req,res) => {
	const contact = req.params
	const oldname = req.params.oldname;
	const dbPath = require ('./data/db.json');
	res.render('editContact',{
		title : "Edit Contact - Web express EJS",
		layout: "layout/mainEditContact",
		contact,
		dbPath,
		oldname,

	});
	


});
// ==============================================================================

// App Post 
app.post('/add', [
 
	body('name').custom((value) => {
		const duplikat = cekDuplikat(value);
		if (duplikat) {
			throw new Error('Data already used!');
		}
		return true;
	}),

	check('email', 'Email doesnt valid!').isEmail(),

 
],
(req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
			res.render('add', {
				isActive: 'home',
				layout: 'layout/mainAdd',
				title: 'Add Contact-Web Express',
				errors: errors.array(),
			});
		} else {
	const existUsers = getUserData()

	const data = req.body

	const userData = JSON.stringify(data)
	console.log("com",userData);
	datass = JSON.parse(userData)

	if (datass.name == null || datass.email == null ) {
			return res.status(401).send({error: true, msg: 'User data missing'})
	}
	
	const findExist = existUsers.find( user => user.name === userData.name )
	if (findExist) {
			return res.status(409).send({error: true, msg: 'username already exist'})
	}

	
	existUsers.push(datass)

	saveUserData(existUsers);
res.redirect('/contact')
}
});


// App Update
app.post('/contact/update',[

	body('name').custom((value,{req}) => {
		const duplikat = cekDuplikat(value);
		if (value !== req.body.oldNama && duplikat) {
			throw new Error('Data already used!');
		}
		return true;
	}),

	check('email', 'Email doesnt valid!').isEmail(),

 
],
(req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
			res.render('editContact', {
				isActive: 'home',
				layout: 'layout/mainEditContact',
				title: 'Update Contact',
				errors: errors.array(),
				contact: req.body
			});
		} else {


	const username = req.params.name
	const existUsers = getUserData()
	const data = req.body
	const userData = JSON.stringify(data)


	const findExist = existUsers.find( user => user.name === username )
	// console.log('log',username);
	
	if (!findExist) {
			return res.status(409).send({error: true, msg: 'username not exist'})
	}

	const updateUser = existUsers.filter( user => user.name !== username )

	datass = JSON.parse(userData)  
	updateUser.push(datass)

	saveUserData(updateUser)

 res.redirect('/contact')
}
});


// App Delete
app.get('/delete/:name', (req, res) => {
	const name = req.params.name

	const existUsers = getUserData()

	// console.log("coba",existUsers);

	const filterUser = existUsers.filter( user => user.name !== name )
	if ( existUsers.length === filterUser.length ) {
			return res.status(409).send({error: true, msg: 'username does not exist'})
	}

	saveUserData(filterUser)
	
	res.redirect('/contact')
	
});

// mendefinisikan middleware jika page not found
app.use('/',(req, res)=>{
	res.send('Page Not Found : 404');
	res.status(404);
});





// Server Port 
app.listen (3000,()=>{
	console.log(`Server has listening on port${port}`);
});