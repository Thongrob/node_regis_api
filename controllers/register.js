const conn = require('../configuration/db_conention')
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.register = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let fname = req.body.fname;
  let lname = req.body.lname;
  let phone = req.body.phone;

  
  if(email == '' || email == undefined || email == null) {
    res.json({
      status: "Error",
      message: "Pleas fill your Email."
    })
  } else if (password == '' || password == undefined || password == null) {
    res.json({
      status: "Error",
      message: "Pleas fill your Password."
    })
  } else if (fname == '' || fname == undefined || fname == null) {
    res.json({
      status: "Error",
      message: "Pleas fill your First name."
    })
  } else if (lname == '' || lname == undefined || lname == null) {
    res.json({
      status: "Error",
      message: "Pleas fill your Last name."
    })
  } else if (phone == '' || phone == undefined || phone == null) {
    res.json({
      status: "Error",
      message: "Pleas fill your Phone number."
    })
  } else {
    //Hash password with Bcrypt
    bcrypt.hash(password, saltRounds, function(err, hash) {
        
      //Protect SQL injection
      conn.execute('INSERT INTO all_users (email, password, fname, lname, phone) VALUES(?, ?, ?, ?, ?)', 
        [email, hash, fname, lname ,phone], 
        (err, results, fields) => {
          if(err) {
            res.json({
              status : "Error",
              message: err
            })
            return
          }
          res.json({
            status: "Successful",
            data: results
          })
        }
      )
    });      
  }
  


  
  
}