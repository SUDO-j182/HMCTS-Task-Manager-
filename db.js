const { Pool } = require('pg');
                       //CREATE NEW POOL
const pool = new Pool({
                    //POSTGRES USERNAME
    user: 'postgres',
                    //RUNNING LOCALLY
    host: 'localhost', 
                           //DATABASE NAME
    database: 'hmcts-tasks',
                        //PASSWORD
    password: '9u?87X@K',
              //PORT NUMBER
    port: 5432
});
module.exports = pool;