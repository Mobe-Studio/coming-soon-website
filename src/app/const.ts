export const LOGO_ANIMATION_DURATION_SECS = 0.5;
export const DESCRIPTION_ANIMATION_DURATION_SECS = 0.8;
export const ONLINE_SOON_ANIMATION_DURATION_SECS = 0.8;
export const SLEEP_BEFORE_CHIPS_SECS =
  LOGO_ANIMATION_DURATION_SECS + DESCRIPTION_ANIMATION_DURATION_SECS + ONLINE_SOON_ANIMATION_DURATION_SECS + 1;
export const SLEEP_BEFORE_TOP_BOUND_SECS = SLEEP_BEFORE_CHIPS_SECS + 1.4;

export const MOBILE_BREAKPOINT = 768;

export const VERTICAL_WALLS_DISTANCE = 96;
export const VERTICAL_WALLS_DISTANCE_MOBILE = 24;
export const getVerticalWallsDistance = (isMobile: boolean) =>
  isMobile ? VERTICAL_WALLS_DISTANCE_MOBILE : VERTICAL_WALLS_DISTANCE;

export const HORIZONTAL_WALLS_DISTANCE = 96;
export const HORIZONTAL_WALLS_DISTANCE_MOBILE = 64;
export const getHorizontalWallsDistance = (isMobile: boolean) =>
  isMobile ? HORIZONTAL_WALLS_DISTANCE_MOBILE : HORIZONTAL_WALLS_DISTANCE;

export const CHIP_HEIGHT = 60;
export const CHIP_HEIGHT_MOBILE = 45;

export const CHIPS = (isMobile: boolean) => [
  {
    title: 'Code',
    color: '#45C358',
    textColor: '#FFFFFF',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? 100 : 140,
  },
  {
    title: 'React',
    color: '#45C358',
    textColor: '#FFFFFF',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? 100 : 140,
  },
  {
    title: 'GSAP',
    color: '#45C358',
    textColor: '#FFFFFF',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? 100 : 140,
  },
  {
    title: 'Development',
    color: '#45C358',
    textColor: '#FFFFFF',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? 160 : 200,
  },
  {
    title: 'Animations',
    color: '#45C358',
    textColor: '#FFFFFF',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? 160 : 200,
  },
  {
    title: 'Software',
    color: '#45C358',
    textColor: '#FFFFFF',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? 140 : 180,
  },
  {
    title: 'User Experience',
    color: '#505FEC',
    textColor: '#FFFFFF',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? 180 : 220,
  },
  {
    title: 'User Interface',
    color: '#505FEC',
    textColor: '#FFFFFF',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? 180 : 220,
  },
  {
    title: 'Motion Design',
    color: '#505FEC',
    textColor: '#FFFFFF',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? 180 : 220,
  },
  {
    title: 'Prototyping',
    color: '#505FEC',
    textColor: '#FFFFFF',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? 160 : 200,
  },
  {
    title: 'Technology',
    color: '#FFFFFF',
    textColor: '#505FEC',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? 140 : 180,
  },
  {
    title: 'Creativity',
    color: '#FFFFFF',
    textColor: '#505FEC',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? 140 : 180,
  },
  {
    title: 'Digital Design',
    color: '#FFFFFF',
    textColor: '#505FEC',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? 160 : 200,
  },
  {
    title: 'Experience',
    color: '#FFFFFF',
    textColor: '#505FEC',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? 140 : 180,
  },
  {
    title: 'Interaction',
    color: '#FFFFFF',
    textColor: '#505FEC',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? 140 : 180,
  },
];

export enum Icons {
  Code = 'code',
  Figma = 'figma',
  Mobe = 'mobe',
}

export const ICON_CHIPS = (isMobile: boolean) => [
  {
    icon: Icons.Code,
    color: '#000000',
    borderColor: '#505FEC',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
  },
  {
    icon: Icons.Figma,
    color: '#000000',
    borderColor: '#45C358',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
  },
  {
    icon: Icons.Mobe,
    color: '#505FEC',
    borderColor: '#505FEC',
    h: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
    w: isMobile ? CHIP_HEIGHT_MOBILE : CHIP_HEIGHT,
  },
];
