
const coma = ",";
const closebracket = ")";
//const multer = require("multer");
const express = require("express");
const app = express(); // creating session of the express function 
//var session = require('express-session');
//const storage = multer.diskStorage({

//})
const mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MySQL@123',
    database: 'mydatabase'

});
// app.use(session({
//     secret : 'keyboard ',
//     saveUninitialized :true ,
//     store: connection,
//     cookie:{secure:true ,maxAge : 6000},
//     resave:false
// }));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));  // translater of japnese into hindi for us

app.get('/register', (req, res) => {
    res.render('register');
});
app.post('/register', (req, res) => {
    var ur = req.body;
    var firstnameR = ur.firstname;
    var lastnameR = ur.lastname;
    var genderR = ur.gender;
    var mobileR = ur.mobileno;
    var emailR = ur.email;
    var passwordR = ur.Password;
    var sql1 = "insert into signup (firstname ,lastname, gender , phone_number,email,password)values (" + mysql.escape(firstnameR)
        + coma + mysql.escape(lastnameR) + coma + mysql.escape(genderR) + coma + mysql.escape(mobileR) + coma + mysql.escape(emailR) + coma + mysql.escape(passwordR) + closebracket;
    console.log(sql1);

    connection.connect((error) => {
        if (error) { throw error };
        console.log('register page connected successfully');
    });
    // "select * from signup where password ="+mysql.escape(password)
    connection.query(sql1, function (err, result, fields) {
        if (err) { throw err };
       
        //  var name = result[0].firstname;
        //  res.render('homepage',{name});

    });
   
    connection.end();
    res.redirect('http://localhost:3000');
});

app.get('/', (req, res) => {
    res.render('login');
});
app.post('/login', (req, res) => {
    var ur = req.body;
    console.log(ur);
    var emailL = ur.email;
    var passL = ur.password;
    var sql = 'SELECT * from signup where email =' + mysql.escape(emailL);
    connection.connect((error) => {
        if (error) throw error;
        console.log('connected successfully');

    });
    connection.query(sql, function (error, results, fields) {
        if (error) { throw error };
        console.log(results);
        var result = results[0];
        if (passL === result.password) {
            var name = result.firstname;
            res.render('homepage', { name });
        } else {
            res.send("password is incorrect")
        };
    });
    connection.end();
});
app.listen(3000, () => {
    console.log("connection is set at port 3000");
}
);



