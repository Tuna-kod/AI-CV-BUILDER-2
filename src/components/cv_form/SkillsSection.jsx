import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Award, Plus, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SkillsSection = ({ skills, handleInputChange, addArrayItem, removeArrayItem }) => {
  const { t } = useTranslation();

  return (
    <Card className="glass-effect border-[hsl(var(--border))] shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center text-xl">
            <Award className="h-6 w-6 mr-3 text-[hsl(var(--primary))]" />
            {t('formSectionSkills')}
          </CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('skills', '')} className="border-[hsl(var(--border))] text-white hover:bg-[hsla(var(--accent)/0.5)]">
            <Plus className="h-4 w-4 mr-2" /> {t('createCVAddSkill')}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input value={skill} onChange={(e) => handleInputChange('skills', null, e.target.value, index)} className="bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))]" placeholder={t('createCVSkillPlaceholder')} />
              {skills.length > 1 && (
                <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayItem('skills', index)} className="text-red-400 hover:bg-red-400/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsSection;