import React from 'react';
import { Mail, Phone, MapPin, Star, Briefcase, GraduationCap, Award } from 'lucide-react';

const CreativeTemplate = ({ cvData }) => {
  const { personalInfo, experience, education, skills, achievements } = cvData;

  return (
    <div className="p-8 bg-gradient-to-br from-gray-800 to-indigo-900 text-white font-sans relative overflow-hidden text-[11pt]">
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-indigo-500/20 rounded-full filter blur-2xl opacity-40"></div>
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-pink-500/20 rounded-full filter blur-2xl opacity-40"></div>
      
      <div className="relative z-10">
        <header className="text-center mb-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-600 to-indigo-600 mx-auto mb-3 flex items-center justify-center text-3xl font-bold shadow-lg">
            {personalInfo.fullName?.charAt(0) || 'N'}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-1 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-indigo-400 to-sky-400">{personalInfo.fullName}</h1>
          <h2 className="text-lg text-indigo-300 font-medium mb-3">{personalInfo.jobTitle}</h2>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-xs text-indigo-200">
            {personalInfo.email && <span className="flex items-center"><Mail className="mr-1.5 h-3.5 w-3.5 text-pink-400" />{personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center"><Phone className="mr-1.5 h-3.5 w-3.5 text-pink-400" />{personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center"><MapPin className="mr-1.5 h-3.5 w-3.5 text-pink-400" />{personalInfo.location}</span>}
          </div>
        </header>

        <section className="mb-8 p-5 bg-white/10 rounded-xl shadow-xl backdrop-blur-sm">
          <h3 className="text-xl font-bold text-pink-400 mb-2">ABOUT ME</h3>
          <p className="text-indigo-100 text-sm leading-relaxed">{personalInfo.summary}</p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {experience && experience.length > 0 && experience[0].company && (
              <section className="mb-8">
                <h3 className="flex items-center text-xl font-bold text-pink-400 mb-3"><Briefcase className="mr-2.5 h-5 w-5"/>EXPERIENCE</h3>
                {experience.map((exp, index) => (
                  <div key={index} className="mb-5 p-3.5 bg-white/5 rounded-lg shadow-lg transition-all hover:shadow-indigo-500/20">
                    <h4 className="text-md font-semibold text-indigo-200">{exp.position}</h4>
                    <p className="text-sm text-pink-300 font-medium">{exp.company}</p>
                    <p className="text-xs text-indigo-400 mb-1.5">{exp.startDate} - {exp.endDate || 'Present'}</p>
                    <ul className="list-none text-xs text-indigo-100 space-y-1">
                      {exp.description.split('\n').map((item, i) => item.trim() && <li key={i} className="flex items-start"><Star className="h-3 w-3 mr-1.5 mt-0.5 text-pink-400 flex-shrink-0"/>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </section>
            )}

            {education && education.length > 0 && education[0].institution && (
              <section>
                <h3 className="flex items-center text-xl font-bold text-pink-400 mb-3"><GraduationCap className="mr-2.5 h-5 w-5"/>EDUCATION</h3>
                {education.map((edu, index) => (
                  <div key={index} className="mb-3 p-3.5 bg-white/5 rounded-lg shadow-lg">
                    <h4 className="text-md font-semibold text-indigo-200">{edu.degree}</h4>
                    <p className="text-sm text-pink-300 font-medium">{edu.institution}</p>
                    <p className="text-xs text-indigo-400 mb-1">{edu.startDate} - {edu.endDate}</p>
                    {edu.description && <p className="text-xs text-indigo-100 italic">{edu.description}</p>}
                  </div>
                ))}
              </section>
            )}
          </div>

          <div>
            {skills && skills.length > 0 && skills[0] && (
              <section className="mb-8 p-5 bg-white/10 rounded-xl shadow-xl backdrop-blur-sm">
                <h3 className="flex items-center text-xl font-bold text-pink-400 mb-3"><Award className="mr-2.5 h-5 w-5"/>SKILLS</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => skill.trim() && (
                    <span key={index} className="bg-gradient-to-r from-pink-600 to-indigo-700 text-white text-[10pt] font-semibold px-3 py-1 rounded-full shadow-md">{skill}</span>
                  ))}
                </div>
              </section>
            )}

            {achievements && achievements.length > 0 && achievements[0] && (
              <section className="p-5 bg-white/10 rounded-xl shadow-xl backdrop-blur-sm">
                <h3 className="flex items-center text-xl font-bold text-pink-400 mb-3"><Star className="mr-2.5 h-5 w-5"/>ACHIEVEMENTS</h3>
                <ul className="list-none text-xs text-indigo-100 space-y-1.5">
                  {achievements.map((ach, index) => ach.trim() && <li key={index} className="flex items-start"><Star className="h-3.5 w-3.5 mr-1.5 mt-0.5 text-pink-400 flex-shrink-0"/>{ach}</li>)}
                </ul>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;