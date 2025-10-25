// Enum constants for profile sections - centralized options for all enums
import type { 
    Rank, 
    Domain, 
    WorkLocationType, 
    EmploymentType, 
    Tools, 
    CertificationType, 
    Cause, 
    SchoolType, 
    Degree, 
    TestScoreType 
  } from '@/types/client/profile-section/profile-sections';
  
  // Rank options
  export const RANK_OPTIONS: { value: Rank; label: string }[] = [
    { value: "UNRANKED", label: "Unranked" },
    { value: "IRON_1", label: "Iron 1" },
    { value: "IRON_2", label: "Iron 2" },
    { value: "IRON_3", label: "Iron 3" },
    { value: "BRONZE_1", label: "Bronze 1" },
    { value: "BRONZE_2", label: "Bronze 2" },
    { value: "BRONZE_3", label: "Bronze 3" },
    { value: "SILVER_1", label: "Silver 1" },
    { value: "SILVER_2", label: "Silver 2" },
    { value: "SILVER_3", label: "Silver 3" },
    { value: "GOLD_1", label: "Gold 1" },
    { value: "GOLD_2", label: "Gold 2" },
    { value: "GOLD_3", label: "Gold 3" },
    { value: "PLATINUM_1", label: "Platinum 1" },
    { value: "PLATINUM_2", label: "Platinum 2" },
    { value: "PLATINUM_3", label: "Platinum 3" },
    { value: "DIAMOND_1", label: "Diamond 1" },
    { value: "DIAMOND_2", label: "Diamond 2" },
    { value: "DIAMOND_3", label: "Diamond 3" },
    { value: "EMERALD_1", label: "Emerald 1" },
    { value: "EMERALD_2", label: "Emerald 2" },
    { value: "EMERALD_3", label: "Emerald 3" },
    { value: "LAPIS_1", label: "Lapis 1" },
    { value: "LAPIS_2", label: "Lapis 2" },
    { value: "LAPIS_3", label: "Lapis 3" },
    { value: "QUARTZ_1", label: "Quartz 1" },
    { value: "QUARTZ_2", label: "Quartz 2" },
    { value: "QUARTZ_3", label: "Quartz 3" },
    { value: "SAPHIRE_1", label: "Sapphire 1" },
    { value: "SAPHIRE_2", label: "Sapphire 2" },
    { value: "SAPHIRE_3", label: "Sapphire 3" },
    { value: "OBSIDIAN", label: "Obsidian" },
  ];
  
  // Domain options
  export const DOMAIN_OPTIONS: { value: Domain; label: string }[] = [
    { value: "FRONTEND", label: "Frontend Development" },
    { value: "BACKEND", label: "Backend Development" },
    { value: "FULLSTACK", label: "Full Stack Development" },
    { value: "SDE_TEST", label: "Software Development Engineer in Test" },
    { value: "QUALITY_ASSURANCE", label: "Quality Assurance" },
    { value: "TEST_AUTOMATION", label: "Test Automation" },
    { value: "DEVOPS", label: "DevOps" },
    { value: "MLOPS", label: "MLOps" },
    { value: "CI_CD", label: "CI/CD" },
    { value: "CLOUD", label: "Cloud Computing" },
    { value: "SITE_RELIABILITY", label: "Site Reliability Engineering" },
    { value: "SOFTWARE_INFRASTRUCTURE", label: "Software Infrastructure" },
    { value: "DISTRIBUTED_SYSTEMS", label: "Distributed Systems" },
    { value: "EMBEDDED_IOT", label: "Embedded Systems & IoT" },
    { value: "ML_ENGINEERING", label: "Machine Learning Engineering" },
    { value: "ML_RESEARCH", label: "ML Research" },
    { value: "DATA_SCIENCE_ANALYSIS", label: "Data Science & Analysis" },
    { value: "DATA_ENGINEERING", label: "Data Engineering" },
    { value: "QUANT_ENGINEERING", label: "Quantitative Engineering" },
    { value: "ANDROID", label: "Android Development" },
    { value: "IOS", label: "iOS Development" },
    { value: "CROSS_PLATFORM_MOBILE", label: "Cross-Platform Mobile" },
    { value: "WINDOWS", label: "Windows Development" },
    { value: "MACOS", label: "macOS Development" },
    { value: "LINUX", label: "Linux Development" },
    { value: "CROSS_PLATFORM_PC", label: "Cross-Platform PC" },
    { value: "COMPUTER_SYSTEMS", label: "Computer Systems" },
    { value: "COMPILERS", label: "Compilers" },
    { value: "GAME_DEV", label: "Game Development" },
    { value: "APPLICATION_SECURITY", label: "Application Security" },
    { value: "PLATFORM_SECURITY", label: "Platform Security" },
    { value: "DEVSECOPS", label: "DevSecOps" },
    { value: "UI_UX", label: "UI/UX Design" },
    { value: "PRODUCT_MANAGEMENT", label: "Product Management" },
    { value: "PRODUCT_ENGINEERING", label: "Product Engineering" },
    { value: "TECHNICAL_WRITING", label: "Technical Writing" },
    { value: "OTHER", label: "Other" },
  ];
  
  // Work Location Type options
  export const WORK_LOCATION_TYPE_OPTIONS: { value: WorkLocationType; label: string }[] = [
    { value: "ON_SITE", label: "On-Site" },
    { value: "REMOTE", label: "Remote" },
    { value: "HYBRID", label: "Hybrid" },
  ];
  
  // Employment Type options
  export const EMPLOYMENT_TYPE_OPTIONS: { value: EmploymentType; label: string }[] = [
    { value: "FULL_TIME", label: "Full Time" },
    { value: "PART_TIME", label: "Part Time" },
    { value: "SELF_EMPLOYED", label: "Self Employed" },
    { value: "FREELANCE", label: "Freelance" },
    { value: "CONTRACT", label: "Contract" },
    { value: "INTERNSHIP", label: "Internship" },
    { value: "APPRENTICESHIP", label: "Apprenticeship" },
    { value: "SEASONAL", label: "Seasonal" },
  ];
  
  // Tools options
  export const TOOLS_OPTIONS: { value: Tools; label: string }[] = [
    { value: "JAVA", label: "Java" },
    { value: "C", label: "C" },
    { value: "CPP", label: "C++" },
    { value: "PYTHON", label: "Python" },
    { value: "CSHARP", label: "C#" },
    { value: "RUST", label: "Rust" },
    { value: "JAVASCRIPT", label: "JavaScript" },
    { value: "TYPESCRIPT", label: "TypeScript" },
    { value: "GO", label: "Go" },
    { value: "GROOVY", label: "Groovy" },
    { value: "RUBY", label: "Ruby" },
    { value: "PHP", label: "PHP" },
    { value: "SWIFT", label: "Swift" },
    { value: "REACTJS", label: "React.js" },
    { value: "ANGULARJS", label: "Angular.js" },
    { value: "NEXTJS", label: "Next.js" },
    { value: "VUEJS", label: "Vue.js" },
    { value: "SVELTE", label: "Svelte" },
    { value: "NODEJS", label: "Node.js" },
    { value: "DJANGO", label: "Django" },
    { value: "FLASK", label: "Flask" },
    { value: "SPRINGBOOT", label: "Spring Boot" },
    { value: "GIT", label: "Git" },
    { value: "MARKDOWN", label: "Markdown" },
    { value: "DOCKER", label: "Docker" },
    { value: "KUBERNETES", label: "Kubernetes" },
    { value: "HTML", label: "HTML" },
    { value: "CSS", label: "CSS" },
    { value: "POSTMAN", label: "Postman" },
    { value: "FIREBASE", label: "Firebase" },
    { value: "SUPABASE", label: "Supabase" },
    { value: "AWS", label: "AWS" },
    { value: "AZURE", label: "Azure" },
    { value: "GCP", label: "Google Cloud Platform" },
    { value: "HEROKU", label: "Heroku" },
    { value: "DIGITALOCEAN", label: "DigitalOcean" },
    { value: "VERCEL", label: "Vercel" },
    { value: "RAILWAY", label: "Railway" },
    { value: "NETLIFY", label: "Netlify" },
    { value: "JENKINS", label: "Jenkins" },
    { value: "REDIS", label: "Redis" },
    { value: "MONGODB", label: "MongoDB" },
    { value: "MYSQL", label: "MySQL" },
    { value: "MSSQL", label: "Microsoft SQL Server" },
    { value: "POSTGRESQL", label: "PostgreSQL" },
    { value: "SQLITE", label: "SQLite" },
    { value: "ELASTICSEARCH", label: "Elasticsearch" },
    { value: "KAFKA", label: "Apache Kafka" },
    { value: "RABBITMQ", label: "RabbitMQ" },
    { value: "GRAPHQL", label: "GraphQL" },
    { value: "COUCHDB", label: "CouchDB" },
    { value: "CASSANDRA", label: "Apache Cassandra" },
  ];
  
  // Certification Type options
  export const CERTIFICATION_TYPE_OPTIONS: { value: CertificationType; label: string }[] = [
    { value: "CERTIFICATE", label: "Certificate" },
    { value: "LICENSE", label: "License" },
    { value: "CERTIFICATION", label: "Certification" },
  ];
  
  // Cause options
  export const CAUSE_OPTIONS: { value: Cause; label: string }[] = [
    { value: "EDUCATION", label: "Education" },
    { value: "ENVIRONMENT", label: "Environment" },
    { value: "SOCIAL_CAUSES", label: "Social Causes" },
    { value: "HUMAN_RIGHT", label: "Human Rights" },
    { value: "SCIENCE_TECHNOLOGY", label: "Science & Technology" },
  ];
  
  // School Type options
  export const SCHOOL_TYPE_OPTIONS: { value: SchoolType; label: string }[] = [
    { value: "UNIVERSITY", label: "University" },
    { value: "COLLEGE", label: "College" },
    { value: "SCHOOL", label: "School" },
    { value: "COURSE", label: "Course" },
    { value: "BOOTCAMP", label: "Bootcamp" },
    { value: "OTHER", label: "Other" },
  ];
  
  // Degree options
  export const DEGREE_OPTIONS: { value: Degree; label: string }[] = [
    { value: "BTECH", label: "B.Tech" },
    { value: "BSC", label: "B.Sc" },
    { value: "BE", label: "B.E" },
    { value: "BCA", label: "BCA" },
    { value: "BSCHONS", label: "B.Sc (Hons)" },
    { value: "BDES", label: "B.Des" },
    { value: "BPHIL", label: "B.Phil" },
    { value: "MTECH", label: "M.Tech" },
    { value: "MSC", label: "M.Sc" },
    { value: "ME", label: "M.E" },
    { value: "MCA", label: "MCA" },
    { value: "MSR", label: "M.S.R" },
    { value: "MBA", label: "MBA" },
    { value: "MDES", label: "M.Des" },
    { value: "MPHIL", label: "M.Phil" },
    { value: "PGDM", label: "PGDM" },
    { value: "PHD", label: "PhD" },
    { value: "DENG", label: "D.Eng" },
  ];
  
  // Test Score Type options
  export const TEST_SCORE_TYPE_OPTIONS: { value: TestScoreType; label: string }[] = [
    { value: "GRE", label: "GRE" },
    { value: "GMAT", label: "GMAT" },
    { value: "CGPA", label: "CGPA" },
    { value: "TENTH", label: "10th Grade" },
    { value: "TWELFTH", label: "12th Grade" },
  ];
  
  // Helper function to get options by enum type
  export const getEnumOptions = <T extends string>(
    enumType: string,
    options: { value: T; label: string }[]
  ): { value: T; label: string }[] => {
    return options;
  };
  
  // Export all options as a single object for easy access
  export const ENUM_OPTIONS = {
    RANK: RANK_OPTIONS,
    DOMAIN: DOMAIN_OPTIONS,
    WORK_LOCATION_TYPE: WORK_LOCATION_TYPE_OPTIONS,
    EMPLOYMENT_TYPE: EMPLOYMENT_TYPE_OPTIONS,
    TOOLS: TOOLS_OPTIONS,
    CERTIFICATION_TYPE: CERTIFICATION_TYPE_OPTIONS,
    CAUSE: CAUSE_OPTIONS,
    SCHOOL_TYPE: SCHOOL_TYPE_OPTIONS,
    DEGREE: DEGREE_OPTIONS,
    TEST_SCORE_TYPE: TEST_SCORE_TYPE_OPTIONS,
  } as const;
  