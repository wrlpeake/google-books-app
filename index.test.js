const index = require('./index');

// What should should be tested here?
// Options are: Whether searchResults() retuns an array
// Whether a search term  gets five results or less
// What are the correct results of a search term

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
})

test('does it call the function?', () => {
    expect(index).toBeTruthy();
});
