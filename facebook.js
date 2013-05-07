var graph = require('fbgraph');

var nano = require('./nano.js');
    
// couchDB email view username and password
var emailUser = 'appy';
var emailPassword = 'snatch123';

exports.createWallPost = function (thisCard) { 
    
    graph.setAccessToken(thisCard.token);
    
    var wallPost = { url: 'https://' + emailUser + ':' + emailPassword + '@appy.cloudant.com/sent/' + thisCard.docID + '/front.png', message: "Appy Birthday!" };
    
    graph.post(thisCard.address + "/photos", wallPost, function(err, res) {
        
        if(err) {
            
            nano.handleFail(thisCard);
        
        } else {
            
            nano.handleSent(thisCard);
        }
    });
};