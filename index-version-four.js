// William Peake - 8th Light Technical Assessment - Google Books API Search Command Line Application in Node.js
// Switched from using 'yargs' to 'inquirer' as this allows me to ask the user questions
// in a user friendly way and store their responses
const inquirer = require("inquirer");
const axios = require("axios");
// The prompts are displaying in the console but the application is asking if I want to add a book to the reading list before
// displaying the search results
// Adjustment required here, try encasing in two functions and calling seperately
// Error catching required for user responses
inquirer.prompt([
    {
        name: "search",
        message: "Search for books here:",
        type: "input",
    },
    {
        name: 'readingList',
        message: 'Do you wish to add one of these books to your reading list? If so, enter the book result number',
        type: "list",
        choices: ["1", "2", "3", "4", "5"],
    }])
    .then(function(answer){
        const searchTerm = (answer.search);
        console.log(searchTerm);
    // Google Books API fetching the correct results and in the desired format
    const url = `https://www.googleapis.com/books/v1/volumes?q=${escape(searchTerm)}&maxResults=5&printType=books&projection=lite&key=AIzaSyAuzM17rPkaMQexRubhznySq7cL0w_q6ZU`;

    axios.get(url, { headers: { Accept: "application/json" } })
        // Title, Author(s) and Publisher displayed to the user as required
        // Formatting required
        .then(res => {
                const books = (res.data.items);
                for (let i = 0; i < 5; i++) {
                    console.log("Book Result " + (i+1));
                    console.log("Title: " + books[i].volumeInfo.title);
                    console.log("Author(s): " + books[i].volumeInfo.authors);
                    console.log("Publisher: " + books[i].volumeInfo.publisher + "\n");
                }
            })
        })



