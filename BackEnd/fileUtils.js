const getFileAdditionalInfo = (file) => {
    return {
      totalProcessed: file.length,
      timestamp: new Date().toISOString(),
      fileInfo: {
        originalFileName: file.originalname,
        fileSize: file.size
      }
    };
  };
  
  module.exports = { getFileAdditionalInfo };