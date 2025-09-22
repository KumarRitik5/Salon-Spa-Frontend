const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing all corrupted API URLs...');

// Fix template literal syntax
function fixTemplateString(content) {
  // Fix incorrectly escaped template literals
  content = content.replace(/'\$\{process\.env\.REACT_APP_API_URL \|\| 'http:\/\/localhost:5000'\}/g, 
    '${process.env.REACT_APP_API_URL || \'http://localhost:5000\'}');
  
  // Fix any remaining localhost URLs to use template literals
  content = content.replace(/'http:\/\/localhost:5000/g, 
    '${process.env.REACT_APP_API_URL || \'http://localhost:5000\'}');
    
  return content;
}

// Files to fix
const filesToFix = [
  'src/context/AuthContext.js',
  'src/context/NotificationContext.js', 
  'src/components/AdminDashboard.js',
  'src/components/pages/HomePage.js',
  'src/components/pages/MyAppointmentsPage.js',
  'src/components/pages/OwnerCustomization.js'
];

filesToFix.forEach(filePath => {
  try {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      const fixedContent = fixTemplateString(content);
      
      fs.writeFileSync(filePath, fixedContent);
      console.log(`✅ Fixed: ${filePath}`);
    } else {
      console.log(`⚠️  File not found: ${filePath}`);
    }
  } catch (error) {
    console.log(`❌ Error fixing ${filePath}:`, error.message);
  }
});

console.log('🎉 Template literal fixes complete!');
