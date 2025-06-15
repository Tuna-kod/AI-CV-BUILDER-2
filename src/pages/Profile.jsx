
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { FileText, Download, Trash2, Plus, Sparkles, Calendar, CreditCard, Eye, Edit3, UploadCloud, Save } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CVPreviewModal from '@/components/CVPreviewModal';
import { supabase } from '@/lib/supabaseClient';

const Profile = () => {
  const { user, updateUserProfile, setUser: setAuthUser } = useAuth();
  const { cvs, deleteCv } = useApp();
  const { t, i18n } = useTranslation();
  const [previewCv, setPreviewCv] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phone_number || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar_url || null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phone_number || '');
      setAvatarPreview(user.avatar_url || null);
    }
  }, [user]);

  const handleDownload = (cv) => {
    toast({
      title: t('toastFeatureNotImplemented')
    });
  };

  const handleDelete = (cvId) => {
    deleteCv(cvId);
    toast({
      title: t('toastCVDeletedTitle'),
      description: t('toastCVDeletedDesc'),
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(i18n.language, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const openPreviewModal = (cv) => {
    setPreviewCv(cv);
  };

  const closePreviewModal = () => {
    setPreviewCv(null);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setName(user?.name || '');
      setEmail(user?.email || '');
      setPhoneNumber(user?.phone_number || '');
      setAvatarFile(null);
      setAvatarPreview(user?.avatar_url || null);
    }
  };

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSave = async () => {
    setUploading(true);
    let newAvatarUrl = user?.avatar_url;

    if (avatarFile) {
      const fileExt = avatarFile.name.split('.').pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, avatarFile, { upsert: true });

      if (uploadError) {
        toast({ title: t('profileAvatarUploadError'), description: uploadError.message, variant: 'destructive' });
        setUploading(false);
        return;
      }
      
      const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
      newAvatarUrl = urlData.publicUrl;
    }

    const updatedProfileData = {
      name: name,
      email: email, 
      phone_number: phoneNumber,
      avatar_url: newAvatarUrl,
    };
    
    // Update email in Supabase Auth if it changed
    if (email !== user.email) {
        const { error: emailUpdateError } = await supabase.auth.updateUser({ email: email });
        if (emailUpdateError) {
            toast({ title: t('profileEmailUpdateError'), description: emailUpdateError.message, variant: 'destructive' });
            setUploading(false);
            return;
        }
        toast({ title: t('profileEmailUpdateSuccess'), description: t('profileEmailUpdateSuccessDesc') });
    }


    const { success, error } = await updateUserProfile(updatedProfileData);

    if (success) {
      setAuthUser(prev => ({...prev, ...updatedProfileData, email: email})); // Update local auth user state
      setIsEditing(false);
      setAvatarFile(null);
    } else {
      toast({ title: t('profileUpdateFailed'), description: error, variant: 'destructive' });
    }
    setUploading(false);
  };
  
  useEffect(() => {
    const language = i18n.language;
  }, [i18n.language]);


  return (
    <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-[hsl(var(--background))] to-[hsla(var(--secondary)/0.2)]">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-12">
            <Card className="glass-effect border-[hsl(var(--border))] shadow-xl">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                  <motion.div whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }} className="relative">
                    <Avatar className="h-28 w-28 border-4 border-[hsl(var(--primary))] shadow-lg">
                      <AvatarImage src={avatarPreview || user?.avatar_url} alt={user?.name} />
                      <AvatarFallback className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white text-3xl font-semibold">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        size="icon"
                        variant="outline"
                        className="absolute bottom-0 right-0 rounded-full bg-[hsl(var(--card))] border-[hsl(var(--border))] hover:bg-[hsla(var(--accent)/0.8)] p-2"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <UploadCloud className="h-4 w-4 text-white" />
                        <input type="file" ref={fileInputRef} onChange={handleAvatarChange} accept="image/*" className="hidden" />
                      </Button>
                    )}
                  </motion.div>
                  
                  <div className="flex-1 text-center md:text-left">
                    {isEditing ? (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="name" className="text-[hsl(var(--muted-foreground))]">{t('profileName')}</Label>
                          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} className="bg-[hsla(var(--input)/0.8)] border-[hsl(var(--border))] text-white" />
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-[hsl(var(--muted-foreground))]">{t('profileEmail')}</Label>
                          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-[hsla(var(--input)/0.8)] border-[hsl(var(--border))] text-white" />
                        </div>
                        <div>
                          <Label htmlFor="phoneNumber" className="text-[hsl(var(--muted-foreground))]">{t('profilePhoneNumber')}</Label>
                          <Input id="phoneNumber" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="bg-[hsla(var(--input)/0.8)] border-[hsl(var(--border))] text-white" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">{user?.name}</h1>
                        <p className="text-[hsl(var(--muted-foreground))] text-lg mb-1">{user?.email}</p>
                        <p className="text-[hsl(var(--muted-foreground))] text-lg mb-4">{user?.phone_number || t('profileNoPhoneNumber')}</p>
                      </>
                    )}
                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start space-y-3 sm:space-y-0 sm:space-x-4 mt-4">
                      <div className="flex items-center space-x-2 bg-[hsla(var(--card)/0.7)] rounded-full px-4 py-2 shadow-sm">
                        <Sparkles className="h-5 w-5 text-yellow-400" />
                        <span className="text-white font-medium">{user?.credits} {t('profileCreditsRemaining')}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[hsl(var(--muted-foreground))]">
                        <Calendar className="h-5 w-5" />
                        <span>{t('profileMemberSince')} {formatDate(user?.created_at)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-3 pt-2">
                    {isEditing ? (
                      <>
                        <Button onClick={handleProfileSave} disabled={uploading} className="bg-gradient-to-r from-green-500 to-emerald-600 hover:opacity-90 text-white font-semibold px-6 py-3 shadow-md">
                          {uploading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          ) : (
                            <Save className="h-5 w-5 mr-2" />
                          )}
                          {t('profileSaveChanges')}
                        </Button>
                        <Button variant="outline" onClick={handleEditToggle} className="border-[hsl(var(--border))] text-white hover:bg-[hsla(var(--accent)/0.5)] px-6 py-3 shadow-sm">
                          {t('profileCancelEdit')}
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleEditToggle} className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white font-semibold px-6 py-3 shadow-md">
                        <Edit3 className="h-5 w-5 mr-2" />
                        {t('profileEditProfile')}
                      </Button>
                    )}
                    <Button asChild className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:opacity-90 text-white font-semibold px-6 py-3 shadow-md">
                      <Link to="/create-cv">
                        <Plus className="h-5 w-5 mr-2" />
                        {t('profileCreateNewCV')}
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="border-[hsl(var(--border))] text-white hover:bg-[hsla(var(--accent)/0.5)] px-6 py-3 shadow-sm">
                      <Link to="/buy-credits">
                        <CreditCard className="h-5 w-5 mr-2" />
                        {t('navBuyCredits')}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white tracking-tight">{t('profileYourCVs')}</h2>
              <span className="text-[hsl(var(--muted-foreground))] text-lg">{cvs.length} {t('profileCVsCreated')}</span>
            </div>

            {cvs.length === 0 ? (
              <Card className="glass-effect border-[hsl(var(--border))] shadow-xl">
                <CardContent className="p-12 text-center">
                  <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
                    <div className="mx-auto w-28 h-28 bg-[hsla(var(--card)/0.7)] rounded-full flex items-center justify-center mb-6 shadow-lg">
                      <FileText className="h-14 w-14 text-[hsl(var(--muted-foreground))]" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white mb-3">{t('profileNoCVsYet')}</h3>
                    <p className="text-[hsl(var(--muted-foreground))] text-lg mb-8">
                      {t('profileNoCVsDescription')}
                    </p>
                    <Button asChild className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] hover:opacity-90 text-white font-semibold px-8 py-4 text-lg shadow-md">
                      <Link to="/create-cv">
                        <Plus className="h-5 w-5 mr-2" />
                        {t('profileCreateFirstCV')}
                      </Link>
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cvs.map((cv, index) => (
                  <motion.div
                    key={cv.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ y: -8, boxShadow: "0 10px 20px hsla(var(--primary)/0.2)" }}
                    className="h-full"
                  >
                    <Card className="glass-effect border-[hsl(var(--border))] hover:border-[hsl(var(--accent))] transition-all duration-300 h-full flex flex-col shadow-lg">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-white text-xl mb-1 tracking-tight">
                              {cv.personal_info?.fullName || t('profileUntitledCV')}
                            </CardTitle>
                            <CardDescription className="text-[hsl(var(--muted-foreground))]">
                              {cv.personal_info?.jobTitle || t('profileNoJobTitle')}
                            </CardDescription>
                          </div>
                          <div className="bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--accent))] text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm">
                            {cv.template}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-grow flex flex-col justify-between">
                        <div className="text-[hsl(var(--muted-foreground))] text-sm mb-6">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{t('profileCreated')} {formatDate(cv.created_at)}</span>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold shadow-md"
                            onClick={() => openPreviewModal(cv)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            {t('cvPreviewTitle')}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-red-500/50 text-red-400 hover:bg-red-500/20 hover:border-red-500/70 shadow-sm"
                            onClick={() => handleDelete(cv.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
      {previewCv && <CVPreviewModal cv={previewCv} isOpen={!!previewCv} onClose={closePreviewModal} />}
    </div>
  );
};

export default Profile;