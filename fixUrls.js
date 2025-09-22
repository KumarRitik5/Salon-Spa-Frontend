// Quick fix for API URLs
const fs = require('fs');
const path = require('path');

const API_URL = "process.env.REACT_APP_API_URL || 'http://localhost:5000'";

// Files to update
const filesToUpdate = [
  'src/components/pages/BookAppointmentPage.js',
  'src/components/pages/MyAppointmentsPage.js',
  'src/components/pages/HomePage.js',
  'src/components/pages/OwnerCustomization.js',
  'src/context/AuthContext.js',
  'src/context/NotificationContext.js',
  'src/components/AdminDashboard.js'
];

console.log('🔧 Fixing API URLs for deployment...');

filesToUpdate.forEach(filePath => {
  try {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Replace localhost URLs
      content = content.replace(/http:\/\/localhost:5000/g, `\${${API_URL}}`);
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ Fixed: ${filePath}`);
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  } catch (error) {
    console.log(`❌ Error fixing ${filePath}:`, error.message);
  }
});

console.log('🎉 API URL fixes complete!');
