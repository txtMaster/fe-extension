chrome.runtime.onMessage.addListener((msg,sender)=>{
    if(msg.type === "POPUP_CONFIG_CHANGE"){
        console.log(msg.payload)
        chrome.tabs.query(
            {active:true,currentWindow:true},
            ([tab])=>{
                if(!tab?.id) return;
                chrome.tabs.sendMessage(tab.id,{
                    type:"CONFIG_CHANGE",
                    payload:msg.payload
                })
            }
        )
    }
})

chrome.runtime.onMessage.addListener((msg,sender)=>{
    if(msg.type === "GET_CONFIG"){
        
    }
})