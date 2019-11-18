const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const cors = require('cors');

const app = express();

//Enable CORS for all HTTP methods
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));

require('./routes/productRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/loginRoutes')(app);





app.listen(PORT, () => {
  console.log('SERVER RUNNING ON PORT ' + PORT);
});

app.get('/', (req,res) => {
  res.send('HELLO WORLD. THIS IS MY API RUNNING ON THE ROCKS');
});
