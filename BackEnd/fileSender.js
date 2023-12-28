const { authenticate } = require('./authentication');
const { processData } = require('./fileProcessingLogic');
const { getFileAdditionalInfo } = require('./fileUtils');

const sendFile = async (req, res) => {
  try {
    // Authentication logic
    // ... (same as before)

    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const processedData = await processData(req.file.path);
    const additionalInfo = getFileAdditionalInfo(req.file);

    res.status(200).json({
      message: 'File uploaded and processed successfully.',
      data: processedData,
      additionalInfo: additionalInfo
    });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Operation failed' });
  }
};

module.exports = { sendFile };