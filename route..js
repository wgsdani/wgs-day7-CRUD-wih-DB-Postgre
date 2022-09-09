const fs = require('fs');



// mendefisikan per-route  (page not found)
const routes = (route,res) => {
	fs.readFile(route, (err,data) => {
		if (err){
			res.writeHead (404);
			res.write ('Error : Page not found');
			res.end();
		}
		else{
			res.write(data);
			res.end();
		}
	});
};

module.exports = {routes};