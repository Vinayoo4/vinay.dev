module.exports = async ({ req, res, log, error }) => {
  try {
    log('umbrella-health-check started');

    return res.json({
      success: true,
      message: 'SALTEDHASH umbrella Appwrite function is working',
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    error(err.message || 'Unknown error');
    return res.json(
      {
        success: false,
        message: 'Function failed'
      },
      500
    );
  }
};
