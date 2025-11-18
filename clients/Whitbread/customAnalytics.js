alloy("sendEvent", {
  xdm: {
    eventType: "web.webinteraction.linkClicks", 
    web: {
      webInteraction: {
        type: "exit",     
        name: "National Express Banner Clicked",
        linkClicks: {
            value: 1
          }
      }
    },
    _experience: {
      analytics: {
        event201to300: {
          event273: {
            value: 1
          }
        }
      }
    }
  }
});