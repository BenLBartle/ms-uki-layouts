(function () {
	'use strict';

	const host = nodecg.Replicant('host');
	const couch1 = nodecg.Replicant('couch1');
	const couch2 = nodecg.Replicant('couch2');
	const couch3 = nodecg.Replicant('couch3');

	// Used to programmatically access any of the above 8 replicants, via `REPLICANTS[name]`.
	const REPLICANTS = {
		host,
		couch1,
		couch2,
		couch3
	};

	Polymer({
		is: 'ms-nameplate-control',

		ready() {
			host.on('change', newVal => {
				this.host = {};
				this.host = newVal;
			});

			couch1.on('change', newVal => {
				this.couch1 = {};
				this.couch1 = newVal;
			});

			couch2.on('change', newVal => {
				this.couch2 = {};
				this.couch2 = newVal;
			});

			couch3.on('change', newVal => {
				this.couch3 = {};
				this.couch3 = newVal;
			});
		},

		hideCouch() {
			this.couchVisible = false;
		},

		showCouch() {
			this.couchVisible = true;
		},

		_handleSelectedItemChanged(e) {
			if (this.isDebouncerActive('_handleSelectedItemChanged')) {
				return;
			}

			const target = e.target;
			const slot = target.getAttribute('data-slot');
			const replicant = REPLICANTS[slot];

			if (!e.detail.value || !replicant) {
				return;
			}

			// Copy the values out individually, to avoid object reference problems down the line.
			const selectedItem = {
				name: e.detail.value.name,
				info: e.detail.value.info
			};

			// Clear out the target's selected item once we have it.
			e.target.value = null;

			this.debounce('_handleSelectedItemChanged', () => {
				replicant.value = selectedItem;
			});
		}
	});
})();