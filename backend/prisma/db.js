const { Photon } = require('@generated/photon');

function getDB() {
  try {
    const db = new Photon();
    return db;
  } catch (e) {
    console.error(e);
    console.error('Error creating Photo object');
    process.exit(1);
  }
}
module.exports = { getDB };
