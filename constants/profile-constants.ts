// Profile-related constants

export const SALARY_RANGES = [
  { value: "UNRANKED", label: "₹0 L (Unranked)" },
  { value: "IRON_1", label: "₹0 L - ₹1 L (Iron 1)" },
  { value: "IRON_2", label: "₹1 L - ₹2 L (Iron 2)" },
  { value: "IRON_3", label: "₹2 L - ₹3 L (Iron 3)" },
  { value: "BRONZE_1", label: "₹3 L - ₹4 L (Bronze 1)" },
  { value: "BRONZE_2", label: "₹4 L - ₹5 L (Bronze 2)" },
  { value: "BRONZE_3", label: "₹5 L - ₹6 L (Bronze 3)" },
  { value: "SILVER_1", label: "₹6 L - ₹7 L (Silver 1)" },
  { value: "SILVER_2", label: "₹7 L - ₹8 L (Silver 2)" },
  { value: "SILVER_3", label: "₹8 L - ₹10 L (Silver 3)" },
  { value: "GOLD_1", label: "₹10 L - ₹12 L (Gold 1)" },
  { value: "GOLD_2", label: "₹12 L - ₹13 L (Gold 2)" },
  { value: "GOLD_3", label: "₹13 L - ₹14 L (Gold 3)" },
  { value: "PLATINUM_1", label: "₹14 L - ₹15 L (Platinum 1)" },
  { value: "PLATINUM_2", label: "₹15 L - ₹16 L (Platinum 2)" },
  { value: "PLATINUM_3", label: "₹16 L - ₹18 L (Platinum 3)" },
  { value: "DIAMOND_1", label: "₹18 L - ₹20 L (Diamond 1)" },
  { value: "DIAMOND_2", label: "₹20 L - ₹22 L (Diamond 2)" },
  { value: "DIAMOND_3", label: "₹22 L - ₹24 L (Diamond 3)" },
  { value: "EMERALD_1", label: "₹24 L - ₹26 L (Emerald 1)" },
  { value: "EMERALD_2", label: "₹26 L - ₹28 L (Emerald 2)" },
  { value: "EMERALD_3", label: "₹28 L - ₹30 L (Emerald 3)" },
  { value: "LAPIS_1", label: "₹30 L - ₹35 L (Lapis 1)" },
  { value: "LAPIS_2", label: "₹35 L - ₹40 L (Lapis 2)" },
  { value: "LAPIS_3", label: "₹40 L - ₹45 L (Lapis 3)" },
  { value: "QUARTZ_1", label: "₹45 L - ₹55 L (Quartz 1)" },
  { value: "QUARTZ_2", label: "₹55 L - ₹60 L (Quartz 2)" },
  { value: "QUARTZ_3", label: "₹60 L - ₹70 L (Quartz 3)" },
  { value: "AMETHYST_1", label: "₹70 L - ₹80 L (Amethyst 1)" },
  { value: "AMETHYST_2", label: "₹80 L - ₹90 L (Amethyst 2)" },
  { value: "AMETHYST_3", label: "₹90 L - ₹1 Cr (Amethyst 3)" },
  { value: "OBSIDIAN", label: "₹1 Cr+ (Obsidian)" }
] as const;

export const TIME_OPTIONS = [
  { value: 1, label: "1 month" },
  { value: 2, label: "2 months" },
  { value: 3, label: "3 months" },
  { value: 4, label: "4 months" },
  { value: 5, label: "5 months" },
  { value: 6, label: "6 months" },
  { value: 7, label: "7 months" },
  { value: 8, label: "8 months" },
  { value: 9, label: "9 months" },
  { value: 10, label: "10 months" },
  { value: 11, label: "11 months" },
  { value: 12, label: "12 months" },
  { value: 18, label: "18 months" },
  { value: 24, label: "24 months" },
  { value: 30, label: "30 months" },
  { value: 36, label: "36 months" },
  { value: 42, label: "42 months" },
  { value: 48, label: "48 months" },
  { value: 54, label: "54 months" },
  { value: 60, label: "60 months" },
  { value: 72, label: "72 months" },
  { value: 84, label: "84 months" },
  { value: 96, label: "96 months" },
  { value: 108, label: "108 months" },
  { value: 120, label: "120 months" },
] as const;

export const SKILL_CATEGORIES = [
  "Programming Languages",
  "Frameworks & Libraries", 
  "Databases",
  "Cloud & DevOps",
  "Tools & Technologies",
  "Design & UI/UX",
  "Testing",
  "Mobile Development",
  "Game Development",
  "Other"
] as const;

export const EDUCATION_LEVELS = [
  "High School",
  "Associate's Degree",
  "Bachelor's Degree", 
  "Master's Degree",
  "PhD",
  "Certificate",
  "Diploma",
  "Bootcamp",
  "Other"
] as const;

export const TEST_TYPES = [
  "GRE",
  "GMAT", 
  "TOEFL",
  "IELTS",
  "SAT",
  "ACT",
  "LSAT",
  "MCAT",
  "Other"
] as const;

export const MONTH_OPTIONS = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
] as const;

// Generate year options (current year - 70 to current year + 10)
const currentYear = new Date().getFullYear();
export const YEAR_OPTIONS = Array.from(
  { length: 81 },
  (_, i) => ({
    value: currentYear - 70 + i,
    label: (currentYear - 70 + i).toString(),
  })
).reverse(); // Most recent years first

// Type exports
export type SalaryRange = typeof SALARY_RANGES[number]['value'];
export type TimeOption = typeof TIME_OPTIONS[number]['value'];
export type SkillCategory = typeof SKILL_CATEGORIES[number];
export type EducationLevel = typeof EDUCATION_LEVELS[number];
export type TestType = typeof TEST_TYPES[number];
