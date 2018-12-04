//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);
//save bookmark
function saveBookmark(e) {
    //Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;


    if (!validateForm(siteName, siteUrl)) {
    return false;

}
    var bookmark = {
        name:  siteName,
        url: siteUrl
        
    }


    //Test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        //init arr
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //Add bookmark ot array
        bookmarks.push(bookmark);
        //        Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    
    //clear Form
    document.getElementById('myForm').reset();

    //Re-fetch Bookmarks
    fetchBookmarks();





    //prevent form from submitting 
    e.preventDefault();
}
//delete Bookmarks
function deleteBookmark(url) {
    //Get Bookmarks form localstoage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // remove from array
            bookmarks.splice(1, 1);

        }
    }
    //        Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    //Re-fetch Bookmarks
    fetchBookmarks();
}
//fetch Bookmarks

function fetchBookmarks() {
    //Get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //Build output
    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
            '<h3>' + name +
            '<a class="btn btn-default" target="_blank" href="' + url + '">Visit</a>' +
            ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn btn-danger"  href="#">Delete</a>' +
            '<h3>' +
            '</div>';

    }
}

function validateForm(siteName, siteUrl) {
    //Validation 
    if (!siteName || !siteUrl) {
        alert('Please fill in the form');
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid Url');
        return false;
    }

    return true;
}
