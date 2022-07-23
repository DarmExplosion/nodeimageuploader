# bare-image-api
Image uploader Api written in Node.js and PHP. By watching the upload directory, the JavaScript Code also creates a webpage for every image uploaded.

## Installation
### Web server
You need to run this on a web server like [NGNIX](https://www.nginx.com) in your `var/www/your.domain` directory.

### Install Node.js packages

> Since program is written in Node.js you need to have [Node.js](https://nodejs.org) installed.

Installing [`chokidar`](https://www.npmjs.com/package/chokidar) in your terminal:

```bash
npm i chokidar
```

### Running the project
Running the Node.js handler:
```bash
cd api
node handler.js
```

Your uploader should be available at `your.domain/upload/upload.php`.

Webpages should be created at `var/www/your.domain/users/username/filename/filename` as a HTML file.
