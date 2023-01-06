const http = require('http'),
    fs = require('fs');

const randomPath = require('./create_random_path');
const ImageServiceURL = 'http://image_microservice:1234';

// Example payload /?sname=Nghia&cname=abc&lname=1&o=1 for image with html tag

let payloadGenerate = (learner_name, course_name, lecturer_name) => {
    return `${ImageServiceURL}/?sname=${learner_name}&cname=${course_name}&lname=${lecturer_name}&o=1`;
}

module.exports = (learner_name, course_name, lecturer_name, callback) => {
    var request = http.get(payloadGenerate(learner_name, course_name, lecturer_name), function(response) {
        if (response.statusCode === 200) {
            var file = fs.createWriteStream("/tmp/file.html");
            stream = response.pipe(file);
            file.on('finish', () => {
                file.close();
                let newPath = randomPath.getRandomPathFromFile("/tmp/file.html");
                fs.rm("/tmp/file.html", () => {callback(newPath);});
            })
        }
        // Add timeout.
        request.setTimeout(12000, function () {
            request.destroy();
            callback(null);
        });
    });
}


