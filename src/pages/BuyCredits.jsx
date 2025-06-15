import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/components/ui/use-toast';
import { CreditCard, Sparkles, Check, Zap, Star, Crown } from 'lucide-react';

const BuyCredits = () => {
  const { user, updateCredits } = useAuth();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const creditPackages = [
    {
      id: 'starter',
      name: 'Starter Pack',
      credits: 5,
      price: 9.99,
      popular: false,
      icon: <Sparkles className="h-6 w-6" />,
      features: [
        '5 CV generations',
        'All templates included',
        'PDF downloads',
        'Basic support'
      ]
    },
    {
      id: 'professional',
      name: 'Professional Pack',
      credits: 15,
      price: 24.99,
      popular: true,
      icon: <Star className="h-6 w-6" />,
      features: [
        '15 CV generations',
        'All templates included',
        'PDF downloads',
        'Priority support',
        'Advanced AI features'
      ]
    },
    {
      id: 'enterprise',
      name: 'Enterprise Pack',
      credits: 50,
      price: 79.99,
      popular: false,
      icon: <Crown className="h-6 w-6" />,
      features: [
        '50 CV generations',
        'All templates included',
        'PDF downloads',
        '24/7 premium support',
        'Advanced AI features',
        'Custom templates'
      ]
    }
  ];

  const handlePurchase = async (packageData) => {
    setLoading(true);
    setSelectedPlan(packageData.id);

    try {
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      
      const newCredits = user.credits + packageData.credits;
      updateCredits(newCredits);
      
      toast({
        title: "Credits Purchased Successfully!",
        description: `${packageData.credits} credits have been added to your account.`,
      });
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setSelectedPlan(null);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* header kismi */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Choose Your Credit Package
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Select the perfect package for your CV creation needs. All packages include access to our premium templates and AI-powered generation.
            </p>
            <div className="flex items-center justify-center space-x-2 mt-6 bg-white/10 rounded-full px-4 py-2 w-fit mx-auto">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span className="text-white">Current balance: {user?.credits} credits</span>
            </div>
          </div>

          {/* kredi paketleri */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {creditPackages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="relative"
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium z-10">
                    Most Popular
                  </div>
                )}
                
                <Card className={`glass-effect h-full transition-all duration-300 ${
                  pkg.popular 
                    ? 'border-blue-400/50 bg-blue-400/10 scale-105' 
                    : 'border-white/20 hover:border-white/40'
                }`}>
                  <CardHeader className="text-center">
                    <div className={`mx-auto mb-4 p-3 rounded-lg w-fit ${
                      pkg.popular 
                        ? 'bg-gradient-to-r from-blue-400 to-purple-500' 
                        : 'bg-white/10'
                    } text-white`}>
                      {pkg.icon}
                    </div>
                    <CardTitle className="text-white text-xl">{pkg.name}</CardTitle>
                    <CardDescription className="text-white/70">
                      Perfect for {pkg.credits <= 5 ? 'individuals' : pkg.credits <= 15 ? 'professionals' : 'teams'}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-2">
                        ${pkg.price}
                      </div>
                      <div className="text-white/70">
                        {pkg.credits} credits • ${(pkg.price / pkg.credits).toFixed(2)} per credit
                      </div>
                    </div>
                    
                    <ul className="space-y-3">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-3">
                          <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                          <span className="text-white/80">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button
                      onClick={() => handlePurchase(pkg)}
                      disabled={loading}
                      className={`w-full ${
                        pkg.popular
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700'
                          : 'bg-white/10 hover:bg-white/20 border border-white/20'
                      }`}
                    >
                      {loading && selectedPlan === pkg.id ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Processing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-4 w-4" />
                          <span>Purchase Credits</span>
                        </div>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* içerik tarzı */}
          <Card className="glass-effect border-white/20">
            <CardHeader className="text-center">
              <CardTitle className="text-white text-2xl mb-4">
                Why Choose Our Credit System?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-400 to-purple-500 p-3 rounded-lg w-fit mx-auto mb-4">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">No Subscriptions</h3>
                  <p className="text-white/70 text-sm">
                    Pay only for what you use. No monthly fees or hidden charges.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-400 to-emerald-500 p-3 rounded-lg w-fit mx-auto mb-4">
                    <Check className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Credits Never Expire</h3>
                  <p className="text-white/70 text-sm">
                    Your credits remain in your account forever. Use them whenever you need.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-r from-purple-400 to-pink-500 p-3 rounded-lg w-fit mx-auto mb-4">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">Premium Quality</h3>
                  <p className="text-white/70 text-sm">
                    Every credit gets you a professionally designed, ATS-optimized CV.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ bolumu yani sık sorulanlar tarzı */}
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <Card className="glass-effect border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-2">How do credits work?</h3>
                  <p className="text-white/70 text-sm">
                    Each CV creation uses 1 credit. You can create unlimited drafts and edits before finalizing your CV.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-effect border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-2">Can I get a refund?</h3>
                  <p className="text-white/70 text-sm">
                    We offer a 30-day money-back guarantee if you're not satisfied with our service.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-effect border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-2">Do credits expire?</h3>
                  <p className="text-white/70 text-sm">
                    No! Your credits never expire and remain in your account until you use them.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="glass-effect border-white/20">
                <CardContent className="p-6">
                  <h3 className="text-white font-semibold mb-2">What payment methods do you accept?</h3>
                  <p className="text-white/70 text-sm">
                    We accept all major credit cards, PayPal, and other secure payment methods.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BuyCredits;