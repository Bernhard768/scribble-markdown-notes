// Grab DOM elements
const markdownInput = document.getElementById('markdown-input');
const previewOutput = document.getElementById('preview-output');
const downloadBtn = document.getElementById('download-btn');
const themeBtn = document.getElementById('theme-btn');
const wordCountElement = document.getElementById('word-count');
const charCountElement = document.getElementById('char-count');

// 1. AUTO-LOAD: Check if there's any saved text when the page opens
window.addEventListener('DOMContentLoaded', () => {
    const savedText = localStorage.getItem('scribble_saved_note');
    if (savedText) {
        markdownInput.value = savedText;
        updatePreviewAndStats(savedText);
    }
});

// Helper function to update preview, word count, and character count
function updatePreviewAndStats(text) {
    // Update preview HTML
    previewOutput.innerHTML = marked.parse(text);

    // Update Character Count
    charCountElement.innerText = `Characters: ${text.length}`;

    // Update Word Count
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    wordCountElement.innerText = `Words: ${words.length}`;
}

// 2. Live Typing Event Listener (Updates preview, counts, and AUTO-SAVES)
markdownInput.addEventListener('input', (e) => {
    const currentText = e.target.value;
    
    updatePreviewAndStats(currentText);

    // AUTO-SAVE: Save text into browser memory dynamically
    localStorage.setItem('scribble_saved_note', currentText);
});

// 3. Download/Save File Functionality
downloadBtn.addEventListener('click', () => {
    const textToSave = markdownInput.value;
    if (!textToSave.trim()) {
        alert("Your note is empty! Type something before saving.");
        return;
    }

    const blob = new Blob([textToSave], { type: 'text/markdown' });
    const fileUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = 'my-note.md';
    
    document.body.appendChild(downloadLink);
    downloadLink.click();
    
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(fileUrl);
});

// 4. Theme Toggle Functionality
themeBtn.addEventListener('click', () => {
    const currentTheme = document.body.getAttribute('data-theme');
    if (currentTheme === 'light') {
        document.body.removeAttribute('data-theme');
    } else {
        document.body.setAttribute('data-theme', 'light');
    }
});
});
