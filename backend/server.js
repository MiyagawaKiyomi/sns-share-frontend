const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const profileSchema = new mongoose.Schema({
    name: String,
    snsItems: [{
        name: String,
        url: String
    }]
});

const Profile = mongoose.model('Profile', profileSchema);

app.get('/api/profile', async(req, res) => {
    try {
        const profile = await Profile.findOne();
        res.json(profile);
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

app.post('/api/profile', async(req, res) => {
    try {
        const newProfile = new Profile(req.body);
        await newProfile.save();
        res.json('Profile saved!');
    } catch (error) {
        res.status(400).json('Error: ' + error);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});