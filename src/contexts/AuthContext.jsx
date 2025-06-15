import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (userId) => {
    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }
    return profile;
  };

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const profile = await fetchUserProfile(session.user.id);
        setUser({ ...session.user, ...profile });
      }
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session) {
          const profile = await fetchUserProfile(session.user.id);
          setUser({ ...session.user, ...profile });
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      const profile = await fetchUserProfile(data.user.id);
      setUser({ ...data.user, ...profile });
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      return { success: true };
    } catch (error) {
      toast({
        title: "Login failed",
        description: error.message || "Please check your credentials and try again.",
        variant: "destructive"
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, name) => {
    setLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          }
        }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("User registration failed, no user data returned.");
      
      await new Promise(resolve => setTimeout(resolve, 1500)); 

      const newProfile = await fetchUserProfile(authData.user.id);
      
      if (!newProfile) {
        console.warn("Profile not found immediately after registration for user:", authData.user.id, "Might be a delay in trigger execution or trigger failed.");
      }

      setUser({ ...authData.user, ...newProfile });
      
      toast({
        title: "Account created!",
        description: "Welcome! You've received 3 free credits to get started. Please check your email to confirm your account.",
      });
      
      return { success: true };
    } catch (error) {
      console.error("Registration error details:", error);
      toast({
        title: "Registration failed",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setUser(null);
    toast({
      title: "Logged out",
      description: "You've been successfully logged out.",
    });
    setLoading(false);
  };

  const updateCredits = async (newCredits) => {
    if (!user || !user.id) {
      console.error("User or user ID is undefined, cannot update credits");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ credits: newCredits })
        .eq('id', user.id)
        .select()
        .maybeSingle(); 

      if (error) throw error;
      
      if (data) {
        setUser(prevUser => ({ ...prevUser, ...data }));
      } else {
         console.warn("Update credits returned no data, profile might not exist or RLS issue.");
      }
    } catch (error) {
      console.error("Error updating credits:", error);
      toast({
        title: "Credit update failed",
        description: error.message || "Could not update credits.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (profileData) => {
    if (!user || !user.id) {
      console.error("User or user ID is undefined, cannot update profile");
      return { success: false, error: "User not authenticated" };
    }
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      setUser(prevUser => ({ ...prevUser, ...data }));
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
      });
      return { success: true };
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Profile update failed",
        description: error.message || "Could not update profile information.",
        variant: "destructive"
      });
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    setUser,
    login,
    register,
    logout,
    updateCredits,
    updateUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};