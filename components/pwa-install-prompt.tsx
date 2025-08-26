'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { usePwaStatus } from '@/hooks/use-pwa-status';
import { X } from 'lucide-react';

export function PwaInstallPrompt() {
  const { isStandalone, isIos, installPwa, canInstall } = usePwaStatus();
  const [dismissed, setDismissed] = useState(false);
  const [showIosInstructions, setShowIosInstructions] = useState(false);

  // Don't show if already installed or user dismissed
  if (isStandalone || dismissed || (!canInstall && !isIos)) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-800 text-white p-4 shadow-lg z-50 flex items-center justify-between">
      <div>
        {showIosInstructions ? (
          <div>
            <p className="font-bold mb-2">Install this app:</p>
            <ol className="text-sm list-decimal pl-5 mb-2">
              <li>Tap the share button below ↑</li>
              <li>Scroll and tap "Add to Home Screen"</li>
              <li>Tap "Add" to confirm</li>
            </ol>
          </div>
        ) : (
          <p>Install this app on your device for a better experience!</p>
        )}
      </div>
      <div className="flex items-center gap-2">
        {isIos && !showIosInstructions && (
          <Button variant="outline" onClick={() => setShowIosInstructions(true)}>
            How to Install
          </Button>
        )}
        {canInstall && (
          <Button onClick={installPwa}>
            Install Now
          </Button>
        )}
        <Button variant="ghost" size="icon" onClick={() => setDismissed(true)}>
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
