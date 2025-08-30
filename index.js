import express from 'express';

const app = express();
const port = 3000;

app.get('/',(req,res) => {
    //res.status(200).send("Hello, World!");
    res.send("Name: Renson G. Pena\nSection: IT4B\nCourse: BSIT");
});

/*app.get('/:id',(req, res) => {// receiving ID
    const id = req.params.id;
    console.log(`Received ID: ${id}`);
});

app.get('/hello/:name',(req, res) => {// put name on the postman and console log
    const name = req.params.name;
    console.log(name)
    res.send(`Hello ${name}!`);
});*/

app.get('/foo', (req, res) =>{
    console.log(req.query);
});

app.get('/IT', (res, req) => {
    const body = req.body
});

app.listen(port, () => console.log(`server is running at http://localhost:${port}`));