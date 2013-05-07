var nodemailer = require('nodemailer');

var nano = require('./nano.js');
    
// couchDB email view username and password
var emailUser = 'appy';
var emailPassword = 'snatch123';

var mailOptions = {
    from: "Appy App <info@avoidthedoghouse.co.uk>", // sender address
    subject: "Appy Birthday" // Subject line
};

// email generation
var smtpTransport = nodemailer.createTransport("SMTP",{
    host:"auth.smtp.1and1.co.uk",
    auth: {
        user: "info@avoidthedoghouse.co.uk",
        pass: "theMOO2009"
    }
});

exports.createEmail = function (thisCard) {

    mailOptions.to = thisCard.address;
    mailOptions.html = '<p>' + thisCard.name + ' has sent you one of our eCards - Appy Birthday! </p><p><img src="https://' + emailUser + ':' + emailPassword + '@appy.cloudant.com/sent/' + thisCard.docID +'/front.png" width="320px" height="460px"/><img src="https://' + emailUser + ':' + emailPassword + '@appy.cloudant.com/sent/' + thisCard.docID +'/back.png" width="320px" height="460px"/></p>';

    smtpTransport.sendMail(mailOptions, function(err, res) {
        
        if(err){
            
            console.log(err);
            
            nano.handleFail(thisCard);
            
        } else {
            
            console.log("EMAIL SENT: " + res.message);
            
            nano.handleSent(thisCard);
        }

        // if you don't want to use this transport object anymore, uncomment following line
        //smtpTransport.close(); // shut down the connection pool, no more messages
    });
}