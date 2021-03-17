/**
 * 
 */
console.log("hello service world.");

self.addEventListener("fetch", function(event) {
    console.log("request: " + event.request.url);
})