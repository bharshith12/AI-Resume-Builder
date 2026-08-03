import html2pdf from 'html2pdf.js';

export function exportResumeToPDF(elementId, filename = "Resume.pdf") {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error("Resume element not found for PDF export");
    return;
  }

  const opt = {
    margin: [0.3, 0.3, 0.3, 0.3],
    filename: filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };

  return html2pdf().set(opt).from(element).save();
}

export function printResume(elementId) {
  window.print();
}
