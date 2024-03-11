const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express();
app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

const corsOptions = {
    origin: '*',
    credential: true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions))

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server Mimi!" });
  });

  
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});