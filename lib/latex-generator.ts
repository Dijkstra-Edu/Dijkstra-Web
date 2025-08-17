// lib/latex-generator.ts
import { ResumeData } from '@/types/resume';

function escapeLatex(text: string): string {
  if (!text) return '';
  return text
    .replace(/\\/g, '\\textbackslash{}')
    .replace(/[{}]/g, '\\$&')
    .replace(/\$/g, '\\$')
    .replace(/[%#&_]/g, '\\$&')
    .replace(/\^/g, '\\textasciicircum{}')
    .replace(/~/g, '\\textasciitilde{}');
}

export function generateDeedyLatex(data: Partial<ResumeData>): string {
  const personalInfo = data.personalInfo || {};
  const experience = data.experience || [];
  const projects = data.projects || [];
  const education = data.education || [];
  const skills = data.skills || {};
  
  // Extract user data with defaults
  const name = escapeLatex((personalInfo as any).name || 'John Doe');
  const email = escapeLatex((personalInfo as any).email || 'john.doe@example.com');
  const phone = escapeLatex((personalInfo as any).phone || '111.111.1111');
  const phoneRaw = (personalInfo as any).phone?.replace(/[^\d]/g, '') || '11111111111';

  // Generate experience section
  const experienceSection = experience.length > 0 ? experience.map(exp => {
    const responsibilities = exp.description || 
      ['Developed a cloud-based solution to automate and enhance the engineering process for network installation using AWS and Python.'];
    
    return `\\runsubsection{${escapeLatex(exp.company || 'Company A')}}
\\descript{| ${escapeLatex(exp.position || 'Advanced Development Intern')} }
\\location{${escapeLatex(exp.startDate || 'May 2018')} – ${escapeLatex(exp.endDate || 'Aug 2018')} | ${escapeLatex(exp.location || 'Somewhere, XX')}}
\\vspace{\\topsep} % Hacky fix for awkward extra vertical space
\\begin{tightemize}
${responsibilities.map(resp => `\\item ${escapeLatex(resp)}`).join('\n')}
\\end{tightemize}
\\sectionsep`;
  }).join('\n\n') : `\\runsubsection{Company A}
\\descript{| Advanced Development Intern }
\\location{May 2018 – Aug 2018 | Somewhere, XX}
\\vspace{\\topsep} % Hacky fix for awkward extra vertical space
\\begin{tightemize}
\\item Developed a cloud-based solution to automate and enhance the engineering process for network installation using AWS and Python.
\\item Worked with other teams to create a system to collect and visualize telemetry data of network elements in real time using AWS, Python, and DOMO.
\\item Consulted with other teams to jump start cloud-technology adoption and solutions throughout the company.
\\item Contributed to initial planning for optics-alignment system utilizing AWS, reinforcement learning, and an IoT architecture.
\\end{tightemize}
\\sectionsep

\\runsubsection{Company B}
\\descript{| Intern }
\\location{Feb 2017 – Nov 2017 | Somewhere, XX}
\\begin{tightemize}
\\item Coordinated with multiple departments to lead a software product evaluation resulting in a fit-for-purpose verdict and provided a recommendation on moving forward.
\\item Organized meetings with the vendor to receive in-depth product information and answers to cross-departmental questions.
\\item Participated on the Web Development Taskforce to provide AngularJS sites to internal customers.
\\item Participated in an internal CodeJam to prototype a blockchain application for managing a model supply-chain.
\\item Worked with a team to plan executive visit and team-building exercise for 200 employees.
\\end{tightemize}
\\sectionsep

\\runsubsection{My University ITS}
\\descript{| Assistant Support Specialist }
\\location{Aug 2015 – Oct 2016 | Somewhere, XX}
\\begin{tightemize}
\\item Interacted with clients to assess their problems and implement a solution in an efficient, friendly manner.
\\item Prepared workstations and laptops for future use by company employees.
\\item Created scripts to automate common tasks and increase productivity.
\\end{tightemize}
\\sectionsep`;

  // Generate projects section
  const projectsSection = projects.length > 0 ? projects.map(project => {
    const descriptions = project.details || 
      ['Spearhead the development effort for the path-planning functionality of a team of three robots.'];
    
    return `\\runsubsection{${escapeLatex(project.name || 'Space Robotics Team')}}
\\descript{| ${escapeLatex(project.description || 'Path-Planning Lead')}}
\\location{${escapeLatex(project.startDate || 'Jan 2018')} – ${escapeLatex(project.endDate || 'Present')} | ${escapeLatex(project.location || 'Somewhere, XX')}}
\\begin{tightemize}
${descriptions.map(desc => `\\item ${escapeLatex(desc)}`).join('\n')}
\\end{tightemize}
\\sectionsep`;
  }).join('\n\n') : `\\runsubsection{Space Robotics Team}
\\descript{| Path-Planning Lead}
\\location{Jan 2018 – Present | Somewhere, XX}
\\begin{tightemize}
\\item Spearhead the development effort for the path-planning functionality of a team of three robots.
\\item ROS provides movement servers and the planning is being implemented in Python to allow for fully-autonomous operation.
\\end{tightemize}
\\sectionsep

\\runsubsection{Chit Chat}
\\descript{| Class Project for Distributed Client-Server Programming}
\\location{Jan 2018 – May 2018 | Somewhere, XX}
\\begin{tightemize}
\\item Lead the development of \\textbf{\\href{https://github.com/user/repo}{Chit Chat}}, an anonymous chat application created as a class project.
\\item Chit Chat provides real-time communication while utilizing a PHP backend and AngularJS frontend.
\\end{tightemize}
\\sectionsep`;

  // Generate education section
  const educationSection = education.length > 0 ? education.map(edu => {
    return `\\subsection{${escapeLatex(edu.institution || 'My University')}}
\\descript{${escapeLatex(edu.degree || 'Bachelor of Science in Computer Science with minors in Mathematics and Statistics')}}
\\location{${escapeLatex(edu.expectedGraduation || 'Expected Dec 2019')} | ${escapeLatex(edu.location || 'Somewhere, XX')}}
% College of Engineering \\\\
Dean's List (All Semesters) \\\\
\\location{ Cum. GPA: ${escapeLatex(edu.gpa || '4.0')} / 4.0}
\\sectionsep`;
  }).join('\n\n') : `\\subsection{My University}
\\descript{Bachelor of Science in Computer Science with minors in Mathematics and Statistics}
\\location{Expected Dec 2019 | Somewhere, XX}
% College of Engineering \\\\
Dean's List (All Semesters) \\\\
\\location{ Cum. GPA: 4.0 / 4.0}
\\sectionsep`;

  // Generate skills section
  const skillsSection = skills && Object.keys(skills).length > 0 ? 
    Object.entries(skills).map(([category, items]) => {
      if (category === 'programming' && typeof items === 'object') {
        const prog = items as any;
        let progSection = '';
        if (prog.expert?.length > 0) {
          progSection += `\\location{3+ years:}\n${prog.expert.join(' \\textbullet{} ')} \\\\\n`;
        }
        if (prog.intermediate?.length > 0) {
          progSection += `\\location{1+ years:}\n${prog.intermediate.join(' \\textbullet{} ')} \\\\\n`;
        }
        if (prog.beginner?.length > 0) {
          progSection += `\\location{0+ years:}\n${prog.beginner.join(' \\textbullet{} ')} \\\\\n`;
        }
        return `\\subsection{Programming}\n${progSection}\\sectionsep`;
      } else if (category === 'technology' && Array.isArray(items)) {
        return `\\subsection{Technology}\n${items.join(' \\textbullet{} ')} \\\\\n\\sectionsep`;
      }
      return '';
    }).join('\n\n') : `\\subsection{Programming}
\\location{3+ years:}
Python \\textbullet{} C/C++ \\\\
\\location{1+ years:}
PHP \\textbullet{} JavaScript \\\\
\\location{0+ years:}
Matlab \\textbullet{} R \\textbullet{} SAS \\\\
\\sectionsep

\\subsection{Technology}
Git/Github \\textbullet{} AWS \\textbullet{} Linux \\\\
UNIX \\textbullet{} Windows \\textbullet{} ROS \\\\
Artificial Intelligence \\textbullet{} Automation \\\\
\\sectionsep`;

  return `%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% Deedy - One Page Two Column Resume
% LaTeX Template
% Version 1.3 (22/9/2018)
%
% Original author:
% Debarghya Das (http://debarghyadas.com)
%
% Original repository:
% https://github.com/deedydas/Deedy-Resume
%
% v1.3 author:
% Zachary Taylor
%
% v1.3 repository:
% https://github.com/ZDTaylor/Deedy-Resume-Reversed
%
% IMPORTANT: THIS TEMPLATE NEEDS TO BE COMPILED WITH XeLaTeX
%
% This template uses several fonts not included with Windows/Linux by
% default. If you get compilation errors saying a font is missing, find the line
% on which the font is used and either change it to a font included with your
% operating system or comment the line out to use the default font.
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
% TODO:
% 1. Add various styling and section options and allow for multiple pages smoothly.
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
% CHANGELOG:
% v1.3:
% 1. Removed MacFonts version as I have no desire to maintain it nor access to macOS
% 2. Switched column ordering
% 3. Changed font styles/colors for easier human readability
% 4. Added, removed, and rearranged sections to reflect my own experience
% 5. Hid last updated
%
% v1.2:
% 1. Added publications in place of societies.
% 2. Collapsed a portion of education.
% 3. Fixed a bug with alignment of overflowing long last updated dates on the top right.
%
% v1.1:
% 1. Fixed several compilation bugs with \\renewcommand
% 2. Got Open-source fonts (Windows/Linux support)
% 3. Added Last Updated
% 4. Move Title styling into .sty
% 5. Commented .sty file.
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
% Known Issues:
% 1. Overflows onto second page if any column's contents are more than the vertical limit
% 2. Hacky space on the first bullet point on the second column.
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


\\documentclass[]{deedy-resume-reversed}
\\usepackage{fancyhdr}

\\pagestyle{fancy}
\\fancyhf{}

\\begin{document}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
%     LAST UPDATED DATE
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
% \\lastupdated

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
%     TITLE NAME
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
\\namesection{${name}}{ %\\urlstyle{same}\\href{http://example.com}{example.com}| \\href{http://example2.co}{example2.co}\\\\
\\href{mailto:${email}}{${email}} | \\href{tel:${phoneRaw}}{${phone}}
}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
%     COLUMN ONE
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\begin{minipage}[t]{0.60\\textwidth}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     EXPERIENCE
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\section{Experience}
${experienceSection}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     PROJECTS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\section{Projects}
${projectsSection}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     RESEARCH
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% \\section{Research}
% \\runsubsection{Cornell Robot Learning Lab}
% \\descript{| Researcher}
% \\location{Jan 2014 – Jan 2015 | Ithaca, NY}
% Worked with \\textbf{\\href{http://www.cs.cornell.edu/~ashesh/}{Ashesh Jain}} and \\textbf{\\href{http://www.cs.cornell.edu/~asaxena/}{Prof Ashutosh Saxena}} to create \\textbf{PlanIt}, a tool which  learns from large scale user preference feedback to plan robot trajectories in human environments.
% \\sectionsep

% \\runsubsection{Cornell Phonetics Lab}
% \\descript{| Head Undergraduate Researcher}
% \\location{Mar 2012 – May 2013 | Ithaca, NY}
% Led the development of \\textbf{QuickTongue}, the first ever breakthrough tongue-controlled game with \\textbf{\\href{http://conf.ling.cornell.edu/~tilsen/}{Prof Sam Tilsen}} to aid in Linguistics research.
% \\sectionsep

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     COMMUNITY SERVICE
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% \\section{Community Service}

% \\begin{tabular}{rll}
% 2013 -- 2018    & Tennessee     & St. Baldrick's Foundation\\\\
% 2014 -- 2017	& Tennessee     & American Cancer Society's Hope Lodge\\\\
% 2013 -- 2015    & Tennessee     & Habitat for Humanity\\\\
% 2011 -- 2015    & Tennessee     & Special Olympics\\\\
% \\end{tabular}
% \\sectionsep

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     SOCIETIES
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% \\section{Societies}

% \\begin{tabular}{rll}
% 2018 -- 2018    & National      & Association of Computing Machinery (ACM)\\\\
% 2017 -- 2019	& National      & Scrum Alliance Certified ScrumMaster\\\\
% 2015 -- 2019    & University    & Shackouls Honors College\\\\
% \\end{tabular}
% \\sectionsep

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     AWARDS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% \\section{Awards}
% \\begin{tabular}{rll}
% 2015        & 99\\textsuperscript{th} percentile & National Merit Scholarship Finalist\\\\
% \\end{tabular}
% \\sectionsep

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     PUBLICATIONS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

% \\section{Publications}
% \\renewcommand\\refname{\\vskip -1.5cm} % Couldn't get this working from the .cls file
% \\bibliographystyle{abbrv}
% \\bibliography{publications}
% \\nocite{*}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%
%     COLUMN TWO
%
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\end{minipage}
\\hfill
\\begin{minipage}[t]{0.33\\textwidth}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     EDUCATION
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\section{Education}

${educationSection}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     SKILLS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\section{Skills}
${skillsSection}

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     COURSEWORK
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\section{Coursework}
\\subsection{Graduate}
Analysis of Algorithms
\\sectionsep

\\subsection{Undergraduate}
Artificial Intelligence \\\\
{\\footnotesize \\textit{\\textbf{(Teaching Assistant) }}} \\\\
AI Robotics \\\\
Operating Systems I \\\\
Calculus I-IV \\\\
Data Analysis I \\\\
Introduction to Probability \\\\
\\sectionsep

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     Societies
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\section{Societies}
Association for Computing Machinery (ACM)\\\\
Scrum Alliance Certified ScrumMaster\\\\
University Honors College\\\\
National Merit Scholarship Finalist \\\\
\\sectionsep

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     LINKS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\section{Links}
Github:// \\href{https://github.com/}{\\bf JohnDoe} \\\\
LinkedIn://  \\href{https://www.linkedin.com/}{\\bf johndoe}
\\sectionsep

\\end{minipage}
\\end{document}`;
}