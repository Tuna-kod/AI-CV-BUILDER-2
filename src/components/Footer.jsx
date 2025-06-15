import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="glass-effect border-t border-[hsl(var(--border))] mt-auto shadow-top-lg"
    >
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] p-2.5 rounded-lg shadow-md">
                <FileText className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white tracking-tight">{t('navTitle')}</span>
            </div>
            <p className="text-[hsl(var(--muted-foreground))] text-sm">
              {t('footerSlogan')}
            </p>
          </div>

          <div>
            <span className="text-white font-semibold mb-4 block">{t('footerProduct')}</span>
            <ul className="space-y-2 text-[hsl(var(--muted-foreground))] text-sm">
              <li><a href="#" className="hover:text-[hsl(var(--accent-foreground))] transition-colors">{t('footerCVTemplates')}</a></li>
              <li><a href="#" className="hover:text-[hsl(var(--accent-foreground))] transition-colors">{t('footerAIGeneration')}</a></li>
              <li><a href="#" className="hover:text-[hsl(var(--accent-foreground))] transition-colors">{t('footerPDFExport')}</a></li>
              <li><a href="#" className="hover:text-[hsl(var(--accent-foreground))] transition-colors">{t('footerCreditSystem')}</a></li>
            </ul>
          </div>

          <div>
            <span className="text-white font-semibold mb-4 block">{t('footerSupport')}</span>
            <ul className="space-y-2 text-[hsl(var(--muted-foreground))] text-sm">
              <li><a href="#" className="hover:text-[hsl(var(--accent-foreground))] transition-colors">{t('footerHelpCenter')}</a></li>
              <li><a href="#" className="hover:text-[hsl(var(--accent-foreground))] transition-colors">{t('footerContactUs')}</a></li>
              <li><a href="#" className="hover:text-[hsl(var(--accent-foreground))] transition-colors">{t('footerPrivacyPolicy')}</a></li>
              <li><a href="#" className="hover:text-[hsl(var(--accent-foreground))] transition-colors">{t('footerTerms')}</a></li>
            </ul>
          </div>

          <div>
            <span className="text-white font-semibold mb-4 block">{t('footerCompany')}</span>
            <ul className="space-y-2 text-[hsl(var(--muted-foreground))] text-sm">
              <li><a href="#" className="hover:text-[hsl(var(--accent-foreground))] transition-colors">{t('footerAboutUs')}</a></li>
              <li><a href="#" className="hover:text-[hsl(var(--accent-foreground))] transition-colors">{t('footerCareers')}</a></li>
              <li><a href="#" className="hover:text-[hsl(var(--accent-foreground))] transition-colors">{t('footerBlog')}</a></li>
              <li><a href="#" className="hover:text-[hsl(var(--accent-foreground))] transition-colors">{t('footerPress')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[hsl(var(--border))] mt-8 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-[hsl(var(--muted-foreground))] text-sm">
            {t('footerRights')}
          </p>
          <div className="flex items-center space-x-1 text-[hsl(var(--muted-foreground))] text-sm mt-4 md:mt-0">
            <span>{t('footerMadeWith')}</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>{t('footerForJobSeekers')}</span>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;