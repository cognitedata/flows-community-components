import {
  ContentSection,
  SubHeading,
  TokenTable,
} from '@/components/foundations/content-primitives';

export function SizeAndSpacingTokensContent() {
  return (
    <>
      <ContentSection title="Spacing">
        <p>
          Spacing is the negative area between elements and components, both
          horizontally and vertically. It&apos;s commonly controlled in code
          with <code>gap</code>, <code>margin</code>, or <code>padding</code>.
          Every part of a UI should be intentional — including the empty space
          between elements. The amount of space between items creates
          relationships and hierarchy.
        </p>

        <SubHeading>Creating relationships</SubHeading>
        <p>
          Elements in a design that are near each other are seen as being
          meaningfully related. As more space is added between elements, their
          perceived relationship weakens.
        </p>
        <p>
          Space can also be used to denote groups of associated information.
          This creates content sections on a page without having to use lines or
          other graphical elements as a divider.
        </p>

        <SubHeading>Creating hierarchy</SubHeading>
        <p>
          Elements that have more spacing around them tend to be perceived as
          higher in importance than elements that have less space around them.
        </p>
        <p>
          Elements that are set close to each other can be easily overlooked.
          Users may see the grouping but not process each individual item.
          Therefore, if you have an element or content of high importance on the
          page, consider giving it extra surrounding space to help it attract
          focus.
        </p>

        <SubHeading>White space</SubHeading>
        <p>
          Empty space — also known as white space — is important in design. It
          can be used to break up sections on a page or to help create focus on
          certain element(s).
        </p>
        <p>
          White space helps with information processing; too much dense
          information can be disorienting or overwhelming for a user. Sections
          of a UI are allowed to be dense, but the whole page should not be
          crowded — there should always be enough white space to let the
          user&apos;s eyes rest.
        </p>
        <p>
          The Utility classes variable collection in Figma groups sizing
          utilities by name prefix (<code>padding/…</code>,{' '}
          <code>margin/…</code>, and so on). Each utility aliases a spacing,
          radius, or border-width primitive and resolves to a pixel value in the
          default mode. The tables below list those groupings.
        </p>

        <SubHeading>Padding</SubHeading>
        <p>
          Applied as top, right, bottom, left padding within a component or UI
          element.
        </p>
        <TokenTable
          columns={['Utility variable', 'Aliased token', 'Value']}
          rows={[
            ['padding/p-2', 'spacing/2', '2 px'],
            ['padding/p-4', 'spacing/4', '4 px'],
            ['padding/p-6', 'spacing/6', '6 px'],
            ['padding/p-8', 'spacing/8', '8 px'],
            ['padding/p-12', 'spacing/12', '12 px'],
            ['padding/p-14', 'spacing/14', '14 px'],
            ['padding/p-16', 'spacing/16', '16 px'],
            ['padding/p-20', 'spacing/20', '20 px'],
            ['padding/p-24', 'spacing/24', '24 px'],
            ['padding/p-28', 'spacing/28', '28 px'],
            ['padding/p-32', 'spacing/32', '32 px'],
            ['padding/p-36', 'spacing/36', '36 px'],
            ['padding/p-40', 'spacing/40', '40 px'],
          ]}
        />

        <SubHeading>Margin</SubHeading>
        <p>
          Applied as top, right, bottom, left margin outside of a component or
          UI element.
        </p>
        <TokenTable
          columns={['Utility variable', 'Aliased token', 'Value']}
          rows={[
            ['margin/m-4', 'spacing/4', '4 px'],
            ['margin/m-6', 'spacing/6', '6 px'],
            ['margin/m-8', 'spacing/8', '8 px'],
            ['margin/m-12', 'spacing/12', '12 px'],
            ['margin/m-16', 'spacing/16', '16 px'],
            ['margin/m-20', 'spacing/20', '20 px'],
            ['margin/m-24', 'spacing/24', '24 px'],
            ['margin/m-28', 'spacing/28', '28 px'],
            ['margin/m-32', 'spacing/32', '32 px'],
            ['margin/m-36', 'spacing/36', '36 px'],
            ['margin/m-40', 'spacing/40', '40 px'],
            ['margin/m-44', 'spacing/44', '44 px'],
            ['margin/m-48', 'spacing/48', '48 px'],
            ['margin/m-52', 'spacing/52', '52 px'],
            ['margin/m-56', 'spacing/56', '56 px'],
            ['margin/m-60', 'spacing/60', '60 px'],
            ['margin/m-64', 'spacing/64', '64 px'],
            ['margin/m-68', 'spacing/68', '68 px'],
            ['margin/m-72', 'spacing/72', '72 px'],
            ['margin/m-76', 'spacing/76', '76 px'],
            ['margin/m-80', 'spacing/80', '80 px'],
          ]}
        />
      </ContentSection>

      <ContentSection title="Size">
        <p>
          Size is the vertical height of components and is used to create visual
          consistency across the system. Use size tokens to set up a
          component&apos;s height, or as a reference to calculate the final size
          of the component. Each size has a prefixed height and name for easy
          reference. For example, our Button component is available in three
          sizes: small (28px), default — or medium — (36px), and large (40px).
        </p>

        <SubHeading>Consistency across components</SubHeading>
        <p>
          Use the same size components consistently across similar components to
          maintain alignment, rhythm, and predictable behavior throughout the
          interface.
        </p>
        <p>
          This helps prevent visual noise and ensures that mixed components
          (like inputs and buttons) align cleanly in layouts.
        </p>

        <SubHeading>Touch target best practices</SubHeading>
        <p>
          Always aim for a minimum touch target of 40–44px for tappable elements
          on mobile to meet accessibility guidelines and user comfort.
        </p>
        <p>
          If this is not feasible in height, ensure the width is wide enough to
          be easily accessible.
        </p>

        <SubHeading>Variable height</SubHeading>
        <p>
          Some components don&apos;t have a fixed height, so they can grow
          vertically and adapt to the amount of content they hold. In these
          components, padding is important to align on.
        </p>

        <SubHeading>Corresponding radius</SubHeading>
        <p>
          Each size corresponds with a preferred radius value. This is because
          the size and corner radius are often proportional to one another and
          should scale accordingly, with the exception of fully rounded corner
          radii.
        </p>
        <p>
          For example, default Buttons and Inputs (36px h) always use an 8px
          corner radius. However, small Buttons and Inputs (28px h) use a 6px
          corner radius.
        </p>

        <SubHeading>Width</SubHeading>
        <p>Applied as a fixed width to a component, e.g., Button.</p>
        <TokenTable
          columns={['Utility variable', 'Aliased token', 'Value']}
          rows={[
            ['width/w-4', 'spacing/4', '4 px'],
            ['width/w-8', 'spacing/8', '8 px'],
            ['width/w-16', 'spacing/16', '16 px'],
            ['width/w-20', 'spacing/20', '20 px'],
            ['width/w-24', 'spacing/24', '24 px'],
            ['width/w-28', 'spacing/28', '28 px'],
            ['width/w-32', 'spacing/32', '32 px'],
            ['width/w-36', 'spacing/36', '36 px'],
            ['width/w-40', 'spacing/40', '40 px'],
            ['width/w-44', 'spacing/44', '44 px'],
            ['width/w-48', 'spacing/48', '48 px'],
          ]}
        />

        <SubHeading>Min-width</SubHeading>
        <p>
          Applied when a min width is set to a component or container, e.g.,
          Dialog.
        </p>
        <TokenTable
          columns={['Utility variable', 'Aliased token', 'Value']}
          rows={[
            ['min-width/min-w-4', 'spacing/4', '4 px'],
            ['min-width/min-w-8', 'spacing/8', '8 px'],
            ['min-width/min-w-16', 'spacing/16', '16 px'],
            ['min-width/min-w-20', 'spacing/20', '20 px'],
            ['min-width/min-w-24', 'spacing/24', '24 px'],
            ['min-width/min-w-28', 'spacing/28', '28 px'],
            ['min-width/min-w-32', 'spacing/32', '32 px'],
            ['min-width/min-w-36', 'spacing/36', '36 px'],
            ['min-width/min-w-40', 'spacing/40', '40 px'],
            ['min-width/min-w-44', 'spacing/44', '44 px'],
            ['min-width/min-w-48', 'spacing/48', '48 px'],
          ]}
        />

        <SubHeading>Max-width</SubHeading>
        <p>
          Applied when a max width is set to a component or container, e.g.,
          Dialog.
        </p>
        <TokenTable
          columns={['Utility variable', 'Aliased token', 'Value']}
          rows={[
            ['max-width/max-w-4', 'spacing/4', '4 px'],
            ['max-width/max-w-8', 'spacing/8', '8 px'],
            ['max-width/max-w-16', 'spacing/16', '16 px'],
            ['max-width/max-w-20', 'spacing/20', '20 px'],
            ['max-width/max-w-24', 'spacing/24', '24 px'],
            ['max-width/max-w-28', 'spacing/28', '28 px'],
            ['max-width/max-w-32', 'spacing/32', '32 px'],
            ['max-width/max-w-36', 'spacing/36', '36 px'],
            ['max-width/max-w-40', 'spacing/40', '40 px'],
            ['max-width/max-w-44', 'spacing/44', '44 px'],
            ['max-width/max-w-48', 'spacing/48', '48 px'],
            ['max-width/max-w-52', 'spacing/52', '52 px'],
            ['max-width/max-w-56', 'spacing/56', '56 px'],
            ['max-width/max-w-60', 'spacing/60', '60 px'],
            ['max-width/max-w-64', 'spacing/64', '64 px'],
            ['max-width/max-w-68', 'spacing/68', '68 px'],
            ['max-width/max-w-72', 'spacing/72', '72 px'],
            ['max-width/max-w-76', 'spacing/76', '76 px'],
            ['max-width/max-w-80', 'spacing/80', '80 px'],
            ['max-width/max-w-84', 'spacing/84', '84 px'],
            ['max-width/max-w-88', 'spacing/88', '88 px'],
            ['max-width/max-w-92', 'spacing/92', '92 px'],
            ['max-width/max-w-96', 'spacing/96', '96 px'],
            ['max-width/max-w-100', 'spacing/100', '100 px'],
          ]}
        />

        <SubHeading>Height</SubHeading>
        <p>Applied as a fixed height to a component, e.g., Button.</p>
        <TokenTable
          columns={['Utility variable', 'Aliased token', 'Value']}
          rows={[
            ['height/h-4', 'spacing/4', '4 px'],
            ['height/h-8', 'spacing/8', '8 px'],
            ['height/h-16', 'spacing/16', '16 px'],
            ['height/h-20', 'spacing/20', '20 px'],
            ['height/h-24', 'spacing/24', '24 px'],
            ['height/h-28', 'spacing/28', '28 px'],
            ['height/h-32', 'spacing/32', '32 px'],
            ['height/h-36', 'spacing/36', '36 px'],
            ['height/h-40', 'spacing/40', '40 px'],
            ['height/h-44', 'spacing/44', '44 px'],
            ['height/h-48', 'spacing/48', '48 px'],
          ]}
        />

        <SubHeading>Min-height</SubHeading>
        <p>
          Applied when a min height is set to a component or container, e.g.,
          Textarea.
        </p>
        <TokenTable
          columns={['Utility variable', 'Aliased token', 'Value']}
          rows={[
            ['min-height/min-h-4', 'spacing/4', '4 px'],
            ['min-height/min-h-8', 'spacing/8', '8 px'],
            ['min-height/min-h-16', 'spacing/16', '16 px'],
            ['min-height/min-h-20', 'spacing/20', '20 px'],
            ['min-height/min-h-24', 'spacing/24', '24 px'],
            ['min-height/min-h-28', 'spacing/28', '28 px'],
            ['min-height/min-h-32', 'spacing/32', '32 px'],
            ['min-height/min-h-36', 'spacing/36', '36 px'],
            ['min-height/min-h-40', 'spacing/40', '40 px'],
            ['min-height/min-h-44', 'spacing/44', '44 px'],
            ['min-height/min-h-48', 'spacing/48', '48 px'],
          ]}
        />

        <SubHeading>Max-height</SubHeading>
        <p>
          Applied when a max height is set to a component or container, e.g.,
          Textarea.
        </p>
        <TokenTable
          columns={['Utility variable', 'Aliased token', 'Value']}
          rows={[
            ['max-height/max-h-4', 'spacing/4', '4 px'],
            ['max-height/max-h-8', 'spacing/8', '8 px'],
            ['max-height/max-h-16', 'spacing/16', '16 px'],
            ['max-height/max-h-20', 'spacing/20', '20 px'],
            ['max-height/max-h-24', 'spacing/24', '24 px'],
            ['max-height/max-h-28', 'spacing/28', '28 px'],
            ['max-height/max-h-32', 'spacing/32', '32 px'],
            ['max-height/max-h-36', 'spacing/36', '36 px'],
            ['max-height/max-h-40', 'spacing/40', '40 px'],
            ['max-height/max-h-44', 'spacing/44', '44 px'],
            ['max-height/max-h-48', 'spacing/48', '48 px'],
            ['max-height/max-h-52', 'spacing/52', '52 px'],
            ['max-height/max-h-56', 'spacing/56', '56 px'],
            ['max-height/max-h-60', 'spacing/60', '60 px'],
            ['max-height/max-h-64', 'spacing/64', '64 px'],
            ['max-height/max-h-68', 'spacing/68', '68 px'],
            ['max-height/max-h-72', 'spacing/72', '72 px'],
            ['max-height/max-h-76', 'spacing/76', '76 px'],
            ['max-height/max-h-80', 'spacing/80', '80 px'],
            ['max-height/max-h-84', 'spacing/84', '84 px'],
            ['max-height/max-h-88', 'spacing/88', '88 px'],
            ['max-height/max-h-92', 'spacing/92', '92 px'],
            ['max-height/max-h-96', 'spacing/96', '96 px'],
            ['max-height/max-h-100', 'spacing/100', '100 px'],
          ]}
        />
      </ContentSection>

      <ContentSection title="Radius">
        <p>Corner radius (or radii) are the rounded corners in components.</p>

        <SubHeading>Guidelines</SubHeading>
        <p>
          Radius size is dependent on the size, or height, of the component,
          with the exception of fully rounded radii.
        </p>
        <p>
          When applying a radius to non-Aura components, consider the size and
          scale. Use a larger radius for larger components and a smaller radius
          for smaller components.
        </p>
        <p>
          Don&apos;t mix radius styles (e.g., rounded and sharp within the same
          component or UI element) as it can create inconsistency and visual
          clutter.
        </p>

        <TokenTable
          columns={['Utility variable', 'Aliased token', 'Value']}
          rows={[
            ['border/rounded-none', 'radius/none', '0 px'],
            ['border/rounded-xs', 'radius/xs', '2 px'],
            ['border/rounded-sm', 'radius/sm', '4 px'],
            ['border/rounded-md', 'radius/md', '6 px'],
            ['border/rounded-lg', 'radius/lg', '8 px'],
            ['border/rounded-xl', 'radius/xl', '12 px'],
            ['border/rounded-2xl', 'radius/2xl', '16 px'],
            ['border/rounded-3xl', 'radius/3xl', '24 px'],
            ['border/rounded-4xl', 'radius/4xl', '32 px'],
            ['border/rounded-full', 'radius/full', '9999 px'],
          ]}
        />
      </ContentSection>

      <ContentSection title="Stroke width">
        <p>
          Stroke thickness (or border weight) is used sparingly across the
          system to maintain a clean, minimal visual style. When applied, stroke
          weight should reinforce hierarchy, clarity, and accessibility without
          introducing visual noise.
        </p>

        <SubHeading>Guidelines</SubHeading>
        <p>
          Avoid strokes unless necessary for clarity, separation, or emphasis.
        </p>
        <p>
          When a stroke is required, use 1px for subtle borders or visual
          definition.
        </p>
        <p>
          Ensure the appropriate border token color is used when a stroke is
          applied to an element. This ensures enough color contrast.
        </p>
        <p>
          Use elevation and spacing first to define hierarchy — stroke should be
          a secondary tool.
        </p>

        <TokenTable
          columns={['Utility variable', 'Aliased token', 'Value']}
          rows={[
            ['border-width/border-0', 'border-width/0', '0 px'],
            ['border-width/border-1', 'border-width/1', '1 px'],
            ['border-width/border-2', 'border-width/2', '2 px'],
          ]}
        />
      </ContentSection>
    </>
  );
}
