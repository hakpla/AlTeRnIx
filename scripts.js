const authSection = document.getElementById("auth-section");
const signupButton = document.getElementById("signup-button");
const loginButton = document.getElementById("login-button");
const loggedInSection = document.getElementById("loggedin-section");

const friendsLink = document.getElementById("friends-link");
const friendsSection = document.getElementById("friends-section");
const friendsList = document.getElementById("friends-list");

const postsContainer = document.getElementById("posts-container");

// Récupérer les utilisateurs, l'utilisateur connecté et les publications depuis le LocalStorage
const users = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
const posts = JSON.parse(localStorage.getItem("posts")) || [];

// Si un utilisateur est déjà connecté, masquer la section d'authentification et afficher la section connectée
if (currentUser) {
    authSection.classList.add("hidden");
    loggedInSection.classList.remove("hidden");
}

// Liste des amis pour cet exemple simplifié
const friends = ["Alice", "Bob", "Charlie", "David"];

// Afficher les publications existantes
posts.forEach(post => {
    createPostElement(post.content, post.date);
});

signupButton.addEventListener("click", function (event) {
    event.preventDefault();

    const signupUsername = document.getElementById("signup-username").value;
    const signupPassword = document.getElementById("signup-password").value;
    const signupPasswordConfirm = document.getElementById("signup-password-confirm").value;

    if (signupUsername.trim() !== "" && signupPassword.trim() !== "" && signupPassword === signupPasswordConfirm) {
        users.push({ username: signupUsername, password: signupPassword });

        // Enregistrer les utilisateurs dans le LocalStorage
        localStorage.setItem("users", JSON.stringify(users));

        alert("Inscription réussie! Vous pouvez maintenant vous connecter.");
        document.getElementById("signup-username").value = "";
        document.getElementById("signup-password").value = "";
        document.getElementById("signup-password-confirm").value = "";
    } else {
        alert("Veuillez remplir correctement tous les champs et vérifier que les mots de passe correspondent.");
    }
});

loginButton.addEventListener("click", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        authSection.classList.add("hidden");
        loggedInSection.classList.remove("hidden");

        // Enregistrer l'utilisateur connecté dans le LocalStorage
        localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
    }
});

document.getElementById("post-button").addEventListener("click", function (event) {
    event.preventDefault();

    const postContent = document.getElementById("post-content");

    if (postContent.value.trim() !== "") {
        const date = new Date();

        // Créer un nouvel élément de publication et l'ajouter à la page
        createPostElement(postContent.value, date);

        // Ajouter la publication à la liste des publications et mettre à jour le LocalStorage
        posts.push({ content: postContent.value, date: date.toISOString() });
        localStorage.setItem("posts", JSON.stringify(posts));

        postContent.value = "";
    } else {
        alert("Veuillez écrire quelque chose avant de publier.");
    }
});

function createPostElement(content, date) {
    const post = document.createElement("div");
    post.classList.add("post");

    const postText = document.createElement("p");
    postText.textContent = content;
    post.appendChild(postText);

    const postDate = document.createElement("small");
    date = new Date(date);
    postDate.textContent = `Publié le ${date.toLocaleDateString()} à ${date.toLocaleTimeString()}`;
    post.appendChild(postDate);

    postsContainer.prepend(post);
}

function showFriends() {
    friendsSection.classList.remove("hidden");

    friendsList.innerHTML = "";
    friends.forEach(friend => {
        const listItem = document.createElement("li");
        listItem.textContent = friend;
        friendsList.appendChild(listItem);
    });
}

friendsLink.addEventListener("click", function (event) {
    event.preventDefault();

    if (!friendsSection.classList.contains("hidden")) {
        friendsSection.classList.add("hidden");
    } else {
        showFriends();
    }
});
