import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ClassicTemplate = ({ cvData }) => {
  const { personalInfo, experience, education, skills, achievements } = cvData;

  return (
    <div className="p-10 bg-white text-gray-800 font-serif text-[11pt]">
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold tracking-wider mb-1 text-gray-900">{personalInfo.fullName}</h1>
        <h2 className="text-lg text-gray-700 font-medium mb-2.5">{personalInfo.jobTitle}</h2>
        <div className="flex justify-center items-center space-x-3 text-xs text-gray-600">
          {personalInfo.email && <span className="flex items-center"><Mail className="mr-1 h-3.5 w-3.5" />{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center"><Phone className="mr-1 h-3.5 w-3.5" />{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center"><MapPin className="mr-1 h-3.5 w-3.5" />{personalInfo.location}</span>}
        </div>
      </header>

      <hr className="my-5 border-gray-300" />

      <section className="mb-5">
        <h3 className="text-md font-semibold tracking-wide border-b-2 border-gray-600 pb-0.5 mb-1.5 text-gray-700">SUMMARY</h3>
        <p className="text-sm text-gray-700 leading-relaxed">{personalInfo.summary}</p>
      </section>

      {experience && experience.length > 0 && experience[0].company && (
        <section className="mb-5">
          <h3 className="text-md font-semibold tracking-wide border-b-2 border-gray-600 pb-0.5 mb-1.5 text-gray-700">EXPERIENCE</h3>
          {experience.map((exp, index) => (
            <div key={index} className="mb-2.5 last:mb-0">
              <h4 className="text-sm font-bold text-gray-800">{exp.position}</h4>
              <p className="text-xs font-medium text-gray-600">{exp.company} | {exp.startDate} - {exp.endDate || 'Present'}</p>
              <ul className="list-disc list-inside text-xs text-gray-600 mt-0.5 space-y-0.5">
                {exp.description.split('\n').map((item, i) => item.trim() && <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
        </section>
      )}

      {education && education.length > 0 && education[0].institution && (
        <section className="mb-5">
          <h3 className="text-md font-semibold tracking-wide border-b-2 border-gray-600 pb-0.5 mb-1.5 text-gray-700">EDUCATION</h3>
          {education.map((edu, index) => (
            <div key={index} className="mb-1.5 last:mb-0">
              <h4 className="text-sm font-bold text-gray-800">{edu.degree}</h4>
              <p className="text-xs font-medium text-gray-600">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
              {edu.description && <p className="text-[10pt] text-gray-500 italic mt-0.5">{edu.description}</p>}
            </div>
          ))}
        </section>
      )}

      {skills && skills.length > 0 && skills[0] && (
        <section className="mb-5">
          <h3 className="text-md font-semibold tracking-wide border-b-2 border-gray-600 pb-0.5 mb-1.5 text-gray-700">SKILLS</h3>
          <p className="text-sm text-gray-700 leading-relaxed">
            {skills.filter(skill => skill.trim()).join(' • ')}
          </p>
        </section>
      )}

      {achievements && achievements.length > 0 && achievements[0] && (
        <section>
          <h3 className="text-md font-semibold tracking-wide border-b-2 border-gray-600 pb-0.5 mb-1.5 text-gray-700">ACHIEVEMENTS</h3>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-0.5">
            {achievements.map((ach, index) => ach.trim() && <li key={index}>{ach}</li>)}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ClassicTemplate;