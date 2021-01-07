const express = require("express");
const router = express.Router();
const ratingModel = require("../../models/rating.model");
router.post("/add", async function (req, res) {
  const ret = await ratingModel.addRating(
    req.session.authUser.IdUser,
    req.body.id,
    req.body.rateStar,
    req.body.Comment
  );
  res.redirect(req.headers.referer);
});
module.exports = router;
