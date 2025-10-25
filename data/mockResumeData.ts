import { UserProfileData } from '@/types/resume';

export const userProfileData: UserProfileData = {
  user: {
    id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    created_at: "2025-09-03T18:10:00Z",
    updated_at: "2025-09-03T18:10:00Z",
    github_user_name: "jane-dev",
    first_name: "Jane",
    middle_name: "M.",
    last_name: "Developer",
    rank: "GOLD",
    streak: 32
  },
  experience: {
    id: 1,
    created_at: "2025-09-03T17:54:00Z",
    updated_at: "2025-09-03T17:54:00Z",
    profile_id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    title: "Senior Software Engineer",
    employement_type: "Full-time",
    domain: [
      "Financial Technology",
      "Cloud Services",
      "Backend Development"
    ],
    company_name: "Innovate Solutions Inc.",
    currently_working: false,
    location: "f0e9d8c7-b6a5-4321-fedc-ba9876543210",
    location_type: "Hybrid",
    start_date: "2022-01-15",
    end_date: "2024-08-30",
    description_general: "Led the development of scalable microservices for a next-generation fintech platform, improving system performance and reliability.",
    description_detailed: "Architected and implemented a new event-driven backend using Golang and Kafka, which processed over 1 million transactions daily. Mentored junior engineers on best practices for coding, testing, and deployment. Collaborated with product managers and designers to translate business requirements into technical specifications. Reduced API response times by 40% through query optimization and caching strategies.",
    description_less: "Developed high-performance fintech microservices.",
    work_done: [
      "API Design & Development",
      "System Architecture",
      "Database Management",
      "Team Leadership & Mentorship",
      "CI/CD Pipeline Implementation"
    ],
    company_score: 4.7,
    time_spent_multiplier: 1.1,
    work_done_multiplier: 1.4,
    tools_used: [
      "Golang",
      "Python",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
      "AWS",
      "Kafka",
      "Prometheus"
    ]
  },
  education: [
    {
      id: 201,
      created_at: "2020-07-01T10:00:00Z",
      updated_at: "2020-07-01T10:00:00Z",
      profile_id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      school: "University of Technology",
      school_type: "University",
      degree: "Master of Science",
      field: "Computer Science",
      currently_studying: false,
      location: "b1c2d3e4-f5g6-7890-1234-567890fedcba",
      location_type: "On-site",
      start_date: "2018-09-01",
      end_date: "2020-06-15",
      description_general: "Specialized in machine learning and distributed systems, graduating with honors.",
      description_detailed: "Authored a thesis on 'Scalable Real-time Data Processing Architectures' which was later published. Served as a teaching assistant for undergraduate data structures and algorithms courses. Maintained a 3.9 GPA.",
      description_less: "M.S. in Computer Science with a focus on ML and distributed systems.",
      work_done: [
        "Thesis Research",
        "Graduate Coursework",
        "Teaching Assistant",
        "Published Research Paper"
      ],
      school_score_multiplier: 1.2,
      tools_used: [
        "Python",
        "TensorFlow",
        "PyTorch",
        "Java",
        "Hadoop",
        "Spark"
      ]
    }
  ],
  projects: [
    {
      id: 101,
      profile_id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      created_at: "2024-01-20T11:00:00Z",
      updated_at: "2025-08-15T16:30:00Z",
      name: "QuantumLeap Analytics",
      organization: "Open Source Initiative",
      owner: "jane-dev",
      private: false,
      github_stars: 1250,
      github_about: "An open-source library for advanced data analysis and visualization.",
      github_open_issues: 15,
      github_forks: 300,
      description: "QuantumLeap Analytics provides a comprehensive suite of tools for data scientists to perform complex statistical analysis, machine learning, and create interactive visualizations. Built with performance and scalability in mind.",
      domain: "Data Science",
      topics: [
        "data-visualization",
        "machine-learning",
        "statistics",
        "python"
      ],
      tools: [
        "Python",
        "Pandas",
        "NumPy",
        "Plotly",
        "scikit-learn"
      ],
      readme: true,
      license: true,
      landing_page: true,
      landing_page_link: "https://quantumleap.dev",
      docs_page: true,
      docs_page_link: "https://docs.quantumleap.dev",
      own_domain_name: true,
      domain_name: "quantumleap.dev",
      total_lines_contributed: 25000,
      improper_uploads: false,
      complexity_rating: 4.5,
      testing_framework_present: true,
      testing_framework: "Pytest"
    }
  ],
  links: {
    id: "c7d8e9f0-a1b2-3456-c7d8-e9f0a1b2c3d4",
    user_id: "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    created_at: "2025-09-03T18:15:00Z",
    updated_at: "2025-09-03T18:15:00Z",
    portfolio_link: "https://jane-developer.com",
    github_user_name: "jane-dev",
    github_link: "https://github.com/jane-dev",
    linkedin_user_name: "jane-m-developer",
    linkedin_link: "https://linkedin.com/in/jane-m-developer",
    leetcode_user_name: "jane_dev_codes",
    leetcode_link: "https://leetcode.com/jane_dev_codes",
    orcid_id: "0000-0001-2345-6789",
    orcid_link: "https://orcid.org/0000-0001-2345-6789"
  },
  organizations: [
    {
      id: "e8a7f6b5-c4d3-2109-8765-fedcba098765",
      created_at: "2025-09-04T05:20:00Z",
      updated_at: "2025-09-04T05:20:00Z",
      name: "Open Source Initiative",
      image: "https://opensource.org/logo.png",
      repo_link: "https://github.com/osi"
    }
  ]
};
