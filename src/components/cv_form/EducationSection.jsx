import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { GraduationCap, Plus, Trash2, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const EducationSection = ({ education, handleInputChange, addArrayItem, removeArrayItem, handleAISuggest }) => {
  const { t } = useTranslation();

  return (
    <Card className="glass-effect border-[hsl(var(--border))] shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center text-xl">
            <GraduationCap className="h-6 w-6 mr-3 text-[hsl(var(--primary))]" />
            {t('formSectionEducation')}
          </CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('education', { institution: '', degree: '', startDate: '', endDate: '', description: '' })} className="border-[hsl(var(--border))] text-white hover:bg-[hsla(var(--accent)/0.5)]">
            <Plus className="h-4 w-4 mr-2" /> {t('createCVAddEducation')}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {education.map((edu, index) => (
          <div key={index} className="p-6 bg-[hsla(var(--card)/0.5)] rounded-lg border border-[hsla(var(--border)/0.5)] shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium text-lg">{t('createCVEducationEntry')} {index + 1}</h4>
              {education.length > 1 && (
                <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayItem('education', index)} className="text-red-400 hover:bg-red-400/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <Label className="text-white block mb-2">{t('createCVInstitution')}</Label>
                <Input value={edu.institution} onChange={(e) => handleInputChange('education', 'institution', e.target.value, index)} className="bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))]" placeholder={t('createCVInstitutionPlaceholder')} />
              </div>
              <div>
                <Label className="text-white block mb-2">{t('createCVDegree')}</Label>
                <Input value={edu.degree} onChange={(e) => handleInputChange('education', 'degree', e.target.value, index)} className="bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))]" placeholder={t('createCVDegreePlaceholder')} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <Label className="text-white block mb-2">{t('createCVStartDate')}</Label>
                <Input type="month" value={edu.startDate} onChange={(e) => handleInputChange('education', 'startDate', e.target.value, index)} className="bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white" />
              </div>
              <div>
                <Label className="text-white block mb-2">{t('createCVEndDate')}</Label>
                <Input type="month" value={edu.endDate} onChange={(e) => handleInputChange('education', 'endDate', e.target.value, index)} className="bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white" />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-white">{t('createCVDescription')}</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="button" variant="ghost" size="sm" onClick={() => handleAISuggest('education', 'description', index)} className="text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] px-2 py-1">
                      <Sparkles className="h-4 w-4 mr-1" /> {t('aiSuggest')}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="glass-effect border-[hsl(var(--border))] text-white">
                    <p>{t('aiSuggestTooltip')}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Textarea value={edu.description} onChange={(e) => handleInputChange('education', 'description', e.target.value, index)} className="bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))]" placeholder={t('createCVEducationDescPlaceholder')} rows={2} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default EducationSection;