/**download file by url */
module.exports = (file_url) => {
    const fs = require('fs');
    const url = require('url');
    const http = require('http');

    const DOWNLOAD_DIR = './';

    // Function to download file using HTTP.get
    const options = {
        host: url.parse(file_url).host,
        port: 80,
        path: url.parse(file_url).pathname
    };

    const file_name = url.parse(file_url).pathname.split('/').pop();
    const file = fs.createWriteStream(DOWNLOAD_DIR + file_name);

    http.get(options, function (res) {
        res.on('data', function (data) {
            file.write(data);
        }).on('end', function () {
            file.end();
            console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
        });
    });
}