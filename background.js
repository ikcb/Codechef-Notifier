console.log("Background is running");


function sendMessagetToGetInfo(url, id, xcsrf){

  chrome.tabs.query({url: "https://www.codechef.com/*/submit/*", title : "CodeChef | Competitive Programming | Participate & Learn | CodeChef"}, function(tabs) {

    console.log(tabs);

    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {

      console.log(response);
      
     

      });

      checkResult(url, id, xcsrf);
    });
  
}

function checkResult(url, id, xcsrf){
  $.ajax({
 
    url: url,

    dataType: "json",

    headers: {
      "x-csrf-token" : xcsrf
    },

    /*
    * function to handle success of XHR request
    * check if the response shows verdict available
    * if verdict available then notify user else
    * user setTimeout function to do recursive call
    * to this function after some seconds.
    */
    success: function(data, status, XHR){
        console.log(data, status);
    },

    /* function to handle errors*/
    error: function(XHR, status, error){
      console.log(error, status, XHR);
    }
});
}


chrome.webRequest.onBeforeSendHeaders.addListener((details) =>{

    // check the URL from details object
    //  if the url matches the required codechef url then
    //  extract the submission id from the url
    const url = new URL(details.url);
  // console.log(url);
   

    if(url.search.length > 0){
    
    
      let id = url.searchParams.get('solution_id');
      let xcsrf =  details.requestHeaders[2].value;

      
      var store={};
      store[id]=id;
    

      // check if a request with that submission id is already present in your storage
      //  The above check is necessary because codechef repeatedly sends this
      //  request until the result is obtained.

    
            
      chrome.storage.sync.get(id,function(key_values){
     
        if(Object.keys(key_values).length!=0)
        {
            console.log(key_values[id])
            checkResult(id,xcsrf,url)
        }
        else{
          chrome.storage.sync.set(store, function() {

            console.log('Value is set to ' + id);
            
          });
          sendMessagetToGetInfo(url, id, xcsrf);
        }
      })
    }
    

},
{
    urls : ["https://www.codechef.com/api/ide/submit*"],
    types : ["xmlhttprequest"]
},
["requestHeaders"]);