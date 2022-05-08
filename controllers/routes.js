const home = (req, res) => {
    res.send("Hello World!");
}

const getNotes = (req, res) => {
    console.log(req.body);
    res.send();
}

module.exports = {
    home, 
    getNotes
}