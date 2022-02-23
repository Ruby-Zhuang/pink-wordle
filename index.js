const PORT = 8000;
const axios = require('axios').default;
const express = require('express');
const app = express();

app.listen(PORT, () => console.log('Server running on port ' + PORT));
