/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Logo from '@/../public/logo.svg';
import { gsap } from 'gsap';
import { Bodies, Engine, Render, Runner, World } from 'matter-js';
import { useEffect, useLayoutEffect, useRef } from 'react';

export default function Home() {
  const scene = useRef();
  const engine = useRef(Engine.create());

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

  useEffect(() => {
    const sceneCurrent = scene.current;
    const engineCurrent = engine.current;

    const chips = ['UX', 'Coding', 'UI', 'Figma', 'Github', 'Twitter', 'Behance', 'Email', 'Discord', 'YouTube'];

    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    World.add(engineCurrent.world, [
      Bodies.rectangle(cw / 2, ch - 20, cw, 10, { isStatic: true }),
      Bodies.rectangle(0, ch / 2, 10, ch, { isStatic: true }),
      Bodies.rectangle(cw, ch / 2, 10, ch, { isStatic: true }),
    ]);

    World.add(
      engineCurrent.world,
      chips.map(chip =>
        Bodies.rectangle(Math.random() * cw, Math.random() * -200 - 200, 180, 64, {
          mass: 10,
          restitution: 0.9,
          friction: 0.005,
          angle: Math.random() * 360,
          render: {
            fillStyle: '#FFFFFF',
            strokeStyle: '3px solid #0f0f0f',
          },
        }),
      ),
    );

    const render = Render.create({
      element: sceneCurrent,
      engine: engineCurrent,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent',
      },
    });

    const runner = Runner.run(engineCurrent);
    Render.run(render);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      World.clear(engineCurrent.world, false);
      Engine.clear(engineCurrent);
      render.canvas.remove();
      render.textures = {};
    };
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
      <div ref={scene as any} className="absolute inset-0" />
    </main>
  );
}
