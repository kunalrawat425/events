"use client";

import { useTheme } from "next-themes";
import { Button } from "@heroui/button";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      isIconOnly
      className="fixed top-4 right-4 z-50"
      variant="light"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <SunIcon className="w-5 h-5" />
      ) : (
        <MoonIcon className="w-5 h-5" />
      )}
    </Button>
  );
}
