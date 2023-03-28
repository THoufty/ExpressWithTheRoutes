const express = require('express');

const fs = require('fs')
const path = require('path');
const db = require('./db/db.json')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json())
app.use(express.static('public'));


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get("/api/notes", (req, res) =>
  fs.readFile('./db/db.json', 'utf8', (err, flan) => {
    if (err) {
      console.error(err)
    } else {
      return res.json(JSON.parse(flan))
    }
  })
)

app.post('/api/notes', (req, res) => {
  console.log(req.body);

  const { title, text } = req.body;

  if (title && text) {
    const newText = {
      title,
      text,
    };

    fs.readFile('./db/db.json', 'utf8', (err, bipbop) => {
      if (err) {
        console.error(err)
      } else {
        const robertTheBobert = JSON.parse(bipbop)

        robertTheBobert.push(newText)

        fs.writeFile('./db/db.json', JSON.stringify(robertTheBobert, null, 4), (writeErr) =>
          writeErr ? console.error(writeErr)
            : console.info('Did the Thing'))
      }
    });

    const response = {
      status: 'success',
      body: newText,
    }
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in adding text');
  }
});











app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
