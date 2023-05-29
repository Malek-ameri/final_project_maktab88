const { createServer } = require('http');
const {join} = require('path');
const dotenv = require('dotenv');

const dotenvConfig = dotenv.config({path:join(__dirname,'.env')})
if(!!dotenvConfig.error){
    console.log('[-] dotenvconfig',dotenvConfig.error);
    console.info('[i] process terminated');
    process.exit(1)
}

const host = process.env.HOST;
const port = process.env.PORT;

const app = require('./app');
const server = createServer(app)
server.listen(port,host, () => {
    console.log(`server is running on ${host}:${port}`)
})