(function () {
	'use strict';

	const INTERVAL = 10;
	const onNow = nodecg.Replicant('onNow');
	const upNext = nodecg.Replicant('upNext');

	Polymer({
		is: 'ms-ticker',

		ready() {
			this.tl = new TimelineLite({autoRemoveChildren: true});
			this.tl.set(this.$.content, {y: '100%'});
			setTimeout(() => {
				// Start the rotation
				this.showSchedule();

				// Do this on a delay, otherwise it sometimes freaks out and makes #content have zero width.
			}, 1500);
		},
		
		fitContent() {
			const maxWidth = this.$.body.clientWidth - 32;
			const contentWidth = this.$.content.clientWidth;
			const delta = contentWidth - maxWidth;
			if (delta > 1) {
				TweenLite.set(this.$.content, {scaleX: maxWidth / contentWidth});
			} else {
				TweenLite.set(this.$.content, {scaleX: 1});
			}
		},

		enter() {
			this.tl.to(this.$.label, 0.8, {
				y: '0%',
				ease: Back.easeInOut.config(1.7)
			});

			this.tl.to(this.$.body, 0.66, {
				scaleX: '1',
				ease: Power3.easeInOut
			});

			this.tl.to(this.$.content, 0.66, {
				y: '0%',
				ease: Power3.easeOut
			}, '-=0.18');
		},

		exit() {
			this.tl.call(() => {
				this.tl.pause();
				let duration = Math.max(this.$.body.clientWidth / 500, 0.9);
				duration = Math.min(duration, 1.8);
				TweenLite.to(this.$.label, duration, {
					x: this.$.body.clientWidth + 1,
					ease: Power3.easeInOut,
					onComplete: function () {
						this.tl.resume();
					}.bind(this)
				});
			}, null, null, '+=0.01');

			this.tl.set(this.$.body, {scaleX: 0});
			this.tl.set(this.$.content, {y: '100%'});

			this.tl.to(this.$.label, 0.4, {
				y: '100%',
				ease: Power3.easeIn
			}, '-=0.08');

			this.tl.set(this.$.label, {x: 0});
		},

		showSchedule() {
			this.tl.call(() => {
				this.$.content.style.width = 'auto';
				this.customStyle['--toth-ticker-content-color'] = '#f47425';
				this.updateStyles();
				this.$.label.innerText = 'ON NOW';
				this.$.content.innerHTML = onNow.value;
				this.fitContent();
			});
			this.enter();
			this.tl.to({}, INTERVAL, {});
			this.exit();

			if (upNext.value) {
				this.tl.call(() => {
					this.$.label.innerText = 'UP NEXT';
					this.$.content.innerHTML = upNext.value;
					this.fitContent();
				});
				this.enter();
				this.tl.to({}, INTERVAL, {});
				this.exit();
			}

			//this.tl.call(this.showChallenges, null, this);
		},
		showCTA() {
			this.tl.to(this.$.cta, 0.66, {
				y: '0%',
				ease: Back.easeOut.config(0.9)
			});

			this.tl.to(this.$.cta, 1, {
				y: '-100%',
				ease: Back.easeInOut.config(0.9)
			}, `+=${INTERVAL}`);

			this.tl.to(this.$.cta, 0.66, {
				y: '-200%',
				ease: Back.easeIn.config(0.9)
			}, `+=${INTERVAL}`);

			this.tl.set(this.$.cta, {y: '100%'});

			this.tl.call(this.showSchedule, null, this);
		},

		_optionAnim(option, index) {
			index++;

			this.tl.to({}, INTERVAL, {});

			this.tl.call(() => {
				const b = this.$.content.querySelector('b');
				const optionAnim = new TimelineLite();
				optionAnim.to(b, 0.66, {
					y: '100%',
					ease: Power3.easeIn
				});

				optionAnim.call(this._setWarOption, [option, index], this);

				optionAnim.to(b, 0.66, {
					y: '0%',
					ease: Power3.easeOut
				});
			});

			this.tl.to({}, 1.32, {});
		},

		_setChallengeContent({description, total, goal}) {
			this.$.content.innerHTML = `${description} - <b><span style="color:#f47425">${total}</span> / ${goal}</b>`;
			this.fitContent();
		},

		_setWarContent({description}) {
			this.$.content.innerHTML = `${description}&nbsp;&nbsp;&nbsp;&nbsp;<b style="display: inline-block"></b>`;
		},

		_setWarOption({description, total}, index) {
			this.$.content.querySelector('b').innerText = `${index + 1}. ${description} - ${total}`;
			this.fitContent();
		}
	});
})();