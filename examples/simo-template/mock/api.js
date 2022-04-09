module.exports = {
  "GET /api/data": require("./data.json"),
  "GET /api/handle": (req, res) => {
    return res.send(require("./data.json"));
  },
  "POST /api/data": require("./data.json"),
};
