const app = require("./index");

const connect = require("./config/db")

app.listen(7878, async function() {
    await connect();
    console.log("listening on part 7878");
    
});