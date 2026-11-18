var now = new Date().getTime();
// 24 hours in milliseconds: 1000 * 60 * 60 * 24
var twentyFourHours = 86400000;
var registry = user.get('overlay_registry_24hrs');
var data = (registry && registry != "false") ? JSON.parse(registry) : {};

// mBox param from the interact event Edge request 'overlayId'
var overlayId  = mbox.param('overlayId') || page.param('overlayId') || mbox.param('__adobe.target.overlayId');

// Capture the interaction type from the payload
var interactionType = mbox.param('action') || page.param('action') || mbox.param('__adobe.target.action');

// Add condition to ONLY store if it is NOT a conversion or "never show" click
if (overlayId && interactionType !== 'conversion' && interactionType !== 'never') {
    data["p" + overlayId ] = now;
}

// Automatic Cleanup: Remove any entry older than 24 hrs
for (var id in data) {
    if (now - data[id] > twentyFourHours) {
        delete data[id];
    }
}

return Object.keys(data).length > 0 ? JSON.stringify(data) : "false";
