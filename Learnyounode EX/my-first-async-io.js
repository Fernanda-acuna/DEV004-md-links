var fs = require('fs'); 
//const contents = fs.readFile(process.argv[2])
//     const lines = contents.toString().split('\n').length - 1
//     console.log(lines)var fs = require('fs');
var file = process.argv[2];
fs.readFile(file, function(err, data) {
    if (err) {
        console.error(err);
    } else {
        console.log(data.toString().split('\n').length-1); 
    }
});