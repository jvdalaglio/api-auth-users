const dashBoardModel = {
  get: (req, res) => {
    res.status(200).json({ message: "Dashboard" });
  },
};
