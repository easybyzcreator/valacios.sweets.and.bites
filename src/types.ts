export type PageView = 'home' | 'sobre' | 'produtos' | 'parceiro' | 'onde-encontrar' | 'contato' | 'admin';

export type Language = 'PT' | 'EN' | 'ES';

export interface HeaderSlide {
  id: number;
  scriptHeading: string;
  subtitle: string;
  scriptColor?: string;
  subtitleColor?: string;
  bgImage: string;
  buttonText: string;
  buttonTarget: PageView;
  align?: 'left' | 'center' | 'right';
}

export interface NutritionalFact {
  serving100g: string;
  serving50g: string;
  vdPercent: string;
  energy: { q100: string; q50: string; vd: string };
  carbs: { q100: string; q50: string; vd: string };
  sugars: { q100: string; q50: string; vd: string };
  addedSugars?: { q100: string; q50: string; vd: string };
  proteins: { q100: string; q50: string; vd: string };
  totalFat: { q100: string; q50: string; vd: string };
  saturatedFat: { q100: string; q50: string; vd: string };
  transFat: { q100: string; q50: string; vd: string };
  fiber: { q100: string; q50: string; vd: string };
  sodium: { q100: string; q50: string; vd: string };
}

export interface ProductItem {
  id: string;
  name: string;
  subname: string;
  badgeLabel: string;
  badgeColor: string;
  weight: string;
  unitsApprox: string;
  description: string;
  filling?: string;
  accentColor: string;
  ingredients: string;
  allergens: string;
  prepTimeMinutes: number;
  featured?: boolean;
  imageUrl?: string;
  backImageUrl?: string;
  prepIconsUrl?: string;
  nutritionImageUrl?: string;
  packageGraphic: {
    badgeBg: string;
    badgeText: string;
    badgeLabel: string;
    highlightDetail: string;
  };
  nutrition: NutritionalFact;
}

export interface DifferentialItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  doodleRays?: boolean;
  subtitle?: string;
  iconName?: 'heart' | 'leaf' | 'sparkles' | 'award';
  accentColor?: string;
}
