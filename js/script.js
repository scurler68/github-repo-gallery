const overview = document.querySelector(".overview");
const username = "scurler68";
const repoList = document.querySelector(".repo-list");

const getGitUser = async function () {
  const userInfo = await fetch(`https://api.github.com/users/${username}`);
  const data = await userInfo.json();
  console.log(data);
  displayUserInfo(data);
};

getGitUser();

const displayUserInfo = function (data) {
  const div = document.createElement("div");
  div.classList.add("user-info");
  div.innerHTML = `<figure>
  <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
  <p><strong>Name:</strong> ${data.name}</p>
  <p><strong>Bio:</strong> ${data.bio}</p>
  <p><strong>Location:</strong> ${data.location}</p>
  <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> 
  `;
  overview.append(div);
  getRepos();
};

const getRepos = async function () {
    const userRepo = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );
    const repositories = await userRepo.json();
    //console.log(repositories);
    displayRepos(repositories);
  };
  
  const displayRepos = function (repos) {
    for (const repo of repos) {
      const li = document.createElement("li");
      li.classList.add("repo");
      li.innerHTML = `<h3>${repo.name}</h3>`;
      repoList.append(li);
    }
  };
  