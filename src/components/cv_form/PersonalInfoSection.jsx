import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Briefcase, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";


const PersonalInfoSection = ({ formData, handleInputChange, handleAISuggest }) => {
  const { t } = useTranslation();

  return (
    <Card className="glass-effect border-[hsl(var(--border))] shadow-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center text-xl">
          <User className="h-6 w-6 mr-3 text-[hsl(var(--primary))]" />
          {t('formSectionPersonalInfo')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="fullName" className="text-white block mb-2">{t('createCVFullName')}</Label>
            <Input id="fullName" value={formData.fullName} onChange={(e) => handleInputChange('personalInfo', 'fullName', e.target.value)} className="bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))]" placeholder={t('createCVFullNamePlaceholder')} required />
          </div>
          <div>
            <Label htmlFor="jobTitle" className="text-white block mb-2">{t('createCVJobTitle')}</Label>
            <Input id="jobTitle" value={formData.jobTitle} onChange={(e) => handleInputChange('personalInfo', 'jobTitle', e.target.value)} className="bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))]" placeholder={t('createCVJobTitlePlaceholder')} required />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="email" className="text-white block mb-2">{t('createCVEmail')}</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              <Input id="email" type="email" value={formData.email} onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)} className="pl-10 bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))]" placeholder={t('createCVEmailPlaceholder')} required />
            </div>
          </div>
          <div>
            <Label htmlFor="phone" className="text-white block mb-2">{t('createCVPhone')}</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)} className="pl-10 bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))]" placeholder={t('createCVPhonePlaceholder')} />
            </div>
          </div>
          <div>
            <Label htmlFor="location" className="text-white block mb-2">{t('createCVLocation')}</Label>
             <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[hsl(var(--muted-foreground))]" />
              <Input id="location" value={formData.location} onChange={(e) => handleInputChange('personalInfo', 'location', e.target.value)} className="pl-10 bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))]" placeholder={t('createCVLocationPlaceholder')} />
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="summary" className="text-white">{t('createCVProfessionalSummary')}</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button type="button" variant="ghost" size="sm" onClick={() => handleAISuggest('personalInfo', 'summary')} className="text-[hsl(var(--primary))] hover:text-[hsl(var(--accent))] px-2 py-1">
                  <Sparkles className="h-4 w-4 mr-1" /> {t('aiSuggest')}
                </Button>
              </TooltipTrigger>
              <TooltipContent className="glass-effect border-[hsl(var(--border))] text-white">
                <p>{t('aiSuggestTooltip')}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Textarea id="summary" value={formData.summary} onChange={(e) => handleInputChange('personalInfo', 'summary', e.target.value)} className="bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))]" placeholder={t('createCVSummaryPlaceholder')} rows={4} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;