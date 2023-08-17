if (window.digitalData.targetVars.pageView === "Order Confirmation Page View") {
    setTimeout(function () {
        
        var brand;
        if (digitalData.targetVars.brand != "") {
            brand = digitalData.targetVars.brand;
        }

        adobe.target.trackEvent({
            "mbox": "orderConfirmPage",
            "params": {
                "brand": brand,
                "orderId": _satellite.getVar("AT:OrderId"),
                "orderTotal": _satellite.getVar("AT:OrderTotal"),
                "productPurchasedId": _satellite.getVar("AT:PurchasedProducts")
            }
        });
    }, 3000)

} else {
    (function () {
        var cnt = 20000;
        function init() {
            if (typeof (digitalData) != 'undefined' && ((typeof (digitalData.targetVars) != 'undefined' && typeof (digitalData.targetVars.product) != 'undefined' && typeof (digitalData.targetVars.product.categoryId) != 'undefined') || (typeof (digitalData.targetVars) != 'undefined' && typeof (digitalData.targetVars.categoryId) != 'undefined'))) {

                var categoryList = digitalData.targetVars.product.categoryId || digitalData.targetVars.categoryId;
                var categoryList1;
                if (_satellite.getVar("AT:TargetCategories")) {
                    categoryList1 = _satellite.getVar("AT:TargetCategories");
                }
                var categoryList2 = _satellite.getVar("AT:TargetCategoriesPage") || _satellite.getVar("AT:TargetCategoriesPageProd");
                //console.log('Information Captured',categoryList, categoryList1, categoryList2);
                var productPrice = "";
                var catTokens = "";
                var brand;
                if (digitalData.targetVars.brand != "") {
                    brand = digitalData.targetVars.brand;
                }
                else {
                    brand = digitalData.targetVars.product.brand;
                }
                if (digitalData.page.pageInfo.pageType == "productPage") {
                   
                    var categoryPageList = digitalData.targetVars.categoryId;
                    var productPageList = digitalData.targetVars.product.categoryId;
                    var categoryListP = '';
                    if (productPageList != "undefined" && categoryPageList == "") {
                        
                        var catTokensP = productPageList.split(',');
                        var catLegnthP = catTokensP.length;

                        if (catLegnthP == 4) {
                            for (i = 0; i < catTokensP.length; i++)
                                categoryListP = catTokensP[i] + "," + catTokensP[i] + ":" + catTokensP[i - 1] + "," + catTokensP[i] + ":" + catTokensP[i - 1] + ":" + catTokensP[i - 2] + "," + catTokensP[i] + ":" + catTokensP[i - 1] + ":" + catTokensP[i - 2] + ":" + catTokensP[i - 3];
                        }
                        else if (catLegnthP == 3) {
                            for (i = 0; i < catTokensP.length; i++)
                                categoryListP = catTokensP[i] + "," + catTokensP[i] + ":" + catTokensP[i - 1] + "," + catTokensP[i] + ":" + catTokensP[i - 1] + ":" + catTokensP[i - 2];
                        }
                        else if (catLegnthP == 2) {
                            for (i = 0; i < catTokensP.length; i++)
                                categoryListP = catTokensP[i] + "," + catTokensP[i] + ":" + catTokensP[i - 1];
                        }
                        else if (catLegnthP == 1) {
                            for (i = 0; i < catTokensP.length; i++)
                                categoryListP = catTokensP[i];
                        }
                    }
                    categoryList1 = categoryListP || '';
                    productPrice = digitalData.product[0].productInfo.discountPrice;
                }
                if (categoryList) {
                    catTokens = categoryList2.split(",");
                }
                /* Category Page */
               if(_satellite.getVar("productCategoryL1_TargetAffinity")!=undefined)
               {
                adobe.target.getOffers({
                    request: {
                        execute: {
                            pageLoad: {
                                parameters: {
                                    "userStatus":_satellite.getVar('userStatus'),
                                    "user.categoryId": _satellite.getVar("productCategoryL1_TargetAffinity"),
                                    "entity.shopName": digitalData.targetVars.product.shopName,
                                    "price": productPrice,
                                    "entity.categoryId": categoryList1,
                                    "entity.brand": brand,
                                    "entity.id": _satellite.getVar("AT:Product").id,
                                    "excludedIds": _satellite.getVar("AT:CartItems"),
                                    "travellerArrival": digitalData.targetVars.travellerArrival,
                                    "loggedInStatus": digitalData.user.loggedInStatus,
                                    "travellerDeparture": digitalData.targetVars.travellerDeparture,
                                    "travellerHomeDelivery": digitalData.targetVars.travellerHomeDelivery,
                                    "nonTravellerHomeDelivery": digitalData.targetVars.nonTravellerHomeDelivery,
                                    "cat1": catTokens && catTokens.length > 0 ? catTokens[0] : "",
                                    "cat2": catTokens && catTokens.length > 1 ? catTokens[1] : "",
                                    "cat3": catTokens && catTokens.length > 2 ? catTokens[2] : "",
                                }
                            }
                        }
                    }
                }).then(function (response) {
                    return adobe.target.applyOffers({
                        response: response
                    });
                }).then(function () {
                    return console.log("Success");
                }).catch(function (error) {
                    return console.log("Error", error);
                });
            }
                /* Category Page - End */

            else

                /* Product Page - Start */

            {
                adobe.target.getOffers({
                    request: {
                        execute: {
                            pageLoad: {
                                parameters: {
                                    "userStatus":_satellite.getVar('userStatus'),
                                    "entity.shopName": digitalData.targetVars.product.shopName,
                                    "price": productPrice,
                                    "entity.categoryId": categoryList1,
                                    "entity.brand": brand,
                                    "entity.id": _satellite.getVar("AT:Product").id,
                                    "excludedIds": _satellite.getVar("AT:CartItems"),
                                    "travellerArrival": digitalData.targetVars.travellerArrival,
                                    "loggedInStatus": digitalData.user.loggedInStatus,
                                    "travellerDeparture": digitalData.targetVars.travellerDeparture,
                                    "travellerHomeDelivery": digitalData.targetVars.travellerHomeDelivery,
                                    "nonTravellerHomeDelivery": digitalData.targetVars.nonTravellerHomeDelivery,
                                    "cat1": catTokens && catTokens.length > 0 ? catTokens[0] : "",
                                    "cat2": catTokens && catTokens.length > 1 ? catTokens[1] : "",
                                    "cat3": catTokens && catTokens.length > 2 ? catTokens[2] : "",
                                }
                            }
                        }
                    }
                }).then(function (response) {
                    return adobe.target.applyOffers({
                        response: response
                    });
                }).then(function () {
                    return console.log("Success");
                }).catch(function (error) {
                    return console.log("Error", error);
                });
            }
                /* Product Page */

            }

            else if (cnt > 0) {
                cnt = cnt - 50;
                setTimeout(init, 50);
            } else {
            }
        }
        init();
    })();
}