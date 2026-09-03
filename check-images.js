const https = require('https');

const urls = [
  'https://images.unsplash.com/photo-1695048132711-665e718b9588?q=80&w=1000', // Space Black iPhone
  'https://images.unsplash.com/photo-1695048132868-b7b5f5431665?q=80&w=1000', // Deep Blue iPhone
  'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?q=80&w=1000', // Titanium Violet Samsung
  'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=1000', // Silver MacBook
  'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?q=80&w=1000', // Silver iPad
  'https://images.unsplash.com/photo-1612222869049-d8ec83637a3c?q=80&w=1000', // Silver Sony
  'https://images.unsplash.com/photo-1546435770-a3e426fa7e18?q=80&w=1000'  // Midnight Blue Sony
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', (e) => {
      resolve({ url, status: e.message });
    });
  });
}

async function run() {
  for (const url of urls) {
    const res = await checkUrl(url);
    console.log(`${res.status}: ${res.url}`);
  }
}
run();
