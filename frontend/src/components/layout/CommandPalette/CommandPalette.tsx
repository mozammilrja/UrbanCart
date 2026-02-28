'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '../../../utils/cn';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  action: () => void;
  keywords?: string[];
}

interface CommandPaletteProps {
  commands: CommandItem[];
  placeholder?: string;
  className?: string;
}

export function CommandPalette({
  commands,
  placeholder = 'Type a command or search...',
  className,
}: CommandPaletteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const filteredCommands = useMemo(() => {
    if (!query) return commands;
    const lowerQuery = query.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(lowerQuery) ||
        cmd.description?.toLowerCase().includes(lowerQuery) ||
        cmd.keywords?.some((kw) => kw.toLowerCase().includes(lowerQuery))
    );
  }, [commands, query]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            setIsOpen(false);
            setQuery('');
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setQuery('');
          break;
      }
    },
    [isOpen, filteredCommands, selectedIndex]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          setIsOpen(false);
          setQuery('');
        }}
      />
      <div
        className={cn(
          'relative z-10 w-full max-w-lg bg-background rounded-lg shadow-2xl border border-border overflow-hidden',
          className
        )}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 text-base border-b border-border bg-transparent focus:outline-none"
          autoFocus
        />
        <div className="max-h-80 overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted-foreground">
              No commands found.
            </div>
          ) : (
            filteredCommands.map((cmd, index) => (
              <button
                key={cmd.id}
                onClick={() => {
                  cmd.action();
                  setIsOpen(false);
                  setQuery('');
                }}
                className={cn(
                  'w-full px-4 py-3 text-left flex items-center gap-3 transition-colors',
                  index === selectedIndex
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted'
                )}
              >
                {cmd.icon && <span className="w-5 h-5 shrink-0">{cmd.icon}</span>}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{cmd.label}</div>
                  {cmd.description && (
                    <div className="text-sm text-muted-foreground truncate">
                      {cmd.description}
                    </div>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
        <div className="px-4 py-2 text-xs text-muted-foreground border-t border-border flex items-center gap-4">
          <span><kbd className="px-1.5 py-0.5 bg-muted rounded">↑↓</kbd> Navigate</span>
          <span><kbd className="px-1.5 py-0.5 bg-muted rounded">↵</kbd> Select</span>
          <span><kbd className="px-1.5 py-0.5 bg-muted rounded">Esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}

export default CommandPalette;
