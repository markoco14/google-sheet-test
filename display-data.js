//a js file
const faqContainer = document.getElementById('faq-container');
let faqData = [];

/* GITHUB JSON LINK
https://markoco14.github.io/google-sheet-test/faqDataJSON.json
*/

const loadFaq = async () => {
	try {
		const res = await fetch('https://markoco14.github.io/google-sheet-test/faqDataJSON.json');
		console.log(res);
		faqData = await res.json();
		console.log(faqData);
		displayFaq(faqData);	
	} catch (err) {
		console.log(err);
	}
};

const displayFaq = function(data) {
	for (i = 0; i < faqData.length; i++) {
		const div = document.createElement('div');
		const label = document.createElement('label');
		const p = document.createElement('p');
		label.innerHTML = faqData[i].label;
		p.innerHTML = faqData[i].content;
		div.appendChild(label);
		div.appendChild(p);
		faqContainer.appendChild(div);
	}
}

loadFaq()