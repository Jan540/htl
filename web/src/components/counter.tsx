"use client";

import { useState } from "react";
import { Button } from "./ui/button";

export const Counter = ({ initial }: { initial: number }) => {
  const [count, setCount] = useState(initial);
  return (
    <div>
      <Button onClick={() => setCount(count + 1)}>Clicked {count} times</Button>
    </div>
  );
};
