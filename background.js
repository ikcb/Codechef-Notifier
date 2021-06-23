console.log("Background is running");

chrome.webRequest.onBeforeSendHeaders.addListener((details) =>{

    // check the URL from details object
    //  if the url matches the required codechef url then
    //  extract the submission id from the url

    const url = new URL(details.url);
    console.log(url);

    var pathArray = url.pathname.split('/');

    let Id =  pathArray[pathArray.length - 2];

         

  });

},
{
    urls : ["https://www.codechef.com/error_status_table/*"],
    types : ["xmlhttprequest"]
},
["requestHeaders"]);