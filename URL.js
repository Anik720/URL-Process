const urlDatabase = {};

const generateRandomString = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const isValidURL = (url) => {
  const urlPattern = new RegExp('^(https?:\\/\\/)?' + 
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + 
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + 
    '(\\?[;&a-z\\d%_.~+=-]*)?' + 
    '(\\#[-a-z\\d_]*)?$', 'i'); 
  return !!urlPattern.test(url);
};

const generateShortURL = (longURL) => {
  if (!isValidURL(longURL)) {
    throw new Error('Invalid URL');
  }

  let shortURL;
  do {
    shortURL = generateRandomString(6);
  } while (urlDatabase.hasOwnProperty(shortURL));

  urlDatabase[shortURL] = longURL;
  return shortURL;
};

const getLongURL = (shortURL) => {
  const longURL = urlDatabase[shortURL];
  if (!longURL) {
    throw new Error('Short URL not found');
  }
  return longURL;
};


const assert = require('assert');

const longURL = 'https://www.example.com';
const shortURL = generateShortURL(longURL);
assert.strictEqual(getLongURL(shortURL), longURL, 'The long URL should be retrievable from the short URL');


try {
  generateShortURL('invalid-url');
} catch (e) {
  assert.strictEqual(e.message, 'Invalid URL', 'An invalid URL should throw an error');
}

const anotherLongURL = 'https://www.anotherexample.com';
const anotherShortURL = generateShortURL(anotherLongURL);
assert.notStrictEqual(shortURL, anotherShortURL, 'The short URLs should be unique');

try {
  getLongURL('nonexistent');
} catch (e) {
  assert.strictEqual(e.message, 'Short URL not found', 'A nonexistent short URL should throw an error');
}

console.log('All tests passed!');
