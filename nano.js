var nano = require('nano')('https://appy:snatch123@appy.cloudant.com/');

var email = require('./email.js'),
    facebook = require("./facebook.js"),
    mms = require("./mms.js"),
    cards = require('./cards.js');

// couchDB
var sentDB = nano.db.use('sent');

function handleError (err) {
    console.log(err);
}

function handleSaveResponse(res) {
    console.log(res);
}

function handleQueryResponse(doc) {
    
    var thisCard = cards.new(doc._id, doc._rev, doc.userID, doc.state, doc.where, doc.name, doc.address, doc.token);
    
    if(doc.where == 'facebook') {
        
        console.log('HIT FACEBOOK');
        
        facebook.createWallPost(thisCard);
        
    } else if(doc.where == 'MMS') {
        
        console.log('HIT MMS');
        
        mms.createMMS(thisCard);
        
    } else {
        
        console.log('HIT EMAIL');
        
        email.createEmail(thisCard);
    }
}

    
exports.createQuery = function() {
    
    console.log('HIT QUERY');
    
    var startDate = new Date();
    
    startDate.setHours('00'); startDate.setMinutes('00'); startDate.setSeconds('00');
    
    var startJSON = startDate.toJSON();
    
    var endDate = new Date();
    
    endDate.setHours('23'); endDate.setMinutes('59'); endDate.setSeconds('59');

    var endJSON = endDate.toJSON();
    
    sentDB.view('state', 'pending', { endkey : endJSON }, function(err, res) {
        
        if (err) {
            
            handleError(err);
            
        } else {
            
            res.rows.forEach(function(doc) {
                
                handleQueryResponse(doc.value);
                
            });
        }
    });
};

exports.handleSent = function (thisCard) {
    
    sentDB.atomic('state', 'sent', thisCard.docID, {}, function(err, res) {

        if (err) 
            handleError(err);
        else 
            handleSaveResponse(res);
            
    });
};

exports.handleFail = function (thisCard) {
    
    sentDB.atomic('state', 'returned', thisCard.docID, {}, function(err, res) {

        if (err) 
            handleError(err);
        else 
            handleSaveResponse(res);
            
    });
};


