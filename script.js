// Grab DOM elements
const markdownInput = document.getElementById('markdown-input');
const previewOutput = document.getElementById('preview-output');
const downloadBtn = document.getElementById('download-btn');
const themeBtn = document.getElementById('theme-btn');

// 1. Live Preview Rendering Function
markdownInput.addEventListener('input', (e) => {
    const rawText = e.target.value;
    // marked.parse() converts markdown strings into HTML strings safely
    previewOutput.innerHTML = marked.parse(rawText);
});

// 2. Download/Save File Functionality
downloadBtn.addEventListener('click', () => {
    const textToSave = markdownInput.value;
    if (!textToSave.trim()) {
        alert("Your note is empty! Type something before saving.");
        return;
    }

    // Create a virtual file data container (Blob)
    const blob = new Blob([textToSave], { type: 'text/markdown' });
    const fileUrl = URL.createObjectURL(blob);
    
    // Create a temporary link element to trigger the download
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = 'my-note.md'; // Default filename
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    // Clean up memory
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(fileUrl);
});

// 3. Theme Toggle Functionality
themeBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'light') {
        document.body.removeAttribute('data-theme');
    } else {
        document.body.setAttribute('data-theme', 'light');
    }
});