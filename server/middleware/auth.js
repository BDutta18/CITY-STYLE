export const authenticateUser = (req, res, next) => {
  const firebaseUid = req.headers['x-firebase-uid'];
  const userEmail = req.headers['x-user-email'];

  if (!firebaseUid || !userEmail) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  req.user = { firebaseUid, email: userEmail };
  next();
};
