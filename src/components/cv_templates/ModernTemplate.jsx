import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ModernTemplate = ({ cvData }) => {
  const { 
    personalInfo = {}, 
    experience = [], 
    education = [], 
    skills = [], 
    achievements = [] 
  } = cvData || {};

  const {
    fullName = 'Your Name',
    jobTitle = 'Your Job Title',
    email = '',
    phone = '',
    location = '',
    summary = 'Your professional summary.'
  } = personalInfo;

  return (
    <div className="p-8 bg-white text-gray-800 font-sans leading-relaxed text-[11pt]">
      <header className="text-center mb-8 border-b-2 border-blue-600 pb-5">
        <h1 className="text-4xl font-bold text-blue-700 mb-1.5">{fullName}</h1>
        <h2 className="text-xl text-gray-600 font-light mb-3">{jobTitle}</h2>
        <div className="flex justify-center space-x-5 text-xs text-gray-500">
          {email && <p className="flex items-center"><Mail className="mr-1.5 h-3.5 w-3.5 text-blue-600" /> {email}</p>}
          {phone && <p className="flex items-center"><Phone className="mr-1.5 h-3.5 w-3.5 text-blue-600" /> {phone}</p>}
          {location && <p className="flex items-center"><MapPin className="mr-1.5 h-3.5 w-3.5 text-blue-600" /> {location}</p>}
        </div>
      </header>

      <section className="mb-6">
        <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">PROFESSIONAL SUMMARY</h3>
        <p className="text-gray-700 text-sm leading-normal">{summary}</p>
      </section>

      <div className="grid grid-cols-12 gap-x-6">
        <div className="col-span-8">
          {experience && experience.length > 0 && experience.some(exp => exp && exp.company) && (
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">WORK EXPERIENCE</h3>
              {experience.map((exp, index) => exp && exp.company && (
                <div key={index} className="mb-3">
                  <h4 className="text-md font-medium text-gray-800">{exp.position || 'Position'}</h4>
                  <p className="text-sm text-blue-600 font-normal">{exp.company || 'Company'} | {exp.startDate || 'Start Date'} - {exp.endDate || 'Present'}</p>
                  {exp.description && (
                    <ul className="list-disc list-inside text-xs text-gray-600 mt-1 space-y-0.5">
                      {exp.description.split('\n').map((item, i) => item.trim() && <li key={i}>{item}</li>)}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}

          {education && education.length > 0 && education.some(edu => edu && edu.institution) && (
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">EDUCATION</h3>
              {education.map((edu, index) => edu && edu.institution && (
                <div key={index} className="mb-2.5">
                  <h4 className="text-md font-medium text-gray-800">{edu.degree || 'Degree'}</h4>
                  <p className="text-sm text-blue-600 font-normal">{edu.institution || 'Institution'} | {edu.startDate || 'Start Date'} - {edu.endDate || 'End Date'}</p>
                  {edu.description && <p className="text-xs text-gray-600 mt-0.5">{edu.description}</p>}
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="col-span-4">
          {skills && skills.length > 0 && skills.some(skill => skill && skill.trim()) && (
            <section className="mb-6">
              <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">SKILLS</h3>
              <ul className="flex flex-wrap gap-1.5">
                {skills.map((skill, index) => skill && skill.trim() && (
                  <li key={index} className="bg-blue-100 text-blue-700 text-[10pt] font-medium px-2.5 py-0.5 rounded-full">{skill}</li>
                ))}
              </ul>
            </section>
          )}

          {achievements && achievements.length > 0 && achievements.some(ach => ach && ach.trim()) && (
            <section>
              <h3 className="text-lg font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">ACHIEVEMENTS</h3>
              <ul className="list-disc list-inside text-xs text-gray-600 space-y-0.5">
                {achievements.map((ach, index) => ach && ach.trim() && <li key={index}>{ach}</li>)}
              </ul>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;