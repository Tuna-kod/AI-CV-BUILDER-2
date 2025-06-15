import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { Sparkles, FileText, Eye, Download, Check, Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import PersonalInfoSection from '@/components/cv_form/PersonalInfoSection';
import ExperienceSection from '@/components/cv_form/ExperienceSection';
import EducationSection from '@/components/cv_form/EducationSection';
import SkillsSection from '@/components/cv_form/SkillsSection';
import AchievementsSection from '@/components/cv_form/AchievementsSection';
import CVPreviewModal from '@/components/CVPreviewModal';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import ModernTemplate from '@/components/cv_templates/ModernTemplate';
import ClassicTemplate from '@/components/cv_templates/ClassicTemplate';
import CreativeTemplate from '@/components/cv_templates/CreativeTemplate';
import MinimalTemplate from '@/components/cv_templates/MinimalTemplate';
import TechTemplate from '@/components/cv_templates/TechTemplate';
import AcademicTemplate from '@/components/cv_templates/AcademicTemplate';

const CreateCV = () => {
  const { user, updateCredits } = useAuth();
  const { saveCv, selectedTemplate, setSelectedTemplate } = useApp();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [formPreviewModalOpen, setFormPreviewModalOpen] = useState(false);
  const [templatePreviewModalOpen, setTemplatePreviewModalOpen] = useState(false);
  const [previewingTemplate, setPreviewingTemplate] = useState(null);

  const [formData, setFormData] = useState({
    personalInfo: { fullName: '', email: '', phone: '', location: '', jobTitle: '', summary: '' },
    experience: [{ company: '', position: '', startDate: '', endDate: '', description: '' }],
    education: [{ institution: '', degree: '', startDate: '', endDate: '', description: '' }],
    skills: [''],
    achievements: ['']
  });

  const getTranslatedDummyData = () => ({
    personalInfo: {
      fullName: t('dummyData.fullName', { ns: 'translation', defaultValue: "Tuna Tunc" }),
      jobTitle: t('dummyData.jobTitle', { ns: 'translation', defaultValue: "Software Engineer" }),
      email: t('dummyData.email', { ns: 'translation', defaultValue: "tuna.tunc@example.com" }),
      phone: t('dummyData.phone', { ns: 'translation', defaultValue: "+90 555 123 4567" }),
      location: t('dummyData.location', { ns: 'translation', defaultValue: "Istanbul, Turkey" }),
      summary: t('dummyData.summary', { ns: 'translation', defaultValue: "A passionate software engineer with 5 years of experience in developing innovative solutions. Proficient in multiple programming languages and frameworks. Eager to contribute to challenging projects." })
    },
    experience: [
      { 
        company: t('dummyData.experience1.company', { ns: 'translation', defaultValue: "Tech Solutions Inc." }), 
        position: t('dummyData.experience1.position', { ns: 'translation', defaultValue: "Senior Developer" }), 
        startDate: "2020-01", 
        endDate: t('dummyData.present', { ns: 'translation', defaultValue: "Present" }), 
        description: t('dummyData.experience1.description', { ns: 'translation', defaultValue: "Led a team of 5 developers.\nDeveloped and maintained key product features.\nImproved application performance by 20%." }) 
      },
      { 
        company: t('dummyData.experience2.company', { ns: 'translation', defaultValue: "Web Wizards LLC" }), 
        position: t('dummyData.experience2.position', { ns: 'translation', defaultValue: "Junior Developer" }), 
        startDate: "2018-06", 
        endDate: "2019-12", 
        description: t('dummyData.experience2.description', { ns: 'translation', defaultValue: "Assisted in developing client websites.\nParticipated in code reviews and testing." }) 
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
    skills: t('dummyData.skills', { ns: 'translation', defaultValue: ["JavaScript", "React", "Node.js", "Python", "SQL", "Agile Methodologies"], returnObjects: true }),
    achievements: t('dummyData.achievements', { ns: 'translation', defaultValue: ["Employee of the Month (Tech Solutions Inc.)", "Published an open-source library with 1k+ stars on GitHub"], returnObjects: true })
  });
  
  const [dummyCVDataForPreview, setDummyCVDataForPreview] = useState(getTranslatedDummyData());

  useEffect(() => {
    setDummyCVDataForPreview(getTranslatedDummyData());
  }, [i18n.language, t]);


  const templates = [
    { id: 'modern', name: t('templateModern'), description: t('templateModernDesc'), component: ModernTemplate },
    { id: 'classic', name: t('templateClassic'), description: t('templateClassicDesc'), component: ClassicTemplate },
    { id: 'creative', name: t('templateCreative'), description: t('templateCreativeDesc'), component: CreativeTemplate },
    { id: 'minimal', name: t('templateMinimal'), description: t('templateMinimalDesc'), component: MinimalTemplate },
    { id: 'tech', name: t('templateTech'), description: t('templateTechDesc'), component: TechTemplate },
    { id: 'academic', name: t('templateAcademic'), description: t('templateAcademicDesc'), component: AcademicTemplate },
  ];

  const handleInputChange = (section, field, value, index = null) => {
    setFormData(prev => {
      if (index !== null) {
        const newArray = [...prev[section]];
        if (typeof newArray[index] === 'object') {
          newArray[index] = { ...newArray[index], [field]: value };
        } else {
          newArray[index] = value;
        }
        return { ...prev, [section]: newArray };
      }
      return { ...prev, [section]: { ...prev[section], [field]: value } };
    });
  };

  const addArrayItem = (section, defaultItem) => {
    setFormData(prev => ({ ...prev, [section]: [...prev[section], defaultItem] }));
  };

  const removeArrayItem = (section, index) => {
    setFormData(prev => ({ ...prev, [section]: prev[section].filter((_, i) => i !== index) }));
  };

  const handleAISuggest = async (section, field, index = null) => {
    toast({ title: t('toastFeatureNotImplemented') });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.credits < 1) {
      toast({ title: t('toastInsufficientCreditsTitle'), description: t('toastInsufficientCreditsDesc'), variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      const generatedSummary = t('aiGeneratedSummary', { jobTitle: formData.personalInfo.jobTitle, ns: 'translation', defaultValue: `AI-enhanced summary for ${formData.personalInfo.jobTitle}: Highly skilled and motivated ${formData.personalInfo.jobTitle} with X years of experience in Y. Proven ability to Z. Seeking a challenging role at a dynamic company.` });
      const updatedFormData = {
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          summary: formData.personalInfo.summary || generatedSummary,
        },
      };
      saveCv(updatedFormData);
      updateCredits(user.credits - 1);
      toast({ title: t('toastCVCreatedTitle'), description: t('toastCVCreatedDesc') });
      navigate('/profile');
    } catch (error) {
      toast({ title: t('toastCVCreateFailedTitle'), description: t('toastCVCreateFailedDesc'), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const openTemplatePreview = (templateId) => {
    setPreviewingTemplate(templateId);
    setTemplatePreviewModalOpen(true);
  };


  return (
    <TooltipProvider>
      <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-[hsl(var(--background))] to-[hsla(var(--secondary)/0.2)]">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">{t('createCVPageTitle')}</h1>
              <p className="text-[hsl(var(--muted-foreground))] text-lg">{t('createCVPageDescription')}</p>
              <div className="flex items-center justify-center space-x-2 mt-6 bg-[hsla(var(--card)/0.7)] rounded-full px-4 py-2 w-fit mx-auto shadow-sm">
                <Sparkles className="h-5 w-5 text-yellow-400" />
                <span className="text-white font-medium">{t('createCVCreditsRemaining')} {user?.credits}</span>
              </div>
            </div>

            <Card className="glass-effect border-[hsl(var(--border))] mb-8 shadow-xl">
              <CardHeader>
                <CardTitle className="text-white text-2xl">{t('createCVChooseTemplate')}</CardTitle>
                <CardDescription className="text-[hsl(var(--muted-foreground))]">{t('createCVSelectTemplateDescription')}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <motion.div key={template.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
                      <div
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 h-full flex flex-col justify-between ${
                          selectedTemplate === template.id
                            ? 'border-[hsl(var(--primary))] bg-[hsla(var(--primary)/0.2)]'
                            : 'border-[hsl(var(--border))] bg-[hsla(var(--card)/0.5)] hover:border-[hsl(var(--accent))]'
                        }`}
                        onClick={() => setSelectedTemplate(template.id)}
                      >
                        <div>
                          <h3 className="text-white font-semibold mb-1">{template.name}</h3>
                          <p className="text-[hsl(var(--muted-foreground))] text-xs">{template.description}</p>
                        </div>
                        {selectedTemplate === template.id && <Check className="h-5 w-5 text-[hsl(var(--primary))] self-end mt-2" />}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-[hsl(var(--accent))] hover:text-[hsl(var(--primary))] p-1 h-auto"
                        onClick={(e) => { e.stopPropagation(); openTemplatePreview(template.id); }}
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <form onSubmit={handleSubmit} className="space-y-8">
              <PersonalInfoSection formData={formData.personalInfo} handleInputChange={handleInputChange} handleAISuggest={handleAISuggest} />
              <ExperienceSection experience={formData.experience} handleInputChange={handleInputChange} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} handleAISuggest={handleAISuggest} />
              <EducationSection education={formData.education} handleInputChange={handleInputChange} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} handleAISuggest={handleAISuggest} />
              <SkillsSection skills={formData.skills} handleInputChange={handleInputChange} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />
              <AchievementsSection achievements={formData.achievements} handleInputChange={handleInputChange} addArrayItem={addArrayItem} removeArrayItem={removeArrayItem} />

              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-12">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setFormPreviewModalOpen(true)}
                  className="w-full sm:w-auto border-[hsl(var(--border))] text-white hover:bg-[hsla(var(--accent)/0.5)] px-8 py-3 text-lg shadow-sm"
                >
                  <Eye className="h-5 w-5 mr-2" />
                  {t('cvPreviewTitle')}
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading || user?.credits < 1}
                  className="w-full sm:w-auto bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:opacity-90 text-white font-semibold px-10 py-3 text-lg shadow-md pulse-glow"
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>{t('createCVSubmitLoading')}</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>{t('createCVSubmitButton')}</span>
                    </div>
                  )}
                </Button>
              </div>
              
              {user?.credits < 1 && (
                <p className="text-red-400 mt-4 text-center">
                  {t('createCVNeedCredits')}{' '}
                  <Button variant="link" asChild className="text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] p-0 ml-1 underline">
                    <Link to="/buy-credits">{t('createCVBuyCreditsLink')}</Link>
                  </Button>
                </p>
              )}
            </form>
          </motion.div>
        </div>
        {formPreviewModalOpen && <CVPreviewModal cv={{...formData, template: selectedTemplate}} isOpen={formPreviewModalOpen} onClose={() => setFormPreviewModalOpen(false)} />}
        {templatePreviewModalOpen && previewingTemplate && (
          <CVPreviewModal 
            cv={{...dummyCVDataForPreview, template: previewingTemplate}} 
            isOpen={templatePreviewModalOpen} 
            onClose={() => setTemplatePreviewModalOpen(false)}
            previewOnly={true}
          />
        )}
      </div>
    </TooltipProvider>
  );
};

export default CreateCV;