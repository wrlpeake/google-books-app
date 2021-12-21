// William Peake - 8th Light Technical Assessment - Google Books API Search Command Line Application in Node.js

// First tasks to complete are as follows:
// 1. Build simple app that can interact via the command line
// 2. Connect with Google Books API and fetch results

// 'yargs' is a simple way to interface via the command line, so here is where I will start...
const yargs = require("yargs");
// 'axios' will allow me to query the Google Books API in node.js,
const axios = require("axios");

// Enter your 'node .', then '-n' followed by your name, then '-s' followed by your search term to begin");
const options = yargs
    .usage("Usage: -n <name>")
    .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
    .option("s", { alias: "search", describe: "Search term", type: "string" })
    .argv;
// if your name is shown in the terminal, application is working correctly
const greeting = `Hello, ${options.name}!`;
console.log(greeting);

if (options.search) {
    console.log(`Searching for books about ${options.search}...`)
} else {
    console.log("Error");
}

// querying Google Books API successfully, now need to parse the JSON response into something useful
const url = options.search ? `https://www.googleapis.com/books/v1/volumes?q=${escape(options.search)}&key=AIzaSyAuzM17rPkaMQexRubhznySq7cL0w_q6ZU` : "error";

axios.get(url, { headers: { Accept: "application/json" } })

    .then(res => {
        if (options.search) {
            console.log(res.data.items);
        }
        else{
            console.log("no books found :'(");
        }
    });