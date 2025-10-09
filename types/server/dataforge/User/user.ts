// TypeScript types for User API endpoints matching database schema

export enum Rank {
  UNRANKED = "UNRANKED",
  IRON_1 = "IRON_1",
  IRON_2 = "IRON_2",
  IRON_3 = "IRON_3",
  BRONZE_1 = "BRONZE_1",
  BRONZE_2 = "BRONZE_2",
  BRONZE_3 = "BRONZE_3",
  SILVER_1 = "SILVER_1",
  SILVER_2 = "SILVER_2",
  SILVER_3 = "SILVER_3",
  GOLD_1 = "GOLD_1",
  GOLD_2 = "GOLD_2",
  GOLD_3 = "GOLD_3",
  PLATINUM_1 = "PLATINUM_1",
  PLATINUM_2 = "PLATINUM_2",
  PLATINUM_3 = "PLATINUM_3",
  DIAMOND_1 = "DIAMOND_1",
  DIAMOND_2 = "DIAMOND_2",
  DIAMOND_3 = "DIAMOND_3",
  EMERALD_1 = "EMERALD_1",
  EMERALD_2 = "EMERALD_2",
  EMERALD_3 = "EMERALD_3",
  LAPIS_1 = "LAPIS_1",
  LAPIS_2 = "LAPIS_2",
  LAPIS_3 = "LAPIS_3",
  QUARTZ_1 = "QUARTZ_1",
  QUARTZ_2 = "QUARTZ_2",
  QUARTZ_3 = "QUARTZ_3",
  AMETHYST_1 = "AMETHYST_1",
  AMETHYST_2 = "AMETHYST_2",
  AMETHYST_3 = "AMETHYST_3",
  OBSIDIAN = "OBSIDIAN",
}

export enum Domain {
  FRONTEND = "FRONTEND",
  BACKEND = "BACKEND",
  FULLSTACK = "FULLSTACK",
  SDE_TEST = "SDE_TEST",
  QUALITY_ASSURANCE = "QUALITY_ASSURANCE",
  TEST_AUTOMATION = "TEST_AUTOMATION",
  DEVOPS = "DEVOPS",
  MLOPS = "MLOPS",
  CI_CD = "CI_CD",
  CLOUD = "CLOUD",
  SITE_RELIABILITY = "SITE_RELIABILITY",
  SOFTWARE_INFRASTRUCTURE = "SOFTWARE_INFRASTRUCTURE",
  DISTRIBUTED_SYSTEMS = "DISTRIBUTED_SYSTEMS",
  EMBEDDED_IOT = "EMBEDDED_IOT",
  ML_ENGINEERING = "ML_ENGINEERING",
  ML_RESEARCH = "ML_RESEARCH",
  DATA_SCIENCE_ANALYSIS = "DATA_SCIENCE_ANALYSIS",
  DATA_ENGINEERING = "DATA_ENGINEERING",
  QUANT_ENGINEERING = "QUANT_ENGINEERING",
  ANDROID = "ANDROID",
  IOS = "IOS",
  CROSS_PLATFORM_MOBILE = "CROSS_PLATFORM_MOBILE",
  WINDOWS = "WINDOWS",
  MACOS = "MACOS",
  LINUX = "LINUX",
  CROSS_PLATFORM_PC = "CROSS_PLATFORM_PC",
  COMPUTER_SYSTEMS = "COMPUTER_SYSTEMS",
  COMPILERS = "COMPILERS",
  GAME_DEV = "GAME_DEV",
  APPLICATION_SECURITY = "APPLICATION_SECURITY",
  PLATFORM_SECURITY = "PLATFORM_SECURITY",
  DEVSECOPS = "DEVSECOPS",
  UI_UX = "UI_UX",
  PRODUCT_MANAGEMENT = "PRODUCT_MANAGEMENT",
  PRODUCT_ENGINEERING = "PRODUCT_ENGINEERING",
  TECHNICAL_WRITING = "TECHNICAL_WRITING",
  OTHER = "OTHER",
}

export enum Tools {
  JAVA = "JAVA",
  C = "C",
  CPP = "CPP",
  PYTHON = "PYTHON",
  CSHARP = "CSHARP",
  RUST = "RUST",
  JAVASCRIPT = "JAVASCRIPT",
  TYPESCRIPT = "TYPESCRIPT",
  GO = "GO",
  GROOVY = "GROOVY",
  RUBY = "RUBY",
  PHP = "PHP",
  SWIFT = "SWIFT",
  REACTJS = "REACTJS",
  ANGULARJS = "ANGULARJS",
  NEXTJS = "NEXTJS",
  VUEJS = "VUEJS",
  SVELTE = "SVELTE",
  NODEJS = "NODEJS",
  DJANGO = "DJANGO",
  FLASK = "FLASK",
  SPRINGBOOT = "SPRINGBOOT",
  GIT = "GIT",
  MARKDOWN = "MARKDOWN",
  DOCKER = "DOCKER",
  KUBERNETES = "KUBERNETES",
  HTML = "HTML",
  CSS = "CSS",
  POSTMAN = "POSTMAN",
  FIREBASE = "FIREBASE",
  SUPABASE = "SUPABASE",
  AWS = "AWS",
  AZURE = "AZURE",
  GCP = "GCP",
  HEROKU = "HEROKU",
  DIGITALOCEAN = "DIGITALOCEAN",
  VERCEL = "VERCEL",
  RAILWAY = "RAILWAY",
  NETLIFY = "NETLIFY",
  JENKINS = "JENKINS",
  REDIS = "REDIS",
  MONGODB = "MONGODB",
  MYSQL = "MYSQL",
  MSSQL = "MSSQL",
  POSTGRESQL = "POSTGRESQL",
  SQLITE = "SQLITE",
  ELASTICSEARCH = "ELASTICSEARCH",
  KAFKA = "KAFKA",
  RABBITMQ = "RABBITMQ",
  GRAPHQL = "GRAPHQL",
  COUCHDB = "COUCHDB",
  CASSANDRA = "CASSANDRA",
}

export interface OnboardUserRequest {
  // Required fields
  github_user_name: string;
  primary_specialization: Domain;
  secondary_specializations: Domain[];
  expected_salary_bucket: Rank;
  time_left: number;
  selectedTools: Tools[];
  dreamCompany: string;
  dreamRole: string;
  
  // Optional fields
  first_name?: string;
  middle_name?: string;
  last_name?: string;
  rank?: Rank;
  streak?: number;
}

export interface OnboardUserResponse {
  id: string;
  github_user_name: string;
  first_name: string | null;
  middle_name: string | null;
  last_name: string | null;
  rank: Rank;
  streak: number;
  primary_specialization: Domain;
  secondary_specializations: Domain[];
  expected_salary_bucket: Rank;
  time_left: number;
  selectedTools: Tools[];
  dreamCompany: string;
  dreamRole: string;
  onboarding_complete: boolean;
  data_loaded: boolean;
  created_at: string;
  updated_at: string;
}

export interface CheckOnboardingStatusResponse {
  onboarded: boolean;
  user_id: string | null;
}

