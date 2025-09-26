getRepos();

async function getRepos() {
	try {
		const resource = await fetch(
			"https://api.github.com/users/danny-karlsson-ju/repos"
		);
		if (!resource.ok) {
			throw new Error("Failed to fetch repos");
		}
		const data = await resource.json();

		createRepos(data);
	} catch (error) {
		console.log(error);
		document.querySelector(".repos").innerHTML = "Failed to load repos";
	}
}

function createRepos(repoData) {
	const repos = document.querySelector(".repos");

	repoData.forEach((repo) => {
		const repoBtn = document.createElement("a");
		repoBtn.classList.add("button", "is-dark", "m-2");
		repoBtn.textContent = repo.name;
		repoBtn.href = repo.html_url;
		repoBtn.target = "_blank";
		console.log(repo.html_url);

		repos.appendChild(repoBtn);
	});
}
