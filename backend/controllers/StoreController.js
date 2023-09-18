
exports.userInfo = async (req, res) => {
    // Read session data
    // res.status(200);
    const session = req.session;
    res.json(session);
    // return next();
    // Do something with the session data
    res.send(sessionData);
  };

exports.read = (req, res) => res.json(req.session);