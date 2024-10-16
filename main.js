document.getElementById("search-button").addEventListener("click", () => {
  const username = document.getElementById("username").value;

  document.getElementById("user-info").innerHTML = "";
  document.getElementById("latest-repo").innerHTML = "";

  const userinfoUrl = `https://api.github.com/users/${username}`;
  const repoUrl = `https://api.github.com/users/${username}/repos`;

  // get user data
  fetch(userinfoUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("User not found");
      }
      return res.json();
    })
    .then((data) => {
      displayUserInfo(data);
      document.getElementById("username").value = "";
    })
    .catch((error) => {
      const errorMessage = document.createElement("p");
      errorMessage.innerText = error.message;
      errorMessage.className = "error_message";
      const body = document.querySelector("body");
      body.prepend(errorMessage);
      setTimeout(() => {
        errorMessage.remove();
      }, 1500);
    });

  // get repo data
  fetch(repoUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Repository not found");
      }
      return res.json();
    })
    .then((data) => {
      const sortedRepos = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );

      const latestRepo = document.getElementById("latest-repo");

      // repo 목록의 title
      const repoTitle = document.createElement("h1");
      repoTitle.textContent = "Latest Repos";
      latestRepo.appendChild(repoTitle);

      sortedRepos.map((repo) => displayLatestRepo(repo, latestRepo));
    })
    .catch((error) => {
      const errorMessage = document.createElement("p");
      errorMessage.innerText = error.message;
      errorMessage.className = "error_message";
      const body = document.querySelector("body");
      body.prepend(errorMessage);
      setTimeout(() => {
        errorMessage.remove();
      }, 1500);
    });
});

function displayUserInfo(user) {
  console.log(user);
  const userInfo = document.getElementById("user-info");

  const containerEl1 = document.createElement("div");
  containerEl1.className = "container1";

  const containerEl2 = document.createElement("div");
  containerEl2.className = "container2";

  // tag들을 담을 컨테이너
  const tagContainer = document.createElement("div");
  tagContainer.className = "tag_container";

  // tag1
  const publicRepos = document.createElement("p");
  publicRepos.className = "public_repos tag";
  publicRepos.innerText = `Public Repos: ${user.public_repos}`;

  // tag2
  const publicGists = document.createElement("p");
  publicGists.className = "public_gists tag";
  publicGists.innerText = `Public Gists: ${user.public_gists}`;

  // tag3
  const followers = document.createElement("p");
  followers.className = "followers tag";
  followers.innerText = `Followers: ${user.followers}`;

  // tag4
  const following = document.createElement("p");
  following.className = "following tag";
  following.innerText = `Following: ${user.following}`;

  tagContainer.appendChild(publicRepos);
  tagContainer.appendChild(publicGists);
  tagContainer.appendChild(followers);
  tagContainer.appendChild(following);

  // profile을 감쌀 컨테이너
  const profileContainer = document.createElement("div");

  // user 이름
  const userName = document.createElement("h2");
  userName.textContent = user.name || user.login;

  // user 이미지
  const userImg = document.createElement("img");
  userImg.src = user.avatar_url;
  userImg.alt = `${user.login}'s avatar`;
  userImg.className = "user_img";

  // user의 git으로 이동하는 버튼
  const viewProfileBtn = document.createElement("button");
  viewProfileBtn.innerText = "View Profile";
  viewProfileBtn.className = "view_profile_btn";
  viewProfileBtn.addEventListener("click", () => {
    window.open(user.html_url);
  });

  profileContainer.appendChild(userImg);

  // user의 정보를 담을 컨테이너
  const infoContainer = document.createElement("div");
  infoContainer.className = "info_container";

  // info1
  const company = document.createElement("p");
  company.innerText = `Company: ${user.company}`;

  // info2
  const websiteAndBlog = document.createElement("p");
  websiteAndBlog.innerText = `WebSite/Blog: ${user.blog}`;

  // info3
  const location = document.createElement("p");
  location.innerText = `Location: ${user.location}`;

  // info4
  const memberSince = document.createElement("p");
  memberSince.innerText = `Member Since: ${user.created_at}`;

  infoContainer.appendChild(company);
  infoContainer.appendChild(websiteAndBlog);
  infoContainer.appendChild(location);
  infoContainer.appendChild(memberSince);

  containerEl2.appendChild(tagContainer);
  containerEl2.appendChild(infoContainer);

  containerEl1.appendChild(profileContainer);
  containerEl1.appendChild(containerEl2);

  userInfo.appendChild(userName);
  userInfo.appendChild(containerEl1);
  userInfo.appendChild(viewProfileBtn);
}

function displayLatestRepo(repo, latestRepo) {
  console.log(repo);
  // Latest Repos
  // repo이름 : name -> html_url 이용해서 이동할 수 있도록
  // Stars: ${stargazers_count} Watchers: ${watchers_count} Forks: ${forks_count}

  // 리스트 목록 하나를 감쌀 컨테이너
  const listContainer = document.createElement("div");
  listContainer.className = "list_container";

  // repo 이름
  const repoName = document.createElement("a");
  repoName.className = "repo_name";
  repoName.innerText = repo.name;
  repoName.href = repo.html_url;

  // repo 목록 각각의 tag들을 담아줄 컨테이너
  const listTagContainer = document.createElement("div");
  listTagContainer.className = "list_tag_container";

  // tag1
  const stars = document.createElement("p");
  stars.innerText = `Stars: ${repo.stargazers_count}`;
  stars.className = "stars";

  // tag2
  const watchers = document.createElement("p");
  watchers.innerText = `Watchers: ${repo.watchers_count}`;
  watchers.className = "watchers";

  // tag3
  const forks = document.createElement("p");
  forks.innerText = `Forks: ${repo.forks_count}`;
  forks.className = "forks";

  listTagContainer.appendChild(stars);
  listTagContainer.appendChild(watchers);
  listTagContainer.appendChild(forks);

  listContainer.appendChild(repoName);
  listContainer.appendChild(listTagContainer);

  latestRepo.appendChild(listContainer);
}
