(function () {
	'use strict';

	const question = nodecg.Replicant('ms-question');
	const questionVisible = nodecg.Replicant('questionVisible');

	const MAX_QUESTION_TEXT_WIDTH = 1600;
	const MAX_QUESTION_ASKER_WIDTH = 600;

	Polymer({
		is: 'ms-question',

		ready() {
			this.tl = new TimelineLite({autoRemoveChildren: true});

			question.on('change', newVal => {
				if (!newVal) {
					this.questionVal = null;
				} else {
					this.questionVal = newVal;
				}

				if (!this._questionReady) {
					this._questionReady = true;
					this._checkReplicantsReady();
				}
			});
		},

		// Only declare the "visible" replicants once all the other replicants are ready.
		_checkReplicantsReady() {
			if (this._questionReady) {
				console.log('all replicants ready, adding change handlers for showQuestion');
				questionVisible.on('change', this.questionVisibleChanged.bind(this));
			}
		},

		questionVisibleChanged(newVal) {
			if (newVal) {
				this.tl.add('questionEnter', '+=0.1');

				if (this.questionVal) {
					this.tl.call(() => {
						this.setAndFitText(this.$['question-text-value'], this.questionVal.text, MAX_QUESTION_TEXT_WIDTH);
						this.setAndFitText(this.$['question-asker-value'], this.questionVal.asker, MAX_QUESTION_ASKER_WIDTH);
					}, null, null, 'questionEnter');
				}

				if (this.questionVal) {
					this.tl.to(this.$.question, 1, {
						y: 0,
						opacity: 1,
						ease: Power3.easeOut
					}, 'couchEnter+=0.1');
				}
			} else {
				console.log("Hiding Question");
				this.tl.to(this.$.question, 0.8, {
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