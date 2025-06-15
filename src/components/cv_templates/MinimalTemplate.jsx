import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const MinimalTemplate = ({ cvData }) => {
  const { personalInfo, experience, education, skills, achievements } = cvData;

  const SectionTitle = ({ children }) => (
    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-5 mb-1.5 pb-0.5 border-b border-gray-300">{children}</h3>
  );

  const ListItem = ({ children }) => (
    <li className="text-xs text-gray-600 leading-snug">{children}</li>
  );

  return (
    <div className="p-8 bg-gray-50 text-gray-800 font-light text-[10pt]">
      <header className="mb-5">
        <h1 className="text-2xl font-medium text-gray-900">{personalInfo.fullName}</h1>
        <h2 className="text-md text-gray-700">{personalInfo.jobTitle}</h2>
        <div className="flex items-center space-x-3 mt-1.5 text-[9pt] text-gray-500">
          {personalInfo.email && <span className="flex items-center"><Mail size={12} className="mr-1"/>{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center"><Phone size={12} className="mr-1"/>{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center"><MapPin size={12} className="mr-1"/>{personalInfo.location}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <section>
          <p className="text-xs text-gray-700 leading-relaxed">{personalInfo.summary}</p>
        </section>
      )}

      {experience && experience.length > 0 && experience[0].company && (
        <section>
          <SectionTitle>Experience</SectionTitle>
          {experience.map((exp, index) => (
            <div key={index} className="mb-2.5">
              <h4 className="text-sm font-medium text-gray-800">{exp.position}</h4>
              <p className="text-xs text-gray-600">{exp.company} | {exp.startDate} - {exp.endDate || 'Present'}</p>
              <ul className="list-disc list-inside ml-3.5 mt-0.5 space-y-0.5">
                {exp.description.split('\n').map((item, i) => item.trim() && <ListItem key={i}>{item}</ListItem>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {education && education.length > 0 && education[0].institution && (
        <section>
          <SectionTitle>Education</SectionTitle>
          {education.map((edu, index) => (
            <div key={index} className="mb-1.5">
              <h4 className="text-sm font-medium text-gray-800">{edu.degree}</h4>
              <p className="text-xs text-gray-600">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
              {edu.description && <p className="text-[9pt] text-gray-500 italic mt-0.5">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && skills[0] && (
        <section>
          <SectionTitle>Skills</SectionTitle>
          <p className="text-xs text-gray-700">
            {skills.filter(skill => skill.trim()).join(', ')}
          </p>
        </section>
      )}

      {achievements && achievements.length > 0 && achievements[0] && (
        <section>
          <SectionTitle>Achievements</SectionTitle>
          <ul className="list-disc list-inside ml-3.5 space-y-0.5">
            {achievements.map((ach, index) => ach.trim() && <ListItem key={index}>{ach}</ListItem>)}
          </ul>
        </section>
      )}
    </div>
  );
};

export default MinimalTemplate;