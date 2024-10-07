function generateIDCard() {
    // Get user input values
    var college = document.getElementById("college-name").value;
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var idNumber = document.getElementById("idNumber").value;

    // Handle photo input
    var photoInput = document.getElementById("photo");
    var photoURL = "";

    if (photoInput.files && photoInput.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            photoURL = e.target.result;
            // Insert the generated content into the ID card section
            var idCardHTML = `
                <div class="college-name">${college}</div>
                <h2>ID Card</h2>
                <img src="${photoURL}" alt="Profile Picture">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Age:</strong> ${age}</p>
                <p><strong>Address:</strong> ${address}</p>
                <p><strong>ID Number:</strong> ${idNumber}</p>
            `;
            // Display the generated ID card
            var idCardContainer = document.getElementById("idCard");
            idCardContainer.innerHTML = idCardHTML;
            idCardContainer.style.display = "block";
        }
        reader.readAsDataURL(photoInput.files[0]);
    } else {
        // If no photo is uploaded, just generate the ID card without an image
        var idCardHTML = `
            <div class="college-name">${college}</div>
            <h2>ID Card</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>ID Number:</strong> ${idNumber}</p>
        `;
        // Display the generated ID card
        var idCardContainer = document.getElementById("idCard");
        idCardContainer.innerHTML = idCardHTML;
        idCardContainer.style.display = "block";
    }
}

function printIDCard() {
    var idCardContainer = document.getElementById("idCard");
    var printWindow = window.open('', '', 'height=500, width=500');
    printWindow.document.write('<html><head><title>ID Card</title>');
    printWindow.document.write('<link rel="stylesheet" href="styles.css">');
    printWindow.document.write('</head><body>');
    printWindow.document.write(idCardContainer.innerHTML);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}

function downloadIDCard() {
    var idCardContainer = document.getElementById("idCard");
    html2canvas(idCardContainer).then(function(canvas) {
        var link = document.createElement('a');
        link.download = 'id-card.png';
        link.href = canvas.toDataURL();
        link.click();
    });
}