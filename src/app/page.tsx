'use client';
import IconCode from '@/../public/icons/code.svg';
import IconFigma from '@/../public/icons/figma.svg';
import IconMobe from '@/../public/icons/mobe.svg';
import Logo from '@/../public/mobe-studio-logo-l-light.svg';
import { gsap } from 'gsap';
import { Bodies, Engine, MouseConstraint, World } from 'matter-js';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  CHIPS,
  CONTENT_PADDING_FROM_WALLS,
  DESCRIPTION_ANIMATION_DURATION_SECS,
  FOOTER_ANIMATION_DURATION_SECS,
  ICON_CHIPS,
  Icons,
  LOGO_ANIMATION_DURATION_SECS,
  MOBILE_BREAKPOINT,
  SLEEP_BEFORE_CHIPS_SECS,
  SLEEP_BEFORE_TOP_BOUND_SECS,
  getHorizontalWallsDistance,
  getVerticalWallsDistance,
} from './const';

type Chip = {
  body: Matter.Body;
  elem: HTMLDivElement | undefined;
  render(): void;
};

export default function Home() {
  const logoRef = useRef(null);
  const descriptionRef = useRef(null);
  const footerRef = useRef(null);

  const [isMobile, setMobile] = useState(true);
  const [maxContentWidth, setMaxContentWidth] = useState(0);

  const requestRef = useRef<number>();
  const engineRef = useRef(Engine.create());
  const chipRefs = useRef<(HTMLDivElement | undefined)[]>(CHIPS(isMobile).map(() => undefined));
  const iconChipRefs = useRef<(HTMLDivElement | undefined)[]>(ICON_CHIPS(isMobile).map(() => undefined));

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .from(logoRef.current, {
          y: '-160',
          duration: LOGO_ANIMATION_DURATION_SECS,
          opacity: 0,
        })
        .from(descriptionRef.current, {
          duration: DESCRIPTION_ANIMATION_DURATION_SECS,
          opacity: 0,
        })
        .from(footerRef.current, {
          y: '160',
          duration: FOOTER_ANIMATION_DURATION_SECS,
          opacity: 0,
        });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const engine = engineRef.current;

    const cw = document.body.clientWidth;
    const ch = document.body.clientHeight;

    const isMobile = cw < MOBILE_BREAKPOINT;
    setMobile(cw < MOBILE_BREAKPOINT);

    const horizontalWallsDistance = getHorizontalWallsDistance(isMobile);
    const verticalWallsDistance = getVerticalWallsDistance(isMobile);

    setMaxContentWidth(cw - verticalWallsDistance * 2);

    const mouseConstraint = MouseConstraint.create(engine);
    World.add(engine.world, [
      // ground
      Bodies.rectangle(cw / 2, ch, cw * 2, horizontalWallsDistance * 2, { isStatic: true }),
      // wall left
      Bodies.rectangle(0, ch / 2, verticalWallsDistance * 2, ch * 2, { isStatic: true }),
      // wall right
      Bodies.rectangle(cw, ch / 2, verticalWallsDistance * 2, ch * 2, { isStatic: true }),
      mouseConstraint,
    ]);

    const chips: Chip[] = CHIPS(isMobile).map(({ h, w }, i) => ({
      body: Bodies.rectangle(
        Math.min(cw - verticalWallsDistance - w / 2, Math.max(w / 2 + verticalWallsDistance, Math.random() * cw)),
        -300,
        w,
        h,
        {
          chamfer: { radius: h / 2 },
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

        elem.style.top = `${y - h / 2}px`;
        elem.style.left = `${x - w / 2}px`;
        elem.style.transform = `rotate(${this.body.angle}rad)`;
      },
    }));

    const iconChips: Chip[] = ICON_CHIPS(isMobile).map(({ h, w }, i) => ({
      body: Bodies.rectangle(
        Math.min(cw - verticalWallsDistance - w / 2, Math.max(w / 2 + verticalWallsDistance, Math.random() * cw)),
        -200,
        w,
        h,
        {
          chamfer: { radius: h / 2 },
          mass: 6,
          restitution: 0.2,
          friction: 0.1,
        },
      ),
      elem: iconChipRefs.current[i],
      render() {
        const { x, y } = this.body.position;
        const elem = this.elem;

        if (!elem) return;

        elem.style.top = `${y - h / 2}px`;
        elem.style.left = `${x - w / 2}px`;
        elem.style.transform = `rotate(${this.body.angle}rad)`;
      },
    }));

    const chipsDropTimeoutHandle = setTimeout(() => {
      World.add(
        engine.world,
        chips.map(chip => chip.body),
      );
      World.add(
        engine.world,
        iconChips.map(chip => chip.body),
      );
    }, SLEEP_BEFORE_CHIPS_SECS * 1000);

    const topBoundTimeoutHandle = setTimeout(() => {
      World.add(engine.world, [Bodies.rectangle(cw / 2, 0, cw, horizontalWallsDistance * 2, { isStatic: true })]);
    }, SLEEP_BEFORE_TOP_BOUND_SECS * 1000);

    (function rerender() {
      for (const chip of chips) {
        chip.render();
      }

      for (const iconChip of iconChips) {
        iconChip.render();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex h-[100svh] flex-col items-center">
      <div ref={logoRef} className="absolute top-[18px] md:top-[28px]">
        <Logo alt="Mobe Studio" title="Mobe Studio" className="h-[28px] w-[164px] md:h-[42px] md:w-[258px]" />
      </div>
      <div
        ref={descriptionRef}
        className="absolute top-[88px] flex flex-col items-center gap-4 md:top-[132px] lg:top-[176px] lg:gap-6"
        style={{
          width: maxContentWidth - CONTENT_PADDING_FROM_WALLS * 2,
        }}
      >
        <p className="text-center text-2xl font-light md:text-5xl md:leading-[120%] lg:text-6xl">
          Digital Experience studio
          <br />
          based in Bergamo (Italy)
        </p>
      </div>
      <div ref={footerRef} className="absolute bottom-[24px] md:bottom-[38px]">
        <p className="text-base font-normal text-white/80 lg:text-lg">
          Contact us:{' '}
          <a href="mailto:hello@mobestudio.com" className="text-white underline">
            hello@mobestudio.com
          </a>
        </p>
      </div>
      <div className="absolute inset-x-0 top-[64px] h-px bg-[#525963]/40 md:top-[96px]" />
      <div className="absolute inset-x-0 bottom-[64px] h-px bg-[#525963]/40 md:bottom-[96px]" />
      <div className="absolute inset-y-0 left-[24px] w-px bg-[#525963]/40 md:left-[96px]" />
      <div className="absolute inset-y-0 right-[24px] w-px bg-[#525963]/40 md:right-[96px]" />
      {CHIPS(isMobile).map(({ title, color, textColor, w, h }, i) => (
        <div
          ref={ref => ref && (chipRefs.current[i] = ref)}
          key={i}
          className="absolute top-[-200px] flex cursor-grab select-none items-center justify-center rounded-full border border-black bg-white text-lg font-medium text-black active:cursor-grabbing"
          style={{
            width: w,
            height: h,
            backgroundColor: color,
            color: textColor,
          }}
        >
          <h1>{title}</h1>
        </div>
      ))}
      {ICON_CHIPS(isMobile).map(({ icon, color, borderColor, w, h }, i) => (
        <div
          ref={ref => ref && (iconChipRefs.current[i] = ref)}
          key={i}
          className="absolute top-[-200px] flex cursor-grab select-none items-center justify-center rounded-full border bg-white text-lg font-medium text-black active:cursor-grabbing"
          style={{
            width: w,
            height: h,
            backgroundColor: color,
            borderColor,
          }}
        >
          {icon === Icons.Code ? (
            <IconCode width={24} height={24} />
          ) : icon === Icons.Figma ? (
            <IconFigma width={24} height={24} />
          ) : icon === Icons.Mobe ? (
            <IconMobe width={24} height={24} />
          ) : null}
        </div>
      ))}
    </main>
  );
}
