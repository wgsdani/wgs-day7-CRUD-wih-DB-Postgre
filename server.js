const express = require('express');
const app = express()
const port = 3000



// View engine 'ejs'
app.set('view engine','ejs')

// mendefinisikan route path (/) yang merender index.html
app.get('/',(req,res) => {
	res.render('index', {
		name : "Dani",
		title : "Web Express"
	}),
	res.status(200);
});

// mendefinisikan route path (/about) yang merender about.html
app.get('/about',(req,res) => {
	res.render('about');
});

// mendefinisikan route path (/contact) yang merender contact.html
app.get('/contact',(req,res) => {
	res.render('contact');
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