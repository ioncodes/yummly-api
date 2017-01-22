var request = require('request');

var url;
var mainUrl = "https://mapi.yummly.com/mapi/v13/content/";
var searchParam = "search?q=";
var search;
var startParam = "start=";
var start = 0;
var maxParam = "maxResult=";
var max = 100;
var fetchUserCollectionsParam = "fetchUserCollections=";
var fetchUserCollections = false;
var allowedContentParam = "allowedContent[]=";
var allowedContents = [
    "single_recipe",
    "suggested_source",
    "suggested_search",
    "related_search"
];
var facetFieldParam = "facetField[]=";
var facetFields = [
    "diet",
    "holiday",
    "technique",
    "cuisine",
    "course",
    "source",
    "brand",
    "difficulty",
    "dish",
    "adtag"
];
var viewTypeParam = "solr.view_type=";
var viewType = "search_internal";

// Constructor
function Yummly() {
    start = 0;
    max = 100;
    fetchUserCollections = false;
    allowedContents = [
        "single_recipe",
        "suggested_source",
        "suggested_search",
        "related_search"
    ];
    facetFields = [
        "diet",
        "holiday",
        "technique",
        "cuisine",
        "course",
        "source",
        "brand",
        "difficulty",
        "dish",
        "adtag"
    ];
}

Yummly.prototype.setSearch = function(param) {
    search = param;
};

Yummly.prototype.setStart = function(param) {
    start = param;
};

Yummly.prototype.setMaxResults = function(param) {
    max = param;
};

Yummly.prototype.setFetchUserCollection = function(param) {
    fetchUserCollections = param;
};

Yummly.prototype.setAllowedContent = function(param) {
    allowedContents = param;
};

Yummly.prototype.setFacetFields = function(param) {
    facetFields = param;
};

Yummly.prototype.setViewType = function(param) {
    viewType = param;
};

Yummly.prototype.getRecipes = function(callback) {
    update();
    request.get(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            callback(body);
        }
    })
};

function update() {
    url = mainUrl + searchParam + search + "&";
    url += startParam + start + "&";
    url += maxParam + max + "&";
    for(var i = 0; i < fetchUserCollections.length-1; i++) {
        url += fetchUserCollectionsParam;
        url += fetchUserCollections[i] + "&";
    }
    for(var i = 0; i < allowedContents.length-1; i++) {
        url += allowedContentParam;
        url += allowedContents[i] + "&";
    }
    for(var i = 0; i < facetFields.length-1; i++) {
        url += facetFieldParam;
        url += facetFields[i] + "&";
    }
    url += viewTypeParam + viewType;
}

module.exports = Yummly;
