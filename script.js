function validateForm() {
    const form = document.getElementById('userForm');
    const inputs = form.querySelectorAll('input[required]');
    for (let input of inputs) {
        if (!input.value) {
            alert(`Please fill out the ${input.name} field.`);
            return false;
        }
    }
    return true;
}

function formatDate(dob) {
    const birthDate = new Date(dob);
    const day = String(birthDate.getDate()).padStart(2, '0');
    const month = String(birthDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = birthDate.getFullYear();
    return `${day}/${month}/${year}`; // Format as DD/MM/YYYY
}

function generateIDCard() {
    if (!validateForm()) {
        return;
    }

    // Get user input values
    var college = document.getElementById("college-name").value;
    var name = document.getElementById("name").value;
    var dob = document.getElementById("dob").value;
    var address = document.getElementById("address").value;
    var idNumber = document.getElementById("idNumber").value;

    // Format Date of Birth
    const formattedDOB = formatDate(dob);

    // Handle photo input
    var photoInput = document.getElementById("photo");
    var photoURL = "";

    // Create ID card HTML template
    function createIDCardHTML(photoURL = "") {
        return `
            <div class="college-name">${college}</div>
            <h2>ID Card</h2>
            ${photoURL ? `<img src="${photoURL}" alt="Profile Picture" id="profileImage">` : ''}
            <div class="details">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Date of Birth:</strong> ${formattedDOB}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>ID Number:</strong> ${idNumber}</p>
            </div>
        `;
    }

    // If a photo is uploaded, display the photo; otherwise, generate the card without the photo
    if (photoInput.files && photoInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            photoURL = e.target.result;
            document.getElementById("idCard").innerHTML = createIDCardHTML(photoURL);
            document.getElementById("idCard").style.display = "block"; // Show the ID card
        }
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        document.getElementById("idCard").innerHTML = createIDCardHTML();
        document.getElementById("idCard").style.display = "block"; // Show the ID card
    }
}

function downloadIDCard() {
    var idCardContainer = document.getElementById("idCard");
    html2canvas(idCardContainer).then(function (canvas) {
        var link = document.createElement('a');
        link.download = 'id-card.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}