// lib/latex-generator.ts
import { UserProfileData } from "@/types/resume";

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

export function generateRowBasedLatex(data: Partial<UserProfileData>): string {
  const user = data.user || {
    id: "",
    created_at: "",
    updated_at: "",
    github_user_name: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    rank: "",
    streak: 0
  };
  const experience = data.experience;
  const projects = data.projects || [];
  const education = data.education || [];
  const links = data.links || {};

  // Extract user data with defaults
  const fullName = `${user.first_name || ""} ${user.middle_name || ""} ${user.last_name || ""}`.trim();
  const name = escapeLatex(fullName || "John Doe");
  const email = escapeLatex((links as any).linkedin_user_name ? `${(links as any).linkedin_user_name}@example.com` : "youremail@yourdomain.com");
  const phone = escapeLatex("0541 999 99 99"); // Default phone as it's not in the new structure
  const website = escapeLatex((links as any).portfolio_link || "yourwebsite.com");
  const location = escapeLatex("Your Location"); // Default location as it's not directly in the new structure
  const github = escapeLatex((links as any).github_link || "github.com/yourusername");
  const linkedin = escapeLatex((links as any).linkedin_link || "linkedin.com/in/yourusername");

  // Generate education section
  const educationSection =
    education.length > 0
      ? education
          .map((edu) => {
            const graduationDate = `${edu.start_date || "Sept 2000"} – ${edu.end_date || "May 2005"}`;
            const institution = escapeLatex(edu.school || "University of Pennsylvania");
            const degree = escapeLatex(edu.degree || "BS in Computer Science");

            let eduContent = `\\begin{twocolentry}{
            ${graduationDate}
        }
            \\textbf{${institution}}, ${degree}\\end{twocolentry}`;

            if (edu.description_general) {
              eduContent += `

        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}
                \\item ${escapeLatex(edu.description_general)}
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
    experience
      ? (() => {
          const dateRange = `${experience.start_date || "June 2005"} – ${
            experience.end_date || "Aug 2007"
          }`;
          const company = escapeLatex(experience.company_name || "Apple");
          const position = escapeLatex(experience.title || "Software Engineer");
          const location = experience.location
            ? ` -- ${escapeLatex(experience.location)}`
            : " -- Cupertino, CA";

          let expContent = `\\begin{twocolentry}{
            ${dateRange}
        }
            \\textbf{${position}}, ${company}${location}\\end{twocolentry}`;

          if (experience.work_done && experience.work_done.length > 0) {
            expContent += `

        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}`;

            experience.work_done.forEach((desc) => {
              expContent += `
                \\item ${escapeLatex(desc)}`;
            });

            expContent += `
            \\end{highlights}
        \\end{onecolentry}`;
          }

          return expContent;
        })()
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
        \\end{onecolentry}`;

  // Generate projects section
  const projectsSection =
    projects.length > 0
      ? projects
          .map((project) => {
            const projectName = escapeLatex(project.name || "Unnamed Project");
            const link = project.landing_page_link || "github.com/name/repo";

            // Use date range from created_at and updated_at
            const dateOrLink = `\\href{${link}}{${link}}`;

            let projContent = `\\begin{twocolentry}{
            ${dateOrLink}
        }
            \\textbf{${projectName}}\\end{twocolentry}`;

            // Check if there are any details to display
            const hasDetails = project.description || (project.topics && project.topics.length > 0);

            if (hasDetails) {
              projContent += `

        \\vspace{0.10 cm}
        \\begin{onecolentry}
            \\begin{highlights}`;

              // Add description if it exists
              if (project.description) {
                projContent += `
                \\item ${escapeLatex(project.description)}`;
              }

              // Add topics if they exist
              if (project.topics && project.topics.length > 0) {
                project.topics.forEach((topic) => {
                  projContent += `
                \\item ${escapeLatex(topic)}`;
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
        \\end{onecolentry}`;

  // Generate technologies section
  let technologiesSection = "";
  
  // Add tools from experience
  if (experience && experience.tools_used && experience.tools_used.length > 0) {
    technologiesSection += `\\begin{onecolentry}
            \\textbf{Tools:} ${experience.tools_used
              .map((tool) => escapeLatex(tool))
              .join(", ")}
        \\end{onecolentry}`;
  }

  // Add tools from projects
  if (projects.length > 0 && projects[0].tools && projects[0].tools.length > 0) {
    if (technologiesSection) {
      technologiesSection += "\n\n        \\vspace{0.2 cm}\n\n        ";
    }
    technologiesSection += `\\begin{onecolentry}
            \\textbf{Project Technologies:} ${projects[0].tools
              .map((tech) => escapeLatex(tech))
              .join(", ")}
        \\end{onecolentry}`;
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

export function generateDeedyLatex(data: Partial<UserProfileData>): string {
  const user = data.user || {
    id: "",
    created_at: "",
    updated_at: "",
    github_user_name: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    rank: "",
    streak: 0
  };
  const experience = data.experience;
  const projects = data.projects || [];
  const education = data.education || [];
  const links = data.links || {};

  // Extract user data with defaults
  const fullName = `${user.first_name || ""} ${user.middle_name || ""} ${user.last_name || ""}`.trim();
  const name = escapeLatex(fullName || "John Doe");
  const email = escapeLatex((links as any).linkedin_user_name ? `${(links as any).linkedin_user_name}@example.com` : "john.doe@example.com");
  const phone = escapeLatex("111.111.1111"); // Default phone as it's not in the new structure
  const phoneRaw = "11111111111"; // Default phone as it's not in the new structure

  // Generate experience section
  const experienceSection =
    experience
      ? (() => {
          const responsibilities = experience.work_done || [
            "Developed a cloud-based solution to automate and enhance the engineering process for network installation using AWS and Python.",
          ];

          return `\\runsubsection{${escapeLatex(experience.company_name || "Company A")}}
\\descript{| ${escapeLatex(experience.title || "Advanced Development Intern")} }
\\location{${escapeLatex(experience.start_date || "May 2018")} – ${escapeLatex(
            experience.end_date || "Aug 2018"
          )} | ${escapeLatex(experience.location || "Somewhere, XX")}}
\\vspace{\\topsep} % Hacky fix for awkward extra vertical space
\\begin{tightemize}
${responsibilities.map((resp) => `\\item ${escapeLatex(resp)}`).join("\n")}
\\end{tightemize}
\\sectionsep`;
        })()
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
\\sectionsep`;

  // Generate projects section
  const projectsSection =
    projects.length > 0
      ? projects
          .map((project) => {
            const descriptions = project.topics || [
              "Spearhead the development effort for the path-planning functionality of a team of three robots.",
            ];

            return `\\runsubsection{${escapeLatex(project.name || "Space Robotics Team")}}
\\descript{| ${escapeLatex(project.description || "Path-Planning Lead")}}
\\location{${escapeLatex(project.created_at.split('T')[0] || "Jan 2018")} – ${escapeLatex(
              project.updated_at.split('T')[0] || "Present"
            )} | ${escapeLatex(project.organization || "Somewhere, XX")}}
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
\\sectionsep`;

  // Generate education section
  const educationSection =
    education.length > 0
      ? education
          .map((edu) => {
            return `\\subsection{${escapeLatex(edu.school || "My University")}}
\\descript{${escapeLatex(
              edu.degree ? `${edu.degree} in ${edu.field}` : "Bachelor of Science in Computer Science with minors in Mathematics and Statistics"
            )}}
\\location{${escapeLatex(
              edu.end_date || "Expected Dec 2019"
            )} | ${escapeLatex(edu.location || "Somewhere, XX")}}
% College of Engineering \\\\
${edu.description_general ? escapeLatex(edu.description_general) : "Dean's List (All Semesters)"} \\\\
\\location{ Cum. GPA: 3.9 / 4.0}
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
  let skillsSection = "";
  
  // Add tools from experience
  if (experience && experience.tools_used && experience.tools_used.length > 0) {
    skillsSection += `\\subsection{Tools}\n${experience.tools_used.join(" \\textbullet{} ")} \\\\\n\\sectionsep`;
  }

  // Add tools from projects
  if (projects.length > 0 && projects[0].tools && projects[0].tools.length > 0) {
    skillsSection += `\n\n\\subsection{Project Technologies}\n${projects[0].tools.join(" \\textbullet{} ")} \\\\\n\\sectionsep`;
  }

  if (!skillsSection) {
    skillsSection = `\\subsection{Programming}
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
  }

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
%     LINKS
%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

\\section{Links}
${
  links && Object.keys(links).length > 0
    ? Object.entries(links)
        .filter(([key, value]) => value && key !== 'id' && key !== 'user_id' && key !== 'created_at' && key !== 'updated_at')
        .map(([key, value]) => {
          const displayKey = key.replace(/_link$/, '').replace(/_/g, ' ');
          const displayName = key.replace(/_link$/, '_user_name');
          const displayValue = links[displayName as keyof typeof links] || value;
          
          return `${escapeLatex(
            displayKey.charAt(0).toUpperCase() + displayKey.slice(1)
          )}:// \\href{${value}}{\\bf ${escapeLatex(displayValue as string)}} \\`;
        })
        .join("\n")
    : "None listed \\"
}
\\sectionsep

\\end{minipage}
\\end{document}`;
}
