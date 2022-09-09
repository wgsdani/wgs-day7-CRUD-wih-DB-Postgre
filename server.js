const express = require('express');
const app = express()
const port = 3000


// mendefinisikan route path (/) yang merender index.html
app.get('/',(req,res) => {
	res.sendFile(__dirname +'/views/index.html');
	res.status(200);
});

// mendefinisikan route path (/about) yang merender about.html
app.get('/about',(req,res) => {
	res.sendFile(__dirname +'/views/about.html');
});

// mendefinisikan route path (/contact) yang merender contact.html
app.get('/contact',(req,res) => {
	res.sendFile(__dirname +'/views/contact.html');
});

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