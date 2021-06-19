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
	//initialize faqData count property
	for (i = 0; i < faqData.length; i++) {
		faqData[i]["count"] = 0;
	}
	//console.log(faqData)


	//reset filteredFaq so search terms clear..?
	filteredFaq = [];
	//create trackers which questions to include
	let labelYes;
	let contentYes;

	//create the search array
	const searchString = e.target.value.toLowerCase();

	//initialize filterString to filter symbols and special characters
	let filterString = searchString;
	//console.log('filter string')
	//console.log(filterString);
	
	//get rid of all punctuation from the search string 
	for (i = 0; i < dnuPunctuation.length; i++) {
		while (filterString.includes(dnuPunctuation[i])) {
			//console.log(`We found a/an ${dnuPunctuation[i]} in your filter string`);
			//console.log(`Removing ${dnuPunctuation[i]} from your filter string`);
			filterString = filterString.replace(`${dnuPunctuation[i]}`, '');
			//console.log(`Your new filter string`);
			//console.log(filterString);
		}
	}

	//split the filter string into the search array
	let searchArray = filterString.split(' ');
	//console.log(searchArray);
	
	//remove do not use search terms
	//removeNotUseTerms(searchArray, doNotUse)

	//taking out DNU search terms now
	let badSearchArray = [];
	let goodSearchArray = [];
	//console.log(`search array length: ${searchArray.length}`);
	//console.log(`now we remove do not use search terms`);
	for (i = 0; i < searchArray.length; i++) {
		//console.log(`this is searchArray index: ${i}`);
		if (dnuWords.includes(searchArray[i])) {
			//console.log(`We found index ${i} matches doNotUse words`);
			//console.log(`Adding index ${i} to badSearchArray`);
			badSearchArray.push(searchArray[i]);
			//console.log(badSearchArray);
		} else {
			//console.log(`searchArray index: ${i} is all good`);
			//console.log(`Adding index ${i} to goodSearchArray`);
			goodSearchArray.push(searchArray[i]);
			//console.log('logging good searcharray');
			//console.log(goodSearchArray);
		}
	}
	//console.log("Making searchArray equal to goodSearchArray");
	searchArray = goodSearchArray;
	//console.log('logging searchArray');
	//console.log(searchArray);
	//console.log(`logging search array`);
	//console.log(searchArray);
	return searchArray;

	//check for search term matches
	for (i = 0; i < faqData.length; i++) {
		for (j = 0; j < searchArray.length; j++) {
			//console.log(`Checking question${i+1} for ${searchArray[j]}`);
			//check if questions match search terms
			if (faqData[i].question.toLowerCase().includes(searchArray[j].toLowerCase())) {
				//console.log(`yes, question${i+1} includes ${searchArray[j]}`);
				labelYes = true;
			} else {
				labelYes = false;
			}
			//console.log(`Checking answer${i+1} for ${searchArray[j]}`);
			//check if answers match search terms
			if (faqData[i].answer.toLowerCase().includes(searchArray[j].toLowerCase())) {
				//console.log(`yes, answer${i+1} includes ${searchArray[j]}`)
				contentYes = true;
			} else {
				contentYes = false;
			}
			//console.log(`label yes is ${labelYes}`);
			//console.log(`content yes is ${contentYes}`);

			//give each faqData[i] a count value if the answer matches
			if (labelYes === true) {
				faqData[i].count += 1;
				//console.log(`the count for faqData${i} is going up`);
			}

			//give each faqData[i] a count value if the answer matches
			if (contentYes === true) {
				faqData[i].count += 1;
				//console.log(`the count for faqData${i} is going up`);
			}
			//console.log(`logging the new count value for ${i}`);
			//console.log(faqData[i].count)
			
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

			
		}
	}

	/*filteredFaq.sort((a,b)=>b-a);*/
	//sort filteredFaq by count here
	function compare( a, b ) {
	  if ( a.count < b.count ){
	    return 1;
	  }
	  if ( a.count > b.count ){
	    return -1;
	  }
	  return 0;
	}

	filteredFaq.sort( compare );
	//console.log("hopefully this is a sorted filteredFaq");
	//console.log(filteredFaq);

	//log out the filterdFaq, test if it worked
	//console.log("Your search results");
	//console.log(filteredFaq);

	//clean up filteredFaq here, remove duplicate search terms


	//call the display searches function
	//displaySearches(filteredFaq)
});

const loadFaq = async () => {
	let url = "https://markoco14.github.io/google-sheet-test/faqDataJSON.json";
	/* url for script link
	<script src="https://markoco14.github.io/google-sheet-test/display-data.js"></script>
	*/

	try {
		const res = await fetch(url);
		console.log(res);
		faqData = await res.json();
		console.log(faqData);
		//displayFaq(faqData);	
	} catch (err) {
		console.log(err);
	}
};

//this function displays the matching search results under the search bar
const displaySearches = function(filteredFaq) {
	//remove all current search results
	while (searchResults.firstChild) {
		searchResults.removeChild(searchResults.firstChild);
	}


	//loop through filtered search data
	for (i = 0; i < filteredFaq.length; i++) {
		const div = document.createElement('div');
		const a = document.createElement('a');
		a.textContent = filteredFaq[i].question;
		div.setAttribute('class','searchContainer');
		a.setAttribute('href', `#question${filteredFaq[i].id}`)
		a.setAttribute('class', 'searchLink');
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