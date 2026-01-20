import { Button } from "@/components/ui/aura/button";
import { cn } from "@/lib/utils";
import { IconCheck, IconCopy, IconSelector } from "@tabler/icons-react";
import type { Element } from "hast";
import {
  type ComponentProps,
  type HTMLAttributes,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { type BundledLanguage, type ShikiTransformer, codeToHtml } from "shiki";

type CodeBlockProps = HTMLAttributes<HTMLDivElement> & {
  code: string;
  copyText?: string;
  collapsed?: boolean;
  language: BundledLanguage;
  showLineNumbers?: boolean;
};

type CodeBlockContextType = {
  code: string;
  copyText: string;
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  lineCount: number;
};

const CodeBlockContext = createContext<CodeBlockContextType>({
  code: "",
  copyText: "",
  isCollapsed: false,
  setIsCollapsed: () => {},
  lineCount: 0,
});

const lineNumberTransformer: ShikiTransformer = {
  name: "line-numbers",
  line(node: Element, line: number) {
    node.children.unshift({
      type: "element",
      tagName: "span",
      properties: {
        className: [
          "inline-block",
          "min-w-10",
          "mr-4",
          "text-right",
          "select-none",
          "text-muted-foreground",
        ],
      },
      children: [{ type: "text", value: String(line) }],
    });
  },
};

// eslint-disable-next-line react-refresh/only-export-components
export async function highlightCode(
  code: string,
  language: BundledLanguage,
  showLineNumbers = false
) {
  const transformers: ShikiTransformer[] = showLineNumbers ? [lineNumberTransformer] : [];

  return await Promise.all([
    codeToHtml(code, {
      lang: language,
      theme: "one-light",
      transformers,
    }),
    codeToHtml(code, {
      lang: language,
      theme: "one-dark-pro",
      transformers,
    }),
  ]);
}

export const CodeBlock = ({
  code,
  copyText,
  language,
  showLineNumbers = false,
  collapsed = false,
  className,
  children,
  ...props
}: CodeBlockProps) => {
  const [html, setHtml] = useState<string>("");
  const [darkHtml, setDarkHtml] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const mounted = useRef(false);

  const lineCount = code.split("\n").length;
  const textToCopy = copyText ?? code;

  useEffect(() => {
    highlightCode(code, language, showLineNumbers).then(([light, dark]) => {
      if (!mounted.current) {
        setHtml(light);
        setDarkHtml(dark);
        mounted.current = true;
      }
    });

    return () => {
      mounted.current = false;
    };
  }, [code, language, showLineNumbers]);

  return (
    <CodeBlockContext.Provider
      value={{
        code,
        copyText: textToCopy,
        isCollapsed,
        setIsCollapsed,
        lineCount,
      }}
    >
      <div
        className={cn(
          "group/code-block relative w-full overflow-hidden rounded-md bg-background text-foreground",
          className
        )}
        {...props}
      >
        <div className="relative">
          <div
            className={cn(
              "overflow-hidden dark:hidden [&>pre]:m-0 [&>pre]:bg-card! [&>pre]:p-4 [&>pre]:text-foreground! [&>pre]:text-sm [&_code]:font-mono [&_code]:text-sm",
              isCollapsed && "max-h-[var(--code-block-collapsed-height)] [&>pre]:overflow-hidden"
            )}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: "this is needed."
            dangerouslySetInnerHTML={{ __html: html }}
          />
          <div
            className={cn(
              "hidden overflow-hidden dark:block [&>pre]:m-0 [&>pre]:bg-card! [&>pre]:p-4 [&>pre]:text-foreground! [&>pre]:text-sm [&_code]:font-mono [&_code]:text-sm",
              isCollapsed && "max-h-[var(--code-block-collapsed-height)] [&>pre]:overflow-hidden"
            )}
            // biome-ignore lint/security/noDangerouslySetInnerHtml: "this is needed."
            dangerouslySetInnerHTML={{ __html: darkHtml }}
          />
          {isCollapsed && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[var(--code-block-fade-height)] bg-linear-to-b from-transparent via-card/70 to-card" />
          )}
          {children && (
            <div className="absolute top-2 right-2 hidden items-center gap-2 group-hover/code-block:flex">
              {children}
            </div>
          )}
        </div>
      </div>
    </CodeBlockContext.Provider>
  );
};

export type CodeBlockCopyButtonProps = ComponentProps<typeof Button> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

export const CodeBlockCopyButton = ({
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  ...props
}: CodeBlockCopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { copyText } = useContext(CodeBlockContext);

  const copyToClipboard = async () => {
    if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
      onError?.(new Error("Clipboard API not available"));
      return;
    }

    try {
      // Check for permission explicitly if the browser supports it
      if (navigator.permissions && navigator.permissions.query) {
        const permissionStatus = await navigator.permissions.query({
          name: "clipboard-write" as PermissionName,
        });

        if (permissionStatus.state === "denied") {
          onError?.(new Error("Clipboard access denied by browser policy"));
          return;
        }
      }

      await navigator.clipboard.writeText(copyText);
      setIsCopied(true);
      onCopy?.();
      setTimeout(() => setIsCopied(false), timeout);
    } catch (error) {
      // This will catch the "Violation" or "NotAllowedError"
      console.warn("Clipboard write failed:", error);
      onError?.(error as Error);
    }
  };

  const Icon = isCopied ? IconCheck : IconCopy;

  return (
    <Button
      className={cn("shrink-0", className)}
      onClick={copyToClipboard}
      size="icon"
      variant="secondary"
      {...props}
    >
      {children ?? <Icon size={14} />}
    </Button>
  );
};

export type CodeBlockCollapseButtonProps = ComponentProps<typeof Button>;

export const CodeBlockCollapseButton = ({
  children,
  className,
  ...props
}: CodeBlockCollapseButtonProps) => {
  const { isCollapsed, setIsCollapsed, lineCount } = useContext(CodeBlockContext);

  // Only show the button if there's more than 1 line of code
  if (lineCount <= 1) {
    return null;
  }

  return (
    <Button
      className={cn("shrink-0", className)}
      onClick={() => setIsCollapsed(!isCollapsed)}
      size="icon"
      variant="secondary"
      {...props}
    >
      {children ?? <IconSelector size={14} />}
    </Button>
  );
};
