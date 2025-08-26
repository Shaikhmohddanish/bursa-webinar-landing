'use client';

import { useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export function usePwaStatus() {
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [promptInstall, setPromptInstall] = useState<BeforeInstallPromptEvent | null>(null);
  
  useEffect(() => {
    // Check if running in standalone mode (PWA installed)
    if (typeof window !== 'undefined') {
      const isRunningStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                                (window.navigator as any).standalone || 
                                document.referrer.includes('android-app://');
      
      setIsStandalone(isRunningStandalone);
      
      // Check if iOS
      const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
                         (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      setIsIos(isIOSDevice);
      
      // Listen for beforeinstallprompt event to enable custom install button
      window.addEventListener('beforeinstallprompt', (e: Event) => {
        // Prevent the mini-infobar from appearing on mobile
        e.preventDefault();
        // Stash the event so it can be triggered later
        setPromptInstall(e as BeforeInstallPromptEvent);
      });
    }
  }, []);
  
  const installPwa = () => {
    if (!promptInstall) {
      return;
    }
    // Show the install prompt
    promptInstall.prompt();
    // Wait for the user to respond to the prompt
    promptInstall.userChoice.then((choiceResult: { outcome: 'accepted' | 'dismissed'; platform: string }) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Clear the saved prompt since it can't be used again
      setPromptInstall(null);
    });
  };
  
  return { isStandalone, isIos, installPwa, canInstall: !!promptInstall };
}
