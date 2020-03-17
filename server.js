const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Song = require('./models/song.js');
const config = require('config');
var PORT = process.env.PORT || 5000
//used howardkimserver@gmail
const db = config.get("mongoURI");
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => console.log("ERROR>>>> " + err));


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json());
app.get('/', (req, res) => {
    res.render('index');
});
app.post('/songs', async (req, res) => {
    const song = new Song({
        notes: req.body.songNotes
    });
    await song.save();
    res.status(200).json(song)
})
//access a song by id
app.get('/songs/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let song = await Song.findById(id);
        res.render("index", { song: song });

    } catch (error) {
        song = undefined;
    }
})


// app.get('/songs/:id', async (req, res) => {
//     let { id } =  req.params;
//     let song;
//     try {
//        song = await Song.findById(id)
//     } catch (error) {
//         song = undefined;
//     };
//     res.render('index', {song: song})
// })
app.listen(PORT, () => {
  console.log("on port 5000");
});