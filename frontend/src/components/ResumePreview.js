import React, { useEffect, useRef } from 'react';
import { FaFilePdf, FaImage, FaPrint } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './ResumePreview.css';

const ResumePreview = ({ content, onClose, resumeData }) => {
  const resumeRef = useRef(null);
  const fileName = resumeData?.personalInfo?.fullName 
    ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '-')}-Resume` 
    : 'resume';

  const handlePrint = () => {
    window.print();
  };

  const downloadAsPDF = async () => {
    if (!resumeRef.current) return;
    
    const input = resumeRef.current;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const scale = 2; // Higher scale for better quality
    
    try {
      const canvas = await html2canvas(input, { 
        scale,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: null,
        scrollY: -window.scrollY
      });
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
      heightLeft -= pageHeight;

      // Add additional pages if content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight, '', 'FAST');
        heightLeft -= pageHeight;
      }
      
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  const downloadAsImage = async () => {
    if (!resumeRef.current) return;
    
    try {
      const canvas = await html2canvas(resumeRef.current, { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        backgroundColor: '#ffffff',
        scrollY: -window.scrollY
      });
      
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Failed to generate image. Please try again.');
    }
  };

  // Handle print styles
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @media print {
        body * {
          visibility: hidden;
        }
        .resume-content,
        .resume-content * {
          visibility: visible;
        }
        .resume-content {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          box-shadow: none;
        }
        .no-print {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className="resume-preview-overlay">
      <div className="resume-preview-container">
        <div className="resume-preview-header no-print">
          <h2>Resume Preview</h2>
          <button onClick={onClose} className="close-button" aria-label="Close preview">
            <MdClose size={24} />
          </button>
        </div>
        
        <div className="resume-actions no-print">
          <div className="action-group">
            <button onClick={downloadAsPDF} className="action-button" title="Download as PDF">
              <FaFilePdf /> <span>PDF</span>
            </button>
            <button onClick={downloadAsImage} className="action-button" title="Download as Image">
              <FaImage /> <span>Image</span>
            </button>
            <button onClick={handlePrint} className="action-button" title="Print">
              <FaPrint /> <span>Print</span>
            </button>
          </div>
          <div className="print-hint">
            Tip: For best printing results, use the PDF download option
          </div>
        </div>
        
        <div className="resume-content-wrapper">
          <div className="resume-content" ref={resumeRef}>
            <div className="resume-paper">
              {content || (
                <div className="no-content">
                  <p>No resume content available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="resume-preview-footer no-print">
          <button onClick={onClose} className="btn btn-outline">
            Back to Editor
          </button>
          <div className="print-options">
            <button onClick={handlePrint} className="btn btn-primary">
              <FaPrint /> Print Resume
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;

