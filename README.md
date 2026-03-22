<p align="center">
  <a href="https://dijkstra-edu.github.io/Dijkstra-Web/">
    <img src="https://github.com/Dijkstra-Edu/.github/assets/70965472/bee010e1-3ea1-45a1-abc8-f73b0dd9fcac" alt="For Students, By Students" width="500" />
  </a>
</p>

<h1 align="center">Dijkstra - One Stop Solution for Every Aspiring CS Student</h1>

<p align="center">
  <a href="https://dijkstra-edu.github.io/Dijkstra-Web/">Dijkstra.org</a> •
  <a href="#">Forum</a> •
  <a href="#">Docs</a> •
  <a href="https://forms.gle/rAeb5ki3x7LSWU3FA">Contributing</a> •
  <a href="https://www.linkedin.com/company/dijkstra-edu/">LinkedIn</a> •
  <a href="https://discord.com/invite/Ct82yF3KAU">Discord</a>
</p>

<p align="center">
  <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/Dijkstra-Edu/Dijkstra-Web?style=social" />
  <img alt="GitHub forks" src="https://img.shields.io/github/forks/Dijkstra-Edu/Dijkstra-Web?style=social" />
  <img alt="npm version" src="https://img.shields.io/badge/npm-≥9.0.0-CB3837?logo=npm" />
  <img alt="node version" src="https://img.shields.io/badge/node-≥18.0.0-339933?logo=node.js" />
  <img alt="Website" src="https://img.shields.io/website?url=https%3A%2F%2Fdijkstra-edu.github.io%2FDijkstra-Web%2F" />
  <img alt="GitHub last commit (branch)" src="https://img.shields.io/github/last-commit/Dijkstra-Edu/Dijkstra-Web/master" />
  <img alt="GitHub contributors" src="https://img.shields.io/github/contributors/Dijkstra-Edu/Dijkstra-Web" />
  <img alt="license" src="https://img.shields.io/github/license/Dijkstra-Edu/Dijkstra-Web" />
  <img alt="GitHub issues" src="https://img.shields.io/github/issues/Dijkstra-Edu/Dijkstra-Web" />
  <img alt="GitHub pull requests" src="https://img.shields.io/github/issues-pr/Dijkstra-Edu/Dijkstra-Web" />
  <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/Dijkstra-Edu/Dijkstra-Web" />
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Dijkstra-Edu/Dijkstra-Web" />
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Dijkstra-Edu/Dijkstra-Web" />
  <img alt="GitHub commit activity" src="https://img.shields.io/github/commit-activity/m/Dijkstra-Edu/Dijkstra-Web" />
</p>

---

## 🚀 About Dijkstra

**Dijkstra** is a community-driven, open-source platform aimed at bridging the skill and opportunity gap for students from Tier-2 and Tier-3 colleges in India. We empower Computer Science enthusiasts to become industry-ready through:

- 🎓 A student-led open-source community fostering mentorship, learning, and growth.
- 📚 Curated paths for mastering CS fundamentals, development skills, and soft skills.
- 💻 Real-world project experience via collaborative app and platform development.

Whether you're interested in learning, contributing, or just exploring, **Dijkstra** is the platform for you.

> _"Run by students, for students."_  

---

## ✨ Features

- 📊 **Visibility**  
  Track your progress across all platforms — GitHub, LinkedIn, LeetCode, Codeforces, etc. See yourself level up in terms of skills, validated by **Proof of Work**, to prepare for jobs around the world.

- 🛠️ **Develop Skills**  
  Improve your DSA, Software Engineering, and Systems Design holistically through a variety of tasks within Dijkstra. Whether it’s code contributions, writing articles, sharing new approaches, or leading projects — it’s all about developing into a **globally competitive software developer**.

- ✅ **Proof of Work**  
  Dijkstra is your platform to track overall developer growth, tied to visible outputs (GitHub commits, LeetCode stats, LinkedIn activity). The goal is to **gamify your growth** and help you plan your journey effectively.

- 🎯 **Killing Two Birds with One Stone**  
  Projects aren’t just for GitHub. A good project could become a conference paper. A solid LinkedIn post could be added to your resume. Dijkstra helps **connect the dots** to maximize your output with smarter planning.

- 🌍 **Community**  
  Give back by writing articles, contributing code, and helping others — in turn, boosting your credibility and visibility in the tech ecosystem.

- 🔁 **One Thing Leads to Another**  
  Every action you take — internships, articles, papers — creates **leverage** for future opportunities. Dijkstra helps make sure your efforts lead somewhere bigger and better.

---

## 🏁 Getting Started

> 🚧 This section is focused on **Onboarding** and is currently a work in progress.  
> For now, use the links below to get started:

- 🔐 [Login](http://localhost:3000/login)
- 🆕 [Onboarding (Sign Up)](http://localhost:3000/login)

**Authentication depends on PostgreSQL** (Better Auth). Follow [Development Setup](#development-setup) to configure `DIJKSTRA_WEB_DB_URL`, run `npm run auth:migrate`, and set the other environment variables before sign-in will work locally.

More detailed onboarding guides, examples, and templates will be added soon. Stay tuned!

# Development Setup

## Prerequisites

- Node.js (v18.14.2 or higher)  
- npm, yarn, or pnpm  
- **PostgreSQL** — required for [Better Auth](https://www.better-auth.com/). The app stores users, sessions, and OAuth account links in the database (see `lib/db/postgres.ts` and `lib/auth/auth.ts`). A managed service such as [Neon](https://neon.tech/) works well for local development and deployment.  
- GitHub account (for OAuth authentication)  

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Dijkstra-Edu/Dijkstra-Web.git
cd Dijkstra-Web
```

### 2. Install Dependencies

```bash
# using npm
npm install

# or using yarn
yarn install

# or using pnpm
pnpm install

# or using bun
bun install
```

### 3. Provision a PostgreSQL database

Create an empty PostgreSQL database you can connect to with a standard connection string (TLS is typical for hosted providers).

- **Neon (recommended for quick setup):** create a project, create a database, and copy the **connection string** from the Neon dashboard.  
- **Docker / local Postgres:** create a role and database, then build a URL such as `postgresql://USER:PASSWORD@localhost:5432/dijkstra_web`.

You will attach this URL to the app in the next step.

### 4. Environment variables

Create a `.env.local` file in the project root (Next.js loads it automatically). At minimum, authentication requires:

| Variable | Purpose |
|----------|---------|
| `DIJKSTRA_WEB_DB_URL` | PostgreSQL connection string used by Better Auth (`lib/db/postgres.ts`). **Required** — the app will not start without it. |
| `BETTER_AUTH_SECRET` | Secret for signing cookies and tokens. Use a long random string in development; use a secure value in production. |
| `BETTER_AUTH_URL` | Public origin of this app (e.g. `http://localhost:3000` locally, or your deployed URL). Must match how users reach the site. |
| `GITHUB_APP_CLIENT_ID` / `GITHUB_APP_CLIENT_SECRET` | GitHub App OAuth (see `lib/auth/auth.ts`). |
| `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET` | LinkedIn OAuth. |
| `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET` | Discord OAuth. |

> ⚠️ OAuth credential names and optional variables may evolve; check `lib/auth/auth.ts` for the authoritative list of `requireEnv` keys.

Example fragment for local development:

```env
DIJKSTRA_WEB_DB_URL=postgresql://USER:PASSWORD@HOST/DBNAME?sslmode=require
BETTER_AUTH_SECRET=your-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
```

### 5. Database migrations (Better Auth)

Apply the Better Auth schema to your database **once per environment** (new database, new machine, or after pulling changes that alter auth tables). The CLI reads your config at `lib/auth/auth.ts` and uses the same `DIJKSTRA_WEB_DB_URL` as the running app.

From the project root (with `.env.local` present so `DIJKSTRA_WEB_DB_URL` is available):

```bash
npm run auth:migrate
```

This runs `npx @better-auth/cli@latest migrate --config ./lib/auth/auth.ts`. You can also invoke the CLI directly; see the [Better Auth CLI](https://www.better-auth.com/docs/concepts/cli) documentation for flags such as `--yes` to skip confirmation when automating.

If the CLI does not pick up environment variables, export `DIJKSTRA_WEB_DB_URL` in your shell before running the command, or use a tool that loads `.env.local` explicitly.

### 6. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If you change `.env.local`, database settings, or auth configuration, stop the dev server (Ctrl+C) and run `npm run dev` again.

---

## 📌 TaskList (Things to do)

> 🛠️ This section is still being built. For now, tasks are organized into **three fixed phases only**.

There's a LOT to be done. Feel free to pick up a task from this list, or try tackling issues from the [Issues](https://github.com/Dijkstra-Edu/Dijkstra-Web/issues) section. You're welcome to suggest any features, fixes, or improvements — your ideas shape Dijkstra and its potential to impact thousands of students around the world!


####  Phase 1: Kickoff & Core Features

#### Phase 2: Open Source Launch & Admin Dashboard

#### Phase 3: Advanced Features & Community



##  Contributing Guidelines

We welcome contributions from everyone, whether you're a first-time contributor or an experienced developer! Follow these steps to contribute effectively:

### 🧠 Before You Start

- Check the tasklist and [Issues](https://github.com/Dijkstra-Edu/Dijkstra-Web/issues) to pick something you'd like to work on.
- Join our [Discord](https://discord.com/invite/Ct82yF3KAU) to connect with the team and ask questions.
- Read this guide carefully to ensure smooth collaboration.

### 🛠️ Local Development Setup

> **Refer to the [Development Setup](#development-setup) section above for detailed instructions** (including PostgreSQL, `.env.local`, and `npm run auth:migrate`).

Make sure you’re using:

- **Node.js ≥ v18.0.0**
- **npm ≥ v9.0.0**
- A running **PostgreSQL** database reachable via `DIJKSTRA_WEB_DB_URL`, with Better Auth tables applied via the migration step

### 🗃️ Working on a Feature or Bug

1. **Fork the repository**.
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Dijkstra-Web.git
   cd Dijkstra-Web
   ```
3. **Create a new branch** for your feature/fix:
   ```bash
   git checkout -b feat/your-feature-name
   ```
4. **Make your changes** locally.
5. **Test everything** before committing:
   - Lint your code.
   - Ensure your feature works as expected.
6. **Commit with a meaningful message**:
   ```bash
   git commit -m "feat: added feature XYZ"
   ```
7. **Push your branch** to your fork:
   ```bash
   git push origin feat/your-feature-name
   ```
8. **Open a Pull Request** (PR) to the `main` branch of the upstream repo.

---

### 💡 Tips for a Great Contribution

- Keep your PRs small and focused.
- Link the related issue in your PR description.
- Add screenshots or demos where applicable.
- Document new features and update relevant sections.
- Use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format for commit messages.

---

## 🌐 Community

We’re more than just code — we’re a learning community!

- 💬 **Join the conversation** on [Discord](https://discord.com/invite/Ct82yF3KAU). Ask questions, get help, or just say hi!
- 🧑‍💻 **Pair program** with others to learn and grow together.
- 🪄 **Contribute to discussions** on issues, feature requests, and roadmaps.
- 📣 **Share your work** — show off what you’ve built with Dijkstra-Web!

> Whether you're a beginner or a pro, there's a place for you here 💙

---

## 👥 Contributors

This project exists thanks to all the people who contribute.

<a href="https://github.com/Dijkstra-Edu/Dijkstra-Web/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Dijkstra-Edu/Dijkstra-Web" />
</a>

---

##  Acknowledgements

We would like to thank all contributors and community members who helped make this project possible.

---

## ©️ Copyright and License

© 2025 Dijkstra-Edu. All rights reserved.

This project is licensed under the [MIT License](https://github.com/Dijkstra-Edu/Dijkstra-Web/blob/main/LICENSE).  
You are free to use, modify, and distribute this software under the conditions of the license.