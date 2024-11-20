const mongoose = require('mongoose');

const leaderboardSchema = new mongoose.Schema({
  leaderboard: String,
  arrPrn: Array,
  arrCoins: Array,
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);
