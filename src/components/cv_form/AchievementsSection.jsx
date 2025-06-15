import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Star, Plus, Trash2 } from 'lucide-react'; // Changed icon to Star for achievements
import { useTranslation } from 'react-i18next';

const AchievementsSection = ({ achievements, handleInputChange, addArrayItem, removeArrayItem }) => {
  const { t } = useTranslation();

  return (
    <Card className="glass-effect border-[hsl(var(--border))] shadow-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center text-xl">
            <Star className="h-6 w-6 mr-3 text-[hsl(var(--primary))]" />
            {t('formSectionAchievements')}
          </CardTitle>
          <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('achievements', '')} className="border-[hsl(var(--border))] text-white hover:bg-[hsla(var(--accent)/0.5)]">
            <Plus className="h-4 w-4 mr-2" /> {t('createCVAddAchievement')}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Input value={achievement} onChange={(e) => handleInputChange('achievements', null, e.target.value, index)} className="bg-[hsla(var(--card)/0.7)] border-[hsl(var(--border))] text-white placeholder:text-[hsl(var(--muted-foreground))]" placeholder={t('createCVAchievementPlaceholder')} />
              {achievements.length > 1 && (
                <Button type="button" variant="ghost" size="sm" onClick={() => removeArrayItem('achievements', index)} className="text-red-400 hover:bg-red-400/10">
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

export default AchievementsSection;