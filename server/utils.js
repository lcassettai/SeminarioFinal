const valoresRandom =  [0,1,2,3,4,5,6,7,8,9,
                        'A','B','C','D','E','F','G','H','I',
                        'J','K','L','M','N','O','P','Q','R',
                        'S','T','U','V','W','X','Y','Z'];

const generateRandomCode = (length = 6) =>{
    let randomCode = '';
    let index = 0;
    for(let i = 0; i < length; i++){
        index = Math.floor(Math.random() * valoresRandom.length);        
        randomCode += valoresRandom[index];
    }

    return randomCode;
}

module.exports = {
    generateRandomCode    
}