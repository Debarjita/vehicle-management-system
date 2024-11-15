//A middleware function that checks if the VIN format is valid.

module.exports = (req, res, next) => {
    const { vin } = req.params;
    if (!/^[a-zA-Z0-9]{17}$/.test(vin)) {
      return res.status(400).json({ message: 'Invalid VIN format' });
    }
    next();
  };
  