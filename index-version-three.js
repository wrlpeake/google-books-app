// William Peake - 8th Light Technical Assessment - Google Books API Search Command Line Application in Node.js

const yargs = require("yargs");
const axios = require("axios");

// Note to user: Enter your 'node .', then '-n' followed by your name, then '-s' followed by your search term to begin");
// 'Yargs' allows me to query the Google Books API and receive the results, but does not allow me to ask the
// user multiple questions as I can only search when I initialise the programme.
// Different solution required - create new branch
const options = yargs
    .usage("Usage: -n <name>")
    .option("n", { alias: "name", describe: "Your name", type: "string", demandOption: true })
    .option("s", { alias: "search", describe: "Search term", type: "string" })
    .option("a", { alias: "add", describe: "add to reading list", type: "integer"})
    .argv;
// Remove greeting, displaying in terminal correctly
const greeting = `Hello, ${options.name}!`;
console.log(greeting);

if (options.search) {
    console.log(`Searching for books about ${options.search}...`)
} else {
    console.log("Error");
}

const readingList = [];
// Google Books API working correctly and fetching results
const url = options.search ? `https://www.googleapis.com/books/v1/volumes?q=${escape(options.search)}&maxResults=5&printType=books&projection=lite&key=AIzaSyAuzM17rPkaMQexRubhznySq7cL0w_q6ZU` : console.log("error");

axios.get(url, { headers: { Accept: "application/json" } })

    .then(res => {
        if (options.search) {
            const books = (res.data.items);
            for (let i = 0; i < 5; i++) {
                console.log("Title: " + books[i].volumeInfo.title);
                console.log("Author(s): " + books[i].volumeInfo.authors);
                console.log("Publisher: " + books[i].volumeInfo.publisher + "\n");
            }
            console.log("Do you wish to one of these books to your reading list? If so, enter '-a' followed by the search result number");
            //readingList.push(books[${options.add}].volumeInfo.title);
            //console.log(books[0].volumeInfo);
        }
        else{
            console.log("no books found");
        }
    });