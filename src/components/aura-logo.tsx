interface AuraLogoProps {
  className?: string;
  size?: number;
}

export function AuraLogo({ className = "", size = 32 }: AuraLogoProps) {
  // Use consistent colors regardless of theme mode
  // Using dark/high contrast theme colors for all modes
  const colors = {
    background: "var(--aurora-lime-300)",
    center: "var(--aurora-lime-950)",
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 221 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Aura logo"
    >
      <title>Aura</title>
      <rect
        x="0.0844727"
        width="220"
        height="220"
        rx="110"
        fill={colors.background}
        style={{ fill: colors.background }}
      />
      <path
        d="M89.395 135.717C89.395 137.844 90.2329 140.035 91.9087 142.291C95.0024 146.416 99.9331 148.479 106.701 148.479C110.826 148.479 114.467 147.512 117.625 145.578L123.426 160.177C118.399 162.819 112.824 164.141 106.701 164.141C97.0327 164.141 88.4604 160.596 80.9839 153.506C75.9565 148.35 73.4429 142.42 73.4429 135.717C73.4429 135.459 73.4429 135.201 73.4429 134.943C73.4429 122.891 79.5981 114.351 91.9087 109.323L131.257 93.1777C131.257 87.0547 129.227 81.9307 125.167 77.8057C121.106 73.6162 115.982 71.5215 109.794 71.5215C104.38 71.5215 99.6108 73.5518 95.4858 77.6123C91.4897 81.5439 89.4272 86.5068 89.2983 92.501V93.8545L73.8296 100.719V92.2109C73.8296 83.1875 77.6968 74.5508 85.4312 66.3008C92.0054 59.3398 100.32 55.8594 110.375 55.8594C120.429 55.8594 129.001 59.4043 136.091 66.4941C143.181 73.584 146.726 82.1562 146.726 92.2109V157.373L131.257 164.141V110.097L99.4497 123.052C92.7466 126.21 89.395 130.432 89.395 135.717Z"
        fill={colors.center}
        style={{ fill: colors.center }}
      />
    </svg>
  );
}
