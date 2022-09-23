if ((page.url.indexOf("https://www.sc.com/sg/save/current-accounts/bonussaver/") >= 0))
    return "bonus";
if ((page.url.indexOf("https://www.sc.com/sg/credit-cards/smart-credit-card/") >= 0))
    return "SCC";
if (page.url.indexOf("https://www.sc.com/sg/wealth/") >= 0)
    return "wealth";
if (page.url.indexOf("https://www.sc.com/sg/borrow/loans/balance-transfer/") >= 0)
    return "BT";
if (page.url.indexOf("https://www.sc.com/sg/borrow/loans/cashone/") >= 0)
    return "CashOne";
if (page.url.indexOf("https://www.sc.com/sg/credit-cards/unlimited-cashback-credit-card/") >= 0)
    return "ucb";
if (page.url.indexOf("https://www.sc.com/sg/save/current-accounts/wealth-saver/") >= 0)
    return "WS";
if (page.url.indexOf("https://www.sc.com/sg/save/savings-accounts/jumpstart/") >= 0)
    return "JumpStart";
if (page.url.indexOf("https://www.sc.com/sg/save/savings-accounts/esaver/") >= 0)
    return "ESaver";
