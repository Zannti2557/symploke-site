// ---------------------------------------------------------------------
// VISOR DE PDF CON pdf.js
// ---------------------------------------------------------------------
const url = "pdf/symploke.pdf";          // ruta al PDF (carpeta /pdf)
const canvas = document.getElementById("pdf-canvas");
const ctx     = canvas.getContext("2d");

// línea obligatoria para que pdf.js encuentre su “worker”
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.js";

let pdfDoc, pageNum = 1;

async function renderPage(num) {
  const page     = await pdfDoc.getPage(num);
  const viewport = page.getViewport({ scale: 1.2 });
  canvas.height  = viewport.height;
  canvas.width   = viewport.width;

  await page.render({ canvasContext: ctx, viewport }).promise;
}

// Cargar el PDF apenas abra la página
pdfjsLib.getDocument(url).promise
  .then(doc => { pdfDoc = doc; renderPage(pageNum); })
  .catch(err => {
    canvas.insertAdjacentHTML(
      "afterend",
      `<p style="color:red">⚠️ No se pudo cargar el PDF: ${err.message}</p>`
    );
  });

// ---------------------------------------------------------------------
// LECCIONES (puedes editar este array a gusto)
// ---------------------------------------------------------------------
const lessons = [
  {
    title: "Introducción a la Symploké",
    body:  "La filosofía como tejido y desteje de realidades..."
  },
  {
    title: "Mito, magia y religión",
    body:  "Cómo Bueno destila y reinterpreta los saberes primitivos..."
  }
  // Agregá más objetos {title, body} según tu plan de clase
];

let idx = 0;
const titleEl = document.getElementById("lesson-title");
const bodyEl  = document.getElementById("lesson-body");

function showLesson(i) {
  titleEl.textContent = lessons[i].title;
  bodyEl.textContent  = lessons[i].body;
}
showLesson(idx);

document.getElementById("prev").onclick = () => {
  if (idx > 0) showLesson(--idx);
};
document.getElementById("next").onclick = () => {
  if (idx < lessons.length - 1) showLesson(++idx);
};
