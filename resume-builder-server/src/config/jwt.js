module.exports = {
  secret: process.env.JWT_SECRET || 'resume-builder-secret-key',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};
