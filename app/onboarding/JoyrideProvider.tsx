"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride";

type JoyrideContextType = {
  startTour: (tourName: string) => void;
};

const JoyrideContext = createContext<JoyrideContextType>({
  startTour: () => {},
});

export const useJoyride = () => useContext(JoyrideContext);

const tours: Record<string, Step[]> = {
  home: [
    { target: ".welcome-banner", content: "Welcome to DeskBuddy!" },
    { target: ".nav-dashboard", content: "You can open your dashboard here." },
  ],
  dashboard: [
    { target: ".stress-chart", content: "This shows your stress history." },
    { target: ".music-widget", content: "Listen to calming sounds here." },
    { target: ".breathing-btn", content: "Start your breathing session here." },
  ],
  profile: [
    { target: ".profile-picture", content: "Upload your picture here." },
    { target: ".user-details", content: "You can update your personal info here." },
    { target: ".save-profile", content: "Don’t forget to save your changes!" },
  ],
  gpt: [
    { target: ".chat-input", content: "Type your question or message here." },
    { target: ".chat-response", content: "See DeskBuddy’s smart response here." },
    { target: ".suggestions-list", content: "Explore follow-up ideas below." },
  ],
  mindfulness: [
    { target: ".mindfulness-video", content: "Watch mindfulness exercises here." },
    { target: ".next-session", content: "Schedule your next session here." },
  ],
};


export const JoyrideProvider = ({ children }: { children: React.ReactNode }) => {
  const [run, setRun] = useState(false);
  const [steps, setSteps] = useState<Step[]>([]);
  const router = useRouter();
  const pathname = usePathname();

  const startTour = (tourName: string) => {
    // If it's a different page, navigate first
    if (!pathname.includes(tourName)) {
      router.push(`/${tourName}`);
      // Wait a bit for page to load before running Joyride
      setTimeout(() => {
        setSteps(tours[tourName] || []);
        setRun(true);
      }, 600);
    } else {
      setSteps(tours[tourName] || []);
      setRun(true);
    }
  };

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
      setRun(false);
    }
  };

  return (
    <JoyrideContext.Provider value={{ startTour }}>
      <Joyride
        steps={steps}
        run={run}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "#2563eb",
          },
        }}
      />
      {children}
    </JoyrideContext.Provider>
  );
};
