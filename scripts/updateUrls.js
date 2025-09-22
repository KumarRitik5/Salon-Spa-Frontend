const fs = require('fs');
const path = require('path');

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Files that need URL replacement
const filesToUpdate = [
  'src/components/pages/MyAppointmentsPage.js',
  'src/components/pages/BookAppointmentPage.js',
  'src/components/pages/HomePage.js',
  'src/components/pages/OwnerCustomization.js',
  'src/context/NotificationContext.js',
  'src/context/AuthContext.js',
  'src/components/AdminDashboard.js',
  'src/components/NetworkTest.js'
];

console.log('🔧 Updating API URLs for deployment...');
console.log(`API Base URL: ${API_BASE}`);

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (fs.existsSync(filePath)) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace localhost URLs with environment variable
      content = content.replace(/http:\/\/localhost:5000/g, '${process.env.REACT_APP_API_URL || \'http://localhost:5000\'}');
      
      // Fix template literals
      content = content.replace(/'\$\{process\.env\.REACT_APP_API_URL.*?\}'/g, '`${process.env.REACT_APP_API_URL || \'http://localhost:5000\'}`');
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated: ${file}`);
    } catch (error) {
      console.log(`❌ Error updating ${file}:`, error.message);
    }
  } else {
    console.log(`⚠️  File not found: ${file}`);
  }
});

console.log('🎉 URL update complete!');
