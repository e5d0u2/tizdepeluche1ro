const META_ESTRELLAS = 10;

function getPhotoPath(name) {
  return "images/" +
    name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // remove accents
      .replace(/\s+/g, "") +           // remove spaces
    ".jpg";
}

let students = {
  Enoch: { stars: 0 },
  Eder: { stars: 0 },
  "Carlos Emilio": { stars: 0 },
  Malory: { stars: 0 },
  Elías: { stars: 0 },
  Frida: { stars: 0 },
  Paula: { stars: 0 },
  "Frida Alessandra": { stars: 0 },
  Lyanna: { stars: 0 },
  Amaia: { stars: 0 },
  Alejandra: { stars: 0 },
  "Gustavo Mauricio": { stars: 0 },
  Máximo: { stars: 0 },
  Megan: { stars: 0 },
  Regina: { stars: 0 },
  Samantha: { stars: 0 },
  Naomi: { stars: 0 },
  Oscar: { stars: 0 },
  "Alexa Camila": { stars: 0 },
  Iker: { stars: 0 },
  "Eva Natalia": { stars: 0 },
  Ashley: { stars: 0 },
  Luisa: { stars: 0 },
  Santiago: { stars: 0 },
  "Paula Natalia": { stars: 0 },
  
};

// Load saved data
const saved = localStorage.getItem("students");
if (saved) {
  students = JSON.parse(saved);
}

const container = document.getElementById("students");

function render() {
  container.innerHTML = "";

  for (let name in students) {
    const div = document.createElement("div");
    div.className = "student";
    const tieneTrofeo = students[name].stars >= META_ESTRELLAS;

  if (tieneTrofeo) {
    div.classList.add("golden");
}

    div.innerHTML = `
      <div class="student-header">
        <img
          src="${getPhotoPath(name)}"
          alt="Foto de ${name}"
          onerror="this.src='images/default.jpg'"
        >

        <h2>
          ${name} ${tieneTrofeo ? "🏆" : ""}
        </h2>
      </div>
      <p>🐢 Estrellas: ${students[name].stars}</p>
      <button onclick="addStar('${name}', this)">
        + ⭐
      </button>

    `;

    container.appendChild(div);
  }
}

function saveData() {
  localStorage.setItem("students", JSON.stringify(students));
}

function addStar(name, button) {
  students[name].stars++;

  // 🐢 CONFETTI FIRST (while button still exists)
  turtleConfetti(button, students[name].stars);

  // Bounce animation
  button.classList.add("bounce");
  setTimeout(() => button.classList.remove("bounce"), 300);

  saveData();
  render();
}

function turtleConfetti(button, stars) {
  const rect = button.getBoundingClientRect();

  const turtleCount = Math.min(3 + stars, 12);

  for (let i = 0; i < turtleCount; i++) {
    const turtle = document.createElement("div");
    turtle.textContent = "🐢";
    turtle.className = "turtle";

    turtle.style.left =
      rect.left + rect.width / 2 + (Math.random() * 30 - 15) + "px";
    turtle.style.top =
      rect.top + window.scrollY + "px";

    document.body.appendChild(turtle);

    setTimeout(() => turtle.remove(), 1200);
  }
}

function resetStars() {
  if (!confirm("¿Seguro que quieres reiniciar todas las estrellas?")) return;

  for (let name in students) {
    students[name].stars = 0;
  }

  saveData();
  render();
}

function exportExcel() {
  let csv = "Nombre,Estrellas\n";

  for (let name in students) {
    csv += `"${name}",${students[name].stars}\n`;
  }

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "participacion_1ero.csv");
  link.click();
}

render();
