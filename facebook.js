var graph = require('fbgraph');

var nano = require('./nano.js');
    
// couchDB email view username and password
var emailUser = 'appy';
var emailPassword = 'snatch123';

exports.createWallPost = function (thisCard) { 
    
    graph.setAccessToken(thisCard.token);
    
    var wallPost = { url: 'https://' + emailUser + ':' + emailPassword + '@appy.cloudant.com/sent/' + thisCard.docID + '/front.png', message: "TESTING TESTING 123" };
    
    graph.post(thisCard.address + "/photos", wallPost, function(err, res) {
        
        if(err) {
            
            console.log(err);
            
            nano.handleFail(thisCard);
        
        } else {
            
            console.log(res);
            
            nano.handleSent(thisCard);
        }
    });
};