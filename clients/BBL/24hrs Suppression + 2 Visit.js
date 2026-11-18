var now = new Date().getTime();
// 24 hours in milliseconds: 1000 * 60 * 60 * 24
var twentyFourHours = 86400000;
var twentyFour_hrs_registry = user.get('overlay_registry_24hrs');
var data = (twentyFour_hrs_registry && twentyFour_hrs_registry != "false") ? JSON.parse(twentyFour_hrs_registry) : {};

var campaignCode  = mbox.param('campaignCode') || mbox.param('__adobe.target.campaignCode');
var interactionType = mbox.param('action') || mbox.param('__adobe.target.action');

if (campaignCode && (interactionType !== 'click' && interactionType !== 'dismissSuppress' && interactionType !== 'clickSuppress')) {
    
    var trackKey = "t" + campaignCode;    // Invisible tracker for the 1st view
    var suppressKey = "$" + campaignCode; // Actual suppressor for the 2nd view

    if (data[trackKey]) {
        // If they already have the 1st view tracked, write the 'p' key to suppress it now
        data[suppressKey] = now;
    } else {
        // First interaction: Track it, but don't suppress it yet
        data[trackKey] = now;
    }
}

// Automatic Cleanup: Remove any entry older than 24 hrs
for (var id in data) {
    if (now - data[id] > twentyFourHours) {
        delete data[id];
    }
}

return Object.keys(data).length > 0 ? JSON.stringify(data) : "false";