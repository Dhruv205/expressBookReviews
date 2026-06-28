const axios = require('axios');

const BASE_URL = 'http://localhost:5000';
let sessionCookie = '';

// Helper to register a user
const registerUser = async (username, password) => {
    console.log('\n--- Testing: User Registration ---');
    try {
        const response = await axios.post(`${BASE_URL}/register`, { username, password });
        console.log('Registration Response:', response.data);
    } catch (error) {
        console.error('Registration Failed:', error.response ? error.response.data : error.message);
    }
};

// Helper to log in a user and save cookie
const loginUser = async (username, password) => {
    console.log('\n--- Testing: User Login ---');
    try {
        const response = await axios.post(`${BASE_URL}/customer/login`, { username, password });
        console.log('Login Response:', response.status, response.data);
        
        // Extract set-cookie header for subsequent requests
        const cookies = response.headers['set-cookie'];
        if (cookies && cookies.length > 0) {
            sessionCookie = cookies[0].split(';')[0];
            console.log('Saved Session Cookie:', sessionCookie);
        }
    } catch (error) {
        console.error('Login Failed:', error.response ? error.response.data : error.message);
    }
};

// Helper to add or modify a review
const addOrModifyReview = async (isbn, reviewText) => {
    console.log(`\n--- Testing: Add/Modify Review for ISBN ${isbn} ---`);
    try {
        const response = await axios.put(
            `${BASE_URL}/customer/auth/review/${isbn}?review=${encodeURIComponent(reviewText)}`,
            {},
            { headers: { Cookie: sessionCookie } }
        );
        console.log('Review Response:', response.data);
    } catch (error) {
        console.error('Review Failed:', error.response ? error.response.data : error.message);
    }
};

// Helper to delete a review
const deleteReview = async (isbn) => {
    console.log(`\n--- Testing: Delete Review for ISBN ${isbn} ---`);
    try {
        const response = await axios.delete(
            `${BASE_URL}/customer/auth/review/${isbn}`,
            { headers: { Cookie: sessionCookie } }
        );
        console.log('Delete Response:', response.data);
    } catch (error) {
        console.error('Delete Failed:', error.response ? error.response.data : error.message);
    }
};

// Helper to get book reviews publicly
const getReviews = async (isbn) => {
    console.log(`\n--- Testing: Get Book Reviews for ISBN ${isbn} ---`);
    try {
        const response = await axios.get(`${BASE_URL}/review/${isbn}`);
        console.log('Reviews list:', response.data);
    } catch (error) {
        console.error('Get Reviews Failed:', error.response ? error.response.data : error.message);
    }
};

async function startAuthTests() {
    // 1. Register a user
    await registerUser('alice', 'alicepwd123');

    // 2. Register same user again (should fail)
    await registerUser('alice', 'alicepwd123');

    // 3. Login
    await loginUser('alice', 'alicepwd123');

    // 4. Add review
    await addOrModifyReview('1', 'Incredible read! Deeply moving.');

    // 5. Check reviews
    await getReviews('1');

    // 6. Modify review
    await addOrModifyReview('1', 'Incredible read! A masterpiece of African literature.');

    // 7. Check reviews again
    await getReviews('1');

    // 8. Delete review
    await deleteReview('1');

    // 9. Check reviews after deletion
    await getReviews('1');
}

startAuthTests();
