'use client';
import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';

export default function Home() {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const onlineSoonRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .from(titleRef.current, {
          y: '40',
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
    <main className="flex h-screen flex-col items-center justify-between p-6 lg:p-20">
      <div></div>
      <div className="flex max-w-[300px] flex-col items-center gap-6 md:max-w-[500px] md:gap-12 lg:max-w-[700px] lg:gap-16">
        <h1 ref={titleRef}>mobe studio</h1>
        <p ref={descriptionRef} className="text-center text-2xl font-light md:text-5xl lg:text-6xl">
          Digital Experience studio based in Bergamo (Italy)
        </p>
      </div>
      <p ref={onlineSoonRef} className="text-lg font-normal uppercase md:text-3xl lg:text-4xl">
        Online soon
      </p>
    </main>
  );
}
