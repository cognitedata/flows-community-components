import { Button } from "@/components/ui/aura/button";
import { cn } from "@/lib/utils";
import { IconCheck, IconCopy, IconSelector } from "@tabler/icons-react";
import type { Element } from "hast";
import {
  type ComponentProps,
  type ComponentRef,
  type HTMLAttributes,
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
} from "react";
import { type BundledLanguage, type ShikiTransformer, codeToHtml } from "shiki";

const isStorybookTestEnv =
  typeof window !== "undefined" &&
  (window as Window & { __STORYBOOK_TEST__?: boolean }).__STORYBOOK_TEST__ === true;

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

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

const stripPreStylesTransformer: ShikiTransformer = {
  name: "strip-pre-styles",
  pre(node: Element) {
    node.properties.style = undefined;
  },
};

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

async function highlightCode(code: string, language: BundledLanguage, showLineNumbers = false) {
  const transformers: ShikiTransformer[] = [
    stripPreStylesTransformer,
    ...(showLineNumbers ? [lineNumberTransformer] : []),
  ];

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

const CodeBlock = forwardRef<HTMLDivElement, CodeBlockProps>(
  (
    {
      code,
      copyText,
      language,
      showLineNumbers = false,
      collapsed = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [html, setHtml] = useState<string>("");
    const [darkHtml, setDarkHtml] = useState<string>("");
    const [isCollapsed, setIsCollapsed] = useState(collapsed);

    const lineCount = code.split("\n").length;
    const textToCopy = copyText ?? code;

    useEffect(() => {
      let isCancelled = false;

      if (isStorybookTestEnv) {
        const escaped = escapeHtml(code);
        const markup = `<pre><code>${escaped}</code></pre>`;
        setHtml(markup);
        setDarkHtml(markup);
        return;
      }

      highlightCode(code, language, showLineNumbers).then(([light, dark]) => {
        if (!isCancelled) {
          setHtml(light);
          setDarkHtml(dark);
        }
      });

      return () => {
        isCancelled = true;
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
          ref={ref}
          data-slot="code-block"
          className={cn(
            "group/code-block relative w-full overflow-hidden rounded-md bg-background text-foreground",
            className
          )}
          {...props}
        >
          <div className="relative">
            <div
              className={cn(
                "dark:hidden [&>pre]:m-0 [&>pre]:bg-card [&>pre]:p-4 [&>pre]:text-foreground [&>pre]:text-sm [&_code]:font-mono [&_code]:text-sm [&>pre]:overflow-x-auto",
                isCollapsed && "max-h-[var(--code-block-collapsed-height)] overflow-y-hidden"
              )}
              // biome-ignore lint/security/noDangerouslySetInnerHtml: required to render trusted Shiki HTML
              dangerouslySetInnerHTML={{ __html: html }}
            />
            <div
              className={cn(
                "hidden dark:block [&>pre]:m-0 [&>pre]:bg-card [&>pre]:p-4 [&>pre]:text-foreground [&>pre]:text-sm [&_code]:font-mono [&_code]:text-sm [&>pre]:overflow-x-auto",
                isCollapsed && "max-h-[var(--code-block-collapsed-height)] overflow-y-hidden"
              )}
              // biome-ignore lint/security/noDangerouslySetInnerHtml: required to render trusted Shiki HTML
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
  }
);
CodeBlock.displayName = "CodeBlock";

type CodeBlockCopyButtonProps = ComponentProps<typeof Button> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

const CodeBlockCopyButton = forwardRef<ComponentRef<typeof Button>, CodeBlockCopyButtonProps>(
  ({ onCopy, onError, timeout = 2000, children, className, ...props }, ref) => {
    const [isCopied, setIsCopied] = useState(false);
    const { copyText } = useContext(CodeBlockContext);

    const copyToClipboard = async () => {
      if (typeof window === "undefined" || !navigator?.clipboard?.writeText) {
        onError?.(new Error("Clipboard API not available"));
        return;
      }

      try {
        if (navigator.permissions?.query) {
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
        console.warn("Clipboard write failed:", error);
        onError?.(error as Error);
      }
    };

    const Icon = isCopied ? IconCheck : IconCopy;

    return (
      <Button
        ref={ref}
        data-slot="code-block-copy-button"
        className={cn("shrink-0", className)}
        onClick={copyToClipboard}
        size="icon"
        variant="secondary"
        {...props}
      >
        {children ?? <Icon size={14} />}
      </Button>
    );
  }
);
CodeBlockCopyButton.displayName = "CodeBlockCopyButton";

type CodeBlockCollapseButtonProps = ComponentProps<typeof Button>;

const CodeBlockCollapseButton = forwardRef<
  ComponentRef<typeof Button>,
  CodeBlockCollapseButtonProps
>(({ children, className, ...props }, ref) => {
  const { isCollapsed, setIsCollapsed, lineCount } = useContext(CodeBlockContext);

  if (lineCount <= 1) {
    return null;
  }

  return (
    <Button
      ref={ref}
      data-slot="code-block-collapse-button"
      className={cn("shrink-0", className)}
      onClick={() => setIsCollapsed(!isCollapsed)}
      size="icon"
      variant="secondary"
      {...props}
    >
      {children ?? <IconSelector size={14} />}
    </Button>
  );
});
CodeBlockCollapseButton.displayName = "CodeBlockCollapseButton";

export { CodeBlock, CodeBlockCopyButton, CodeBlockCollapseButton };
