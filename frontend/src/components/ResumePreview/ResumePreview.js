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
<<<<<<< HEAD
=======
                    }
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
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
<<<<<<< HEAD

            {resumeData.certifications && resumeData.certifications.length > 0 && (
              <div className="resume-section">
                <h2>Certifications</h2>
                {resumeData.certifications.map((cert, index) => (
                  <div key={index} className="certification-item">
                    <h3>{cert.name}</h3>
                    <span className="organization">{cert.organization}</span>
                    {cert.date && <span className="date">{cert.date}</span>}
                    {cert.id && <span className="cert-id">ID: {cert.id}</span>}
                    {cert.url && <span className="cert-url"><a href={cert.url} target="_blank" rel="noopener noreferrer">View Certificate</a></span>}
                  </div>
                ))}
              </div>
            )}

            {resumeData.awards && resumeData.awards.length > 0 && (
              <div className="resume-section">
                <h2>Awards & Achievements</h2>
                {resumeData.awards.map((award, index) => (
                  <div key={index} className="award-item">
                    <h3>{award.title}</h3>
                    {award.issuer && <span className="issuer">{award.issuer}</span>}
                    {award.date && <span className="date">{award.date}</span>}
                    {award.description && <p>{award.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {resumeData.languages && resumeData.languages.length > 0 && (
              <div className="resume-section">
                <h2>Languages</h2>
                <ul className="languages-list">
                  {resumeData.languages.map((lang, index) => (
                    <li key={index}>{lang.language} {lang.proficiency && <span>({lang.proficiency})</span>}</li>
                  ))}
                </ul>
              </div>
            )}

            {resumeData.volunteering && resumeData.volunteering.length > 0 && (
              <div className="resume-section">
                <h2>Volunteering / Leadership</h2>
                {resumeData.volunteering.map((vol, index) => (
                  <div key={index} className="volunteering-item">
                    <h3>{vol.role}</h3>
                    {vol.organization && <span className="organization">{vol.organization}</span>}
                    {vol.date && <span className="date">{vol.date}</span>}
                    {vol.description && <p>{vol.description}</p>}
                  </div>
                ))}
              </div>
            )}

            {resumeData.publications && resumeData.publications.length > 0 && (
              <div className="resume-section">
                <h2>Publications</h2>
                {resumeData.publications.map((pub, index) => (
                  <div key={index} className="publication-item">
                    <h3>{pub.title}</h3>
                    {pub.publisher && <span className="publisher">{pub.publisher}</span>}
                    {pub.date && <span className="date">{pub.date}</span>}
                    {pub.url && <span className="pub-url"><a href={pub.url} target="_blank" rel="noopener noreferrer">View Publication</a></span>}
                  </div>
                ))}
              </div>
            )}
=======
>>>>>>> aaf69eb1a911dc5306e41e26d4cfcc3f780a0434
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;