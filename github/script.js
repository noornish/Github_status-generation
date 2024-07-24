async function fetchGitHubProfile() {
  const username = document.getElementById("githubUsername").value;
  const profilePhoto = document.getElementById("profilePhoto");
  const reposDiv = document.getElementById("repos");

  if (!username) {
    alert("Please enter a GitHub username");
    return;
  }

  try {
    // Fetch user profile
    const profileResponse = await fetch(
      `https://api.github.com/users/${username}`
    );
    if (!profileResponse.ok) {
      throw new Error("User not found");
    }
    const profileData = await profileResponse.json();
    profilePhoto.src = profileData.avatar_url;
    profilePhoto.style.display = "block";

    // Fetch user repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos`
    );
    if (!reposResponse.ok) {
      throw new Error("Could not fetch repositories");
    }
    const reposData = await reposResponse.json();

    // Display repositories
    reposDiv.innerHTML = "<h3>Repositories:</h3>";
    reposData.forEach((repo) => {
      const repoElement = document.createElement("div");
      repoElement.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
      reposDiv.appendChild(repoElement);
    });
  } catch (error) {
    alert(error.message);
    profilePhoto.style.display = "none";
    reposDiv.innerHTML = "";
  }
}
