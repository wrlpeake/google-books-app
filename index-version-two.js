// William Peake - 8th Light Technical Assessment - Google Books API Search Command Line Application in Node.js

// Using 'yargs' to be able to submit search terms to the program via the command line
// 'axios' allows me to access the API
// Not sure if 'yargs' is the correct package to achieve overall functionality, research other options...
const yargs = require("yargs");
const axios = require("axios");

// Enter your 'node .', then '-n' followed by your name, then '-s' followed by your search term to begin");

const options = yargs
    .usage("Usage: -n <name>")
    .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
    .option("s", { alias: "search", describe: "Search term", type: "string" })
    .argv;
// Checking that search terms and names have been read correctly by the application
const greeting = `Hello, ${options.name}!`;
console.log(greeting);

if (options.search) {
    console.log(`Searching for books about ${options.search}...`)
} else {
    console.log("Error");
}

// Google Books API working correctly!
const url = options.search ? `https://www.googleapis.com/books/v1/volumes?q=${escape(options.search)}&maxResults=5&printType=books&projection=lite&key=AIzaSyAuzM17rPkaMQexRubhznySq7cL0w_q6ZU` : "error";

axios.get(url, { headers: { Accept: "application/json" } })
// Able to display results but need to store them so I can create a waiting list
    .then(res => {
        if (options.search) {
            const books = (res.data.items);
            for (let i = 0; i < 5; i++) {
                console.log("Title: " + books[i].volumeInfo.title);
                console.log("Author(s): " + books[i].volumeInfo.authors);
                console.log("Publisher: " + books[i].volumeInfo.publisher + "\n");
            }

        }
        else{
            console.log("no books found :'(");
        }
    });