console.log("Background is running");



chrome.webRequest.onBeforeSendHeaders.addListener((details) =>{

    // check the URL from details object
    //  if the url matches the required codechef url then
    //  extract the submission id from the url

    const url = new URL(details.url);
    console.log(url);

    var pathArray = url.pathname.split('/');

    let id =  pathArray[pathArray.length - 2];

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
        sendMessagetToGetInfo();
      }
    })
    

},
{
    urls : ["https://www.codechef.com/error_status_table/*"],
    types : ["xmlhttprequest"]
},
["requestHeaders"]);