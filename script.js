const names = [];
let rollNumber = 1;
const addButton = document.getElementById("addButton");
const sortButton = document.getElementById("sortButton");
const clearButton = document.getElementById("clearButton");
const clearAllButton = document.getElementById("clearAllButton");
const changesButton = document.getElementById("changesButton");
const namesList = document.getElementById("namesList");
const sortedNames = document.getElementById("sortedNames");
const sortedList = document.getElementById("sortedList");

addButton.addEventListener("click", () => {
  const nameText = document.getElementById("name").value.trim();
  const nameLines = nameText.split("\n").filter((line) => line.trim() !== "");

  if (nameLines.length > 0) {
    for (const name of nameLines) {
      const uppercaseName = name.toUpperCase();
      names.push(uppercaseName);

      const nameItem = document.createElement("div");
      nameItem.classList.add("names-list-item");
      nameItem.innerHTML = `<p>${uppercaseName}<svg class= "edit-svg" xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 20 24" fill="currentColor" class="w-6 h-6">
  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
</svg>
</p>`;
      namesList.appendChild(nameItem);

      const editSvg = nameItem.querySelector(".edit-svg");
      editSvg.addEventListener("click", () => {
        const newName = prompt("Edit the name:", uppercaseName);
        if (newName !== null) {
          const editedName = newName.trim().toUpperCase();
          names[names.indexOf(uppercaseName)] = editedName;
          nameItem.innerHTML = `<p>${editedName}<svg class= "edit-svg" xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 20 24" fill="currentColor" class="w-6 h-6">
  <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
  <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
</svg>
</p>`;
        }
      });
    }

    document.getElementById("name").value = "";

    if (names.length >= 2) {
      sortButton.removeAttribute("disabled");
    }

    clearButton.removeAttribute("disabled");
    clearAllButton.removeAttribute("disabled");
    clearButton.classList.add("active"); // Add active class
    clearAllButton.classList.add("active"); // Add active class
  }
});

sortButton.addEventListener("click", () => {
  if (names.length === 0) {
    const nameText = document.getElementById("name").value.trim();
    if (nameText === "") {
      alert("Please enter at least one name to sort.");
      return;
    }
  }
});

sortButton.addEventListener("click", () => {
  sortedList.innerHTML = "";
  sortButton.setAttribute("disabled", "true");
  clearButton.setAttribute("disabled", "true");
  clearAllButton.setAttribute("disabled", "true");

  if (rollNumber > 1) {
    rollNumber = 1;
  }

  names.sort();

  sortedNames.classList.remove("hidden");
  changesButton.scrollIntoView({ behavior: "smooth" });

  for (const name of names) {
    const listItem = document.createElement("li");
    listItem.textContent = `${rollNumber}. ${name}`;
    sortedList.appendChild(listItem);
    rollNumber++;
  }
});

changesButton.addEventListener("click", () => {
  sortedNames.classList.add("hidden");
  sortButton.removeAttribute("disabled");
  if (names.length > 0) {
    clearButton.removeAttribute("disabled");
    clearAllButton.removeAttribute("disabled");
  }
  clearButton.classList.add("active"); // Add active class
  clearAllButton.classList.add("active"); // Add active class
});

clearButton.addEventListener("click", () => {
  if (names.length > 0) {
    names.pop();
    namesList.removeChild(namesList.lastChild);
    rollNumber--;
    if (names.length === 0) {
      clearButton.setAttribute("disabled", "true");
      clearAllButton.setAttribute("disabled", "true");
      clearButton.classList.remove("active"); // Remove active class
      clearAllButton.classList.remove("active"); // Remove active class
    }
  }
});

clearAllButton.addEventListener("click", () => {
  namesList.innerHTML = "";
  names.length = 0;
  clearButton.setAttribute("disabled", "true");
  clearAllButton.setAttribute("disabled", "true");
  clearButton.classList.remove("active"); // Remove active class
  clearAllButton.classList.remove("active"); // Remove active class
});

// Additional script for the alert modal
const alertModal = document.getElementById("alertModal");
const continueButton = document.getElementById("continueButton");

continueButton.addEventListener("click", () => {
  alertModal.style.display = "none";
  sortButton.removeAttribute("disabled");
});

window.addEventListener("load", () => {
  alertModal.style.display = "flex";
});

continueButton.addEventListener("click", () => {
  alertModal.style.display = "none";
  sortButton.removeAttribute("disabled");
});

window.addEventListener("load", () => {
  alertModal.style.display = "flex";
});

const copyButton = document.getElementById("copyButton");

copyButton.addEventListener("click", () => {
  const sortedNamesText = names
    .map((name, index) => `${index + 1}. ${name}`)
    .join("\n");
  const tempTextArea = document.createElement("textarea");
  tempTextArea.value = sortedNamesText;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
  alert("Sorted names copied to clipboard!");
});
