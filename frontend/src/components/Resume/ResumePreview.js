import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../contexts/ResumeContext';
import Button from '../shared/Button/Button';
import './ResumePreview.css';

const ResumePreview = () => {
  const { resumeData, isLoading } = useResume();
  const [isPrinting, setIsPrinting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Handle print events
    const beforePrint = () => setIsPrinting(true);
    const afterPrint = () => setIsPrinting(false);

    window.addEventListener('beforeprint', beforePrint);
    window.addEventListener('afterprint', afterPrint);

    return () => {
      window.removeEventListener('beforeprint', beforePrint);
      window.removeEventListener('afterprint', afterPrint);
    };
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // This would be implemented to generate a PDF
    console.log('Downloading resume as PDF...');
  };

  if (isLoading) {
    return <div className="loading">Loading resume data...</div>;
  }

  const { personalInfo, education, workExperience, skills, projects, certifications } = resumeData;

  return (
    <div className="resume-preview-container">
      {!isPrinting && (
        <div className="resume-actions">
          <Button onClick={() => navigate('/resume')} variant="outline">
            Back to Editor
          </Button>
          <Button onClick={handlePrint} variant="primary">
            Print Resume
          </Button>
          <Button onClick={handleDownload} variant="secondary">
            Download PDF
          </Button>
        </div>
      )}

      <div className="resume-content">
        {/* Header Section */}
        <header className="resume-header">
          <h1>{personalInfo?.name || 'Your Name'}</h1>
          <div className="contact-info">
            {personalInfo?.email && <span>{personalInfo.email}</span>}
            {personalInfo?.phone && <span>{personalInfo.phone}</span>}
            {personalInfo?.location && <span>{personalInfo.location}</span>}
            {personalInfo?.linkedin && <span>{personalInfo.linkedin}</span>}
            {personalInfo?.portfolio && <span>{personalInfo.portfolio}</span>}
          </div>
          {personalInfo?.summary && (
            <div className="summary">
              <h2>Summary</h2>
              <p>{personalInfo.summary}</p>
            </div>
          )}
        </header>

        {/* Education Section */}
        {education?.length > 0 && (
          <section className="resume-section">
            <h2>Education</h2>
            {education.map((edu, index) => (
              <div key={index} className="education-item">
                <h3>{edu.degree}</h3>
                <div className="education-details">
                  <span className="institution">{edu.institution}</span>
                  <span className="date">
                    {edu.startDate} - {edu.currentlyStudying ? 'Present' : edu.endDate}
                  </span>
                </div>
                {edu.description && <p className="description">{edu.description}</p>}
              </div>
            ))}
          </section>
        )}

        {/* Work Experience Section */}
        {workExperience?.length > 0 && (
          <section className="resume-section">
            <h2>Work Experience</h2>
            {workExperience.map((exp, index) => (
              <div key={index} className="experience-item">
                <h3>{exp.jobTitle}</h3>
                <div className="experience-details">
                  <span className="company">{exp.company}</span>
                  <span className="date">
                    {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <div className="description" dangerouslySetInnerHTML={{ __html: exp.description }} />
                )}
              </div>
            ))}
          </section>
        )}

        {/* Skills Section */}
        {skills?.length > 0 && (
          <section className="resume-section">
            <h2>Skills</h2>
            <div className="skills-container">
              {skills.map((skill, index) => (
                <div key={index} className="skill-item">
                  <span className="skill-name">{skill.name}</span>
                  {skill.proficiency && (
                    <div className="skill-proficiency">
                      <div 
                        className="proficiency-bar" 
                        style={{ width: `${skill.proficiency}%` }}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects Section */}
        {projects?.length > 0 && (
          <section className="resume-section">
            <h2>Projects</h2>
            {projects.map((project, index) => (
              <div key={index} className="project-item">
                <h3>{project.name}</h3>
                {project.technologies && (
                  <div className="technologies">
                    {project.technologies.join(' • ')}
                  </div>
                )}
                {project.description && (
                  <div className="description" dangerouslySetInnerHTML={{ __html: project.description }} />
                )}
              </div>
            ))}
          </section>
        )}

        {/* Certifications Section */}
        {certifications?.length > 0 && (
          <section className="resume-section">
            <h2>Certifications</h2>
            <div className="certifications-list">
              {certifications.map((cert, index) => (
                <div key={index} className="certification-item">
                  <h3>{cert.name}</h3>
                  <div className="certification-details">
                    {cert.issuer && <span>{cert.issuer}</span>}
                    {cert.date && <span>{cert.date}</span>}
                    {cert.credentialUrl && (
                      <a href={cert.credentialUrl} target="_blank" rel="noopener noreferrer">
                        View Credential
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;