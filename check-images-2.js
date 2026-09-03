const https = require('https');

const urls = [
  'https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=1000', // Black iPhone
  'https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=1000', // Blue iPhone
  'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000'  // Blue headphones
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
