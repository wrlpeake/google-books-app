const index = require('./index');
const axios = require('axios');
// What should should be tested here?
// Whether the API is called correctly within the application?
// Are the search terms suitable?
// Should the API be called in the test or is there a way to test the syntax in case there is an
// issue with the API?

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





