/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import Logo from '@/../public/logo.svg';
import { gsap } from 'gsap';
import { Bodies, Engine, MouseConstraint, World } from 'matter-js';
import { useEffect, useLayoutEffect, useRef } from 'react';

const LOGO_ANIMATION_DURATION_SECS = 0.5;
const DESCRIPTION_ANIMATION_DURATION_SECS = 0.8;
const ONLINE_SOON_ANIMATION_DURATION_SECS = 0.8;
const SLEEP_BEFORE_CHIPS_SECS =
  LOGO_ANIMATION_DURATION_SECS + DESCRIPTION_ANIMATION_DURATION_SECS + ONLINE_SOON_ANIMATION_DURATION_SECS + 1;
const SLEEP_BEFORE_TOP_BOUND_SECS = SLEEP_BEFORE_CHIPS_SECS + 2;
const CHIP_WIDTH = 180;
const CHIP_HEIGHT = 60;
const CHIPS = [
  'Code',
  'Development',
  'Software',
  'User Experience',
  'User Interface',
  'Animation',
  'Branding',
  'Creativity',
  'Web-design',
];
const CHIP_BG_COLORS = [
  '#45C358',
  '#45C358',
  '#45C358',
  '#505FEC',
  '#505FEC',
  '#505FEC',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
];
const CHIP_TEXT_COLORS = [
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#FFFFFF',
  '#505FEC',
  '#505FEC',
  '#505FEC',
];

type Chip = {
  body: Matter.Body;
  elem: HTMLDivElement | undefined;
  render(): void;
};

export default function Home() {
  const logoRef = useRef(null);
  const descriptionRef = useRef(null);
  const onlineSoonRef = useRef(null);

  const requestRef = useRef<number>();
  const engineRef = useRef(Engine.create());
  const chipRefs = useRef<(HTMLDivElement | undefined)[]>(CHIPS.map(() => undefined));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .from(logoRef.current, {
          y: '160',
          duration: LOGO_ANIMATION_DURATION_SECS,
          opacity: 0,
        })
        .from(descriptionRef.current, {
          duration: DESCRIPTION_ANIMATION_DURATION_SECS,
          opacity: 0,
        })
        .from(onlineSoonRef.current, {
          duration: ONLINE_SOON_ANIMATION_DURATION_SECS,
          opacity: 0,
        });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const engine = engineRef.current;

    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    const mouseConstraint = MouseConstraint.create(engine);
    World.add(engine.world, [
      // Bottom
      Bodies.rectangle(cw / 2, ch, cw * 2, 10, { isStatic: true }),
      // Left
      Bodies.rectangle(0, ch / 2, 10, ch * 2, { isStatic: true }),
      //Right
      Bodies.rectangle(cw, ch / 2, 10, ch * 2, { isStatic: true }),
      mouseConstraint,
    ]);

    const chips: Chip[] = CHIPS.map((_, i) => ({
      body: Bodies.rectangle(
        Math.min(cw - CHIP_WIDTH / 2, Math.max(CHIP_WIDTH / 2, Math.random() * cw)),
        Math.random() * -200 - 200,
        CHIP_WIDTH,
        CHIP_HEIGHT,
        {
          mass: 6,
          restitution: 0.2,
          friction: 0.1,
          angle: Math.random() * 1.4 - 0.7,
        },
      ),
      elem: chipRefs.current[i],
      render() {
        const { x, y } = this.body.position;
        const elem = this.elem;

        if (!elem) return;

        elem.style.top = `${y - CHIP_HEIGHT / 2}px`;
        elem.style.left = `${x - CHIP_WIDTH / 2}px`;
        elem.style.transform = `rotate(${this.body.angle}rad)`;
      },
    }));

    const chipsDropTimeoutHandle = setTimeout(() => {
      World.add(
        engine.world,
        chips.map(chip => chip.body),
      );
    }, SLEEP_BEFORE_CHIPS_SECS * 1000);

    const topBoundTimeoutHandle = setTimeout(() => {
      World.add(engine.world, [Bodies.rectangle(cw / 2, 0, cw, 10, { isStatic: true })]);
    }, SLEEP_BEFORE_TOP_BOUND_SECS * 1000);

    (function rerender() {
      for (const chip of chips) {
        chip.render();
      }

      Engine.update(engine);
      requestRef.current = requestAnimationFrame(rerender);
    })();

    return () => {
      clearTimeout(chipsDropTimeoutHandle);
      clearTimeout(topBoundTimeoutHandle);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      Engine.clear(engine);
    };
  }, []);

  return (
    <main className="flex h-[100svh] flex-col items-center p-6 lg:p-8">
      <div className="flex max-w-[300px] flex-col items-center gap-0 md:max-w-[500px] lg:max-w-[600px] lg:gap-8">
        <div ref={logoRef} className="w-full">
          <Logo alt="Mobe Studio" title="Mobe Studio" className="w-full" />
        </div>
        <p ref={descriptionRef} className="mb-8 text-center text-2xl font-light md:text-4xl md:leading-[120%] lg:mb-6">
          Digital Experience studio
          <br />
          based in Bergamo (Italy)
        </p>
        <p ref={onlineSoonRef} className="text-base font-normal uppercase lg:text-lg">
          Online soon
        </p>
      </div>
      {CHIPS.map((chip, i) => (
        <div
          ref={ref => ref && (chipRefs.current[i] = ref)}
          key={i}
          className="absolute flex select-none items-center justify-center rounded-full bg-white text-lg font-semibold text-black"
          style={{
            width: CHIP_WIDTH,
            height: CHIP_HEIGHT,
            backgroundColor: CHIP_BG_COLORS[i],
            color: CHIP_TEXT_COLORS[i],
          }}
        >
          <h1>{chip}</h1>
        </div>
      ))}
    </main>
  );
}
