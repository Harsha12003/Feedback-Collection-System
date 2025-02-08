const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const feedbck = require('./Models/Feedback');

const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/coderone_Feedback')
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.error('MongoDB Connection Error:', err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('View'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/View/index.html');
});
app.post('/submit-Feedback', async (req, res) => 
{
    const feedback = new feedbck({
        name: req.body.name,contactnumber: req.body.contactnumber, 
        email: req.body.email, feedback: req.body.feedback
    });
    try {
        await feedback.save();
        console.log('Feedback Submitted Successfully');
        res.send(`
            <html>
            <head>
            <title>Feedback Submitted</title>
            </head>
            <body>
            <h1>Thank You!</h1>
            <p>Your feedback has been submitted successfully.</p>
            <a href="/">Go Back to Form</a>
            </body>
            </html>`);
    } catch (err) {
        console.error('Error Saving Feedback', err);
        res.status(500).send('There was an error in submitting your feedback');
    }
});

app.listen(port, () => 
    { 
       console.log(`Server is running on http://localhost:${port}`);
    })
