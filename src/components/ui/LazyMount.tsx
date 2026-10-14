'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// Só monta os filhos quando o bloco chega perto da tela.
// Usado em cenas 3D pesadas: o visual é o mesmo, mas o download e o
// processamento só acontecem quando o visitante realmente vai ver.
export function LazyMount({ children, margin = '400px', className }: { children: ReactNode; margin?: string; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const [visivel, setVisivel] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || visivel) return;
        if (!('IntersectionObserver' in window)) {
            setVisivel(true);
            return;
        }
        const obs = new IntersectionObserver(
            ([entrada]) => {
                if (entrada.isIntersecting) {
                    setVisivel(true);
                    obs.disconnect();
                }
            },
            { rootMargin: margin }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [margin, visivel]);

    return (
        <div ref={ref} className={className}>
            {visivel ? children : null}
        </div>
    );
}
