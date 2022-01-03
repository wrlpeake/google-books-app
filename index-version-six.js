// William Peake - 8th Light Technical Assessment - Google Books API Search Command Line Application in Node.js
// Saved as index-version-six before re-factoring code to remove inconsistent async/await and .then() usage

// The two packages required to execute the programme are 'Inquirer', which allows me to ask the user questions and record their answers
// The 'axios' package allows me to access the Google Books API
const inquirer = require("inquirer");
const axios = require("axios");

// The myReadingList array is declared outside of the readingList function to store each book title
const myReadingList = [];

// The searchBooks() function prompts the user to enter a search term which will used to query the Google Books API
// The title, author(s) and publisher of each book is displayed in the terminal
// The title of the five books is stored in a local array searchResults, which is returned for use in the readlingList() function
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
            // The API query below limits the results to five (&maxResults=5) and only gets books (printType=books)
            // My API key is visible in the following URL, if this program were to be published, I would store the key in an enviroment variable
            const url = `https://www.googleapis.com/books/v1/volumes?q=${escape(searchTerm)}&maxResults=5&printType=books&projection=lite&key=AIzaSyAuzM17rPkaMQexRubhznySq7cL0w_q6ZU`;

            axios.get(url, {headers: {Accept: "application/json"}})

                .then(res => {
                    const books = (res.data.items);
                    for (let i = 0; i < 5; i++) {
                        // addresses MR's feedback for if less than five book results are returned
                        if (books[i] == null)
                            return searchResults;
                        else {
                            console.log("\n" + "Book Result " + (i + 1));
                            console.log("Title: " + books[i].volumeInfo.title);
                            console.log("Author(s): " + books[i].volumeInfo.authors);
                            console.log("Publisher: " + books[i].volumeInfo.publisher + "\n");
                            searchResults.push(books[i].volumeInfo.title)
                        }
                    }
                })
                // added error catching after Matt's feedback, incorrect search terms will now display
                // an error message rather than crashing the programme
                .catch(err => console.error("No books found, search again"))
        })
        .catch(err => console.error("Incorrect search term, search again"))

    return searchResults;
}
// The readingList function takes the array of book titles returned by searchBooks and queries the user if they wish to save a book to the waiting list
// A list is shown to the user which allows them to choose from books 1 to 5 or none.
// If they choose to add a book to the waiting list, the title of that book is added to their reading list and confirmed to the user
// The user will then be asked if they wish to view their reading list or not
async function readingList(searchResult) {

    // The await inquirer.prompt asks both questions of the user then waits for their response before executing their request
    // Using "list" as the prompt type reduces the likelihood of errors from a free-type response
    const answer = await inquirer.prompt([
        {
            name: "addToReadingList",
            message: "Do you wish to add one of these books to your reading list? If so, select the book result number",
            type: "list",
            choices: ["1", "2", "3", "4", "5", "none"],
        },
        {
            name: "displayReadingList",
            message: "Do you wish to see your reading list?",
            type: "list",
            choices: ["Yes", "No"]
        }
    ])
    // If the user chooses to add a book to the waiting list, the book title is pushed from the parameter array
    // to the myReadingList array declared at the beginning of the program, which holds the reading list
    const bookIndex = (answer.addToReadingList);
    let showReadingList = (answer.displayReadingList);
    if (bookIndex == "none")
        // added additional new lines to stop fifth book result disappearing once
        // reading list question appears but does not resolve the problem - considering other options
        console.log("\n" + "No book selected - search again");
    else {
        myReadingList.push(searchResult[(bookIndex - 1)])
        console.log("\n" + searchResult[(bookIndex - 1)] + " - Added to your Reading List");
    }
    if (showReadingList == "Yes") {
        console.log("\n" + "Your Reading List: " + myReadingList.join(" | "));
    }
    else {
        console.log("\n" + "You have chosen not to see your reading list - search again");
    }

}

// The main function below calls first the searchBooks() function to prompt the user to enter a search term,
// then the readingList function is called with the search results as the parameter
// I have set an arbitary limit of 100 searches of this programme, but this could be adjusted depending on
// reading list limits or constraints to the API calls allowed by Google etc.
async function main() {

    let i = 0;
    while ( i < 100 ) {
        const search = await searchBooks()
        const addToReadingList = await readingList(search)
    i++;
    }
    return true;
}

main()







