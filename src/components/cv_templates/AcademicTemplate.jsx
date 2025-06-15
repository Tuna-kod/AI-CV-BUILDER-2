import React from 'react';
import { Mail, Phone, MapPin, BookOpen, Award, Users, Edit3 } from 'lucide-react';

const AcademicTemplate = ({ cvData }) => {
  const { personalInfo, experience, education, skills, achievements } = cvData;

  const Section = ({ title, children }) => (
    <section className="mb-5">
      <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-2">{title}</h3>
      {children}
    </section>
  );

  const SubSection = ({ title, date, children }) => (
    <div className="mb-3">
      <div className="flex justify-between items-baseline">
        <h4 className="text-md font-semibold text-gray-800">{title}</h4>
        {date && <p className="text-xs text-gray-500">{date}</p>}
      </div>
      {children}
    </div>
  );

  return (
    <div className="p-10 bg-white text-gray-800 font-serif text-[11pt] leading-relaxed">
      <header className="text-center mb-6 pb-4 border-b border-gray-300">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">{personalInfo.fullName}</h1>
        <h2 className="text-lg text-gray-700 mb-2">{personalInfo.jobTitle || 'Researcher'}</h2>
        <div className="flex justify-center space-x-4 text-xs text-gray-600">
          {personalInfo.email && <span className="flex items-center"><Mail size={14} className="mr-1"/>{personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center"><Phone size={14} className="mr-1"/>{personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center"><MapPin size={14} className="mr-1"/>{personalInfo.location}</span>}
        </div>
      </header>

      {personalInfo.summary && (
        <Section title="Research Statement / Profile">
          <p className="text-sm text-gray-700">{personalInfo.summary}</p>
        </Section>
      )}

      {education && education.length > 0 && education[0].institution && (
        <Section title="Education">
          {education.map((edu, index) => (
            <SubSection key={index} title={`${edu.degree}, ${edu.institution}`} date={`${edu.startDate} - ${edu.endDate}`}>
              {edu.description && <p className="text-xs text-gray-600 italic mt-0.5">{edu.description}</p>}
            </SubSection>
          ))}
        </Section>
      )}
      
      {experience && experience.filter(exp => exp.position?.toLowerCase().includes('research') || exp.position?.toLowerCase().includes('teaching')).length > 0 && (
        <Section title="Research & Teaching Experience">
          {experience.filter(exp => exp.position?.toLowerCase().includes('research') || exp.position?.toLowerCase().includes('teaching')).map((exp, index) => (
            <SubSection key={index} title={`${exp.position}, ${exp.company}`} date={`${exp.startDate} - ${exp.endDate || 'Present'}`}>
              <ul className="list-disc list-inside text-xs text-gray-600 mt-1 space-y-0.5">
                {exp.description.split('\n').map((item, i) => item.trim() && <li key={i}>{item}</li>)}
              </ul>
            </SubSection>
          ))}
        </Section>
      )}
      
      {achievements && achievements.filter(ach => ach.toLowerCase().includes('publication') || ach.toLowerCase().includes('conference') || ach.toLowerCase().includes('paper')).length > 0 && (
        <Section title="Publications & Presentations">
          <ul className="list-none space-y-1.5">
            {achievements.filter(ach => ach.toLowerCase().includes('publication') || ach.toLowerCase().includes('conference') || ach.toLowerCase().includes('paper')).map((pub, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <BookOpen size={14} className="mr-2 mt-0.5 text-gray-500 flex-shrink-0"/> {pub}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {achievements && achievements.filter(ach => ach.toLowerCase().includes('grant') || ach.toLowerCase().includes('award') || ach.toLowerCase().includes('scholarship') || ach.toLowerCase().includes('fellowship')).length > 0 && (
        <Section title="Grants, Awards & Fellowships">
          <ul className="list-none space-y-1.5">
            {achievements.filter(ach => ach.toLowerCase().includes('grant') || ach.toLowerCase().includes('award') || ach.toLowerCase().includes('scholarship') || ach.toLowerCase().includes('fellowship')).map((award, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start">
                <Award size={14} className="mr-2 mt-0.5 text-gray-500 flex-shrink-0"/> {award}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {skills && skills.length > 0 && skills[0] && (
        <Section title="Skills">
          <p className="text-sm text-gray-700">{skills.filter(skill => skill.trim()).join('; ')}</p>
        </Section>
      )}
      
      {experience && experience.filter(exp => !(exp.position?.toLowerCase().includes('research') || exp.position?.toLowerCase().includes('teaching')) && exp.company).length > 0 && (
        <Section title="Other Professional Experience">
          {experience.filter(exp => !(exp.position?.toLowerCase().includes('research') || exp.position?.toLowerCase().includes('teaching')) && exp.company).map((exp, index) => (
            <SubSection key={index} title={`${exp.position}, ${exp.company}`} date={`${exp.startDate} - ${exp.endDate || 'Present'}`}>
              <ul className="list-disc list-inside text-xs text-gray-600 mt-1 space-y-0.5">
                {exp.description.split('\n').map((item, i) => item.trim() && <li key={i}>{item}</li>)}
              </ul>
            </SubSection>
          ))}
        </Section>
      )}

    </div>
  );
};

export default AcademicTemplate;