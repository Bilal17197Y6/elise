// ======================================
// Escape Game - Élise ❤️
// Version améliorée
// ======================================

const TOTAL_CHAPTERS = 9;

// -------------------------------
// Initialisation
// -------------------------------

window.addEventListener("load", () => {

    if (!localStorage.getItem("unlocked")) {

        localStorage.setItem("unlocked", "1");

    }

    updateHome();

});

// -------------------------------
// Notifications
// -------------------------------

function notification(message, color = "#FFD700") {

    const box = document.createElement("div");

    box.innerHTML = message;

    box.style.position = "fixed";
    box.style.top = "30px";
    box.style.left = "50%";
    box.style.transform = "translateX(-50%)";

    box.style.background = color;
    box.style.color = "#222";

    box.style.padding = "18px 35px";

    box.style.borderRadius = "40px";

    box.style.fontWeight = "bold";

    box.style.boxShadow = "0 0 25px gold";

    box.style.zIndex = "9999";

    box.style.opacity = "0";

    box.style.transition = ".4s";

    document.body.appendChild(box);

    setTimeout(() => {

        box.style.opacity = "1";

    }, 50);

    setTimeout(() => {

        box.style.opacity = "0";

        setTimeout(() => {

            box.remove();

        }, 400);

    }, 2500);

}

// -------------------------------
// Ouvrir un chapitre
// -------------------------------

function openChapter(numero) {

    const unlocked = parseInt(localStorage.getItem("unlocked"));

    if (numero > unlocked) {

        notification("🔒 Ce chapitre est encore verrouillé.", "#ff7070");

        return;

    }

    window.location.href = "chapitre" + numero + ".html";

}

// -------------------------------
// Finir un chapitre
// -------------------------------

function finishChapter(numero) {

    localStorage.setItem("chapter-" + numero, "completed");

    let unlocked = parseInt(localStorage.getItem("unlocked"));

    if (numero >= unlocked && unlocked < TOTAL_CHAPTERS) {

        unlocked++;

        localStorage.setItem("unlocked", unlocked);

        notification("✨ Chapitre " + unlocked + " débloqué ❤️");

        confetti();

    }

}

// -------------------------------
// Mise à jour accueil
// -------------------------------

function updateHome() {

    const unlocked = parseInt(localStorage.getItem("unlocked"));

    let completed = 0;

    for (let i = 1; i <= TOTAL_CHAPTERS; i++) {

        const card = document.getElementById("chapter" + i);

        if (!card) continue;

        if (i <= unlocked) {

            card.classList.remove("locked");

            card.classList.add("unlocked");

            card.onclick = () => openChapter(i);

        } else {

            card.classList.remove("unlocked");

            card.classList.add("locked");

            card.onclick = null;

        }

        if (localStorage.getItem("chapter-" + i) === "completed") {

            completed++;

            card.style.border = "2px solid #FFD700";

            card.style.boxShadow = "0 0 25px gold";

            if (!card.querySelector(".done")) {

                const done = document.createElement("div");

                done.className = "done";

                done.innerHTML = "✅";

                done.style.position = "absolute";
                done.style.top = "10px";
                done.style.right = "10px";
                done.style.fontSize = "25px";

                card.appendChild(done);

            }

        }

    }

    const progress = document.getElementById("progress");

    const text = document.getElementById("progressText");

    if (progress) {

        progress.style.width = (completed / TOTAL_CHAPTERS * 100) + "%";

    }

    if (text) {

        text.innerHTML = completed + " / " + TOTAL_CHAPTERS + " chapitres terminés";

    }

}

// -------------------------------
// Digicode
// -------------------------------

function unlockAll() {

    const code = document.getElementById("devCode").value;

    if (code !== "6767") {

        notification("❌ Mauvais code", "#ff4d6d");

        return;

    }

    localStorage.setItem("unlocked", TOTAL_CHAPTERS);

    for (let i = 1; i <= TOTAL_CHAPTERS; i++) {

        localStorage.setItem("chapter-" + i, "completed");

    }

    notification("✨ Tous les chapitres sont débloqués ❤️");

    confetti();

    setTimeout(() => {

        location.reload();

    }, 1500);

}

// -------------------------------
// Reset
// -------------------------------

function resetGame() {

    if (!confirm("Réinitialiser toute la progression ?")) return;

    localStorage.clear();

    notification("💔 Progression supprimée", "#ffa3c5");

    setTimeout(() => {

        location.reload();

    }, 1000);

}

// -------------------------------
// Confettis
// -------------------------------

function confetti() {

    for (let i = 0; i < 80; i++) {

        const c = document.createElement("div");

        c.className = "confetti";

        c.style.left = Math.random() * 100 + "vw";

        c.style.background = [

            "#FFD700",

            "#ff7bc4",

            "#ffffff"

        ][Math.floor(Math.random() * 3)];

        c.style.animationDuration =

            (2 + Math.random() * 2) + "s";

        document.body.appendChild(c);

        setTimeout(() => {

            c.remove();

        }, 4000);

    }

}