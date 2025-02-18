document.querySelector("#createshorturl").addEventListener("click", function() {
    let lurl = document.querySelector("#longurl").value.trim();
    if (lurl.length == 0) {  
        alert("Please enter a valid URL!");
        return;
    } 
    else if (!(lurl.startsWith("http://") || lurl.startsWith("https://"))) {
        alert("Please enter a valid URL that starts with http:// or https://");
        return;
    }
    const host = "http://localhost:5000/";
    fetch(host + "api/createshorturl", {
        method: "POST",
        body: JSON.stringify({ longurl: lurl }),
        headers: {
            "Content-Type": "application/json; charset=UTF-8" 
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === "ok") {
            let shortUrl = `http://localhost:5000/${data.shorturl}`;
            document.querySelector("#short-url").textContent = `Short URL: ${shortUrl}`;
            document.querySelector("#short-url").href = shortUrl; 
            // alert("Short URL created successfully!");
        } else {
            alert("Failed to create short URL. Please try again.");
        }
    })
    .catch(error => {
        alert("Something went wrong!");
        console.error("Error:", error);
    });
    (function(){
        fetch(host + "api/getallshorturl")
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                let x = "";
                for(let i = 0; i < data.length; i++) {
                    x += `<tr>
                        <td>${data[i].longurl}</td>
                        <td>${host}${data[i].shorturl}</td>
                        <td>${data[i].count}</td>
                    </tr>`;
                }
                document.querySelector("#listurls tbody").innerHTML = x;
            })
            .catch(function(error) {
                console.error("Error fetching data:", error);
                alert("Something went Wrong!!");
            });
    })();
});
