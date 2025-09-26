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

		repos.appendChild(repoBtn);
	});
}

fetchCV();

async function fetchCV() {
	try {
		const response = await fetch("cv.json");
		if (!response.ok) {
			throw new Error("Failed to fetch CV");
		}
		const cvData = await response.json();
		createCV(cvData);
	} catch (error) {
		console.log(error);
	}
}

function createCV(cvData) {
	const profilePicture = document.querySelector(".profilePicture");
	profilePicture.src = cvData.profilePicture;

	const profileName = document.querySelector(".profileName");
	profileName.textContent = cvData.profileName;

	const profileDescription = document.querySelector(".profileDescription");
	profileDescription.textContent = cvData.profileDescription;

	const profileExperience = document.querySelector(".profileExperience");
	cvData.profileExperience.forEach((item) => {
		const p = document.createElement("p");
		p.textContent = item;
		profileExperience.appendChild(p);
	});

	const profileFooter = document.querySelector(".profileFooter");
	console.log(cvData.profileFooter);

	cvData.profileFooter.forEach((item) => {
		const p = document.createElement("p");
		profileFooter.appendChild(p);

		if (item.fontawesome) {
			const i = document.createElement("i");
			i.className = item.fontawesome;
			p.appendChild(i);
		}
		if (item.strong) {
			const strong = document.createElement("strong");
			strong.textContent = item.strong;
			p.appendChild(strong);
		}
		if (item["href-link"] && item["href-text"]) {
			const a = document.createElement("a");
			a.href = item["href-link"];
			a.target = "_blank";
			a.textContent = item["href-text"];
			p.appendChild(a);
		}
		if (item.text) {
			const textNode = document.createTextNode(item.text);
			p.appendChild(textNode);
		}

		// item.fontawesome.forEach((icon) => {
		// 	const i = document.createElement("i");
		// 	i.className = icon;
		// 	p.appendChild(i);
		// });
		// 		{
		// 	"fontawesome": "fa-solid fa-code",
		// 	"strong": "Denna sidan är skapad med hjälp av ",
		// 	"href-link": "https://bulma.io",
		// 	"href-text": "Bulma"
		// }
	});
}
