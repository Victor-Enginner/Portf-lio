'use client';
import { useState, useEffect } from 'react';

/**
 * Custom hook to detect performance-constrained environments.
 * - isMobile: < 768px (Phone)
 * - isTablet: 768px - 1024px
 * - isLowPowerMode: Mobile or Tablet or explicitly set.
 */
export function usePerformance() {
    const [hasMounted, setHasMounted] = useState(false);
    const [state, setState] = useState({
        isMobile: false,
        isTablet: false,
        isLowPowerMode: true, // Default to true (safe mode) initially
        isWeakDevice: false,
    });

    useEffect(() => {
        setHasMounted(true);
        const checkPerformance = () => {
            const width = window.innerWidth;
            const isMobile = width < 768;
            const isTablet = width >= 768 && width < 1024;

            // Aparelho fraco pelo hardware, não pela tela: pouca RAM, poucos núcleos ou economia de dados.
            // Não muda o visual; só reduz a resolução interna das cenas 3D.
            const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
            const isWeakDevice =
                (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
                (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 4) ||
                nav.connection?.saveData === true;

            setState({
                isMobile,
                isTablet,
                isWeakDevice,
                // On mobile and tablet, we generally want to avoid heavy 3D/Shaders
                isLowPowerMode: isMobile || isTablet,
            });
        };

        checkPerformance();
        window.addEventListener('resize', checkPerformance);
        return () => window.removeEventListener('resize', checkPerformance);
    }, []);

    // During SSR and until hydration is complete, return true (safe mode)
    // to prevent any accidental heavy component initialization on mobile.
    if (!hasMounted) {
        return {
            isMobile: false,
            isTablet: false,
            isLowPowerMode: true,
            isWeakDevice: false,
        };
    }


    return state;
}

