"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const SelectContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedValue: string;
  setSelectedValue: React.Dispatch<React.SetStateAction<string>>;
  value?: string;
  onValueChange?: (value: string) => void;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  items: string[];
  setItems: React.Dispatch<React.SetStateAction<string[]>>;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
} | null>(null);

const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("useSelectContext must be used within a Select");
  }
  return context;
};

const Select = ({
  children,
  value,
  onValueChange,
}: {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value || "");
  const [activeIndex, setActiveIndex] = React.useState(-1);
  const [items, setItems] = React.useState<string[]>([]);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    setSelectedValue(value || "");
  }, [value]);

  // Handle click outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const contextValue = React.useMemo(
    () => ({
      open,
      setOpen,
      selectedValue,
      setSelectedValue,
      value,
      onValueChange,
      activeIndex,
      setActiveIndex,
      items,
      setItems,
      triggerRef,
      contentRef,
    }),
    [open, selectedValue, value, onValueChange, activeIndex, items]
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <div
        className="relative"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  const { selectedValue } = useSelectContext();
  return <span>{selectedValue || placeholder}</span>;
};

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { open, setOpen, triggerRef, setActiveIndex, items, selectedValue } =
    useSelectContext();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
      case " ":
      case "ArrowDown":
        e.preventDefault();
        setOpen(true);
        setActiveIndex(
          items.indexOf(selectedValue) !== -1 ? items.indexOf(selectedValue) : 0
        );
        break;
      case "Escape":
        setOpen(false);
        setActiveIndex(-1);
        triggerRef.current?.focus();
        break;
    }
  };

  return (
    <button
      ref={(node) => {
        // Handle both refs
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        if (triggerRef) {
          triggerRef.current = node;
        }
      }}
      className={cn(
        "flex h-9 w-full items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background data-[placeholder]:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className
      )}
      onClick={() => setOpen(!open)}
      onKeyDown={handleKeyDown}
      aria-controls="select-content"
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { open, contentRef } = useSelectContext();

  if (!open) return null;

  return (
    <div
      ref={(node) => {
        // Handle both refs
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
        if (contentRef) {
          contentRef.current = node;
        }
      }}
      className={cn(
        "absolute z-50 mt-1 w-[200px] py-2 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
        className
      )}
      role="listbox"
      id="select-content"
      {...props}
    >
      {children}
    </div>
  );
});
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { value: string }
>(({ className, children, value, ...props }, ref) => {
  const {
    selectedValue,
    setSelectedValue,
    setOpen,
    onValueChange,
    activeIndex,
    setActiveIndex,
    items,
    setItems,
  } = useSelectContext();

  const isSelected = selectedValue === value;
  const itemIndex = items.indexOf(value);
  const isActive = activeIndex === itemIndex;

  // Register item on mount
  React.useEffect(() => {
    setItems((prev) => {
      if (!prev.includes(value)) {
        return [...prev, value];
      }
      return prev;
    });
    return () => {
      setItems((prev) => prev.filter((item) => item !== value));
    };
  }, [value, setItems]);

  const handleSelect = () => {
    setSelectedValue(value || "");
    if (onValueChange) {
      onValueChange(value);
    }
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
      case " ":
        e.preventDefault();
        handleSelect();
        break;
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => (prev < items.length - 1 ? prev + 1 : 0));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : items.length - 1));
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        setActiveIndex(-1);
        break;
      case "Tab":
        setOpen(false);
        setActiveIndex(-1);
        break;
    }
  };

  React.useEffect(() => {
    if (isActive) {
      (ref as any)?.current?.focus();
    }
  }, [isActive, ref]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
        isActive && "bg-accent text-accent-foreground",
        className
      )}
      onClick={handleSelect}
      onKeyDown={handleKeyDown}
      tabIndex={isActive ? 0 : -1}
      role="option"
      aria-selected={isSelected}
      {...props}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <Check className="h-4 w-4" />
        </span>
      )}
      {children}
    </div>
  );
});
SelectItem.displayName = "SelectItem";

const SelectLabel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    role="presentation"
    {...props}
  />
));
SelectLabel.displayName = "SelectLabel";

const SelectSeparator = React.forwardRef<
  HTMLHRElement,
  React.HTMLAttributes<HTMLHRElement>
>(({ className, ...props }, ref) => (
  <hr
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    role="separator"
    {...props}
  />
));
SelectSeparator.displayName = "SelectSeparator";

const SelectGroup = ({ children }: { children: React.ReactNode }) => (
  <div role="group">{children}</div>
);
const SelectScrollUpButton = () => null;
const SelectScrollDownButton = () => null;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
