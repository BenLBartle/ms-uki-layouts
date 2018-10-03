(function () {
	'use strict';

	const question = nodecg.Replicant('ms-question');
	const questionVisible = nodecg.Replicant('questionVisible');

	Polymer({
		is: 'ms-question-control',
		ready() {
			question.on('change', newVal => {
				this.question = {};
				this.question = newVal;
			});
		},

		hideQuestion() {
			this.questionVisible = false;
		},

		showQuestion() {
			if (this.$.questionText.value) {
				question.value = {
					text: this.$.questionText.value,
					asker: this.$.questionAsker.value ? this.$.questionAsker.value : "Anonymous"
				};
			this.questionVisible = true;
			}
		}
	});
})();