const { connect, connection } = require("mongoose");

const connectToDatabase = async () => {
  try {
    await connect(process.env.DATABASE_URL);
  } catch (error) {
    console.log("[-] database connection error", error);
    console.info("[i] process terminated");
    process.exit(1);
  }
};

connection.once('connected', () => {
    console.log('[+] database is connected')
});

connection.on('error', (error) => {
    console.log('[-] database connection error', error)
})

module.exports = connectToDatabase