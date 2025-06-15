
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Download, X, FileText as FileTextIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, ExternalHyperlink } from 'docx';
import { saveAs } from 'file-saver';
import ModernTemplate from '@/components/cv_templates/ModernTemplate';
import ClassicTemplate from '@/components/cv_templates/ClassicTemplate';
import CreativeTemplate from '@/components/cv_templates/CreativeTemplate';
import MinimalTemplate from '@/components/cv_templates/MinimalTemplate';
import TechTemplate from '@/components/cv_templates/TechTemplate';
import AcademicTemplate from '@/components/cv_templates/AcademicTemplate';

const CVPreviewModal = ({ cv: initialCv, isOpen, onClose, previewOnly = false }) => {
  const { t, i18n } = useTranslation();
  const previewRef = useRef();
  const [cvData, setCvData] = useState(null);

  const getDefaultCvData = () => ({
    personalInfo: { fullName: '', jobTitle: '', email: '', phone: '', location: '', summary: '' },
    experience: [],
    education: [],
    skills: [],
    achievements: [],
    template: 'modern', 
  });

  useEffect(() => {
    let processedCv = initialCv ? { ...initialCv } : getDefaultCvData();
    
    if (!processedCv.personalInfo) processedCv.personalInfo = getDefaultCvData().personalInfo;
    if (!processedCv.experience) processedCv.experience = [];
    if (!processedCv.education) processedCv.education = [];
    if (!processedCv.skills) processedCv.skills = [];
    if (!processedCv.achievements) processedCv.achievements = [];
    if (!processedCv.template) processedCv.template = 'modern';


    if (previewOnly && processedCv) {
      const translateDummyData = (data) => {
        const defaultDummy = getTranslatedDummyDataForPreview(t); 
        return {
          ...data,
          personalInfo: {
            fullName: t('dummyData.fullName', { ns: 'translation', defaultValue: data.personalInfo?.fullName || defaultDummy.personalInfo.fullName }),
            jobTitle: t('dummyData.jobTitle', { ns: 'translation', defaultValue: data.personalInfo?.jobTitle || defaultDummy.personalInfo.jobTitle }),
            email: t('dummyData.email', { ns: 'translation', defaultValue: data.personalInfo?.email || defaultDummy.personalInfo.email }),
            phone: t('dummyData.phone', { ns: 'translation', defaultValue: data.personalInfo?.phone || defaultDummy.personalInfo.phone }),
            location: t('dummyData.location', { ns: 'translation', defaultValue: data.personalInfo?.location || defaultDummy.personalInfo.location }),
            summary: t('dummyData.summary', { ns: 'translation', defaultValue: data.personalInfo?.summary || defaultDummy.personalInfo.summary })
          },
          experience: (data.experience || []).map((exp, index) => ({
            ...exp,
            company: t(`dummyData.experience${index + 1}.company`, { ns: 'translation', defaultValue: exp.company || defaultDummy.experience[index]?.company }),
            position: t(`dummyData.experience${index + 1}.position`, { ns: 'translation', defaultValue: exp.position || defaultDummy.experience[index]?.position }),
            description: t(`dummyData.experience${index + 1}.description`, { ns: 'translation', defaultValue: exp.description || defaultDummy.experience[index]?.description }),
            endDate: exp.endDate === "Present" ? t('dummyData.present', { ns: 'translation', defaultValue: "Present" }) : exp.endDate,
          })),
          education: (data.education || []).map((edu, index) => ({
            ...edu,
            institution: t(`dummyData.education${index + 1}.institution`, { ns: 'translation', defaultValue: edu.institution || defaultDummy.education[index]?.institution }),
            degree: t(`dummyData.education${index + 1}.degree`, { ns: 'translation', defaultValue: edu.degree || defaultDummy.education[index]?.degree }),
            description: t(`dummyData.education${index + 1}.description`, { ns: 'translation', defaultValue: edu.description || defaultDummy.education[index]?.description })
          })),
          skills: t('dummyData.skills', { ns: 'translation', defaultValue: data.skills || defaultDummy.skills, returnObjects: true }),
          achievements: t('dummyData.achievements', { ns: 'translation', defaultValue: data.achievements || defaultDummy.achievements, returnObjects: true })
        };
      };
      setCvData(translateDummyData(processedCv));
    } else {
      setCvData(processedCv);
    }
  }, [initialCv, i18n.language, t, previewOnly]);


  if (!cvData) return null;

  const templates = {
    modern: ModernTemplate,
    classic: ClassicTemplate,
    creative: CreativeTemplate,
    minimal: MinimalTemplate,
    tech: TechTemplate,
    academic: AcademicTemplate,
  };

  const SelectedTemplateComponent = templates[cvData.template] || ModernTemplate;

  const handleDownloadPdf = async () => {
    const element = previewRef.current;
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: true,
      allowTaint: true,
      backgroundColor: '#ffffff' 
    });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height]
    });

    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`${cvData.personalInfo?.fullName || 'CV'}-${cvData.template}.pdf`);
  };

  const handleDownloadDocx = async () => {
    if (!cvData) return;

    const { personalInfo, experience, education, skills, achievements } = cvData;

    const children = [
      new Paragraph({
        children: [new TextRun({ text: personalInfo.fullName || '', bold: true, size: 48 })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 100 },
      }),
      new Paragraph({
        children: [new TextRun({ text: personalInfo.jobTitle || '', size: 28, color: "555555" })],
        alignment: AlignmentType.CENTER,
        spacing: { after: 200 },
      }),
      new Paragraph({
        children: [
          personalInfo.email ? new TextRun({ text: `Email: ${personalInfo.email}   `, size: 20 }) : null,
          personalInfo.phone ? new TextRun({ text: `Phone: ${personalInfo.phone}   `, size: 20 }) : null,
          personalInfo.location ? new TextRun({ text: `Location: ${personalInfo.location}`, size: 20 }) : null,
        ].filter(Boolean),
        alignment: AlignmentType.CENTER,
        spacing: { after: 300 },
      }),
    ];

    if (personalInfo.summary) {
      children.push(new Paragraph({ text: t('cvDocxSummary', { ns: 'translation' }), heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 100 } }));
      children.push(new Paragraph({ text: personalInfo.summary, style: "normal", spacing: { after: 200 } }));
    }

    if (experience && experience.length > 0) {
      children.push(new Paragraph({ text: t('cvDocxExperience', { ns: 'translation' }), heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 100 } }));
      experience.forEach(exp => {
        children.push(new Paragraph({ children: [new TextRun({ text: exp.position || '', bold: true, size: 24 })], spacing: { after: 50 } }));
        children.push(new Paragraph({ children: [new TextRun({ text: `${exp.company || ''} | ${exp.startDate || ''} - ${exp.endDate || ''}`, italics: true, color: "777777", size: 22 })], spacing: { after: 50 } }));
        if (exp.description) {
          exp.description.split('\n').forEach(descItem => {
            if (descItem.trim()) {
              children.push(new Paragraph({ text: descItem, bullet: { level: 0 }, style: "normal", spacing: { after: 50 } }));
            }
          });
        }
        children.push(new Paragraph({ text: "", spacing: { after: 150 } }));
      });
    }
    
    if (education && education.length > 0) {
      children.push(new Paragraph({ text: t('cvDocxEducation', { ns: 'translation' }), heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 100 } }));
      education.forEach(edu => {
        children.push(new Paragraph({ children: [new TextRun({ text: edu.degree || '', bold: true, size: 24 })], spacing: { after: 50 } }));
        children.push(new Paragraph({ children: [new TextRun({ text: `${edu.institution || ''} | ${edu.startDate || ''} - ${edu.endDate || ''}`, italics: true, color: "777777", size: 22 })], spacing: { after: 50 } }));
        if (edu.description) {
          children.push(new Paragraph({ text: edu.description, style: "normal", spacing: { after: 150 } }));
        }
      });
    }

    if (skills && skills.length > 0) {
      children.push(new Paragraph({ text: t('cvDocxSkills', { ns: 'translation' }), heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 100 } }));
      children.push(new Paragraph({ text: skills.join(', '), style: "normal", spacing: { after: 200 } }));
    }

    if (achievements && achievements.length > 0) {
      children.push(new Paragraph({ text: t('cvDocxAchievements', { ns: 'translation' }), heading: HeadingLevel.HEADING_2, spacing: { before: 300, after: 100 } }));
      achievements.forEach(ach => {
        if (ach.trim()) {
          children.push(new Paragraph({ text: ach, bullet: { level: 0 }, style: "normal", spacing: { after: 50 } }));
        }
      });
    }
    
    const doc = new Document({
      sections: [{
        properties: {},
        children: children,
      }],
      styles: {
        paragraphStyles: [
          {
            id: "normal",
            name: "Normal",
            basedOn: "Normal",
            next: "Normal",
            quickFormat: true,
            run: {
              size: 22,
              font: "Calibri",
            },
          },
        ],
      },
    });

    Packer.toBlob(doc).then(blob => {
      saveAs(blob, `${personalInfo.fullName || 'CV'}-${cvData.template}.docx`);
    });
  };
  
  const title = previewOnly ? t('previewTemplate') : t('cvPreviewTitle');
  const description = previewOnly 
    ? t(`template${cvData.template.charAt(0).toUpperCase() + cvData.template.slice(1)}Name`)
    : `${cvData.personalInfo?.fullName || t('profileUntitledCV')} - ${t(`template${cvData.template.charAt(0).toUpperCase() + cvData.template.slice(1)}`)}`;


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[90vh] glass-effect border-[hsl(var(--border))] text-white flex flex-col p-0">
        <DialogHeader className="p-6 border-b border-[hsl(var(--border))]">
          <DialogTitle className="text-2xl font-semibold">{title}</DialogTitle>
          <DialogDescription className="text-[hsl(var(--muted-foreground))]">
            {description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-grow overflow-y-auto p-6 bg-[hsl(var(--background))]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="cv-template shadow-2xl mx-auto" 
            style={{ width: '210mm', minHeight: '297mm' }} 
            ref={previewRef}
          >
            <SelectedTemplateComponent cvData={cvData} />
          </motion.div>
        </div>

        <DialogFooter className="p-6 border-t border-[hsl(var(--border))] bg-[hsla(var(--card)/0.7)] flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <Button variant="outline" onClick={onClose} className="border-[hsl(var(--border))] text-white hover:bg-[hsla(var(--accent)/0.5)] w-full sm:w-auto">
            <X className="mr-2 h-4 w-4" />
            {t('close', { ns: 'common' })} 
          </Button>
          {!previewOnly && (
            <>
              <Button onClick={handleDownloadPdf} className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:opacity-90 text-white font-semibold shadow-md w-full sm:w-auto">
                <Download className="mr-2 h-4 w-4" />
                {t('cvDownloadPDF')}
              </Button>
              <Button onClick={handleDownloadDocx} variant="outline" className="border-[hsl(var(--border))] text-white hover:bg-[hsla(var(--accent)/0.5)] w-full sm:w-auto">
                <FileTextIcon className="mr-2 h-4 w-4" />
                {t('cvDownloadDOCX')}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const getTranslatedDummyDataForPreview = (t) => ({
  personalInfo: {
    fullName: t('dummyData.fullName', { ns: 'translation', defaultValue: "Tuna Tunc" }),
    jobTitle: t('dummyData.jobTitle', { ns: 'translation', defaultValue: "Software Engineer" }),
    email: t('dummyData.email', { ns: 'translation', defaultValue: "tuna.tunc@example.com" }),
    phone: t('dummyData.phone', { ns: 'translation', defaultValue: "+90 555 123 4567" }),
    location: t('dummyData.location', { ns: 'translation', defaultValue: "Istanbul, Turkey" }),
    summary: t('dummyData.summary', { ns: 'translation', defaultValue: "A passionate software engineer..." })
  },
  experience: [
    { 
      company: t('dummyData.experience1.company', { ns: 'translation', defaultValue: "Tech Solutions Inc." }), 
      position: t('dummyData.experience1.position', { ns: 'translation', defaultValue: "Senior Developer" }), 
      startDate: "2020-01", 
      endDate: t('dummyData.present', { ns: 'translation', defaultValue: "Present" }), 
      description: t('dummyData.experience1.description', { ns: 'translation', defaultValue: "Led a team..." }) 
    }
  ],
  education: [
    { 
      institution: t('dummyData.education1.institution', { ns: 'translation', defaultValue: "State University" }), 
      degree: t('dummyData.education1.degree', { ns: 'translation', defaultValue: "B.Sc. in Computer Science" }), 
      startDate: "2014-09", 
      endDate: "2018-05", 
      description: t('dummyData.education1.description', { ns: 'translation', defaultValue: "Graduated with Honors." }) 
    }
  ],
  skills: t('dummyData.skills', { ns: 'translation', defaultValue: ["JavaScript", "React"], returnObjects: true }),
  achievements: t('dummyData.achievements', { ns: 'translation', defaultValue: ["Employee of the Month"], returnObjects: true })
});


export default CVPreviewModal;
