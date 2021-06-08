// GET /api/users
module.exports = (route) => {
  route.get("/", (req, res) => {
    res.json({ user: "Usuario" });
  });
};
