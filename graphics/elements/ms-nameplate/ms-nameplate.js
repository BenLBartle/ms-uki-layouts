(function () {
	'use strict';

	const host = nodecg.Replicant('host');
	const couch1 = nodecg.Replicant('couch1');
	const couch2 = nodecg.Replicant('couch2');
	const couch3 = nodecg.Replicant('couch3');
	const couchVisible = nodecg.Replicant('couchVisible');

	const MAX_HOST_NAME_WIDTH = 425;
	const MAX_HOST_INFO_WIDTH = 375;
	const MAX_COUCH_NAME_WIDTH = 368;
	const MAX_COUCH_INFO_WIDTH = 342;
	const MAX_PLAYER_NAME_WIDTH = 428;
	const MAX_PLAYER_INFO_WIDTH = 378;

	Polymer({
		is: 'ms-nameplate',

		ready() {
			this.tl = new TimelineLite({autoRemoveChildren: true});

			host.on('change', newVal => {
				if (!newVal.name.trim() && !newVal.info.trim()) {
					this.host = null;
				} else {
					this.host = {};
					this.host = newVal;
				}

				if (!this._hostReady) {
					this._hostReady = true;
					this._checkReplicantsReady();
				}
			});

			couch1.on('change', newVal => {
				if (!newVal.name.trim() && !newVal.info.trim()) {
					this.couch1 = null;
				} else {
					this.couch1 = {};
					this.couch1 = newVal;
				}

				if (!this._couch1Ready) {
					this._couch1Ready = true;
					this._checkReplicantsReady();
				}
			});

			couch2.on('change', newVal => {
				if (!newVal.name.trim() && !newVal.info.trim()) {
					this.couch2 = null;
				} else {
					this.couch2 = {};
					this.couch2 = newVal;
				}

				if (!this._couch2Ready) {
					this._couch2Ready = true;
					this._checkReplicantsReady();
				}
			});

			couch3.on('change', newVal => {
				if (!newVal.name.trim() && !newVal.info.trim()) {
					this.couch3 = null;
				} else {
					this.couch3 = {};
					this.couch3 = newVal;
				}

				if (!this._couch3Ready) {
					this._couch3Ready = true;
					this._checkReplicantsReady();
				}
			});
		},

		// Only declare the "visible" replicants once all the other replicants are ready.
		_checkReplicantsReady() {
			if (this._hostReady && this._couch1Ready && this._couch2Ready && this._couch3Ready) {
				console.log('all replicants ready, adding change handlers for couchVisible');
				couchVisible.on('change', this.couchVisibleChanged.bind(this));
			}
		},

		couchVisibleChanged(newVal) {
			if (newVal) {
				this.tl.add('couchEnter', '+=0.1');

				if (this.couch1) {
					this.tl.call(() => {
						this.setAndFitText(this.$['couch1-name'], this.couch1.name, MAX_COUCH_NAME_WIDTH);
						this.setAndFitText(this.$['couch1-info'], this.couch1.info, MAX_COUCH_INFO_WIDTH);
					}, null, null, 'couchEnter');
				}

				if (this.couch2) {
					this.tl.call(() => {
						this.setAndFitText(this.$['couch2-name'], this.couch2.name, MAX_COUCH_NAME_WIDTH);
						this.setAndFitText(this.$['couch2-info'], this.couch2.info, MAX_COUCH_INFO_WIDTH);
					}, null, null, 'couchEnter');
				}

				if (this.couch3) {
					this.tl.call(() => {
						this.setAndFitText(this.$['couch3-name'], this.couch3.name, MAX_COUCH_NAME_WIDTH);
						this.setAndFitText(this.$['couch3-info'], this.couch3.info, MAX_COUCH_INFO_WIDTH);
					}, null, null, 'couchEnter');
				}

				if (this.couch1 || this.couch2 || this.couch3) {
					this.tl.to(this.$.couch, 1, {
						y: 0,
						opacity: 1,
						ease: Power3.easeOut
					}, 'couchEnter+=0.1');
				}

				if (this.host) {
					this.tl.call(() => {
						this.setAndFitText(this.$$('#host .name-content'), this.host.name, MAX_HOST_NAME_WIDTH);
						this.setAndFitText(this.$$('#host .info-content'), this.host.info, MAX_HOST_INFO_WIDTH);
					}, null, null, 'couchEnter');

					this.tl.to(this.$.host, 1, {
						y: 0,
						opacity: 1,
						ease: Power3.easeOut
					}, 'couchEnter');
				}
			} else {
				console.log("Hiding Couch");
				this.tl.to([this.$.couch, this.$.host], 0.8, {
					y: 300,
					opacity: 0,
					ease: Power3.easeIn
				});
			}
		},
		setAndFitText(node, newString, maxWidth) {
			node.innerText = newString;
			const clientWidth = node.scrollWidth;
			if (clientWidth > maxWidth) {
				TweenLite.set(node, {scaleX: maxWidth / clientWidth});
			} else {
				TweenLite.set(node, {scaleX: 1});
			}
		}
	});
})();