console.log("Background is running");


function sendMessagetToGetInfo(id){

  chrome.tabs.query({url: "https://www.codechef.com/*/submit/*", title : "CodeChef | Competitive Programming | Participate & Learn | CodeChef"}, function(tabs) {

    console.log(tabs);

    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {

      console.log(response);
     
      });
    });
  
}


chrome.webRequest.onBeforeSendHeaders.addListener((details) =>{

    // check the URL from details object
    //  if the url matches the required codechef url then
    //  extract the submission id from the url
    const req = "error_status_table";

    const url = new URL(details.url);

    console.log(url.href);

    var pathArray = url.pathname.split('/');

    if(req == pathArray[pathArray.length - 3]){
      console.log(details);
    
     

      let id =  pathArray[pathArray.length - 2];
      let xcsrf =  details.requestHeaders[2].value;

      // console.log("xcsrf ", xcsrf);

      var store={};
      store[id]=id;

      // check if a request with that submission id is already present in your storage
      //  The above check is necessary because codechef repeatedly sends this
      //  request until the result is obtained.

    
            
      chrome.storage.sync.get(id,function(key_values){
        console.log(typeof key_values[id])
        if(Object.keys(key_values).length!=0)
        {
            console.log(key_values[id])
            // checkResult(id,csrf_token,url_string)
        }
        else{
          chrome.storage.sync.set(store, function() {

            console.log('Value is set to ' + id);
            
          });
          sendMessagetToGetInfo(id);
        }
      })
    }
    

},
{
    urls : ["https://www.codechef.com/*"],
    types : ["xmlhttprequest"]
},
["requestHeaders"]);