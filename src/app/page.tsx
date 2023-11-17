'use client';
import Logo from '@/../public/logo.svg';
import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';

export default function Home() {
  const logoRef = useRef(null);
  const descriptionRef = useRef(null);
  const onlineSoonRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .from(logoRef.current, {
          y: '160',
          duration: 0.5,
          opacity: 0,
        })
        .from(descriptionRef.current, {
          duration: 0.8,
          opacity: 0,
        })
        .from(onlineSoonRef.current, {
          duration: 0.8,
          opacity: 0,
        });
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="flex h-[100svh] flex-col items-center justify-between p-6 lg:p-8">
      <div></div>
      <div className="flex max-w-[300px] flex-col items-center gap-0 md:max-w-[500px] lg:max-w-[600px] lg:gap-8">
        <div ref={logoRef} className="w-full">
          <Logo alt="Mobe Studio" title="Mobe Studio" className="w-full" />
        </div>
        <p ref={descriptionRef} className="text-center text-2xl font-light md:text-4xl md:leading-[120%]">
          Digital Experience studio
          <br />
          based in Bergamo (Italy)
        </p>
      </div>
      <p ref={onlineSoonRef} className="text-base font-normal uppercase lg:text-lg">
        Online soon
      </p>
    </main>
  );
}
