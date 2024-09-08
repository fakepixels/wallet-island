import { useState } from 'react';
import { Paintbrush } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  onToggle: (isDark: boolean) => void;
}

export function ThemeToggle({ onToggle }: ThemeToggleProps) {
  const [isDark, setIsDark] = useState(false);

  const handleToggle = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    onToggle(newTheme);
  };

  return (
    <Button
      onClick={handleToggle}
      className={`fixed bottom-4 left-4 rounded-full p-2 ${
        isDark
          ? "bg-white/10 backdrop-blur-md text-white"
          : "bg-gray-200 text-black"
      } border-white/20 hover:bg-white/20`}
    >
      <Paintbrush size={24} />
    </Button>
  );
}