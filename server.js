const express = require('express');
const app = express()
const port = 3000
const expressLayouts = require('express-ejs-layouts');



// View engine 'ejs'
app.set('view engine','ejs')
app.use(expressLayouts);



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
	res.render('contact', {
		title : "Contact - Web express EJS",
		layout: "layout/mainContact",
	
	cont :
	[
		{
		id : 1,
		name : 'Dani',
		email : 'dani@gmail.com',
		num :'0001'
		},
		{
		id : 2,
		name : 'Rona',
		email : 'rona@gmail.com',
		num :'0002'
		},	
		{
		id : 3,
		name : 'Arya',
		email : 'arya@gmail.com',
		num :'0003'
		},
		{
		id : 4,
		name : 'Yahya',
		email : 'yahya@gmail.com',
		num :'0004'
		},
		{
		id : 5,
		name : 'Iwan',
		email : 'iwan@gmail.com',
		num :'0005'
		}
]
});
});

app.get('/product/:id',(req,res) => {
	res.send('product id : '+ req.params.id <br> + req.query.kategori);
});


app.get('/')


// mendefinisikan middleware jika page not found
app.use('/',(req, res)=>{
	res.send('Page Not Found : 404');
	res.status(404);
});





// Server Port 
app.listen (3000,()=>{
	console.log(`Server has running on port${port}`);
});