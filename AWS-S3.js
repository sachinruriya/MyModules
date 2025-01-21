// CMD

npm install express aws-sdk multer multer-s3 dotenv

// Response
{
  "message": "File uploaded successfully!",
  "fileUrl": "https://your-bucket-name.s3.amazonaws.com/uploads/1672312341234_filename.jpg"
}
// .env
AWS_ACCESS_KEY_ID=your_aws_access_key_id
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key
AWS_REGION=your_aws_region
BUCKET_NAME=your_s3_bucket_name
PORT=3000


// End CMD







require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const app = express();

// AWS Configuration
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Your AWS Access Key ID
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Your AWS Secret Access Key
  region: process.env.AWS_REGION // Your AWS Region (e.g., 'us-east-1')
});

const s3 = new AWS.S3();

// Multer S3 Configuration
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET_NAME, // Your S3 Bucket Name
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, `uploads/${Date.now()}_${file.originalname}`); // File path in S3
    }
  }),
  fileFilter: (req, file, cb) => {
    // Accept only JPEG and PNG images
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG are allowed!'), false);
    }
  }
});

// API Endpoint for File Upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded!' });
  }

  res.json({
    message: 'File uploaded successfully!',
    fileUrl: req.file.location // URL of the uploaded file
  });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message || 'Internal Server Error'
  });
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
