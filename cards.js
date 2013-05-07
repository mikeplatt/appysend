exports.new = function (docID, revID, userID, state, where, name, address, token) {
    
    console.log('DOC ID: ' + docID);
    
    var thisCard = { 'docID' : docID, 'revID' : revID, 'state' : state, 'where' : where, 'name': name, 'address' : address, 'token' : token };
    
    console.log('HIT THIS');
    
    return thisCard;

};