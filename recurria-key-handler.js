// récupère la clé dans l'URL
const params = new URLSearchParams(window.location.search);
const key = params.get("key");

// vérifie si la clé existe
if (!key) {
  const error = document.createElement("p");
  error.innerText = "Clé d'accès manquante.";
  error.style.color = "red";
  error.style.textAlign = "center";
  document.body.prepend(error);
} else {
  // injecte la clé dans les liens ayant data-access
  document.querySelectorAll("[data-access]").forEach(el => {
    const baseHref = el.getAttribute("data-base") || "";
    el.href = `${baseHref}?key=${key}`;
  });

  // injecte la clé dans l'iframe si elle existe
  const iframe = document.getElementById("user-iframe");
  if (iframe) {
    iframe.src = iframe.dataset.base + "?key=" + key;
  }

  // injecte la clé dans le bouton de gestion si présent
  const buttons = document.querySelectorAll("a");
  const button = Array.from(buttons).find(el =>
    el.textContent.includes("Gérer mon abonnement")
  );

  if (button) {
    button.href = `https://hook.eu2.make.com/cqk3czmhlms1z6nrun4aw2me43tmbki7?key=${key}`;
  }
}
