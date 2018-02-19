// server.js

const path = require('path');
const express = require('express');


const publicPath = path.join(__dirname, '../public');
const PORT = process.env.PORT || 3000;

var app = express();
app.use(express.static(publicPath));

app.listen(PORT, () => {
	console.log(`Started on port ${PORT}`);
});
