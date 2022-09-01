if ((page.url.indexOf("https://www.sc.com/sg/save/savings-accounts/esaver/") >= 0) ||(page.url.indexOf("https://www.sc.com/sg/save/current-accounts/wealth-saver/") >= 0) || (page.url.indexOf("https://www.sc.com/sg/save/current-accounts/bonussaver/") >= 0) || (page.url.indexOf("https://www.sc.com/sg/credit-cards/smart-credit-card/") >= 0) || (page.url.indexOf("https://www.sc.com/sg/wealth/") >= 0) || (page.url.indexOf("https://www.sc.com/sg/borrow/loans/balance-transfer/") >= 0) || (page.url.indexOf("https://www.sc.com/sg/borrow/loans/cashone/") >= 0)) {
    if ((page.url.indexOf("https://www.sc.com/sg/save/savings-accounts/esaver") >= 0))
        return "ESAVER";
    if ((page.url.indexOf("https://www.sc.com/sg/save/current-accounts/wealth-saver/") >= 0))
        return "WS";
    if ((page.url.indexOf("https://www.sc.com/sg/save/current-accounts/bonussaver/") >= 0))
        return "Bonus";
    if ((page.url.indexOf("https://www.sc.com/sg/credit-cards/smart-credit-card/") >= 0))
        return "SCC";
    if (page.url.indexOf("https://www.sc.com/sg/wealth/") >= 0)
        return "Wealth";
    if (page.url.indexOf("https://www.sc.com/sg/borrow/loans/balance-transfer/") >= 0)
        return "BT";
    if (page.url.indexOf("https://www.sc.com/sg/borrow/loans/cashone/") >= 0)
        return "CashOne";
}
else {
    var pageURLwithOutquery = page.url.split(page.query);
    var isHomePage = ((pageURLwithOutquery[0] == "https://www.sc.com/sg/") || (pageURLwithOutquery[0] == "https://www.sc.com/sg/?"));
    if (isHomePage == false) {
        if (page.url.indexOf("https://www.sc.com/sg/") >= 0) {
            return "";
        }
    }
}