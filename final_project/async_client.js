const axios = require('axios');

const BASE_URL = 'http://localhost:5000';

// Task 10: Get all books using Async-Await / Promises
const getBooks = async () => {
    console.log('\n--- Task 10: Fetching Book List (Async-Await) ---');
    try {
        const response = await axios.get(`${BASE_URL}/`);
        console.log('Books List retrieved successfully:');
        console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error('Error fetching book list:', error.message);
    }
};

// Task 11: Get book details by ISBN using Promises
const getBookByISBN = (isbn) => {
    console.log(`\n--- Task 11: Fetching Book by ISBN: ${isbn} (Promise) ---`);
    axios.get(`${BASE_URL}/isbn/${isbn}`)
        .then(response => {
            console.log(`Book details for ISBN ${isbn}:`);
            console.log(JSON.stringify(response.data, null, 2));
        })
        .catch(error => {
            console.error(`Error fetching book with ISBN ${isbn}:`, error.message);
        });
};

// Task 12: Get book details by Author using Async-Await
const getBookByAuthor = async (author) => {
    console.log(`\n--- Task 12: Fetching Books by Author: ${author} (Async-Await) ---`);
    try {
        const response = await axios.get(`${BASE_URL}/author/${author}`);
        console.log(`Books by ${author}:`);
        console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error(`Error fetching books by author ${author}:`, error.message);
    }
};

// Task 13: Get book details by Title using Promises
const getBookByTitle = (title) => {
    console.log(`\n--- Task 13: Fetching Books by Title: ${title} (Promise) ---`);
    axios.get(`${BASE_URL}/title/${title}`)
        .then(response => {
            console.log(`Books with title "${title}":`);
            console.log(JSON.stringify(response.data, null, 2));
        })
        .catch(error => {
            console.error(`Error fetching books with title "${title}":`, error.message);
        });
};

// Run all client-side async functions sequentially
async function runTests() {
    await getBooks();
    getBookByISBN('1');
    await getBookByAuthor('Jane Austen');
    getBookByTitle('The Book Of Job');
}

// Small delay to let async calls finish before process exit
runTests().then(() => {
    setTimeout(() => {
        console.log('\n--- Async client tests completed ---');
    }, 2000);
});
