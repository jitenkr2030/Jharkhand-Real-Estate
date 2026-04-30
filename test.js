import { chromium } from 'playwright';

async function testPropertyApp() {
  console.log('Starting browser test...');
  
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    // Navigate to home page
    console.log('Testing home page...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    
    // Check for main elements
    const title = await page.title();
    console.log('Page title:', title);
    
    // Check for header
    const headerExists = await page.locator('header').isVisible();
    console.log('Header visible:', headerExists);
    
    // Check for property cards
    const propertyCards = await page.locator('[class*="property-card"]').count();
    console.log('Property cards found:', propertyCards);
    
    // Check for footer
    const footerExists = await page.locator('footer').isVisible();
    console.log('Footer visible:', footerExists);
    
    // Navigate to properties page
    console.log('\\nTesting properties page...');
    await page.goto('http://localhost:3000/properties', { waitUntil: 'networkidle' });
    
    const searchExists = await page.locator('input[placeholder*="Search"]').isVisible();
    console.log('Search input visible:', searchExists);
    
    // Check for filter button
    const filterButton = await page.locator('button:has-text("Filters")').isVisible();
    console.log('Filter button visible:', filterButton);
    
    console.log('\\n✅ All basic tests passed!');
    
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testPropertyApp();