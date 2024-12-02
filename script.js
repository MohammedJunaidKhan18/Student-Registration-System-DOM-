document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.querySelector("#name");
    const idInput = document.querySelector("#id");
    const emailInput = document.querySelector("#email");
    const contactInput = document.querySelector("#contact");
    const addBtn = document.querySelector("#addBtn");
    const studentTable = document.querySelector("#studentTable");
    const formSection = document.querySelector("#formSection");
    const listSection = document.querySelector("#listSection");
    const formLink = document.querySelector("#formLink");
    const listLink = document.querySelector("#listLink");

    let students = JSON.parse(localStorage.getItem("students")) || [];

    // Function to validate the inputs
    const validateInputs = () => {
        const name = nameInput.value.trim();
        const id = idInput.value.trim();
        const email = emailInput.value.trim();
        const contact = contactInput.value.trim();

        const nameValid = /^[A-Za-z\s]+$/.test(name); // Only letters and spaces
        const idValid = /^[0-9]+$/.test(id); // Only numbers
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Valid email regex
        const contactValid = /^[0-9]+$/.test(contact); // Only numbers

        return {
            nameValid,
            idValid,
            emailValid,
            contactValid,
            name,
            id,
            email,
            contact
        };
    };

    // Add new student
    addBtn.addEventListener("click", () => {
        const { nameValid, idValid, emailValid, contactValid, name, id, email, contact } = validateInputs();

        // Check if all fields are filled and valid
        if (!name || !id || !email || !contact) {
            alert("Please fill in all fields.");
            return;
        }

        // Validate insectionidual inputs
        if (!nameValid) {
            alert("Student name must only contain letters and spaces.");
            return;
        }

        if (!idValid) {
            alert("Student ID must be a number.");
            return;
        }

        if (!emailValid) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!contactValid) {
            alert("Contact number must be a number.");
            return;
        }

        // Add student if all validations pass
        students.push({ name, id, email, contact });
        localStorage.setItem("students", JSON.stringify(students));
        alert("Student added successfully!");
        nameInput.value = "";
        idInput.value = "";
        emailInput.value = "";
        contactInput.value = "";
        renderTable();
    });

    // Render table
    const renderTable = () => {
        studentTable.innerHTML = "";
        students.forEach((student, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button class="edit-btn" onclick="editStudent(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteStudent(${index})">Delete</button>
                </td>
            `;
            studentTable.appendChild(row);
        });
    };

    // Edit student
    window.editStudent = (index) => {
        const student = students[index];
        const newName = prompt("Edit Name:", student.name);
        const newId = prompt("Edit Student ID:", student.id);
        const newEmail = prompt("Edit Email:", student.email);
        const newContact = prompt("Edit Contact Number:", student.contact);

        if (newName && newId && newEmail && newContact) {
            students[index] = { name: newName, id: newId, email: newEmail, contact: newContact };
            localStorage.setItem("students", JSON.stringify(students));
            renderTable();
        }
    };

    // Delete student
    window.deleteStudent = (index) => {
        if (confirm("Are you sure you want to delete this student?")) {
            students.splice(index, 1);
            localStorage.setItem("students", JSON.stringify(students));
            renderTable();
        }
    };

    // Switch views
    formLink.addEventListener("click", () => {
        formSection.style.display = "block";
        listSection.style.display = "none";
    });

    listLink.addEventListener("click", () => {
        formSection.style.display = "none";
        listSection.style.display = "block";
        renderTable();
    });

    renderTable();
});
