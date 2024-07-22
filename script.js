const addBtn = document.getElementById("add");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    addNewNote(note);
  });
}
//Alınan notları kalıcı olarak tutuyor.Eğer notes dizisi varsa, bu dizideki her bir not için addNewNote fonksiyonu çağrılır ve notlar ekrana yüklenir.

addBtn.addEventListener("click", () => {
  addNewNote();
});

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");

  note.innerHTML = `
        <div class="notes">
            <div class="tools">
                <button class="edit"><i class="fas fa-edit"></i></button>
                <button class="delete"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main ${text ? "" : "hidden"}"></div>          
            <textarea class="${text ? "hidden" : ""}"></textarea>
        </div>
    `;
  /*Bu iki element birlikte çalışarak, notların görünüm ve düzenleme modları arasında geçiş yapmasını sağlar:
  Eğer bir not zaten mevcut ve düzenlenmiş ise (yani text doğru ise), main div'i görünür olur ve textarea gizlenir.Eğer bir not yeni oluşturuluyor veya düzenlenmek isteniyorsa (yani text yanlış ise), textarea görünür olur ve main div'i gizlenir.*/

  const editBtn = note.querySelector(".edit");
  const deleteBtn = note.querySelector(".delete");

  const main = note.querySelector(".main");
  const textArea = note.querySelector("textarea");

  textArea.value = text; //textArea' ya güncelleme yaparken kaldığı yerden yapar
  main.innerHTML = marked(text); //kaleme tıklamadan eski notu görebilirsin

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener("click", () => {
    note.remove();

    updateLS();
  });

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;

    main.innerHTML = marked(value);

    updateLS();
  });

  document.body.appendChild(note);
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];

  notesText.forEach((note) => {
    notes.push(note.value);
  });

  localStorage.setItem("notes", JSON.stringify(notes));
}
