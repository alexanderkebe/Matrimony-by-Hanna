// Country flag component using country-flag-icons package SVGs
// We'll use inline SVG data for the most common flags to avoid external dependencies

const flagSvgs: Record<string, string> = {
  ET: "🇪🇹", // Ethiopia
  US: "🇺🇸", // USA
  CA: "🇨🇦", // Canada
  GB: "🇬🇧", // UK
  DE: "🇩🇪", // Germany
  FR: "🇫🇷", // France
  IT: "🇮🇹", // Italy
  NL: "🇳🇱", // Netherlands
  SE: "🇸🇪", // Sweden
  NO: "🇳🇴", // Norway
  AE: "🇦🇪", // UAE
  SA: "🇸🇦", // Saudi Arabia
  KE: "🇰🇪", // Kenya
  NG: "🇳🇬", // Nigeria
  ZA: "🇿🇦", // South Africa
  EG: "🇪🇬", // Egypt
  IN: "🇮🇳", // India
  CN: "🇨🇳", // China
  JP: "🇯🇵", // Japan
  KR: "🇰🇷", // South Korea
  AU: "🇦🇺", // Australia
  NZ: "🇳🇿", // New Zealand
  BR: "🇧🇷", // Brazil
  MX: "🇲🇽", // Mexico
}

interface CountryFlagProps {
  iso: string
  className?: string
}

export function CountryFlag({ iso, className }: CountryFlagProps) {
  // Use flag-icons CDN for actual flag images
  return (
    <img
      src={`https://flagcdn.com/w40/${iso.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w80/${iso.toLowerCase()}.png 2x`}
      alt={`${iso} flag`}
      className={className || "w-6 h-4 object-cover rounded-sm"}
      loading="lazy"
    />
  )
}
