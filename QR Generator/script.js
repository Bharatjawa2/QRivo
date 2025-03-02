function generateQR() {
    let qrText = document.getElementById("qrText").value.trim();
    let qrImage = document.getElementById("qrImage");
    let imgBox = document.getElementById("imgBox");
    let downloadBtn = document.getElementById("downloadBtn");

    if (!qrText) {
        document.getElementById("qrText").classList.add("error");
        setTimeout(() => document.getElementById("qrText").classList.remove("error"), 500);
        return;
    }
    let qrURL = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrText)}`;
    qrImage.src = qrURL;

    qrImage.onload = () => {
        imgBox.classList.add("show-img");
        downloadBtn.style.display = "block";
    };
}

function downloadQR() {
    let qrImage = document.getElementById("qrImage");
    if (!qrImage.src || qrImage.src.includes("api.qrserver.com/v1/create-qr-code") === false) {
        alert("Please generate a QR code first!");
        return;
    }

    fetch(qrImage.src)
        .then(response => response.blob()) 
        .then(blob => {
            let downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = `QR_Code_${Date.now()}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        })
        .catch(error => console.error("Download error:", error));
}

document.getElementById("qrText").addEventListener("keypress",function(event){
    if(event.key==='Enter'){
        event.preventDefault();
        generateQR();
    }
})