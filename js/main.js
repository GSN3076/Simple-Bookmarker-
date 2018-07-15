//listen for form submitting
document.getElementById('myForm').addEventListener('submit', saveBookmarks);

function saveBookmarks(e){

    //form values
    var siteName = document.getElementById('sitename').value;
    var siteUrl = document.getElementById('siteurl').value;

    

        if(!validateForm(siteName,siteUrl)){
            return false;
        }

    //single bookmark
    var bookmark = {
        name:siteName,
        url:siteUrl
    }
    
    //localstorage 
    if(localStorage.getItem('bookmarks') === null){
        //initailize array
         var bookmarks=[];
         bookmarks.push(bookmark);

        //set items localstorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    else {
        //Get bookmarks from local storage
       var bookmarks= JSON.parse(localStorage.getItem('bookmarks'));
       //add bookmarks to array
        bookmarks.push(bookmark);
        //reset Back to local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
        }

        //clear the form 
        document.getElementById('myForm').reset();

        fetchBookmarks();

    e.preventDefault();
}


function deleteBookmark(url){

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    for(var i = 0;i<bookmarks.length;i++){
        if(bookmarks[i].url == url){
            bookmarks.splice(i,1);
        }
    }
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    //refetch bookmarks again
    fetchBookmarks();
    
}

//featching Bookmarks
function fetchBookmarks(){

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    //get output id
    var Results = document.getElementById('Results');

    //Build Output
    Results.innerHTML = '';
    for(var i = 0; i< bookmarks.length;i++ ){
        var name= bookmarks[i].name;
        var url = bookmarks[i].url;
    
        Results.innerHTML +='<div class="container" align=center>' +
                                '<div class="well">'+
                            '<h3>'+name+
                            '<a class="btn" target="_blank" href="'+url+'">Visit</a>' +
                            '<a onclick="deleteBookmark(\''+url+'\')" class="btn"  href="#">Delete</a>' 
                                '</h3>'+
                                '</div>'+'</div>';
    }
}

function validateForm(siteName,siteUrl){
    if(!siteName || !siteUrl){
        alert('Fill The Bookmarks');
        return false;
    }


    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)){
        alert('Please Use a Valid URl');
        return false;
    }
    return true;
}