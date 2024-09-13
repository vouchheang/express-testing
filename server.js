const express = require('express');  
const app = express();   
const port = 8000;            
const cors = require("cors");


app.use(express.json());
app.use(cors())
app.use('/api/toDos', require("./routes/names") );



app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
