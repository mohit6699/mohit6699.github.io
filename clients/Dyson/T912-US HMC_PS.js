var path = (page.path || "").toLowerCase();
var query = (page.query || "").toLowerCase();
var registry = user.get('hmc_visitor_registry');

// Parse existing JSON data or start fresh
var data = (registry && registry != "false") ? JSON.parse(registry) : {};

// 1. Check if the user is currently visiting the HMC section page
// (Adjust "help-me-choose" or "hmc" to match your actual HMC section URL directory/path)
var isVisitingHmcPage = path.indexOf("help-me-choose") !== -1 || path.indexOf("hmc") !== -1;

if (isVisitingHmcPage) {
    var detectedCategory = "";

    // 2. Identify the category from the HMC landing page path or query string
    if (path.indexOf("hair-care") !== -1 || query.indexOf("hair-care") !== -1) {
        detectedCategory = "hair-care";
    } else if (path.indexOf("air-treatment") !== -1 || query.indexOf("air-treatment") !== -1) {
        detectedCategory = "air-treatment";
    } else if (path.indexOf("vacuum-cleaners") !== -1 || query.indexOf("vacuum-cleaners") !== -1) {
        detectedCategory = "vacuum-cleaners";
    }

    // 3. Save the category to our profile registry
    if (detectedCategory) {
        data[detectedCategory] = true;
    }
}

// 4. Return stringified object to save permanently in the visitor profile
return Object.keys(data).length > 0 ? JSON.stringify(data) : "false";