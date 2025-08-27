import React, { useState } from 'react';
import api, { API_BASE_URL } from '../utils/api';

const ConnectionTest = () => {
  const [testResult, setTestResult] = useState('');
  const [testing, setTesting] = useState(false);

  const testConnection = async () => {
    setTesting(true);
    setTestResult('Testing connection...\n');
    
    try {
      // Test 1: Health check
      setTestResult(prev => prev + '1. Testing health check...\n');
      const healthResponse = await api.get('/');
      setTestResult(prev => prev + `✅ Health check: ${JSON.stringify(healthResponse.data)}\n\n`);
      
      // Test 2: Config check
      setTestResult(prev => prev + '2. Testing configuration...\n');
      const configResponse = await api.get('/api/config');
      setTestResult(prev => prev + `✅ Config: ${JSON.stringify(configResponse.data)}\n\n`);
      
      // Test 3: Services
      setTestResult(prev => prev + '3. Testing services...\n');
      const servicesResponse = await api.get('/api/services');
      setTestResult(prev => prev + `✅ Services: Found ${servicesResponse.data.length} services\n\n`);
      
      setTestResult(prev => prev + '🎉 All tests passed!');
      
    } catch (error) {
      setTestResult(prev => prev + `❌ Error: ${error.message}\n`);
      setTestResult(prev => prev + `Details: ${JSON.stringify({
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data
      }, null, 2)}`);
    }
    
    setTesting(false);
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'white', 
      border: '1px solid #ccc', 
      padding: '10px',
      borderRadius: '5px',
      maxWidth: '400px',
      zIndex: 9999,
      fontSize: '12px'
    }}>
      <h3>Connection Test</h3>
      <p>API URL: {API_BASE_URL}</p>
      <button 
        onClick={testConnection} 
        disabled={testing}
        style={{
          background: '#ff6b6b',
          color: 'white',
          border: 'none',
          padding: '5px 10px',
          borderRadius: '3px',
          cursor: testing ? 'not-allowed' : 'pointer'
        }}
      >
        {testing ? 'Testing...' : 'Test Connection'}
      </button>
      {testResult && (
        <pre style={{ 
          background: '#f5f5f5', 
          padding: '10px', 
          marginTop: '10px',
          whiteSpace: 'pre-wrap',
          maxHeight: '300px',
          overflow: 'auto'
        }}>
          {testResult}
        </pre>
      )}
    </div>
  );
};

export default ConnectionTest;
