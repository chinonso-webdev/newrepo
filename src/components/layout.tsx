'use client';

import { SessionProvider } from 'next-auth/react';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { useEffect } from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        // Force CSS recalculation after route changes
        const handleRouteChange = () => {
            // Trigger a layout recalculation
            const sheets = document.styleSheets;
            for (let i = 0; i < sheets.length; i++) {
                try {
                    sheets[i].disabled = true;
                    sheets[i].disabled = false;
                } catch (e) {
                    // Skip cross-origin or protected stylesheets
                }
            }
        };

        // Listen for route changes
        const handlePopState = () => handleRouteChange();
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    return (
        <SessionProvider>
            {children}
            <ProgressBar
                height="4px"
                color="#fffd00"
                options={{ showSpinner: false }}
                shallowRouting

            />
        </SessionProvider>
    );
};

export default Providers;