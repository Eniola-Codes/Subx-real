import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

async function testDeveloperSignup() {
  try {
    const response = await axios.post(`${API_URL}/developers`, {
      name: 'Test Developer',
      company: 'Test Company',
      email: 'test@developer.com',
      phone: '1234567890',
      website: 'https://test.com',
      bio: 'Test bio',
      isSubscribed: true
    });
    console.log('Developer Signup Test:', response.data);
    return response.data;
  } catch (error) {
    console.error('Developer Signup Test Failed:', error.message);
  }
}

async function testInvestorSignup() {
  try {
    const response = await axios.post(`${API_URL}/investors`, {
      name: 'Test Investor',
      email: 'test@investor.com',
      phone: '0987654321',
      bio: 'Test bio',
      investmentInterests: 'Residential, Commercial'
    });
    console.log('Investor Signup Test:', response.data);
    return response.data;
  } catch (error) {
    console.error('Investor Signup Test Failed:', error.message);
  }
}

async function testProjectCreation() {
  try {
    // First get the developer ID
    const developersResponse = await axios.get(`${API_URL}/developers`);
    const developerId = developersResponse.data[0]?.id;
    
    if (!developerId) {
      throw new Error('No developer found to create project for');
    }

    const response = await axios.post(`${API_URL}/projects`, {
      title: 'Test Project',
      description: 'Test project description',
      location: 'Test Location',
      type: 'residential',
      developerId
    });
    console.log('Project Creation Test:', response.data);
    return response.data;
  } catch (error) {
    console.error('Project Creation Test Failed:', error.message);
  }
}

async function testGetDevelopers() {
  try {
    const response = await axios.get(`${API_URL}/developers`);
    console.log('Get Developers Test:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get Developers Test Failed:', error.message);
  }
}

async function testGetInvestors() {
  try {
    const response = await axios.get(`${API_URL}/investors`);
    console.log('Get Investors Test:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get Investors Test Failed:', error.message);
  }
}

async function testGetProjects() {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    console.log('Get Projects Test:', response.data);
    return response.data;
  } catch (error) {
    console.error('Get Projects Test Failed:', error.message);
  }
}

async function runAllTests() {
  console.log('Starting API Tests...\n');
  
  await testDeveloperSignup();
  await testInvestorSignup();
  await testProjectCreation();
  await testGetDevelopers();
  await testGetInvestors();
  await testGetProjects();
  
  console.log('\nAll tests completed!');
}

runAllTests(); 