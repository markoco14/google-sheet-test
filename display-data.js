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
	const searchArray = searchString.split(' ');
	console.log("Your search array.")
	console.log(searchArray);
	filteredFaq = faqData.filter((question) => {
		for (j = 0; j < searchArray.length; j++) {
			return (
				question.label.toLowerCase().includes(searchArray[j]) || 
				question.content.toLowerCase().includes(searchArray[j])
			);
		}
	});
	console.log("Your search results");
	console.log(filteredFaq);
	displaySearches(filteredFaq)
});

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
		const input = document.createElement('input');
		const label = document.createElement('label');
		const p = document.createElement('p');

		//set input and label attributes
		input.setAttribute('id', `toggle${faqData[i].id}`)
		input.setAttribute('class', 'checkbox');
		input.setAttribute('type', 'checkbox');
		label.setAttribute('for', `toggle${faqData[i].id}`)
	
		//set question and answer content (innerHTML)
		label.innerHTML = faqData[i].label;
		p.innerHTML = faqData[i].content;
		div.appendChild(input);
		div.appendChild(label);
		div.appendChild(p);
		div.setAttribute('id', `question${faqData[i].id}`)
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
		a.setAttribute('href', `#question${filteredFaq[i].id}`)
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

