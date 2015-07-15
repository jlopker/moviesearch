// Nodemailer
var nodemailer = require("nodemailer");

var smtpTransport = nodemailer.createTransport({
   service: "gmail",  // sets automatically host, port and connection security settings
   auth: {
       user: "julianamoviesearch@gmail.com",
       pass: "moviesearch"
   }
});

exports.sendinfo = function(req, res){
  smtpTransport.sendMail({  //email options
     from: "Juliana <julianamoviesearch@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
     to: req.body.email, // receiver
     subject: "IMDb info for " + req.body.results.Title, // subject
     html: "<h1>" + req.body.results.Title + "</h1>" + "<br>Director: " + req.body.results.Director + "<br>Plot: " + req.body.results.Plot + "<br><br>http://imdb.com/title/" + req.body.results.imdbID
  }, function(error, response){  //callback
     if(error){
         console.log(error);
         res.send("error");
     }else{
         console.log("Message sent!");
         res.send("success");
     }
     
     smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
  });
};

