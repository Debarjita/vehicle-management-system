// Generate JWT tokens upon user login or registration for clients to use in subsequent requests.

const jwt = require('jsonwebtoken');

// Example login function
exports.login = async (req, res) => {
  const { username, password } = req.body;
  
  // Authenticate user (pseudo-code for checking username and password)
  const user = await User.findOne({ username });
  if (!user || !user.isPasswordCorrect(password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Generate JWT
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};
