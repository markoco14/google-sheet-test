//a js file
//create all references to DOM elements
//and initialize global variables
const faqContainer = document.getElementById('faqContainer');
const searchBar = document.getElementById('searchBar');
const searchResults = document.getElementById('searchResults');
let faqData = [];
let filteredFaq = [];
let doNotUse = ['and', 'but', 'or', 'if', '', 'an', 'I'];

//this will work better if I define some functions

//create search bar listener function
searchBar.addEventListener('keyup', (e) => {
	filteredFaq = [];
	//create trackers which questions to include
	let labelYes;
	let contentYes;

	//create the search array
	const searchString = e.target.value.toLowerCase();
	let searchArray = searchString.split(' ');
	
	//const filteredSearchArray = [];
	console.log("We start here with the search array.")
	console.log(searchArray);

	//remove do not use search terms
	removeNotUseTerms(searchArray, doNotUse)

	//check for search term matches
	for (i = 0; i < faqData.length; i++) {
		for (j = 0; j < searchArray.length; j++) {
			//console.log(`Checking question${i+1} for ${searchArray[j]}`);
			//check if questions match search terms
			if (faqData[i].label.toLowerCase().includes(searchArray[j].toLowerCase())) {
				//console.log(`yes, question${i+1} includes ${searchArray[j]}`);
				labelYes = true;
			} else {
				labelYes = false;
			}
			//console.log(`Checking answer${i+1} for ${searchArray[j]}`);
			//check if answers match search terms
			if (faqData[i].content.toLowerCase().includes(searchArray[j].toLowerCase())) {
				//console.log(`yes, answer${i+1} includes ${searchArray[j]}`)
				contentYes = true;
			} else {
				contentYes = false;
			}
			//console.log(`label yes is ${labelYes}`);
			//console.log(`content yes is ${contentYes}`);
			
			//add questions and answers to filteredFaq
			if (labelYes === true || contentYes === true) {
				//break;
				//here I need to set the qualities
				//of id, label, content,
				//filteredFaq[i]
				/*filteredFaq.push(faqData[i]);
				console.log(filteredFaq);*/
				if (!filteredFaq.includes(faqData[i])) {
					//console.log("not already in filteredFaq.")
					//console.log(`question${i+1} will be added to the search results`);
					//console.log(`Storing ID:${i+1} in filteredFaq`)
					filteredFaq.push(faqData[i]);
				} else {
					//console.log("This is already in the search, it won't be included again");
				}
			} else {
				//console.log(`question${i+1} will not be added to the search results`);
			}	
			
			//i think one problem is that i need to just
			//track which i values will go into the
			//filteredFAQ
			//maybe I can populate that into an Array
			//and send the array to the display searches function
		}
	}

	//log out the filterdFaq, test if it worked
	//console.log("Your search results");
	//console.log(filteredFaq);

	//clean up filteredFaq here, remove duplicate search terms


	//call the display searches function
	displaySearches(filteredFaq)
});

//function to remove do not use search terms
let removeNotUseTerms = function(searchArray, doNotUse) {
	let testArray = [];
	console.log(`search array length: ${searchArray.length}`);
	console.log(`now we remove do not use search terms`);
	for (i = 0; i < searchArray.length; i++) {
		console.log(`this is searchArray index: ${i}`);
		if (doNotUse.includes(searchArray[i])) {
			console.log(`We found index ${i} matches doNotUse words`);
			console.log(`Removing index ${i} from search array`);
			searchArray.splice(i);
			console.log(searchArray);
		} else {
			console.log(`searchArray index: ${i} is all good`);
		}
		console.log(searchArray);
	}
	console.log(`logging search array`);
	console.log(searchArray);
	return searchArray;
}

const loadFaq = async () => {
	try {
		const res = await fetch('https://markoco14.github.io/google-sheet-test/faqDataJSON.json');
		console.log(res);
		faqData = await res.json();
		faqData.pop(faqData.length-1);
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



/*
filteredFaq = faqData.filter((question) => {
		for (j = 0; j < searchArray.length; j++) {
			console.log(j);
			return (
				(question.label.toLowerCase().includes(searchArray[j]) &&
				question.content.toLowerCase().includes(searchArray[j])) || 
				question.label.toLowerCase().includes(searchArray[j]) || 
				question.content.toLowerCase().includes(searchArray[j])
			);

		}
	});
*/

/*
	for (i = 0; i < searchArray.length; i++) {
		console.log(`this is searchArray index: ${i}`);
		if (doNotUse.includes(searchArray[i])) {
			console.log(`We found index ${i} matches doNotUse words`);
			console.log(`Removing index ${i} from search array`);
			searchArray.splice(i);
			console.log(searchArray);
		} else {
			console.log(`searchArray index: ${i} is all good`);
		}
		for (j = 0; j < doNotUse.length; j++) {
			if (doNotUse[j].includes(searchArray[i])) {
				tracker = true;
				console.log(`${searchArray[i]} IS in doNotUse`);
			} else {
				console.log(`${searchArray[i]} is not in doNotUse`);
			}
			if (tracker === true) {
				console.log(`removing index ${i} from search array`);
				searchArray.splice(searchArray[i]);
				console.log(searchArray);
			}
		}
		console.log(searchArray);
	}*/