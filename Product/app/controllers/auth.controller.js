const config = require("../config/auth.config");
const db = require("../models");
//const { user: User, role: Role, refreshToken: RefreshToken } = db;
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save().then((user) => {
    if (req.body.roles) {
      Role.find({ name: { $in: req.body.roles } }).then((roles) => {
        user.roles = roles.map((role) => role._id);
        user.save().then(() => {
          res.send({ message: "User was registered successfully!" });
        }).catch((err) => {
          res.status(500).send({ message: err });
        });
      }).catch((err) => {
        res.status(500).send({ message: err });
      });
    } else {
      Role.findOne({ name: "user" }).then((role) => {
        user.roles = [role._id];
        user.save().then(() => {
          res.send({ message: "User was registered successfully!" });
        }).catch((err) => {
          res.status(500).send({ message: err });
        });
      }).catch((err) => {
        res.status(500).send({ message: err });
      });
    }
  }).catch((err) => {
    res.status(500).send({ message: err });
  });
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
      .populate("roles", "-__v")
      .exec();

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({ message: "Invalid Password!" });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400, // 24 hours
    });

    const authorities = user.roles.map((role) => "ROLE_" + role.name.toUpperCase());

    req.session.token = token;

    res.status(200).send({
      id: user._id,
      username: user.username,
      email: user.email,
      roles: authorities,
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({ message: "Refresh Token is required!" });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ token: requestToken });

    if (!refreshToken) {
      res.status(403).json({ message: "Refresh token is not in database!" });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
      
      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
      });
      return;
    }

    let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
