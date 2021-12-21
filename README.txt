Project Title:

8th Light Technical Task - William Peake
Google Books Search Application

Project Description:

The application allows the user to search the Google Books library via its API and build a reading list of their
selections. This application will display up to five books that match the search term entered by the user, and will
allow the user to select one of those books to add to their reading list if they wish. After each search, the user will
be asked if they want to see their full reading list as they add to it.

I used node.js to build this application as it allowed me to interact with the Google Books API simply via the command
line, and has several packages that were useful when tackling this task, most notably 'axios' to fetch the API results
and 'inquirer' to communicate with the user and make use of their responses.

As you will see from the earlier versions provided within his project, I had several challenges which required me to
re-think my approach to the build process. I initially began using the 'yargs' package to build a simple command line
application that would allow me to interact at the command line and allow me to get the Google Books API up and running.
However, I found that I was able to run the programme, send one search query to the API and receive the correct
response in the terminal, but I was not able to send another query without restarting the application or store the
results. Therefore, I researched some command line node.js packages and found 'Inquirer', which was a much better fit
for the requirements of the application in my view. With more time, I would have liked to build a version using the
JS reactive interface to better structure the questions posed to the user as described in the package documentation
(npmjs.com/package/inquirer).

Pre-Requirements:

The application uses Node.js and will require the following packages to be installed:

- yargs (npm install yargs)
- inquirer (mpn install inquirer)
- axios (npm install axios)

How to Use the Application:

The application is very simple to use, please follow the steps below:

    1. Open the project folder in your IDE and type into your terminal: 'node index.js' then click enter.
    2. The application will send a prompt to the terminal stating 'search for books here:'
    3. Enter your search term eg, harry potter or tolkien
    4. The application will search the Google Books API and display up to five results which match your search term
    5. Each result will be labelled Book Result 1, Book Result 2 etc
    6. The application will then ask if you wish to add any of these Book Results to your reading list, you can select your
        preferred option with the arrow keys, from 1 to none.
    7. The application will then ask if you wish to see your reading list, with 'yes' or 'no' as the possible answers
    8. If you choose to add a book to your reading list, the title will be confirmed as 'Added to your reading list'
    9. If you choose to see your reading list, it will displayed in the terminal after "Your reading list: "
    10. The application will then prompt you to search for books again, taking you back to step 2.

References:

Please find below the resources I used when researching and completing this project:

    - https://www.npmjs.com/package/inquirer
    - https://developer.okta.com/blog/2019/06/18/command-line-app-with-nodejs
    - https://developers.google.com/books/docs/v1/using
    - https://www.sitepoint.com/javascript-command-line-interface-cli-node-js/
    - https://www.educative.io/edpresso/how-to-use-the-inquirer-node-package
    - https://www.npmjs.com/package/yargs

Tests:

    Search terms:
        - 'potter' - OK
        - 'tolkien' - OK
        - 'le carre' - OK
        - 'sally rooney' - OK
        - '123' - OK
        - '[' - OK
        - '\\\' - OK
        - '000' - OK
        - 'author' - OK
        - '!!!' - OK
        
William Peake - 21/12/21





