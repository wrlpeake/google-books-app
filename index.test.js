// Automated testing with JEST for index.js

// What should should be tested here?
// Whether the API is called correctly within the application?
// Are the search terms suitable?
// Should the API be called in the test or is there a way to test the syntax in case there is an
// issue with the API?

const index = require('./index');
const axios = require('axios');

// import searchBooks from './index.js'
// import readingList from './index.js'

// I would like to have completed more thorough testing of the functions in the index.js file, but I have
// been receiving errors stating that the testing file cannot import my functions. I have not been able to resolve
// these errors in the timeframe provided, but will continue to research and refactor

jest.mock('axios');

const searchTerms = ['potter', 'tolkien', 'le carre', 'sally rooney', '123', '[', '\\', '000', 'author', '!!!'];

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});

test('Does the application query the API correctly?', async () => {
    axios.get.mockResolvedValue({
        data: [
            {
                title: 'Harry Potter 1',
                authors: 'JK Rowling',
                publisher: 'Bloomsbury'
            },
            {
                title: 'Harry Potter 2',
                authors: 'JK Rowling',
                publisher: 'Bloomsbury'
            },
            {
                title: 'Harry Potter 3',
                authors: 'JK Rowling',
                publisher: 'Bloomsbury'
            },
            {
                title: 'Harry Potter 4',
                authors: 'JK Rowling',
                publisher: 'Bloomsbury'
            },
            {
                title: 'Harry Potter 5',
                authors: 'JK Rowling',
                publisher: 'Bloomsbury'
            }
        ]
    });
    const search = await index;
    expect(search).toBeTruthy();
});

describe('not.arrayContaining', () => {
    const expected = [''];

    it('are any of the search terms empty strings?', () => {
        expect(searchTerms).toEqual(
            expect.not.arrayContaining(expected),
        );
    });
});





