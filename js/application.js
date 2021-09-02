window.addEventListener('hashchange', function (event) {
	// Log the state data to the console
    if (sessionStorage.getItem("courriel")) {
        window.location = "application.html";
    }
});