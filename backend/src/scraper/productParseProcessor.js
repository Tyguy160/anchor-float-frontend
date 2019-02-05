const axios = require('axios');
const { parseProductPageMarkup } = require('./parsers');

const headers = {
  'user-agent':
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.81 Safari/537.36',
};

const url =
  'https://www.amazon.com/Keurig-K-Mini-Single-Coffee-Friendly/dp/B07DR89BR6';

axios
  .get(url, { headers })
  .then(response => parseProductPageMarkup(response.data))
  .then(res => console.log(res))
  .catch(err => console.error(err));
