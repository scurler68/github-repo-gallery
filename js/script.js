const overview = document.querySelector(".overview");
const username = "scurler68";
const repoList = document.querySelector(".repo-list");
const repos = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const viewRepos = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

//FUNCTION TO GET MY DATA FROM GITHUB
const getGitUser = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  //  console.log(data);
  displayUserInfo(data);
};

getGitUser();

//FUNCTION TO DISPLAY PROPERTIES FROM MY GITHUB ACCOUNT
const displayUserInfo = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
  overview.append(div);
  getRepos();
};

//FUNCTION TO GET MY REPOS FROM GITHUB
const getRepos = async function () {
  const userRepo = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
  );
  const repositories = await userRepo.json();
  //console.log(repositories);
  displayRepos(repositories);
};

//FUNCTION TO DISPLAY MY REPOS BY NAME
//loop through repos and create a list element for each
const displayRepos = function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  }
};

//EVENT LISTENER TO DISPLAY REPO INFO WHEN BUTTON IS CLICKED
repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    console.log(repoName);
    getRepoDetails(repoName);
  }
});

//FUNCTION TO FETCH REPO DETAILS FROM GITHUB
//fetch info about repo
const getRepoDetails = async function (repoName) {
  const details = await fetch(
    `https://api.github.com/repos/${username}/${repoName}`
  );
  const repoInfo = await details.json();
  console.log(repoInfo);
  //fetch languages used
  const language = await fetch(repoInfo.languages_url);
  const languageData = await language.json();
  console.log(languageData);

  const languages = [];
  for (const language in languageData) {
    languages.push(language);
    console.log(languages);
  }
  displayRepo(repoInfo, languages);
};

//FUNCTION TO DISPLAY REPO INFO ON PAGE
const displayRepo = function (repoInfo, languages) {
  repoData.innerHTML = "";
  repoData.classList.remove("hide");
  repos.classList.add("hide");
  viewRepos.classList.remove("hide");
  const repoDiv = document.createElement("div");
  repoDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.deault_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${
        repoInfo.html_url
      }" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
  repoData.append(repoDiv);
};

//FUNCTION TO MAKE BUTTON WORK
viewRepos.addEventListener("click", function () {
  repos.classList.remove("hide");
  repoData.classList.add("hide");
  viewRepos.classList.add("hide");
});

//FUNCTION TO MAKE SEARCH FIELD WORK
//search function
filterInput.addEventListener("input", function (e) {
  const search = e.target.value;
  console.log(search);
  const repos = document.querySelectorAll(".repo");
  const searchLower = search.toLowerCase();

  //display results of search
  for (const repo of repos) {
    const repoLowerText = repo.innerText.toLowerCase();
    if (repoLowerText.includes(searchLower)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});