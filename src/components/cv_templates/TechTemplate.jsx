import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, Code, Database, Cloud, Brain } from 'lucide-react';

const TechTemplate = ({ cvData }) => {
  const { personalInfo, experience, education, skills, achievements } = cvData;

  const Section = ({ title, icon, children }) => (
    <section className="mb-6">
      <h3 className="flex items-center text-lg font-semibold text-sky-400 mb-2">
        {React.cloneElement(icon, { className: "mr-2 h-5 w-5" })}
        {title}
      </h3>
      {children}
    </section>
  );

  return (
    <div className="p-8 bg-gray-900 text-gray-200 font-mono leading-relaxed text-[10.5pt]">
      <div className="grid grid-cols-12 gap-6">
        <aside className="col-span-4 bg-gray-800 p-6 rounded-lg shadow-lg">
          <div className="text-center mb-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-500 to-cyan-500 mx-auto mb-3 flex items-center justify-center text-4xl font-bold text-gray-900 shadow-md">
              {personalInfo.fullName?.charAt(0) || 'T'}
            </div>
            <h1 className="text-2xl font-bold text-sky-300">{personalInfo.fullName}</h1>
            <h2 className="text-md text-cyan-400">{personalInfo.jobTitle}</h2>
          </div>

          <div className="space-y-3 text-xs mb-6">
            {personalInfo.email && <p className="flex items-center"><Mail className="mr-2 h-3.5 w-3.5 text-sky-400" /> {personalInfo.email}</p>}
            {personalInfo.phone && <p className="flex items-center"><Phone className="mr-2 h-3.5 w-3.5 text-sky-400" /> {personalInfo.phone}</p>}
            {personalInfo.location && <p className="flex items-center"><MapPin className="mr-2 h-3.5 w-3.5 text-sky-400" /> {personalInfo.location}</p>}
          </div>
          
          {skills && skills.length > 0 && skills[0] && (
            <Section title="SKILLS" icon={<Code />}>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, index) => skill.trim() && (
                  <span key={index} className="bg-gray-700 text-sky-300 text-[9pt] px-2 py-0.5 rounded">{skill}</span>
                ))}
              </div>
            </Section>
          )}
        </aside>

        <main className="col-span-8">
          <Section title="SUMMARY" icon={<Brain />}>
            <p className="text-sm text-gray-300 leading-normal">{personalInfo.summary}</p>
          </Section>

          {experience && experience.length > 0 && experience[0].company && (
            <Section title="EXPERIENCE" icon={<Database />}>
              {experience.map((exp, index) => (
                <div key={index} className="mb-4 p-3 bg-gray-800/50 rounded">
                  <h4 className="text-md font-semibold text-sky-300">{exp.position}</h4>
                  <p className="text-sm text-cyan-400">{exp.company} | {exp.startDate} - {exp.endDate || 'Present'}</p>
                  <ul className="list-disc list-inside text-xs text-gray-400 mt-1 space-y-0.5 pl-2">
                    {exp.description.split('\n').map((item, i) => item.trim() && <li key={i}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </Section>
          )}

          {education && education.length > 0 && education[0].institution && (
            <Section title="EDUCATION" icon={<Cloud />}>
              {education.map((edu, index) => (
                <div key={index} className="mb-3 p-3 bg-gray-800/50 rounded">
                  <h4 className="text-md font-semibold text-sky-300">{edu.degree}</h4>
                  <p className="text-sm text-cyan-400">{edu.institution} | {edu.startDate} - {edu.endDate}</p>
                  {edu.description && <p className="text-xs text-gray-400 mt-0.5">{edu.description}</p>}
                </div>
              ))}
            </Section>
          )}
          
          {achievements && achievements.length > 0 && achievements[0] && (
             <Section title="ACHIEVEMENTS" icon={<Github />}>
              <ul className="list-disc list-inside text-xs text-gray-400 space-y-0.5 pl-2">
                {achievements.map((ach, index) => ach.trim() && <li key={index}>{ach}</li>)}
              </ul>
            </Section>
          )}
        </main>
      </div>
    </div>
  );
};

export default TechTemplate;