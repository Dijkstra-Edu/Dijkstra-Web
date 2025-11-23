"use client";

import React, { useState, useEffect } from "react";
import Joyride, {
  Step,
  CallBackProps,
  STATUS,
  ACTIONS,
  EVENTS,
} from "react-joyride";

const steps: Step[] = [
  // 1️⃣ Product Tour Intro
  {
    target: ".sidebar-home",
    content:
      "👋 Welcome to Dijkstra! This quick product tour will show you how everything works.",
    placement: "center",
    disableBeacon: true,
  },

  // 2️⃣ Personal Profile
  {
    target: "#profile-section",
    content:
      "👤 Fill up your personal profile — your skills auto-populate based on what you enter!",
    placement: "left",
  },

  // 3️⃣ Resume & CV
  {
    target: "#tabs-section",
    content:
      "📑 Review your automatically generated Resume and CV, built from your profile data.",
    placement: "bottom",
  },

  // 4️⃣ Current Rank
  {
    target: "#stats-graph",
    content:
      "🏆 Keep an eye on your current rank and stats — consistent learning helps you climb!",
    placement: "top",
  },

  // 5️⃣ Task List / Plan
  {
    target: ".sidebar-planner",
    content:
      "🗓️ Here’s your task list and plan — it includes daily LeetCode practice and project milestones to reach your goal rank.",
    placement: "right",
  },

  // 6️⃣ Dijkstra GPT
  {
    target: ".sidebar-dijkstra-gpt",
    content:
      "🤖 Meet Dijkstra GPT — your personal AI mentor for learning, coding help, and smart planning.",
    placement: "right",
  },

  // 7️⃣ Join a Team
  {
    target: ".sidebar-join-team",
    content:
      "👥 Join a team and start collaborating on projects with other learners!",
    placement: "right",
  },

  // 8️⃣ Create First Blog
  {
    target: ".sidebar-blogs",
    content:
      "📰 Create your first automatic blog — it summarizes your GitHub progress or coding updates automatically.",
    placement: "right",
  },

  // 9️⃣ Submit First PR / Solve LC
  {
    target: "body",
    content:
      "💡 Once you’re part of a project, submit your first Pull Request or solve a LeetCode problem to get started!",
    placement: "center",
  },

  // 🔟 Dijkstra’s Philosophy
  {
    target: "body",
    content:
      "🚀 Dijkstra encourages being proactive — learning by doing, and building meaningful things.",
    placement: "center",
  },

  // 11️⃣ Reflection
  {
    target: "body",
    content:
      "🤔 Ask yourself: Why am I building this? How does it help me grow or move toward my dream role?",
    placement: "center",
  },

  // 12️⃣ Opportunities Board
  {
    target: ".sidebar-opportunities",
    content:
      "🎯 Opportunities Board — unlock better opportunities as you progress. Shortlist your dream ones to guide your plan.",
    placement: "right",
  },

  // 13️⃣ Progression Path
  {
    target: "body",
    content:
      "📈 Your growth path: Learn Skills → Build Projects → Join Dijkstra Projects → Apply for Internships → Move toward top-tier jobs!",
    placement: "center",
  },

  // 14️⃣ Certification
  {
    target: "body",
    content:
      "🎓 Your certificate reflects real proof of work — projects, coding, and contributions all add up to it.",
    placement: "center",
  },

  // 15️⃣ Notifications & Conclusion
  {
    target: "body",
    content:
      "🔔 Get Duolingo-style notifications to keep your streak alive. And that’s the end of your tour — let’s get started! 🚀",
    placement: "center",
  },
];



export default function JoyrideTour({
  onFinish,
}: {
  onFinish?: () => void;
}) {
  const [run, setRun] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const handleBeforeStep = (step: any) => {
    const el = document.querySelector(step.target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };


  useEffect(() => {
    const hasSeenTour = localStorage.getItem("dijkstra_tour_complete");
    if (hasSeenTour) return;

    const checkDOM = () => {
      const criticalSelectors = [
        "#profile-section",
        "#tabs-section",
        "#stats-graph",
      ];
      const allExist = criticalSelectors.every((sel) =>
        document.querySelector(sel)
      );

      if (allExist) {
        setTimeout(() => {
          setRun(true);
          console.log("✅ Joyride starting...");
        }, 1000);
      } else {
        console.warn("⏳ Waiting for dashboard elements to load...");
        setTimeout(checkDOM, 500);
      }
    };

    checkDOM();
  }, []);

  const scrollToElement = (target: string) => {
    if (target === "body") return;

    const element = document.querySelector(target);
    const scrollContainer = document.querySelector("#dashboard-content");

    if (element && scrollContainer) {
      const elementRect = element.getBoundingClientRect();
      const containerRect = scrollContainer.getBoundingClientRect();

      const scrollTop = scrollContainer.scrollTop;
      const elementTop = elementRect.top - containerRect.top + scrollTop;
      const offset = containerRect.height / 2 - elementRect.height / 2;

      scrollContainer.scrollTo({
        top: elementTop - offset,
        behavior: "smooth",
      });
    }
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };


const handleJoyrideCallback = (data: CallBackProps) => {
  const { status, type, index, action, step } = data;

  if (type === EVENTS.STEP_BEFORE) {
    if (step.target) scrollToElement(step.target as string);
  }

  if (type === EVENTS.STEP_AFTER && (action === ACTIONS.NEXT || action === ACTIONS.PREV)) {
    const nextIndex = action === ACTIONS.NEXT ? index + 1 : index - 1;
    if (steps[nextIndex]) {
      setTimeout(() => {
        scrollToElement(steps[nextIndex].target as string);
      }, 400);
    }
  }

  if (type === EVENTS.TARGET_NOT_FOUND) {
    const nextIndex = index + 1;
    if (steps[nextIndex]) setStepIndex(nextIndex);
  }

  if (type === EVENTS.STEP_AFTER) {
    setStepIndex(index + (action === ACTIONS.NEXT ? 1 : -1));
  }

  if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
    localStorage.setItem("dijkstra_tour_complete", "true");
    setRun(false);
    onFinish?.();
  }
};


  return (
    <Joyride
      steps={steps}
      run={run}
      stepIndex={stepIndex}
      continuous
      showSkipButton
      showProgress
      scrollToFirstStep={false}
      disableScrolling={true}
      spotlightPadding={4}
      disableOverlayClose
      spotlightClicks={false}
      callback={handleJoyrideCallback}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: "#3b82f6",
          textColor: "#1f2937",
          backgroundColor: "#ffffff",
          arrowColor: "#ffffff",
          overlayColor: "rgba(0, 0, 0, 0.5)",
        },
        overlay: { mixBlendMode: "normal", height: "100%" },
        tooltip: {
          borderRadius: "12px",
          padding: "20px",
          fontSize: "15px",
          maxWidth: "400px",
        },
        tooltipContainer: { textAlign: "left" },
        tooltipContent: {
          fontSize: "14px",
          lineHeight: "1.6",
          padding: "10px 0",
        },
        buttonNext: {
          backgroundColor: "#3b82f6",
          color: "#fff",
          borderRadius: "8px",
          padding: "8px 16px",
          fontSize: "14px",
          fontWeight: "500",
        },
        buttonBack: {
          color: "#6b7280",
          marginRight: "10px",
          fontSize: "14px",
        },
        buttonSkip: {
          color: "#ef4444",
          fontSize: "14px",
        },
        spotlight: { borderRadius: "12px" },
      }}
      floaterProps={{
        disableAnimation: true,
      }}
      locale={{
        back: "← Back",
        close: "Close",
        last: "Finish 🎉",
        next: "Next →",
        skip: "Skip",
      }}
    />
  );
}
