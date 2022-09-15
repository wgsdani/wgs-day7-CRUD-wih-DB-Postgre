const { rejects } = require('assert');
const { error } = require('console');
const fs = require('fs');
const { resolve } = require('path');
const pool = require('../db')

// Cek Folder Data
const dirPath = './data';
if(!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// Cek FIle contact.json
const filePath = './data/contact.json';
if(!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, '[]', 'utf-8');
}

// Read Data
const loadContact = async() => {
   // Mengubah data ke database
    return new Promise ((resolve, rejects)=>{
      pool.query(`SELECT * FROM tb_contacts`,(error, result)=>{
          resolve(result.rows)
      })
    })
}

// Search Data
const findContact = async(nama) => {
  return new Promise ((resolve, rejects)=>{
    pool.query(`SELECT * FROM tb_contacts WHERE name = '${nama}'`,(error, result)=>{
        resolve(result.rows[0])
    })
  })
}

// // Cek Duplikat
const cekDuplikat = async(nama) => {
  return new Promise ((resolve, rejects)=>{
    pool.query(`SELECT * FROM tb_contacts WHERE name = '${nama}'`,(error, result)=>{
        resolve(result.rows[0])
    })
  })
}

// Save Data
const saveContact = (contacts) => {
  fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2));
}

// Create Contact
const addContact = async(name, mobile, email) => {
   pool.query (`INSERT INTO public.tb_contacts values ('${name}','${mobile}','${email}') RETURNING *`)
}

// Delete Data
const deleteContact = async(name) => {
  pool.query (`DELETE FROM public.tb_contacts WHERE name= '${name}'`)
}

// Update Data Contact by Name
const updateContact = async(oldNama, name, mobile, email) => {
  pool.query (`UPDATE tb_contacts SET name= '${name}',mobile= '${mobile}',email= '${email}'WHERE name= '${oldNama}'`)
};

module.exports = { loadContact, findContact, saveContact, addContact, cekDuplikat, deleteContact, updateContact };