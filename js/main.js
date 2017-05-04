// Lisen for form submit

document.getElementById('myForm').addEventListener('submit', SaveBookmark);

function SaveBookmark(e) {
    // Get form values

    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateform(siteName, siteUrl)){
    	return false;
    }
    
    //create a object

    var bookmark = {
    	name: siteName,
    	url:  siteUrl
    }

    //Test if bookmark is null
    if (localStorage.getItem('bookmarks') === null) {
    	// Init aray
    	var bookmarks = [];
    	//AAdd to array
    	bookmarks.push(bookmark);
    	// Set to local storage
    	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    } else {
    	//Get bookmarks from local storage
    	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    	//Add bookmark to array
    	bookmarks.push(bookmark);
    	//Re-set back to LocalStorage
    	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    }

    // clear form
    document.getElementById('myForm').reset();

    //refetch bookmarks
    fetchBookmarks();

    //prevent form from submitting
	e.preventDefault();
}
   // Delete Function
   function deleteBookmark(url) {
   	//Get bookmarks from local storage
  	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop through bookmarks
    for(var i =0; i < bookmarks.length; i++){
    	if (bookmarks[i].url == url) {
    		//remove from array
    		bookmarks.splice(i, 1);
    	}
    }
    //Re-set back to LocalStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    // Refetch bookmarks
    fetchBookmarks();
   }
  // Fetch bookmarks
  function fetchBookmarks() {
  	//Get bookmarks from local storage
  	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  	// Get output id
  	var bookmarksResults = document.getElementById('bookmarksResults');

  	// Build output
  	bookmarksResults.innerHTML= '';
  	for (var i = 0; i < bookmarks.length; i++) {
  		var name = bookmarks[i].name;
  		var url = bookmarks[i].url;

  		bookmarksResults.innerHTML += '<div class="well">'+
  		                              '<h3>'+name+
  		                              '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
  		                              '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
  		                              '</h3>'+
  		                              '</div>';
  	}
  }

    //Form validation
    function validateform(siteName, siteUrl) {
    if(!siteName || !siteUrl){
    	alert('Please fill in the form');
    	return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
    	alert('Please use a valid url starts with http://');
    	return false;
    }

    return true;
    }
