import { IconTrendingUp } from "@tabler/icons-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { SimpleEditor } from "./tiptap-templates/simple/simple-editor";
import { Separator } from "./ui/separator";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export default function Readme() {
  const [value, setValue] = useState<string>("Loading...");

  useEffect(() => {
    async function fetchMarkdown() {
      const res = await fetch(
        "https://raw.githubusercontent.com/JRS296/JRS296/refs/heads/master/README.md"
      );
      const text = await res.text();
      setValue(text);
    }

    fetchMarkdown();
  }, []);
  return (
    <div className="flex flex-row gap-4">
      <div className="flex-1 h-[70vh]"> {/* Container with 70vh height */}
        <MDEditor
          value={value}
          onChange={(val) => setValue(val ?? "")}
          height={window.innerHeight * 0.8}
        />
      </div>
    </div>
  );
}

{
  /*     // <Card className="@container/card">
    //   <CardHeader>
    //     <CardDescription>README.md</CardDescription>
    //   </CardHeader>
    //   <CardContent className="flex flex-row gap-4">
    //     <div className="flex-1">
    //       <SimpleEditor />
    //     </div>

    //     <Separator orientation="vertical" />

    //     <div className="flex-1">Hello</div>
    //   </CardContent>

    //   <CardFooter className="flex-col items-start gap-1.5 text-sm">
    //     <div className="line-clamp-1 flex gap-2 font-medium">
    //       Readme score: 85%
    //     </div>
    //     <div className="text-muted-foreground">Last Change: 12th Aug, 2024</div>
    //   </CardFooter>
    // </Card> */
}
