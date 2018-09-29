(function () {
	'use strict';

	const INTERVAL = 10;
	const onNow = nodecg.Replicant('onNow');
	const upNext = nodecg.Replicant('upNext');
    
    const content = document.getElementById('content');
    
    onNow.on('change', newVal => {
		content.innerText = newVal;
	});

})();