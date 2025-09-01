// lib/latex-generator.ts
import { ResumeData } from "@/types/resume";

function escapeLatex(text: string): string {
  if (!text) return "";
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/[{}]/g, "\\$&")
    .replace(/\$/g, "\\$")
    .replace(/[%#&_]/g, "\\$&")
    .replace(/\^/g, "\\textasciicircum{}")
    .replace(/~/g, "\\textasciitilde{}");
}

export function generateRowBasedLatex(data: Partial<ResumeData>): string {
  const personalInfo = data.personalInfo || {
    name: "",
    email: "",
    phone: "",
    website: "",
    location: "",
  };
  const experience = data.experience || [];
  const projects = data.projects || [];
  const education = data.education || [];
  const skills = data.skills || {
    programming: { expert: [], intermediate: [], beginner: [] },
    technology: [],
  };
  const links = data.links || {};

  // Extract user data with defaults
  const name = escapeLatex(personalInfo.name || "John Doe");
  const email = escapeLatex(personalInfo.email || "youremail@yourdomain.com");
  const phone = escapeLatex(personalInfo.phone || "0541 999 99 99");
  const website = escapeLatex(personalInfo.website || "yourwebsite.com");
  const location = escapeLatex(personalInfo.location || "Your Location");
  const github = escapeLatex(links.github || "github.com/yourusername");
  const linkedin = escapeLatex(
    links.linkedin || "linkedin.com/in/yourusername"
  );

  // Generate education section
  const educationSection =
    education.length > 0
      ? education
          .map((edu) => {
            const graduationDate =
              edu.expectedGraduation || "Sept 2000 – May 2005";
            const institution = escapeLatex(
              edu.institution || "University of Pennsylvania"
            );
            const degree = escapeLatex(edu.degree || "BS in Computer Science");

            let eduContent = `\\begin{twocolentry}{
            ${graduationDate}
        }
            \\textbf{${institution}}, ${degree}\\end{twocolentry}`;

            if (edu.gpa || edu.honors || edu.coursework) {
              eduContent += `

        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}`;

              if (edu.gpa) {
                eduContent += `
                \\item GPA: ${escapeLatex(edu.gpa)}/4.0${
                  edu.link
                    ? ` (\\href{${edu.link}}{${escapeLatex(
                        edu.linkText || "transcript"
                      )}})`
                    : ""
                }`;
              }

              if (edu.coursework) {
                eduContent += `
                \\item \\textbf{Coursework:} ${escapeLatex(edu.coursework)}`;
              }

              if (edu.honors && edu.honors.length > 0) {
                eduContent += `
                \\item \\textbf{Honors:} ${edu.honors
                  .map((h) => escapeLatex(h))
                  .join(", ")}`;
              }

              eduContent += `
            \\end{highlights}
        \\end{onecolentry}`;
            }

            return eduContent;
          })
          .join("\n\n        \\vspace{0.2 cm}\n\n        ")
      : `\\begin{twocolentry}{
            Sept 2000 – May 2005
        }
            \\textbf{University of Pennsylvania}, BS in Computer Science\\end{twocolentry}

        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}
                \\item GPA: 3.9/4.0 (\\href{https://example.com}{a link to somewhere})
                \\item \\textbf{Coursework:} Computer Architecture, Comparison of Learning Algorithms, Computational Theory
            \\end{highlights}
        \\end{onecolentry}`;

  // Generate experience section
  const experienceSection =
    experience.length > 0
      ? experience
          .map((exp) => {
            const dateRange = `${exp.startDate || "June 2005"} – ${
              exp.endDate || "Aug 2007"
            }`;
            const company = escapeLatex(exp.company || "Apple");
            const position = escapeLatex(exp.position || "Software Engineer");
            const location = exp.location
              ? ` -- ${escapeLatex(exp.location)}`
              : " -- Cupertino, CA";

            let expContent = `\\begin{twocolentry}{
            ${dateRange}
        }
            \\textbf{${position}}, ${company}${location}\\end{twocolentry}`;

            if (exp.description && exp.description.length > 0) {
              expContent += `

        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}`;

              exp.description.forEach((desc) => {
                expContent += `
                \\item ${escapeLatex(desc)}`;
              });

              expContent += `
            \\end{highlights}
        \\end{onecolentry}`;
            }

            return expContent;
          })
          .join("\n\n        \\vspace{0.2 cm}\n\n        ")
      : `\\begin{twocolentry}{
            June 2005 – Aug 2007
        }
            \\textbf{Software Engineer}, Apple -- Cupertino, CA\\end{twocolentry}

        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}
                \\item Reduced time to render user buddy lists by 75\\% by implementing a prediction algorithm
                \\item Integrated iChat with Spotlight Search by creating a tool to extract metadata from saved chat transcripts and provide metadata to a system-wide search database
                \\item Redesigned chat file format and implemented backward compatibility for search
            \\end{highlights}
        \\end{onecolentry}


        \\vspace{0.2 cm}

        \\begin{twocolentry}{
            June 2003 – Aug 2003
        }
            \\textbf{Software Engineer Intern}, Microsoft -- Redmond, WA\\end{twocolentry}

        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}
                \\item Designed a UI for the VS open file switcher (Ctrl-Tab) and extended it to tool windows
                \\item Created a service to provide gradient across VS and VS add-ins, optimizing its performance via caching
                \\item Built an app to compute the similarity of all methods in a codebase, reducing the time from \\$\\mathcal{O}(n^2)\\$ to \\$\\mathcal{O}(n \\log n)\\$
                \\item Created a test case generation tool that creates random XML docs from XML Schema
                \\item Automated the extraction and processing of large datasets from legacy systems using SQL and Perl scripts
            \\end{highlights}
        \\end{onecolentry}`;

  // Generate projects section - FIXED TO BE DYNAMIC
  const projectsSection =
    projects.length > 0
      ? projects
          .map((project) => {
            const projectName = escapeLatex(project.name || "Unnamed Project");
            const link = project.link || "github.com/name/repo";

            // Use date range if both dates exist, otherwise use the link
            const dateOrLink =
              project.startDate && project.endDate
                ? `${project.startDate} – ${project.endDate}`
                : `\\href{${link}}{${link}}`;

            let projContent = `\\begin{twocolentry}{
            ${dateOrLink}
        }
            \\textbf{${projectName}}\\end{twocolentry}`;

            // Check if there are any details to display
            const hasDetails =
              (project.details && project.details.length > 0) ||
              (project.description && project.description.length > 0);

            if (hasDetails) {
              projContent += `

        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}`;

              // Add description items if they exist
              if (project.description && project.description.length > 0) {
                project.description.forEach((desc) => {
                  projContent += `
                \\item ${escapeLatex(desc)}`;
                });
              }

              // Add details items if they exist
              if (project.details && project.details.length > 0) {
                project.details.forEach((detail) => {
                  projContent += `
                \\item ${escapeLatex(detail)}`;
                });
              }

              projContent += `
            \\end{highlights}
        \\end{onecolentry}`;
            }

            return projContent;
          })
          .join("\n\n        \\vspace{0.2 cm}\n\n        ")
      : `\\begin{twocolentry}{
            \\href{https://github.com/sinaatalay/rendercv}{github.com/name/repo}
        }
            \\textbf{Multi-User Drawing Tool}\\end{twocolentry}

        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}
                \\item Developed an electronic classroom where multiple users can simultaneously view and draw on a "chalkboard" with each person's edits synchronized
                \\item Tools Used: C++, MFC
            \\end{highlights}
        \\end{onecolentry}


        \\vspace{0.2 cm}

        \\begin{twocolentry}{
            \\href{https://github.com/sinaatalay/rendercv}{github.com/name/repo}
        }
            \\textbf{Synchronized Desktop Calendar}\\end{twocolentry}

        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}
                \\item Developed a desktop calendar with globally shared and synchronized calendars, allowing users to schedule meetings with other users
                \\item Tools Used: C\\#, .NET, SQL, XML
            \\end{highlights}
        \\end{onecolentry}


        \\vspace{0.2 cm}

        \\begin{twocolentry}{
            2002
        }
            \\textbf{Custom Operating System}\\end{twocolentry}

        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}
                \\item Built a UNIX-style OS with a scheduler, file system, text editor, and calculator
                \\item Tools Used: C
            \\end{highlights}
        \\end{onecolentry}`;

  // Generate technologies section
  let technologiesSection = "";
  if (skills.programming || skills.technology) {
    if (
      skills.programming &&
      (skills.programming.expert?.length ||
        skills.programming.intermediate?.length ||
        skills.programming.beginner?.length)
    ) {
      const allLanguages = [
        ...(skills.programming.expert || []),
        ...(skills.programming.intermediate || []),
        ...(skills.programming.beginner || []),
      ];
      if (allLanguages.length > 0) {
        technologiesSection += `\\begin{onecolentry}
            \\textbf{Languages:} ${allLanguages
              .map((lang) => escapeLatex(lang))
              .join(", ")}
        \\end{onecolentry}`;
      }
    }

    if (skills.technology && skills.technology.length > 0) {
      if (technologiesSection)
        technologiesSection += "\n\n        \\vspace{0.2 cm}\n\n        ";
      technologiesSection += `\\begin{onecolentry}
            \\textbf{Technologies:} ${skills.technology
              .map((tech) => escapeLatex(tech))
              .join(", ")}
        \\end{onecolentry}`;
    }
  }

  if (!technologiesSection) {
    technologiesSection = `\\begin{onecolentry}
            \\textbf{Languages:} C++, C, Java, Objective-C, C\\#, SQL, JavaScript
        \\end{onecolentry}

        \\vspace{0.2 cm}

        \\begin{onecolentry}
            \\textbf{Technologies:} .NET, Microsoft SQL Server, XCode, Interface Builder
        \\end{onecolentry}`;
  }

  return `\\documentclass[10pt, letterpaper]{article}

% Packages:
\\usepackage[
    ignoreheadfoot, % set margins without considering header and footer
    top=2 cm, % seperation between body and page edge from the top
    bottom=2 cm, % seperation between body and page edge from the bottom
    left=2 cm, % seperation between body and page edge from the left
    right=2 cm, % seperation between body and page edge from the right
    footskip=1.0 cm, % seperation between body and footer
    % showframe % for debugging 
]{geometry} % for adjusting page geometry
\\usepackage{titlesec} % for customizing section titles
\\usepackage{tabularx} % for making tables with fixed width columns
\\usepackage{array} % tabularx requires this
\\usepackage[dvipsnames]{xcolor} % for coloring text
\\definecolor{primaryColor}{RGB}{0, 0, 0} % define primary color
\\usepackage{enumitem} % for customizing lists
\\usepackage{fontawesome5} % for using icons
\\usepackage{amsmath} % for math
\\usepackage[
    pdftitle={${name}'s CV},
    pdfauthor={${name}},
    pdfcreator={LaTeX with RenderCV},
    colorlinks=true,
    urlcolor=primaryColor
]{hyperref} % for links, metadata and bookmarks
\\usepackage[pscoord]{eso-pic} % for floating text on the page
\\usepackage{calc} % for calculating lengths
\\usepackage{bookmark} % for bookmarks
\\usepackage{lastpage} % for getting the total number of pages
\\usepackage{changepage} % for one column entries (adjustwidth environment)
\\usepackage{paracol} % for two and three column entries
\\usepackage{ifthen} % for conditional statements
\\usepackage{needspace} % for avoiding page brake right after the section title
\\usepackage{iftex} % check if engine is pdflatex, xetex or luatex

% Ensure that generate pdf is machine readable/ATS parsable:
\\ifPDFTeX
    \\input{glyphtounicode}
    \\pdfgentounicode=1
    \\usepackage[T1]{fontenc}
    \\usepackage[utf8]{inputenc}
    \\usepackage{lmodern}
\\fi

\\usepackage{charter}

% Some settings:
\\raggedright
\\AtBeginEnvironment{adjustwidth}{\\partopsep0pt} % remove space before adjustwidth environment
\\pagestyle{empty} % no header or footer
\\setcounter{secnumdepth}{0} % no section numbering
\\setlength{\\parindent}{0pt} % no indentation
\\setlength{\\topskip}{0pt} % no top skip
\\setlength{\\columnsep}{0.15cm} % set column seperation
\\pagenumbering{gobble} % no page numbering

\\titleformat{\\section}{\\needspace{4\\baselineskip}\\bfseries\\large}{}{0pt}{}[\\vspace{1pt}\\titlerule]

\\titlespacing{\\section}{
    % left space:
    -1pt
}{
    % top space:
    0.3 cm
}{
    % bottom space:
    0.2 cm
} % section title spacing

\\renewcommand\\labelitemi{$\\vcenter{\\hbox{\\small$\\bullet$}}$} % custom bullet points
\\newenvironment{highlights}{
    \\begin{itemize}[
        topsep=0.10 cm,
        parsep=0.10 cm,
        partopsep=0pt,
        itemsep=0pt,
        leftmargin=0 cm + 10pt
    ]
}{
    \\end{itemize}
} % new environment for highlights


\\newenvironment{highlightsforbulletentries}{
    \\begin{itemize}[
        topsep=0.10 cm,
        parsep=0.10 cm,
        partopsep=0pt,
        itemsep=0pt,
        leftmargin=10pt
    ]
}{
    \\end{itemize}
} % new environment for highlights for bullet entries

\\newenvironment{onecolentry}{
    \\begin{adjustwidth}{
        0 cm + 0.00001 cm
    }{
        0 cm + 0.00001 cm
    }
}{
    \\end{adjustwidth}
} % new environment for one column entries

\\newenvironment{twocolentry}[2][]{
    \\onecolentry
    \\def\\secondColumn{#2}
    \\setcolumnwidth{\\fill, 4.5 cm}
    \\begin{paracol}{2}
}{
    \\switchcolumn \\raggedleft \\secondColumn
    \\end{paracol}
    \\endonecolentry
} % new environment for two column entries

\\newenvironment{threecolentry}[3][]{
    \\onecolentry
    \\def\\thirdColumn{#3}
    \\setcolumnwidth{, \\fill, 4.5 cm}
    \\begin{paracol}{3}
    {\\raggedright #2} \\switchcolumn
}{
    \\switchcolumn \\raggedleft \\thirdColumn
    \\end{paracol}
    \\endonecolentry
} % new environment for three column entries

\\newenvironment{header}{
    \\setlength{\\topsep}{0pt}\\par\\kern\\topsep\\centering\\linespread{1.5}
}{
    \\par\\kern\\topsep
} % new environment for the header

\\newcommand{\\placelastupdatedtext}{% \\placetextbox{<horizontal pos>}{<vertical pos>}{<stuff>}
  \\AddToShipoutPictureFG*{% Add <stuff> to current page foreground
    \\put(
        \\LenToUnit{\\paperwidth-2 cm-0 cm+0.05cm},
        \\LenToUnit{\\paperheight-1.0 cm}
    ){\\vtop{{\\null}\\makebox[0pt][c]{
        \\small\\color{gray}\\textit{Last updated in September 2024}\\hspace{\\widthof{Last updated in September 2024}}
    }}}%
  }%
}%

% save the original href command in a new command:
\\let\\hrefWithoutArrow\\href

% new command for external links:


\\begin{document}
    \\newcommand{\\AND}{\\unskip
        \\cleaders\\copy\\ANDbox\\hskip\\wd\\ANDbox
        \\ignorespaces
    }
    \\newsavebox\\ANDbox
    \\sbox\\ANDbox{$|$}

    \\begin{header}
        \\fontsize{25 pt}{25 pt}\\selectfont ${name}

        \\vspace{5 pt}

        \\normalsize
        \\mbox{${location}}%
        \\kern 5.0 pt%
        \\AND%
        \\kern 5.0 pt%
        \\mbox{\\hrefWithoutArrow{mailto:${email}}{${email}}}%
        \\kern 5.0 pt%
        \\AND%
        \\kern 5.0 pt%
        \\mbox{\\hrefWithoutArrow{tel:+90-541-999-99-99}{${phone}}}%
        \\kern 5.0 pt%
        \\AND%
        \\kern 5.0 pt%
        \\mbox{\\hrefWithoutArrow{https://${website}}{${website}}}%
        \\kern 5.0 pt%
        \\AND%
        \\kern 5.0 pt%
        \\mbox{\\hrefWithoutArrow{https://${linkedin}}{${linkedin}}}%
        \\kern 5.0 pt%
        \\AND%
        \\kern 5.0 pt%
        \\mbox{\\hrefWithoutArrow{https://${github}}{${github}}}%
    \\end{header}

    \\vspace{5 pt - 0.3 cm}

    \\section{Education}

        ${educationSection}

    \\section{Experience}

        ${experienceSection}

    \\section{Projects}

        ${projectsSection}

    \\section{Technologies}

        ${technologiesSection}

\\end{document}`;
}

export function generateDeedyLatex(data: Partial<ResumeData>): string {
  const personalInfo = data.personalInfo || {};
  const experience = data.experience || [];
  const projects = data.projects || [];
  const education = data.education || [];
  const skills = data.skills || {};

  // Extract user data with defaults
  const name = escapeLatex((personalInfo as any).name || "John Doe");
  const email = escapeLatex(
    (personalInfo as any).email || "john.doe@example.com"
  );
  const phone = escapeLatex((personalInfo as any).phone || "111.111.1111");
  const phoneRaw =
    (personalInfo as any).phone?.replace(/[^\d]/g, "") || "11111111111";

  // Generate experience section
  const experienceSection =
    experience.length > 0
      ? experience
          .map((exp) => {
            const responsibilities = exp.description || [
              "Developed a cloud-based solution to automate and enhance the engineering process for network installation using AWS and Python.",
            ];

            return `\\runsubsection{${escapeLatex(exp.company || "Company A")}}
\\descript{| ${escapeLatex(exp.position || "Advanced Development Intern")} }
\\location{${escapeLatex(exp.startDate || "May 2018")} – ${escapeLatex(
              exp.endDate || "Aug 2018"
            )} | ${escapeLatex(exp.location || "Somewhere, XX")}}
\\vspace{\\topsep} % Hacky fix for awkward extra vertical space
\\begin{tightemize}
${responsibilities.map((resp) => `\\item ${escapeLatex(resp)}`).join("\n")}
\\end{tightemize}
\\sectionsep`;
          })
          .join("\n\n")
      : `\\runsubsection{Company A}
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
  const projectsSection =
    projects.length > 0
      ? projects
          .map((project) => {
            const descriptions =
              project.details && project.details.length > 0
                ? project.details
                : [
                    "Spearhead the development effort for the path-planning functionality of a team of three robots.",
                  ];

            return `\\runsubsection{${escapeLatex(
              project.name || "Space Robotics Team"
            )}}
\\descript{| ${escapeLatex(
              Array.isArray(project.description)
                ? project.description.join(" ")
                : project.description || "Path-Planning Lead"
            )}}
\\location{${escapeLatex(project.startDate || "Jan 2018")} – ${escapeLatex(
              project.endDate || "Present"
            )} | ${escapeLatex(project.location || "Somewhere, XX")}}
\\begin{tightemize}
${descriptions.map((desc) => `\\item ${escapeLatex(desc)}`).join("\n")}
\\end{tightemize}
\\sectionsep`;
          })
          .join("\n\n")
      : `\\runsubsection{Space Robotics Team}
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
  const educationSection =
    education.length > 0
      ? education
          .map((edu) => {
            return `\\subsection{${escapeLatex(
              edu.institution || "My University"
            )}}
\\descript{${escapeLatex(
              edu.degree ||
                "Bachelor of Science in Computer Science with minors in Mathematics and Statistics"
            )}}
\\location{${escapeLatex(
              edu.expectedGraduation || "Expected Dec 2019"
            )} | ${escapeLatex(edu.location || "Somewhere, XX")}}
% College of Engineering \\\\
Dean's List (All Semesters) \\\\
\\location{ Cum. GPA: ${escapeLatex(edu.gpa || "4.0")} / 4.0}
\\sectionsep`;
          })
          .join("\n\n")
      : `\\subsection{My University}
\\descript{Bachelor of Science in Computer Science with minors in Mathematics and Statistics}
\\location{Expected Dec 2019 | Somewhere, XX}
% College of Engineering \\\\
Dean's List (All Semesters) \\\\
\\location{ Cum. GPA: 4.0 / 4.0}
\\sectionsep`;

  // Generate skills section
  const skillsSection =
    skills && Object.keys(skills).length > 0
      ? Object.entries(skills)
          .map(([category, items]) => {
            if (category === "programming" && typeof items === "object") {
              const prog = items as any;
              let progSection = "";
              if (prog.expert?.length > 0) {
                progSection += `\\location{3+ years:}\n${prog.expert.join(
                  " \\textbullet{} "
                )} \\\\\n`;
              }
              if (prog.intermediate?.length > 0) {
                progSection += `\\location{1+ years:}\n${prog.intermediate.join(
                  " \\textbullet{} "
                )} \\\\\n`;
              }
              if (prog.beginner?.length > 0) {
                progSection += `\\location{0+ years:}\n${prog.beginner.join(
                  " \\textbullet{} "
                )} \\\\\n`;
              }
              return `\\subsection{Programming}\n${progSection}\\sectionsep`;
            } else if (category === "technology" && Array.isArray(items)) {
              return `\\subsection{Technology}\n${items.join(
                " \\textbullet{} "
              )} \\\\\n\\sectionsep`;
            }
            return "";
          })
          .join("\n\n")
      : `\\subsection{Programming}
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
${
  Array.isArray(data.societies) && data.societies.length > 0
    ? data.societies.map((s) => escapeLatex(s) + "\\").join("\n")
    : "None listed \\"
}
\\sectionsep

%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
%     LINKS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\section{Links}
${
  data.links && Object.keys(data.links).length > 0
    ? Object.entries(data.links)
        .map(([key, value]) => {
          let url = "";
          if (key === "github") url = `https://github.com/${value}`;
          else if (key === "linkedin")
            url = `https://www.linkedin.com/in/${value}`;
          else if (key === "website")
            url = value.startsWith("http") ? value : `https://${value}`;
          else url = value;
          return `${escapeLatex(
            key.charAt(0).toUpperCase() + key.slice(1)
          )}:// \\href{${url}}{\\bf ${escapeLatex(value)}} \\`;
        })
        .join("\n")
    : "None listed \\"
}
\\sectionsep

\\end{minipage}
\\end{document}`;
}
