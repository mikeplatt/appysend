var nano = require("nano")('https://appy:snatch123@appy.cloudant.com/');

exports.index = function(req, res){
    
    var sentDB = nano.db.use('sent');
    
    sentDB.get('STATS', function(err, doc) {
        
        if(!err)
            doc.title = 'TEST';
            res.render('index', doc);
            
        
    });
};