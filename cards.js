exports.new = function (docID, revID, userID, state, where, name, address, token) {
    
    var thisCard = { 'docID' : docID, 'revID' : revID, 'state' : state, 'where' : where, 'name': name, 'address' : address, 'token' : token };
    
    return thisCard;

};