const express = require('express');
const path = require('path');
const cors = require("cors");
// const socket = require('socket.io');
const exp = express();
// const io = socket(server);
const port = process.env.port || 8080;

// exp.use(express.urlencoded());
exp.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
exp.use(express.static(path.join(__dirname, 'vite-project/dist')));

//send items.js to server
exp.get('*', (req, res)=>{
    res.sendFile('vite-project/dist/index.html', { root : __dirname}, (err)=>{
    }); 

});

exp.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
