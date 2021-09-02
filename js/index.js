//console.log(sessionStorage.getItem("courriel"));

window.onload = function() {
    
    let connexionForm = document.getElementById("connexionForm");
    connexionForm.onsubmit = function() {
        let formData = new FormData(connexionForm);
        let data = {
            courriel: formData.get("courriel"),
            motDePasse: formData.get("motDePasse")
        };

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;
        
            if (this.status == 200) {
                var success = JSON.parse(this.responseText);
                if (success) {
                    //sessionStorage.setItem("courriel", data.courriel);
                    window.location.replace("application");
                } else {
                    
                }
            }
        
            // end of state change: it can be after some time (async)
        };

        xhr.open("POST", "http://localhost:8000/api/Connexion", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Access-Control-Allow-Headers', '*');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.send(JSON.stringify(data));

        return false;
    }

};