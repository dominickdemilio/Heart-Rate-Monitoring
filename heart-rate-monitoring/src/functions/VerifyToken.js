async function VerifyToken(navigate) {
    //retrieve token
    const token = localStorage.getItem('token');
    try {
        // Verify token
        const response = await fetch(
            'http://localhost:8000/verify-token/' + token // FIX API
        );

        if (!response.ok) {
            throw new Error('Token verification failed.');
        }

        // Fetch current user data
        const userResponse = await fetch(
            'http://localhost:8000/currentuser/me', // FIX API ENDPOINT
            {
                method: 'GET',
                headers: { Authorization: 'Bearer ' + token },
            }
        );

        if (userResponse.ok) {
            const userData = await userResponse.json();
        }
    } catch (error) {
        // If token is no longer valid, redirect to home page
        localStorage.removeItem('token');
        navigate('/');
    }
}

export default VerifyToken;
