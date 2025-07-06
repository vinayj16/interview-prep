import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { FaDownload, FaImage, FaFilePdf } from 'react-icons/fa';
import './ResumePreview.css';

const ResumePreview = ({ resumeData, onClose }) => {
  const resumeRef = useRef();

  const downloadAsImage = async () => {
    try {
      const element = resumeRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const link = document.createElement('a');
      link.download = `${resumeData.personalInfo?.name || 'resume'}.png`;
      link.href = canvas.toDataURL();
      link.click();
    } catch (error) {
      console.error('Error downloading as image:', error);
    }
  };

  const downloadAsPDF = async () => {
    try {
      const element = resumeRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${resumeData.personalInfo?.name || 'resume'}.pdf`);
    } catch (error) {
      console.error('Error downloading as PDF:', error);
    }
  };

  if (!resumeData) return null;

  return (
    <div className="resume-preview-overlay">
      <div className="resume-preview-container">
        <div className="resume-preview-header">
          <h2>Resume Preview</h2>
          <div className="preview-actions">
            <button onClick={downloadAsImage} className="download-btn image-btn">
              <FaImage /> PNG
            </button>
            <button onClick={downloadAsPDF} className="download-btn pdf-btn">
              <FaFilePdf /> PDF
            </button>
            <button onClick={onClose} className="close-btn">×</button>
          </div>
        </div>
        
        <div className="resume-preview-content">
          <div ref={resumeRef} className="resume-template">
            <div className="resume-header">
              <h1>{resumeData.personalInfo?.name || 'Your Name'}</h1>
              <div className="contact-info">
                <span>{resumeData.personalInfo?.email}</span>
                <span>{resumeData.personalInfo?.phone}</span>
                <span>{resumeData.personalInfo?.location}</span>
                {resumeData.personalInfo?.linkedin && (
                  <span>{resumeData.personalInfo.linkedin}</span>
                )}
                {resumeData.personalInfo?.github && (
                  <span>{resumeData.personalInfo.github}</span>
                )}
              </div>
            </div>

            {resumeData.summary && (
              <div className="resume-section">
                <h2>Professional Summary</h2>
                <p>{resumeData.summary}</p>
              </div>
            )}

            {resumeData.experience && resumeData.experience.length > 0 && (
              <div className="resume-section">
                <h2>Experience</h2>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="experience-item">
                    <div className="experience-header">
                      <h3>{exp.position}</h3>
                      <span className="company">{exp.company}</span>
                      <span className="duration">{exp.duration}</span>
                    </div>
                    <ul>
                      {exp.responsibilities?.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {resumeData.education && resumeData.education.length > 0 && (
              <div className="resume-section">
                <h2>Education</h2>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <h3>{edu.degree}</h3>
                    <span className="institution">{edu.institution}</span>
                    <span className="year">{edu.year}</span>
                    {edu.gpa && <span className="gpa">GPA: {edu.gpa}</span>}
                  </div>
                ))}
              </div>
            )}

            {resumeData.skills && resumeData.skills.length > 0 && (
              <div className="resume-section">
                <h2>Skills</h2>
                <div className="skills-grid">
                  {resumeData.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {resumeData.projects && resumeData.projects.length > 0 && (
              <div className="resume-section">
                <h2>Projects</h2>
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="project-item">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    {project.technologies && (
                      <div className="project-tech">
                        <strong>Technologies:</strong> {project.technologies.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;