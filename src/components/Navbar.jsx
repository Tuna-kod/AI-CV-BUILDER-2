import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal } from '@/components/ui/dropdown-menu';
import { FileText, User, LogOut, CreditCard, Sparkles, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const languages = [
    { code: 'en', name: 'EN' },
    { code: 'tr', name: 'TR' },
    { code: 'es', name: 'ES' },
    { code: 'fr', name: 'FR' },
    { code: 'de', name: 'DE' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      className="glass-effect border-b border-[hsl(var(--border))] sticky top-0 z-50 shadow-lg"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: [0, 15, -10, 15, 0], scale: 1.1 }}
              transition={{ duration: 0.5 }}
              className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] p-2.5 rounded-lg shadow-md"
            >
              <FileText className="h-6 w-6 text-white" />
            </motion.div>
            <span className="text-xl font-bold text-white tracking-tight">{t('navTitle')}</span>
          </Link>

          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 w-9 p-0 glass-effect border-[hsl(var(--border))] text-white hover:bg-[hsla(var(--accent)/0.5)]">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 glass-effect border-[hsl(var(--border))] text-white shadow-xl" align="end">
                {languages.map((lang) => (
                  <DropdownMenuItem 
                    key={lang.code} 
                    onClick={() => changeLanguage(lang.code)}
                    className={`hover:bg-[hsla(var(--accent)/0.7)] focus:bg-[hsla(var(--accent)/0.7)] cursor-pointer ${i18n.language === lang.code ? 'bg-[hsla(var(--primary)/0.5)]' : ''}`}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <>
                <div className="flex items-center space-x-2 bg-[hsla(var(--card)/0.7)] rounded-full px-3 py-1.5 shadow-sm">
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                  <span className="text-sm text-white font-medium">{user.credits} {t('navCredits')}</span>
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-[hsla(var(--accent)/0.5)] focus:ring-2 focus:ring-[hsl(var(--ring))]">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white font-semibold">
                          {user.name?.charAt(0).toUpperCase() || 'U'}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 glass-effect border-[hsl(var(--border))] text-white shadow-xl" align="end">
                    <DropdownMenuItem onClick={() => navigate('/profile')} className="hover:bg-[hsla(var(--accent)/0.7)] focus:bg-[hsla(var(--accent)/0.7)] cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      {t('navProfile')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/create-cv')} className="hover:bg-[hsla(var(--accent)/0.7)] focus:bg-[hsla(var(--accent)/0.7)] cursor-pointer">
                      <FileText className="mr-2 h-4 w-4" />
                      {t('navCreateCV')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/buy-credits')} className="hover:bg-[hsla(var(--accent)/0.7)] focus:bg-[hsla(var(--accent)/0.7)] cursor-pointer">
                      <CreditCard className="mr-2 h-4 w-4" />
                      {t('navBuyCredits')}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-[hsl(var(--border))]" />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-400 hover:bg-[hsla(var(--destructive)/0.3)] focus:bg-[hsla(var(--destructive)/0.3)] cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      {t('navLogout')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild className="text-white hover:bg-[hsla(var(--accent)/0.5)] px-4 py-2">
                  <Link to="/login">{t('navLogin')}</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:opacity-90 text-white font-semibold px-5 py-2.5 shadow-md">
                  <Link to="/register">{t('navGetStarted')}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;