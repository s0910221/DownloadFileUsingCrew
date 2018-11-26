const request = require('request')
const jsdom = require('jsdom')
const download_file_httpget = require('./downloadByUrl');

const {
    JSDOM
} = jsdom;

const options = {
    method: 'GET',
    // enter your url
    url: 'https://xxx.yyy'
};

const detailDownload = (link) => {
    const detailOption = {
        method: 'GET',
        url: link
    };
    request(detailOption, (error, response, body) => {
        if (error) throw new Error(error);
        const dom = new JSDOM(body);
        const link = site + dom.window.document.querySelector('div a.btn.black').href;
        download_file_httpget(link);
    });
}

// get all download link
request(options, (error, response, body) => {
    if (error) throw new Error(error);
    const dom = new JSDOM(body);
    // write your logic by DOM
    const linkEls = dom.window.document.querySelectorAll('ul.row>li>a');
    const links = Array.from(linkEls).map(x => x.href);
    links.forEach(x => detailDownload(x));
});