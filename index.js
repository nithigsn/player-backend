const app = require('./App');

const PORT = 3434;

app.listen(PORT, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
        return;
    }
    console.log(`Server is working on port ${PORT}`);
});
