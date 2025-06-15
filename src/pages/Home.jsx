
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Sparkles, Download, Zap, Users, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

const AnimatedSection = ({ children, className, once = true, amount = 0.2 }) => {
  const { ref, inView } = useInView({ triggerOnce: once, threshold: amount });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {
  const { user } = useAuth();
  const { t } = useTranslation();

  const features = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: t('homeFeatureAITitle'),
      description: t('homeFeatureAIDesc')
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: t('homeFeatureTemplatesTitle'),
      description: t('homeFeatureTemplatesDesc')
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: t('homeFeaturePDFTitle'),
      description: t('homeFeaturePDFDesc')
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t('homeFeatureFastTitle'),
      description: t('homeFeatureFastDesc')
    }
  ];

  const stats = [
    { number: "50K+", label: t('homeStatCVs') },
    { number: "95%", label: t('homeStatSuccess') },
    { number: "24/7", label: t('homeStatSupport') },
    { number: "4.9★", label: t('homeStatRating') }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary-muted))] to-[hsl(var(--accent-muted))] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {t('homeHeroTitle1')}
                <span className="block bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent">
                  {t('homeHeroTitle2')}
                </span>
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                {t('homeHeroSubtitle')}
              </p>
              {!user && (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:opacity-90 text-lg px-8 py-6 text-white font-semibold shadow-lg">
                    <Link to="/register">{t('homeHeroCTA1')}</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 shadow-md">
                    <Link to="/login">{t('homeHeroCTA2')}</Link>
                  </Button>
                </div>
              )}
               {user && (
                <Button asChild size="lg" className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:opacity-90 text-lg px-8 py-6 text-white font-semibold shadow-lg">
                  <Link to="/create-cv">{t('homeHeroCTAUser')}</Link>
                </Button>
              )}
            </motion.div>
          </div>
        </div>
        
        <div className="absolute top-20 left-10 floating-animation">
          <div className="w-20 h-20 bg-[hsl(var(--primary))]/20 rounded-full blur-xl"></div>
        </div>
        <div className="absolute bottom-20 right-10 floating-animation" style={{ animationDelay: '2s' }}>
          <div className="w-32 h-32 bg-[hsl(var(--accent))]/20 rounded-full blur-xl"></div>
        </div>
      </section>

      {/* Stats Section */}
      <AnimatedSection className="py-16 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('homeFeaturesTitle')}
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {t('homeFeaturesSubtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Card className="glass-effect border-white/20 h-full hover:border-white/40 transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] rounded-lg w-fit text-white">
                      {feature.icon}
                    </div>
                    <CardTitle className="text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-white/70 text-center">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* CV Preview Section */}
      <AnimatedSection className="py-20 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('homeTemplatesTitle')}
              </h2>
              <p className="text-xl text-white/70 mb-8">
                {t('homeTemplatesSubtitle')}
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full"></div>
                  <span className="text-white">{t('homeTemplatesFeature1')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[hsl(var(--accent))] rounded-full"></div>
                  <span className="text-white">{t('homeTemplatesFeature2')}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-[hsl(var(--primary))] rounded-full"></div>
                  <span className="text-white">{t('homeTemplatesFeature3')}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="cv-template rounded-lg p-8 max-w-md mx-auto transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="h-4 bg-gray-800 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-600 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-800 rounded w-full"></div>
                    <div className="h-3 bg-gray-600 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-600 rounded w-1/2"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-800 rounded w-24 mb-2"></div>
                    <div className="h-3 bg-gray-600 rounded w-full"></div>
                    <div className="h-3 bg-gray-600 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white px-3 py-1 rounded-full text-sm font-medium">
                {t('homeTemplatesAITag')}
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('homeCTATitle')}
            </h2>
            <p className="text-xl text-white/70 mb-8">
              {t('homeCTASubtitle')}
            </p>
            <Button asChild size="lg" className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:opacity-90 text-lg px-12 py-6 text-white font-semibold shadow-lg pulse-glow">
              <Link to={user ? "/create-cv" : "/register"}>{t('homeCTABtn')}</Link>
            </Button>
            {!user && (
              <p className="text-white/60 mt-4 text-sm">
                {t('homeCTANote')}
              </p>
            )}
          </motion.div>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default Home;
