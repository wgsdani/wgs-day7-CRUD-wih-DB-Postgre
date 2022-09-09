const express = require('express');
const app = express()
const port = 3000
// const expressLayouts = require('express-ejs-layouts');



// View engine 'ejs'
app.set('view engine','ejs')
// app.use(expressLayouts);

// mendefinisikan route path (/) yang merender index.html
app.get('/',(req,res) => {
	res.render('index', {
		name : "Dani",
		title : "Web express EJS"
	}),
	res.status(200);
});

// mendefinisikan route path (/about) yang merender about.html
app.get('/about',(req,res) => {
	res.render('about',{
		title : "About - Web express EJS"
	});
	
});

// mendefinisikan route path (/contact) yang merender contact.html
app.get('/contact',(req,res) => {
	res.render('contact', {
		title : "Contact - Web express EJS",
	
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


// app.get('/product/:id/?kategori',(req,res) => {
// 	res.send('product id : '+ req.params.id +" "+ req.params.kategori);
// });

// mendefinisikan middleware test
// app.use('/',(req, res)=>{
// 	res.send('test');
// });

// mendefinisikan middleware jika page not found
app.use('/',(req, res)=>{
	res.send('Page Not Found : 404');
	res.status(404);
});





// Server Port 
app.listen (3000,()=>{
	console.log(`Server has running on port${port}`);
});