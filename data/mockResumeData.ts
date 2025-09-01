import { ResumeData } from '@/types/resume'; // Assuming this is your main type path

export const mockResumeData: ResumeData = {
  personalInfo: {
    name: "Jonathan Rufus Samuel",
    email: "jonathan.rufus@university.edu",
    phone: "9380033505",
    website: "jonathanrufus.dev",
    location: "San Francisco, CA"
  },
  experience: [
    {
      id: "1",
      company: "TechCorp Inc.",
      position: "Software Engineering Intern",
      startDate: "June 2024",
      endDate: "August 2024",
      location: "San Francisco, CA",
      description: [
        "Developed and maintained web applications using React and Node.js.",
        "Collaborated with senior developers on feature implementation and bug fixes.",
        "Participated in code reviews and agile development processes."
      ]
    },
    {
      id: "2",
      company: "University Research Lab",
      position: "Research Assistant",
      startDate: "January 2024",
      endDate: "Present",
      location: "San Francisco, CA",
      description: [
        "Conducting research on machine learning algorithms for natural language processing.",
        "Implementing and testing various ML models using Python and TensorFlow."
      ]
    }
  ],
  projects: [
    {
      id: "1",
      name: "E-Commerce Platform",
      description: [
        "Full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment integration. Built with modern web technologies and deployed on cloud infrastructure."
      ],
      location: "San Francisco, CA",
      startDate: "March 2024",
      endDate: "June 2024",
      details: [
        "Technologies used: React, Node.js, PostgreSQL, Stripe, AWS"
      ],
      link: "https://github.com/jonathanrufus/e-commerce-platform"
    },
    {
      id: "2",
      name: "AI Chat Assistant",
      description: [
        "Intelligent chatbot using natural language processing to provide customer support. Implements machine learning models for intent recognition and response generation."
      ],
      location: "San Francisco, CA",
      startDate: "July 2024",
      endDate: "Present",
      details: [
        "Technologies used: Python, TensorFlow, Flask, React, Docker"
      ],
      link: "https://github.com/jonathanrufus/ai-chat-assistant"
    },
     {
      id: "3",
      name: "E-Commerce Platform",
      description: [
        "Full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment integration. Built with modern web technologies and deployed on cloud infrastructure."
      ],
      location: "San Francisco, CA",
      startDate: "March 2024",
      endDate: "June 2024",
      details: [
        "Technologies used: React, Node.js, PostgreSQL, Stripe, AWS"
      ],
      link: "https://github.com/jonathanrufus/e-commerce-platform"
    },
    {
      id: "4",
      name: "AI Chat Assistant",
      description: [
        "Intelligent chatbot using natural language processing to provide customer support. Implements machine learning models for intent recognition and response generation."
      ],
      location: "San Francisco, CA",
      startDate: "July 2024",
      endDate: "Present",
      details: [
        "Technologies used: Python, TensorFlow, Flask, React, Docker"
      ],
      link: "https://github.com/jonathanrufus/ai-chat-assistant"
    },
  ],
  education: [
    {
      id: "1",
      institution: "University of California, Berkeley",
      degree: "Bachelor of Science in Computer Science",
      location: "San Francisco, CA",
      expectedGraduation: "May 2026",
      gpa: "3.8"
    },
    {
      id: "2",
      institution: "Community College of San Francisco",
      degree: "Associate of Science in Mathematics",
      location: "San Francisco, CA",
      expectedGraduation: "May 2022",
      gpa: "3.9"
    }
  ],
  skills: {
    programming: {
      expert: [
        "JavaScript"
      ],
      intermediate: [
        "Python",
        "TypeScript",
        "Java"
      ],
      beginner: [
        "C++",
        "Rust",
        "Go",
        "Groovy",
        "Zig"
      ]
    },
    technology: [
      "React",
      "Node.js",
      "Next.js",
      "Express.js",
      "TensorFlow",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "AWS",
      "Docker",
      "Git",
      "VS Code",
      "Figma",
      "Postman"
    ]
  },
  coursework: {
    graduate: [],
    undergraduate: [
      "Data Structures",
      "Algorithms",
      "Database Systems",
      "Machine Learning",
      "Software Engineering",
      "Computer Networks"
    ]
  },
  societies: [],
  links: {
    github: "jonathanrufus",
    linkedin: "jonathan-rufus-dev"
  }
};