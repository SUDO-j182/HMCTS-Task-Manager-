                                   //EXPRESS SERVER SETUP
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;






                                    //TEST ROUTE
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
  });
  
                          //LISTENING TO PORT
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
  