import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../../contexts/ResumeContext';
import FormLayout from './FormLayout';
import Button from '../shared/Button/Button';
import Input from '../shared/Input/Input';
import Select from '../shared/Select/Select';
import './SkillsForm.css';

const SkillsForm = () => {
  const [skills, setSkills] = useState([{ id: Date.now(), name: '', category: '', proficiency: 50 }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resumeData, updateResumeData } = useResume();
  const navigate = useNavigate();

  // Load saved skills on component mount
  useEffect(() => {
    if (resumeData.skills && resumeData.skills.length > 0) {
      setSkills(resumeData.skills);
    }
  }, [resumeData.skills]);

  const categories = [
    'Technical',
    'Programming',
    'Framework',
    'Tool',
    'Language',
    'Soft Skill'
  ];

  const handleAddSkill = () => {
    setSkills([...skills, { id: Date.now(), name: '', category: '', proficiency: 50 }]);
  };

  const handleRemoveSkill = (id) => {
    if (skills.length > 1) {
      setSkills(skills.filter(skill => skill.id !== id));
    }
  };

  const handleSkillChange = (id, field, value) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, [field]: value } : skill
    ));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      await updateResumeData({ skills });
      navigate('/resume/preview');
      return true;
    } catch (error) {
      console.error('Error saving skills:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title="Your Skills"
      description="Add and manage your technical and professional skills"
      onSave={handleSave}
      isSaving={isSubmitting}
      nextPath="/resume/education"
      prevPath="/resume/experience"
    >
      <div className="skills-container">
        {skills.map((skill) => (
          <div key={skill.id} className="skill-card">
            <div className="skill-card-header">
              <Input
                type="text"
                value={skill.name}
                onChange={(e) => handleSkillChange(skill.id, 'name', e.target.value)}
                placeholder="Skill name (e.g., JavaScript, Project Management)"
                required
                fullWidth
              />
              <div className="skill-actions">
                {skills.length > 1 && (
                  <span className={`skill-level ${skill.level}`}>
                    {skill.level}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeSkill(skill.id)}
                  className="btn-icon"
                  aria-label={`Remove ${skill.name}`}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </FormLayout>
  );
};

export default SkillsForm;