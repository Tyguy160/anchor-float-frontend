console.log('importing...')
const Photon = require('@generated/photon');
console.log('imported!')
let db
let triesRemaining = 10;
while (!db && triesRemaining) {
  try {
    db = new Photon();
  } catch (e) {
    console.error('Error connecting to DB. Retrying...');
    triesRemaining -= 1;
  }
}

module.exports = { db };
