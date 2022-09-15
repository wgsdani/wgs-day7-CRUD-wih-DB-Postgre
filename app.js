const express = require("express"); // Module Express
const expressLayouts = require("express-ejs-layouts"); // Module Layout EJS
const { body, validationResult, check } = require('express-validator'); // Express Validator
const morgan = require('morgan');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const app = express();
const pool = require('./db')

const { 
  loadContact, 
  findContact, 
  addContact, 
  cekDuplikat, 
  deleteContact, 
  updateContact 
}= require('./utils/contacts'); // Local Module



//Port Server
const port = 3000; 
// Templating Engine | Layout Page
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use('/public', express.static(__dirname + '/public')); // Middleware untuk public(img,css)
app.use(express.urlencoded({ extended: true })); // Untuk parsing body request
app.use(morgan('dev')); // Middleware Morgan di log

app.use(cookieParser('secret'));
app.use(
    session({
        cookie: { maxAge: 6000 },
        secret: 'secret',
        resave: true,
        saveUninitialized: true,
    })
);
app.use(flash());

// Level MiddleWare
// app.use((req, res, next) => {
//   console.log('Time:', Date.now())
//   next();
// });


//================================================================================================== 

// Menampilkan FIle index.html
app.get('/', (req, res) => {
  res.render('index', {
    nama: 'Dani',
    title: 'Home',
    layout: 'layouts/main-layouts'
  });
});

// Menampilkan File about.html
app.get('/about', (req, res) => {
  res.render('about', { 
    nama: 'Dani',
    deskripsi: 'Peserta Bootcamp Batch #3',
    title: 'About Page',
    layout: 'layouts/main-layouts' 
  });
});

// Menampilkan Data Contact
app.get('/contact', async(req, res) => {
  const contacts = await loadContact();
//   console.log("asdasd",contacts);
  res.render('contact', {
    title: 'Contact Page',
    layout: 'layouts/main-layouts',
    contacts : contacts,
    msg: req.flash('msg')
  });
});

// Menambah Data Contact
app.get('/contact/add', (req, res) => {
  res.render('add', {
    title: 'Add Page',
    layout: 'layouts/main-layouts'
  });
});

// ================================================================================================

// Proses Menyimpan Data Contact
app.post('/contact', [
  body('nama').custom(async(value) => {
      const duplikat = await cekDuplikat(value);
	//   console.log("asdasd", duplikat);
      if(duplikat) {
        throw Error('Sorry, contact has already exist .');
    }
      return true;
    }),
  check('email', 'Email not Valid').isEmail(),
  check('mobile', 'Mobile not Valid').isMobilePhone('id-ID') ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('add', {
        title: 'Add Page',
        layout: 'layouts/main-layouts',
        errors: errors.array()
      });
    } else {
      addContact(req.body.name, req.body.mobile, req.body.email);
      req.flash('msg', 'Successed insert data!');
      res.redirect('/contact');
    }
});

// Menghapus Data Contact
app.get('/contact/delete/:nama', async(req, res) => {
//   const contact = findContact(req.params.nama);
//   if(!contact) {
//     return res.send('Sorry contact name has not already!');
//   }
  await deleteContact(req.params.nama);
  req.flash('msg', 'Successed deleted data!');
  res.redirect('/contact');
});

// Mengedit Data
app.get('/contact/edit/:nama', async(req, res) => {
  const contact = await findContact(req.params.nama);
  res.render('editContact', {
    title: 'Edit Page',
    layout: 'layouts/main-layouts',
    contact : contact
  });
});

//proses Mengubah Data contact
app.post('/contact/update', [
  body('nama').custom(async(value, { req }) => {
      const duplikat = await cekDuplikat(value);
      if (value !== req.body.oldNama && duplikat) {
          throw new Error('Name has already exist!');
      }
      return true;
  }),
  check('email', 'Email not valid!').isEmail(),
  check('mobile', 'Mobile not valid!').isMobilePhone('id-ID')
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render('editContact', {
            title: "ExpressJS",
            layout: "layouts/main-layouts",
            errors: errors.array(),
            contact: req.body,
        });
    } else{
        updateContact (req.body.oldNama, req.body.name, req.body.mobile, req.body.email);
        req.flash('msg', 'Contact has been updated!');
        res.redirect('/contact');
    }
});


// Detail Contact Berdasarkan Nama
app.get('/contact/:nama', async(req, res) => {
  const contact = await findContact(req.params.nama);
  console.log("asdasd",contact);
  res.render('detail', {
    title: 'Detail Page',
    layout: 'layouts/main-layouts',
    contact : contact
	
  });
});

// Connection Database

app.get("/addasync", async(req,res)=>{
    try {
        const name = "dani"
        const mobile = "0896988449"
        const email = "dani@email.com"
        const newCount = await pool.query(`INSERT INTO tb_contacts VALUES('${name}','${mobile}','${email}') RETURNING *`)
        res.json(newCount)
    } catch (err) {
        console.log(err.message);
    }
})
// Server Port
app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});