// William Peake - 8th Light Technical Assessment - Google Books API Search Command Line Application in Node.js
// Version Five - tidying up search results and reading list display to the user
const inquirer = require("inquirer");
const axios = require("axios");

const myReadingList = [];

async function searchBooks() {
    const searchResults = [];
    await inquirer.prompt([
        {
            name: "search",
            message: "Search for books here:",
            type: "input",
        }
    ])
        .then(function (answer) {
            const searchTerm = (answer.search);
            console.log("You have searched for: " + searchTerm);
            // Google API returning search results correctly and in the desired format
            const url = `https://www.googleapis.com/books/v1/volumes?q=${escape(searchTerm)}&maxResults=5&printType=books&projection=lite&key=AIzaSyAuzM17rPkaMQexRubhznySq7cL0w_q6ZU`;

            axios.get(url, {headers: {Accept: "application/json"}})

                .then(res => {
                    const books = (res.data.items);
                    for (let i = 0; i < 5; i++) {
                        console.log("\n" + "Book Result " + (i + 1));
                        console.log("Title: " + books[i].volumeInfo.title);
                        console.log("Author(s): " + books[i].volumeInfo.authors);
                        console.log("Publisher: " + books[i].volumeInfo.publisher + "\n");
                        searchResults.push(books[i].volumeInfo.title)
                    }
                })
        });
    console.log(searchResults);
    return searchResults;
}

// At this point, I am able to call the API and parse the results, as well as add to the reading list. My next task to convert
// the results from the API from arrays to strings and add an additional prompt to ask the user if they wish to see the waiting list
async function readingList(searchResults) {

    await inquirer.prompt([
        {
            name: 'readingList',
            message: 'Do you wish to add one of these books to your reading list? If so, enter the book result number',
            type: "list",
            choices: ["1", "2", "3", "4", "5", "none"]
        }])
        .then(function (answer) {
            const bookIndex = (answer.readingList);
            if (bookIndex == "none")
                return console.log(myReadingList);
            else {
                console.log(searchResults[(bookIndex - 1)]);
                myReadingList.push(searchResults[(bookIndex - 1)])
                return console.log(myReadingList);
            }
        });

}
// arbitary limit of ten interations to check if the functions are working correctly
async function main() {

    let i = 0;
    while ( i < 10 ) {
        const search = await searchBooks()
        const addToReadingList = await readingList(search)
    i++;
    }
}

main()









