const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                error: "Invalid input: data should be an array"
            });
        }

        // Initialize arrays and variables
        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;
        const allAlphabets = [];

        // Process each element in the data array
        data.forEach(item => {
            const str = String(item);
            
            // Check if it's a number
            if (!isNaN(str) && str.trim() !== '') {
                const num = parseInt(str);
                sum += num;
                
                if (num % 2 === 0) {
                    evenNumbers.push(str);
                } else {
                    oddNumbers.push(str);
                }
            }
            // Check if it's alphabetic
            else if (/^[a-zA-Z]+$/.test(str)) {
                alphabets.push(str.toUpperCase());
                // Store individual characters for concatenation
                for (let char of str) {
                    allAlphabets.push(char.toLowerCase());
                }
            }
            // Everything else is special character
            else {
                specialCharacters.push(str);
            }
        });

        // Create concatenation string with reverse order and alternating caps
        let concatString = '';
        const reversedAlphabets = allAlphabets.reverse();
        
        reversedAlphabets.forEach((char, index) => {
            if (index % 2 === 0) {
                concatString += char.toLowerCase();
            } else {
                concatString += char.toUpperCase();
            }
        });

        // Response object
        const response = {
            is_success: true,
            user_id: "Surya_Sunanda_Meesala_13122003", 
            email: "sunanda.22bce20515@vitapstudent.ac.in", 
            roll_number: "22BCE20515", 
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: sum.toString(), // Return sum as string
            concat_string: concatString
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({
            is_success: false,
            error: "Internal server error"
        });
    }
});

// GET /bfhl endpoint (for testing)
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

// Health check endpoint
app.get('/', (req, res) => {
    res.json({ message: 'BFHL API is running!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;