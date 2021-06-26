console.log("connection is live");

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab,
                  "from the extension");
      if (request.greeting === "hello")
        sendResponse({farewell: "goodbye"});
    }
  );