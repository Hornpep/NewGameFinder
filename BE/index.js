import express from 'express';
import 'dotenv/config';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000; 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});