if (
  page.url.indexOf("https://www.sc.com/sg/save/current-accounts/bonussaver/") >=
    0 ||
  page.url.indexOf("https://www.sc.com/sg/credit-cards/smart-credit-card/") >=
    0 ||
  page.url.indexOf("https://www.sc.com/sg/borrow/loans/balance-transfer/") >=
    0 ||
  page.url.indexOf("https://www.sc.com/sg/borrow/loans/cashone/") >= 
    0 ||
  page.url.indexOf("https://www.sc.com/sg/credit-cards/unlimited-cashback-credit-card/") >= 
    0 ||
  page.url.indexOf("https://www.sc.com/sg/save/current-accounts/wealth-saver/") >= 
    0 ||
  page.url.indexOf("https://www.sc.com/sg/save/savings-accounts/jumpstart/") >=
    0 ||
  page.url.indexOf("https://www.sc.com/sg/save/savings-accounts/esaver/") >=
    0 ||
  page.url.indexOf("https://www.sc.com/sg/wealth/investment/unit-trusts/") >=
    0 ||
  page.url.indexOf("https://www.sc.com/sg/wealth/investment/online-trading/") >=
    0 ||
  page.url.indexOf("https://www.sc.com/sg/wealth/") >= 0
)
  return Number(new Date().setTime(new Date().getTime() + 3 * 60000));
