// import * as html2canvas from 'html2canvas';
// import * as Jspdf from 'jspdf';

// export async function printFile(DOMRef) {
//   try {
//     const canvas = await html2canvas(document.getElementById(DOMRef));
//     const img = await canvas.toDataURL('image/png');
//     const doc = new Jspdf('p', 'mm', 'a4');
//     doc.addImage(
//       img,
//       'JPEG',
//       27,
//       28,
//       160.00197555866663,
//       267.0006773335,
//       undefined,
//       'FAST'
//     );

//     doc.save('Internship Introductory Letter.pdf');
//   } catch (error) {}
// }

// export async function printFile2(DOMRef) {
//   const element = await document.getElementById(DOMRef);
//   const doc = new Jspdf('p', 'mm', 'a4');
//   doc.fromHTML(element, 0, 0, { width: 157 }, val => {
//     doc.save('Render');
//   });
// }
