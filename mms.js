var fs = require('fs'),
    quick = require('nano')('https://appy:snatch123@appy.cloudant.com/'),
    intelliSMS = require('intellisms');
    
var nano = require("./nano");
    
var smsUserName = 'mikeplatt';
var smsPassword = 'snatch123';

var sms = new intelliSMS(smsUserName, smsPassword);

var sentDB = quick.use('sent');

exports.createMMS = function(thisCard) {

    sentDB.attachment.get(thisCard.docID, 'front.png', function(err, body) {
        
        if (err) {
            
            console.log(err);
            
        } else {
            
            var frontFile = __dirname + '/downloads/' + thisCard.docID + 'front.png';
            
            fs.writeFile(frontFile, body, 'image/png', function(err, res){
                
                if(err) {
                    
                    console.log(err);
                    
                } else {
            
                    var options = {
                        
                        to: thisCard.address,
                        text: "Appy Birthday!"
                        
                    };
                
                    var files = fs.createReadStream(frontFile);
                    console.log(files);
                    
                    sms.SendMMSMessage(options, files, function(err, id) {
            
                        if (err) {
                            
                            nano.handleFail(thisCard);
                            
                        } else {
                            
                            nano.handleSent(thisCard);
                            
                            fs.unlink(frontFile);
                        } 
                    });
                }
            });
        }
    });
};