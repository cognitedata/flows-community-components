import { ContentList, ContentSection } from "@/components/foundations/content-primitives";

export function DesignHeuristicsContent() {
  return (
    <>
      <ContentSection title="What is a heuristic">
        <p>
          A heuristic is a practical approach or rule of thumb used to solve problems efficiently
          when a perfect solution is impractical or time-consuming. It&apos;s based on experience,
          intuition, and best practice rather than a strict algorithm.
        </p>
        <p>
          Heuristic guidelines apply that idea to interface design: a set of usability principles
          that help evaluate and improve a flow, giving a shared framework for spotting usability
          issues and keeping the experience smooth. These heuristics are used alongside other criteria when assessing a
          design&apos;s quality and readiness to ship.
        </p>
      </ContentSection>

      <ContentSection title="Feedback and system status">
        <p>
          Users should always know what&apos;s happening. Give timely feedback through the right
          message or indicator at the right time, with helpful copy that keeps them in the loop.
        </p>
        <ContentList
          items={[
            "Visibility of system status — timely feedback like loading indicators and success messages.",
            "Acknowledge user actions — confirmation after an action is taken, e.g. a toast for saving changes or a tooltip confirming something copied to the clipboard.",
            "Skeleton screens and loaders — the right loading state for the moment: full-page loaders for transitions, skeleton placeholders instead of blank screens, spinners or progress bars for smaller waits, and lazy loading for performance.",
          ]}
        />
      </ContentSection>

      <ContentSection title="Affordance and discoverability">
        <p>
          Affordance is the visual or interactive cue that tells a user how an element should be
          used, so they instinctively know what actions are possible.
        </p>
        <ContentList
          items={[
            "Micro-interactions and signifiers — small animations or cues that indicate an interaction, like a button hover effect.",
            "Cursor change — from an arrow to a pointer over anything clickable, or an I-beam over anything editable.",
            "Clear labels and common patterns — recognizable elements like a magnifying glass and the word \"search\" in an input, or a chevron that signals a dropdown.",
            "Contextual help — tooltips or inline hints wherever intent might be unclear.",
          ]}
        />
      </ContentSection>

      <ContentSection title="Progressive disclosure">
        <p>
          Progressive disclosure hides less important information until it&apos;s needed, reducing
          cognitive load and introducing complexity only when necessary. Pair it with good
          affordance so what&apos;s hidden still feels discoverable.
        </p>
        <ContentList
          items={[
            "Collapsible states — hide information but keep it easily reachable in a logical place, like an accordion or dropdown for file management.",
            "Wizards and steppers — break a complex task into step-by-step screens so users can focus on one thing at a time.",
            "Delay or hide advanced features — surface less-frequent settings only when relevant, e.g. showing extra detail only after a user has made an initial choice.",
            "Contextual menus — actions that appear next to the element they affect, like right-clicking in a graph or canvas, surfacing what's relevant while hiding the rest.",
          ]}
        />
      </ContentSection>

      <ContentSection title="Error handling and prevention">
        <p>
          Design for error prevention and recovery first. Combined with clear system feedback,
          good error handling lets users fix problems themselves rather than getting stuck.
        </p>
        <ContentList
          items={[
            "Prevention — warn before an irreversible action (\"Are you sure you want to delete?\").",
            "Auto-save — protect against accidental data loss wherever possible.",
            "Validation states and descriptive error messages — explain what went wrong and how to fix it before the user tries again.",
            "Undo and confirmation — let a user confirm or stop an action before it finalizes, or offer undo in the toast after it completes.",
          ]}
        />
      </ContentSection>

      <ContentSection title="Enable super users">
        <p>
          Advanced functionality — shortcuts, contextual menus, customizable workflows — lets
          experienced users move faster without adding friction for beginners.
        </p>
        <ContentList
          items={[
            "Shortcuts — keyboard shortcuts that align with UI standards and other products in the same ecosystem.",
            "Bulk actions — multi-select and batch operations wherever there are dozens of repetitive tasks.",
            "Onboarding — an interface that supports both novice and experienced users, so learning stays easy without slowing down power users.",
          ]}
        />
      </ContentSection>

      <ContentSection title="Layout and hierarchy">
        <p>
          Layout and hierarchy directly shape usability and readability — alignment gives structure,
          and placement and hierarchy guide users through a product efficiently.
        </p>
        <ContentList
          items={[
            "Group related elements together, using proximity — form fields in the same container, or a contextual menu near what it affects.",
            "Keep persistent common actions and CTAs in consistent, easily accessible locations across the product.",
            "Use size, color, contrast, and whitespace to build visual hierarchy for scannability.",
            "Structure content around how users naturally scan a page — logical flow, F- and Z-pattern layouts.",
            "Keep text and elements aligned for a clean, structured layout, e.g. left-aligned form labels.",
            "Design responsively — components should hold up across desktop, tablet, and mobile.",
          ]}
        />
      </ContentSection>

      <ContentSection title="Accessibility and inclusive design">
        <p>Accessible design improves usability for everyone, not only users with disabilities.</p>
        <ContentList
          items={[
            "Keyboard accessibility — every interaction needs a non-hover, non-drag alternative.",
            "Color contrast and readability — text should meet WCAG AA or AAA contrast ratios.",
            "ARIA roles and labels — semantic HTML with proper attributes for screen readers.",
            "Keyboard navigation — every element reachable without a mouse.",
            "Focus indicators — clearly show what's focused; most components handle this by default.",
            "Alternative input methods — support voice commands, screen readers, and other navigation tools.",
            "Clickable and touchable areas — minimum 40px for touch targets, 20px for click targets.",
          ]}
        />
      </ContentSection>
    </>
  );
}
