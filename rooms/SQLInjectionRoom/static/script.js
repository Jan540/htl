const form = document
    .querySelector("#submit")
    .addEventListener("click", (e) => {
        e.preventDefault();
        username = document.querySelector("#email").value;
        password = document.querySelector("#password").value;
        fetch(
            `http://${API_HOSTNAME}:${API_PORT}/api/v1/login/?username=${username}&password=${password}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (data.status == "success") {
                    window.location.href = `http://${API_HOSTNAME}:${API_PORT}/1a51e157adec61466408206d2c8d95b0e9b6a6d0`;
                } else {
                    alert("Wrong username or password");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
