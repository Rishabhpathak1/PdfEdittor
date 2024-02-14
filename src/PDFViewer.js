import React, { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib'; // Import pdf-lib functions for editing

const PDFViewer = ({ file }) => {
  const [pdfDoc, setPdfDoc] = useState(null); // State to store the PDF document
  const [pageNum, setPageNum] = useState(0); // State to track the current page number

  // Function to load and parse the PDF file
  const loadPdf = async () => {
    try {
      const pdfData = await file.arrayBuffer();
      const loadedPdfDoc = await PDFDocument.load(pdfData);
      setPdfDoc(loadedPdfDoc);
    } catch (error) {
      console.error('Error loading PDF:', error);
    }
  };

  // Function to render a specific page of the PDF document
  const renderPage = () => {
    if (!pdfDoc) return null;
    const pageCount = pdfDoc.getPageCount();
    const currentPageNum = pageNum;

    if (currentPageNum < 0 || currentPageNum >= pageCount) {
      return null; // Page number is out of range, return null
    }

    try {
      const page = pdfDoc.getPage(currentPageNum);
      const viewport = page.getViewport({ scale: 1 });
      const canvas = document.getElementById('pdf-canvas');
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      page.render({
        canvasContext: context,
        viewport: viewport,
      });
    } catch (error) {
      console.error('Error rendering page:', error);
    }
  };

  // Function to handle page navigation
  const nextPage = () => {
    if (pageNum < (pdfDoc ? pdfDoc.getPageCount() - 1 : 0)) {
      setPageNum(pageNum + 1);
    }
  };

  const prevPage = () => {
    if (pageNum > 0) {
      setPageNum(pageNum - 1);
    }
  };

  // Call loadPdf when the file prop changes
  useEffect(() => {
    if (file) {
      loadPdf();
    }
  }, [file]);

  return (
    <div className="pdf-viewer">
      <h2>PDF Viewer</h2>
      <p>File Name: {file && file.name}</p>
      <div>
        <button onClick={prevPage}>Previous Page</button>
        <button onClick={nextPage}>Next Page</button>
      </div>
      <canvas id="pdf-canvas"></canvas>
      {renderPage()}
    </div>
  );
};

export default PDFViewer;
