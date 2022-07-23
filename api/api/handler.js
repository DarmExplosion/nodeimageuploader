/* Importing packages */
const chokidar = require('chokidar');
const fs = require('fs');


/* Call watcher */
let watcher = chokidar.watch('/var/www/flows.host/upload/end/', {ignored: /^\./, persistent: true});

watcher
    .on('add', function(path) {console.log('File', path, 'has been added'); postProc(path);})

function postProc(filename) {

    const change = filename;
    const postproc = change.split('/www/flows.host/upload/end').pop();
    const end = postproc.replace('/','').split('.');

    let user = end[0];
    let newfile = end[1] + '.' + end[2];

    fs.mkdirSync('/var/www/flows.host/users/' + user + '/' + end[1]);

    fs.rename('/var/www/flows.host/upload/end/' + postproc.replace('/','') , '/var/www/flows.host/users/' + user + '/' + end[1] + '/' + newfile , (end) => {
	console.log("moved")
    });

    const content = `<html> <head><meta property="og:title" content="${user}" /><meta name="twitter:card" content="summary_large_image"><meta property="og:type" content="image" /><meta name="twitter:image" content="https://flows.host/users/${user}/${end[1]}/${newfile}" /><meta property="og:url" content="https://flows.host/users/${user}/" /> </head> <style> body { background-color: #262626; } h1{ border: 5px solid #a200ff; border-radius: 5px; text-align: center; font-family: monospace; margin-left: 40%; margin-right: 40%; } .wfws{ display: block; margin-left: auto; margin-right: auto; width: 50%; } </style> <body> <h1> Uploader: ${user} </h1> <img class="wfws" src="${newfile}"> </body> </html>`;

    fs.writeFile('/var/www/flows.host/users/' + user + '/' + end[1] + '/' + end[1] + '.html', content, err => {
        if (err) {
	    console.error(err);
        }
    });

    console.log("user=" + user + "; file =" + newfile + "; end=" + end + "postproc =" + postproc);

}
