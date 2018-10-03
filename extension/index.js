'use strict';

module.exports = function (nodecg) {
	// Initialize replicants.
	try {
		require('./countdown')(nodecg);
	} catch (e) {
		nodecg.log.error('Failed to load "countdown" lib:', e.stack);
		process.exit(1);
	}
};