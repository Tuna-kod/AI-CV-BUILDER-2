import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Briefcase, Plus, Trash2, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ExperienceSection = ({ experience, handleInputChange, addArrayItem, removeArrayItem, handleAISuggest }) => {
  const { t } = useTranslation();

  return (
    <Card className="glass-effect border-[hsl(var(--border))] shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center text-xl">
            <Briefcase className="h-6 w-6 mr-3 text-[hsl(var(--primary))]" />
            {t('formSectionWorkExperience')}
          </CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('experience', { company: '', position: '', startDate: '', endDate: '', description: '' })} className="border-[hsl(var(--border))] text-white hover:bg-[hsla(var(--accent)/0.5)]">
            <Plus className="h-4 w-4 mr-2" /> {t('createCVAddExperience')}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {experience.map((exp, index) => (
          <div key={index} className="p-6 bg-[hsla(var(--card)/0.5)] rounded-lg border border-[hsla(var(--border)/0.5)] shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium text-lg">{t('createCVExperience')} {index + 1}</h4>
              {experience.length > 1 && (
                <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayItem('experience', index)} className="text-red-400 hover:bg-red-400/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <Label className="text-white block mb-2">{t('createCVCompany')}</Label>
                <Input value={exp.company} onChange={(e) => handleInputChange('experience', 'company', e.target.value, index)} className="bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))]" placeholder={t('createCVCompanyPlaceholder')} />
              </div>
              <div>
                <Label className="text-white block mb-2">{t('createCVPosition')}</Label>
                <Input value={exp.position} onChange={(e) => handleInputChange('experience', 'position', e.target.value, index)} className="bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))]" placeholder={t('createCVPositionPlaceholder')} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <Label className="text-white block mb-2">{t('createCVStartDate')}</Label>
                <Input type="month" value={exp.startDate} onChange={(e) => handleInputChange('experience', 'startDate', e.target.value, index)} className="bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white" />
              </div>
              <div>
                <Label className="text-white block mb-2">{t('createCVEndDate')}</Label>
                <Input type="month" value={exp.endDate} onChange={(e) => handleInputChange('experience', 'endDate', e.target.value, index)} className="bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white" placeholder={t('createCVEndDatePlaceholder')} />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label className="text-white">{t('createCVDescription')}</Label>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button type="button" variant="ghost" size="sm" onClick={() => handleAISuggest('experience', 'description', index)} className="text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] px-2 py-1">
                      <Sparkles className="h-4 w-4 mr-1" /> {t('aiSuggest')}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="glass-effect border-[hsl(var(--border))] text-white">
                    <p>{t('aiSuggestTooltip')}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Textarea value={exp.description} onChange={(e) => handleInputChange('experience', 'description', e.target.value, index)} className="bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))]" placeholder={t('createCVWorkDescPlaceholder')} rows={3} />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ExperienceSection;