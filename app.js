const API_BASE = "https://api.github.com/users/";
let currentUsername = ""; // Axtarılan cari istifadəçi adını saxlayırıq

const searchBtn = document.getElementById('searchBtn');
const usernameInput = document.getElementById('usernameInput');

const btnRepos = document.getElementById('btnRepos');
const btnFollowers = document.getElementById('btnFollowers');
const btnFollowing = document.getElementById('btnFollowing');

// 1. Axtarış Düyməsi Klik
searchBtn.addEventListener('click', () => {
    const username = usernameInput.value.trim();
    if (username !== "") {
        currentUsername = username;
        getUserProfile(username);
    }
});

// 2. Tab Düymələri Klik
btnRepos.addEventListener('click', () => {
    setActiveTab(btnRepos);
    fetchUserRepos(currentUsername);
});

btnFollowers.addEventListener('click', () => {
    setActiveTab(btnFollowers);
    fetchUserFollowers(currentUsername);
});

btnFollowing.addEventListener('click', () => {
    setActiveTab(btnFollowing);
    fetchUserFollowing(currentUsername);
});

// Əsas Profil Məlumatını Çəkən Funksiya
async function getUserProfile(username) {
    const card = document.getElementById('profileCard');
    const errorMsg = document.getElementById('errorMsg');
    
    card.classList.add('d-none');
    errorMsg.classList.add('d-none');

    try {
        const response = await fetch(`${API_BASE}${username}`);
        if (!response.ok) throw new Error("İstifadəçi tapılmadı!");

        const data = await response.json();

        // Profil xanalarnı doldururuq
        document.getElementById('avatar').src = data.avatar_url;
        document.getElementById('fullName').innerText = data.name || data.login;
        document.getElementById('username').innerText = `@${data.login}`;
        document.getElementById('bio').innerText = data.bio || "Haqqında məlumat qeyd edilməyib.";
        document.getElementById('reposCount').innerText = data.public_repos;
        document.getElementById('followersCount').innerText = data.followers;
        document.getElementById('followingCount').innerText = data.following;

        card.classList.remove('d-none');

        // İlk açılışda avtomatik olaraq repolarını gətiririk
        setActiveTab(btnRepos);
        fetchUserRepos(username);

    } catch (error) {
        errorMsg.innerText = error.message;
        errorMsg.classList.remove('d-none');
    }
}

// 📦 REPOLARI ÇƏKİRİK
async function fetchUserRepos(username) {
    showSpinner();
    document.getElementById('listTitle').innerText = "📂 Son Yenilənən Repozitoriyalar:";

    try {
        const res = await fetch(`${API_BASE}${username}/repos?sort=updated&per_page=10`);
        const repos = await res.json();

        const container = document.getElementById('listContainer');
        container.innerHTML = "";

        if (repos.length === 0) {
            container.innerHTML = "<p class='text-muted small text-center my-2'>Repozitoriya tapılmadı.</p>";
            return;
        }

        repos.forEach(repo => {
            container.innerHTML += `
                <a href="${repo.html_url}" target="_blank" class="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2">
                    <div>
                        <strong class="text-primary">${repo.name}</strong>
                        <p class="mb-0 text-muted small">${repo.description || 'Təsvir yoxdur'}</p>
                    </div>
                    <span class="badge bg-light text-dark border">⭐ ${repo.stargazers_count}</span>
                </a>
            `;
        });
    } catch (err) {
        console.error("Xəta:", err);
    } finally {
        hideSpinner();
    }
}

// 👥 İZLƏYİCİLƏRİ (FOLLOWERS) ÇƏKİRİK
async function fetchUserFollowers(username) {
    showSpinner();
    document.getElementById('listTitle').innerText = "👥 İzləyicilər (Followers):";

    try {
        const res = await fetch(`${API_BASE}${username}/followers?per_page=10`);
        const followers = await res.json();

        renderUserList(followers, "İzləyici tapılmadı.");
    } catch (err) {
        console.error("Xəta:", err);
    } finally {
        hideSpinner();
    }
}

// 👤 İZLƏDİKLƏRİNİ (FOLLOWING) ÇƏKİRİK
async function fetchUserFollowing(username) {
    showSpinner();
    document.getElementById('listTitle').innerText = "👤 İzlədikləri (Following):";

    try {
        const res = await fetch(`${API_BASE}${username}/following?per_page=10`);
        const following = await res.json();

        renderUserList(following, "Şəxs heç kimi izləmir.");
    } catch (err) {
        console.error("Xəta:", err);
    } finally {
        hideSpinner();
    }
}

// İstifadəçi Siyahılarını Ekrana Basan Ortaq Funksiya (Followers və Following üçün)
function renderUserList(users, emptyMessage) {
    const container = document.getElementById('listContainer');
    container.innerHTML = "";

    if (users.length === 0) {
        container.innerHTML = `<p class='text-muted small text-center my-2'>${emptyMessage}</p>`;
        return;
    }

    users.forEach(user => {
        container.innerHTML += `
            <a href="${user.html_url}" target="_blank" class="list-group-item list-group-item-action d-flex align-items-center gap-3 py-2">
                <img src="${user.avatar_url}" width="35" height="35" class="rounded-circle">
                <span class="fw-bold text-dark">${user.login}</span>
            </a>
        `;
    });
}

// Köməkçi Funksiyalar (UI vizuallığı üçün)
function showSpinner() {
    document.getElementById('loadingSpinner').classList.remove('d-none');
    document.getElementById('listContainer').innerHTML = "";
}

function hideSpinner() {
    document.getElementById('loadingSpinner').classList.add('d-none');
}

function setActiveTab(selectedBtn) {
    [btnRepos, btnFollowers, btnFollowing].forEach(btn => btn.classList.remove('active'));
    selectedBtn.classList.add('active');
}