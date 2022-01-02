// Reactive interface from research would allow more possibilities for parsing the user responses but requires more research

import {Observable} from 'rxjs';
const inquirer = require("inquirer");
const axios = require("axios");
var prompts = new Rx.Subject();

inquirer.prompt(prompts);

prompts.next(
    {
        name: "search",
        message: "Search for books here:",
        type: "input",
    }
    .then(function(answer){
        const searchTerm = (answer.search);
        console.log(searchTerm);

        const url = `https://www.googleapis.com/books/v1/volumes?q=${escape(searchTerm)}&maxResults=5&printType=books&projection=lite&key=AIzaSyAuzM17rPkaMQexRubhznySq7cL0w_q6ZU`;

        axios.get(url, { headers: { Accept: "application/json" } })

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
);
prompts.next(
    {
        name: "readingList",
        message: "Do you wish to add one of these books to your reading list? If so, enter the book result number",
        type: "list",
        choices: ["1", "2", "3", "4", "5"]
    }
    .then(function(answer) {
        const addtoReadingList = (answer.readingList);
        console.log(addtoReadingList);
    })
);

prompts.complete();


