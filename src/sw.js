self.addEventListener('install', event =>
  console.info('installed :)'));

const appCodeRe = /src\/[^.]+\.js$/;

self.addEventListener('fetch', event => {
  console.info('fetching!');
});