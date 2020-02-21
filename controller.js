const Visits = require('./model');

module.exports = {
  getCheckedInVisitors: (req, res) => {
    Visits.find({checkedIn: true}, (err, data) => {
      if (err) {
        return res.json({
          error: true,
          message: err.message
        });
      }
      res.json({
        error: false,
        message: `All checked in visitors returned`,
        data
      });
    });
  },


  getAllVisits: (req, res) => {
    const { limit, skip } = req.query;

    const options = { limit: limit || 20 };
    if (skip) options.skip = Number(skip);

    Visits.find({}, null, options, (err, data) => {
      if (err) {
        return res.json({
          error: true,
          message: err.message
        });
      }
      Business.find(query).count().exec((err, count) => {
        res.status(200).json({
          error: false,
          message: `All visitors returned, limit: ${limit || "none"}, skipped: ${skip || "none"}`,
          data,
          count
        });
      });
    });
  },


  addNewVisitor: (req, res) => {
    const {
      name, phoneNumber,
      email, company, visiting
    } = req.body;

    if (!name || !phoneNumber) {
      return res.status(400).json({
        error: true,
        message: 'Please supply all necessary details.',
        devMessage: '`name` and `phoneNumber` are compulsory fields'
      });
    }

    const values = { name, phoneNumber };
    if (email) values.email = email;
    if (company) values.company = company;
    if (visiting) values.visiting = visiting;

    const newEntry = new Visits({...values});
    newEntry.save((err, data) => {
      if (err) {
        return res.status(400).json({
          error: true,
          message: `Sorry, an error occurred while trying to check you in!`,
          devMessage: err.message
        });
      }
      res.status(200).json({
        error: false,
        message: `Checked you in successfully!`,
        devMessage: `Your response has been saved successfully!`,
        data: data
      });
    })
  },


  checkOutVisitor: (req, res) => {
    const { visit_id } = req.body;

    if (!visit_id) {
      return res.status(400).json({
        error: true,
        message: `Please supply the visit ID.`,
        devMessage: 'visit_id required'
      });
    }

    Visits.findOneAndUpdate(
      { _id: visit_id },
      {$set: { checkedIn: false, check_out_time: Date.now() }},
      { new: true },
      (err, data) => {
        if (err) {
          return res.status(400).json({
            error: true,
            message: 'Sorry, an error occurred while trying to check you out.',
            devMessage: err.message
          });
        }
        res.status(200).json({
          error: false,
          message: `You have been successfully checked out!`,
          devMessage: `Visitor ${data._id} checked out successfully`,
          data: data
        });
      }
    )
  }
}
