//a js file
//create all references to DOM elements
//and initialize global variables
const faqContainer = document.getElementById('faqContainer');
const searchBar = document.getElementById('searchBar');
const searchResults = document.getElementById('searchResults');
let faqData = [];
let filteredFaq = [];

//create search bar listener function
searchBar.addEventListener('keyup', (e) => {
	const searchString = e.target.value.toLowerCase();
	console.log(searchString);
	filteredFaq = faqData.filter((question) => {
		return (
			question.label.toLowerCase().includes(searchString) || 
			question.content.toLowerCase().includes(searchString)
		);
	});
	console.log(filteredFaq);
	displaySearches(filteredFaq)
});

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

const displaySearches = function(filteredFaq) {
	//remove all current search results
	while (searchResults.firstChild) {
		searchResults.removeChild(searchResults.firstChild);
	}

	//loop through filtered search data
	for (i = 0; i < filteredFaq.length; i++) {
		const div = document.createElement('div');
		const a = document.createElement('a');
		a.textContent = filteredFaq[i].label;
		a.setAttribute('class','searchElement');
		a.setAttribute('href', `#${i}`)
		console.log(a);
		div.appendChild(a);
		searchResults.appendChild(div);
	}

	


	//clear search results if search bar empty
	if (searchBar.value === ''){
		while (searchResults.firstChild) {
			searchResults.removeChild(searchResults.firstChild);
		}
	}

}

loadFaq()