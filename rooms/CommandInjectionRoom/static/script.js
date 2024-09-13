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
					console.log(data);
					window.location.href =
					`http://${API_HOSTNAME}:${API_PORT}/a94a8fe5ccb19ba61c4c0873d391e987982fbbd3`;
				} else {
					alert("Wrong username or password");
				}
			})
			.catch((err) => {
				console.log(err);
			});
});
