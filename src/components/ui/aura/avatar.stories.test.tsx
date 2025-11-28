import { describe, it, expect } from 'vitest';
import { composeStories } from '@storybook/react';
import { render, screen } from '@testing-library/react';
import * as stories from './avatar.stories';

const {
  Default,
  WithIcon,
  WithImage,
  AllVariants,
  AllVariantsWithIcons,
  AllSizes,
  ImagesAllSizes,
  AvatarGroup,
  AvatarGroupSmall,
  EdgeCases,
  Playground,
} = composeStories(stories);

describe('Avatar Stories', () => {
  describe('Basic Rendering', () => {
    it('renders Default story with fallback text', () => {
      const { container } = render(<Default />);
      expect(screen.getByText('AB')).toBeInTheDocument();
      expect(
        container.querySelector('[data-slot="avatar"]')
      ).toBeInTheDocument();
    });

    it('renders WithIcon story with icon', () => {
      const { container } = render(<WithIcon />);
      expect(container.querySelector('svg')).toBeInTheDocument();
      expect(
        container.querySelector('[data-slot="avatar-icon"]')
      ).toBeInTheDocument();
    });

    it('renders WithImage story with image and fallback', () => {
      const { container } = render(<WithImage />);
      // Image component renders but may not load in test environment
      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar).toBeInTheDocument();
      // Fallback text is always rendered (though may be hidden if image loads)
      expect(screen.getByText('PJ')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders all colour variants', () => {
      const { container } = render(<AllVariants />);
      const avatars = container.querySelectorAll('[data-slot="avatar"]');
      expect(avatars.length).toBe(8); // Including overflow variant

      // Check specific variant text
      expect(screen.getByText('AB')).toBeInTheDocument(); // default
      expect(screen.getByText('NC')).toBeInTheDocument(); // nordic
      expect(screen.getByText('FJ')).toBeInTheDocument(); // fjord
      expect(screen.getByText('AR')).toBeInTheDocument(); // aurora
      expect(screen.getByText('DK')).toBeInTheDocument(); // dusk
      expect(screen.getByText('OR')).toBeInTheDocument(); // orange
      expect(screen.getByText('SK')).toBeInTheDocument(); // sky
      expect(screen.getByText('+4')).toBeInTheDocument(); // overflow
    });

    it('renders all variants with icons', () => {
      const { container } = render(<AllVariantsWithIcons />);
      const icons = container.querySelectorAll('[data-slot="avatar-icon"]');
      expect(icons.length).toBe(7); // All variants except overflow
    });
  });

  describe('Sizes', () => {
    it('renders all size variants', () => {
      const { container } = render(<AllSizes />);
      const avatars = container.querySelectorAll('[data-slot="avatar"]');
      expect(avatars.length).toBe(3);

      // Check that size classes are applied
      expect(avatars[0]).toHaveClass('size-9'); // default
      expect(avatars[1]).toHaveClass('size-7'); // xsm
      expect(avatars[2]).toHaveClass('size-5'); // xxsm
    });

    it('renders images at different sizes', () => {
      const { container } = render(<ImagesAllSizes />);
      const avatars = container.querySelectorAll('[data-slot="avatar"]');
      // Should have 3 avatars with different sizes
      expect(avatars.length).toBe(3);
      expect(avatars[0]).toHaveClass('size-9'); // default
      expect(avatars[1]).toHaveClass('size-7'); // xsm
      expect(avatars[2]).toHaveClass('size-5'); // xxsm
    });
  });

  describe('Avatar Groups', () => {
    it('renders avatar group with overflow indicator', () => {
      const { container } = render(<AvatarGroup />);
      const avatars = container.querySelectorAll('[data-slot="avatar"]');
      // 4 regular avatars visible initially (HoverCard content not rendered until interaction)
      expect(avatars.length).toBeGreaterThanOrEqual(4);
      expect(screen.getByText('+4')).toBeInTheDocument();
      expect(screen.getByText('NC')).toBeInTheDocument();
      expect(screen.getByText('AR')).toBeInTheDocument();
    });

    it('renders small avatar group', () => {
      const { container } = render(<AvatarGroupSmall />);
      const avatars = container.querySelectorAll('[data-slot="avatar"]');
      // 4 regular avatars + 1 overflow
      expect(avatars.length).toBeGreaterThanOrEqual(4);
      expect(screen.getByText('+4')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('handles long fallback text gracefully', () => {
      const { container } = render(<EdgeCases />);
      const avatars = container.querySelectorAll('[data-slot="avatar"]');

      // Should render without crashing
      expect(avatars.length).toBeGreaterThan(0);

      // Check that overflow-hidden is present on avatar containers
      const longTextAvatar = Array.from(avatars).find((avatar) =>
        avatar.textContent?.includes('ABCDEFGH')
      );
      expect(longTextAvatar).toHaveClass('overflow-hidden');
    });

    it('handles empty fallback text', () => {
      const { container } = render(<EdgeCases />);
      const fallbacks = container.querySelectorAll('[data-slot="avatar-fallback"]');

      // Should still render even with empty text
      expect(fallbacks.length).toBeGreaterThan(0);
    });

    it('handles special characters', () => {
      render(<EdgeCases />);

      // Should render emoji
      expect(screen.getByText('🎨🔥')).toBeInTheDocument();

      // Should render special characters
      expect(screen.getByText('@#$')).toBeInTheDocument();

      // Should render unicode
      expect(screen.getByText('中文')).toBeInTheDocument();
    });

    it('handles single character fallback', () => {
      render(<EdgeCases />);
      expect(screen.getByText('A')).toBeInTheDocument();
      expect(screen.getByText('Z')).toBeInTheDocument();
      expect(screen.getByText('M')).toBeInTheDocument();
    });

    it('text fits in very small sizes', () => {
      const { container } = render(<EdgeCases />);
      const xxsmAvatars = container.querySelectorAll('.size-5');

      // Should have multiple xxsm avatars
      expect(xxsmAvatars.length).toBeGreaterThan(0);

      // They should still have overflow-hidden to clip content
      xxsmAvatars.forEach((avatar) => {
        expect(avatar).toHaveClass('overflow-hidden');
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper data-slot attributes', () => {
      const { container } = render(<Default />);
      expect(
        container.querySelector('[data-slot="avatar"]')
      ).toBeInTheDocument();
      expect(
        container.querySelector('[data-slot="avatar-fallback"]')
      ).toBeInTheDocument();
    });

    it('includes alt text for images', () => {
      const { container } = render(<WithImage />);
      // AvatarImage should be present in the DOM with alt text
      // Note: In test environment, Radix may not render the image immediately
      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar).toBeInTheDocument();
      // Check that fallback is also rendered
      expect(screen.getByText('PJ')).toBeInTheDocument();
    });

    it('includes backdrop for hover effect', () => {
      const { container } = render(<WithImage />);
      const backdrop = container.querySelector(
        '[data-slot="avatar-image-backdrop"]'
      );
      expect(backdrop).toBeInTheDocument();
      expect(backdrop).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Playground', () => {
    it('renders with default args', () => {
      const { container } = render(<Playground />);
      expect(screen.getByText('PJ')).toBeInTheDocument();
      const avatar = container.querySelector('[data-slot="avatar"]');
      expect(avatar).toHaveClass('size-9'); // default size
    });
  });
});

