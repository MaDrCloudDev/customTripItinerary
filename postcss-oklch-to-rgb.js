// PostCSS plugin to convert OKLAB/OKLCH colors to RGB for PDF compatibility
export default function oklchToRgb() {
  return {
    postcssPlugin: 'oklch-to-rgb',
    Declaration(decl) {
      // Replace OKLAB/OKLCH color functions with RGB equivalents
      if (decl.value.includes('oklch(') || decl.value.includes('oklab(')) {
        // Mapping of common OKLAB/OKLCH colors to RGB
        const colorMap = {
          // Red colors
          'oklch(97.1% .013 17.38)': '#fef2f2',
          'oklch(93.6% .032 17.717)': '#fee2e2',
          'oklch(88.5% .062 18.334)': '#fecaca',
          'oklch(70.4% .191 22.216)': '#f87171',
          'oklch(63.7% .237 25.331)': '#ef4444',
          'oklch(57.7% .245 27.325)': '#dc2626',
          'oklch(50.5% .213 27.518)': '#b91c1c',
          'oklch(39.6% .141 25.723)': '#7f1d1d',
          
          // Orange colors
          'oklch(98% .016 73.684)': '#fff7ed',
          'oklch(95.4% .038 75.164)': '#ffedd5',
          'oklch(90.1% .076 70.697)': '#fed7aa',
          'oklch(83.7% .128 66.29)': '#fdba74',
          'oklch(75% .183 55.934)': '#fb923c',
          'oklch(70.5% .213 47.604)': '#f97316',
          'oklch(64.6% .222 41.116)': '#ea580c',
          'oklch(55.3% .195 38.402)': '#c2410c',
          'oklch(40.8% .123 38.172)': '#7c2d12',
          
          // Amber colors
          'oklch(87.9% .169 91.605)': '#fcd34d',
          'oklch(76.9% .188 70.08)': '#f59e0b',
          
          // Yellow colors
          'oklch(98.7% .026 102.212)': '#fffbeb',
          'oklch(97.3% .071 103.193)': '#fef3c7',
          'oklch(94.5% .129 101.54)': '#fde68a',
          'oklch(85.2% .199 91.936)': '#facc15',
          'oklch(79.5% .184 86.047)': '#eab308',
          'oklch(68.1% .162 75.834)': '#ca8a04',
          'oklch(55.4% .135 66.442)': '#a16207',
          'oklch(42.1% .095 57.708)': '#713f12',
          
          // Green colors
          'oklch(98.2% .018 155.826)': '#f0fdf4',
          'oklch(96.2% .044 156.743)': '#dcfce7',
          'oklch(92.5% .084 155.995)': '#bbf7d0',
          'oklch(79.2% .209 151.711)': '#4ade80',
          'oklch(72.3% .219 149.579)': '#22c55e',
          'oklch(62.7% .194 149.214)': '#16a34a',
          'oklch(52.7% .154 150.069)': '#15803d',
          'oklch(39.3% .095 152.535)': '#14532d',
          
          // Emerald colors
          'oklch(95% .052 163.051)': '#d1fae5',
          'oklch(69.6% .17 162.48)': '#10b981',
          'oklch(59.6% .145 163.225)': '#059669',
          'oklch(50.8% .118 165.612)': '#047857',
          
          // Teal colors
          'oklch(70.4% .14 182.503)': '#14b8a6',
          
          // Blue colors
          'oklch(97% .014 254.604)': '#eff6ff',
          'oklch(93.2% .032 255.585)': '#dbeafe',
          'oklch(88.2% .059 254.128)': '#bfdbfe',
          'oklch(80.9% .105 251.813)': '#93c5fd',
          'oklch(70.7% .165 254.624)': '#60a5fa',
          'oklch(62.3% .214 259.815)': '#3b82f6',
          'oklch(54.6% .245 262.881)': '#2563eb',
          'oklch(48.8% .243 264.376)': '#1d4ed8',
          'oklch(42.4% .199 265.638)': '#1e40af',
          'oklch(37.9% .146 265.522)': '#1e3a8a',
          
          // Indigo colors
          'oklch(51.1% .262 276.966)': '#4f46e5',
          'oklch(45.7% .24 277.023)': '#4338ca',
          
          // Purple colors
          'oklch(97.7% .014 308.299)': '#faf5ff',
          'oklch(94.6% .033 307.174)': '#f3e8ff',
          'oklch(90.2% .063 306.703)': '#e9d5ff',
          'oklch(71.4% .203 305.504)': '#c084fc',
          'oklch(62.7% .265 303.9)': '#a855f7',
          'oklch(55.8% .288 XXX.321)': '#9333ea',
          'oklch(49.6% .265 301.924)': '#7c3aed',
          'oklch(38.1% .176 304.987)': '#581c87',
          
          // Pink colors
          'oklch(71.8% .202 349.761)': '#f472b6',
          'oklch(65.6% .241 354.308)': '#ec4899',
          
          // Slate colors
          'oklch(96.8% .007 247.896)': '#f1f5f9',
          'oklch(92.9% .013 255.508)': '#e2e8f0',
          'oklch(86.9% .022 252.894)': '#cbd5e1',
          'oklch(70.4% .04 256.788)': '#94a3b8',
          'oklch(55.4% .046 257.417)': '#64748b',
          'oklch(44.6% .043 257.281)': '#475569',
          'oklch(37.2% .044 257.287)': '#334155',
          'oklch(27.9% .041 260.031)': '#1e293b',
          'oklch(20.8% .042 265.755)': '#0f172a',
          
          // Gray colors
          'oklch(98.5% .002 247.839)': '#f9fafb',
          'oklch(96.7% .003 264.542)': '#f3f4f6',
          'oklch(92.8% .006 264.531)': '#e5e7eb',
          'oklch(87.2% .01 258.338)': '#d1d5db',
          'oklch(70.7% .022 261.325)': '#9ca3af',
          'oklch(55.1% .027 264.364)': '#6b7280',
          'oklch(44.6% .03 256.802)': '#4b5563',
          'oklch(37.3% .034 259.733)': '#374151',
          'oklch(27.8% .033 256.848)': '#1f2937',
          'oklch(21% .034 264.665)': '#111827'
        };
        
        let newValue = decl.value;
        for (const [oklch, rgb] of Object.entries(colorMap)) {
          newValue = newValue.replace(new RegExp(oklch.replace(/[()%]/g, '\\$&'), 'g'), rgb);
        }
        
        // Replace color-mix functions
        newValue = newValue.replace(/color-mix\(in oklab,([^,]+) (\d+)%,transparent\)/g, (_, color, alpha) => {
          const alphaValue = parseInt(alpha) / 100;
          // Extract RGB values if the color is already RGB
          if (color.startsWith('#')) {
            const r = parseInt(color.substr(1, 2), 16);
            const g = parseInt(color.substr(3, 2), 16);
            const b = parseInt(color.substr(5, 2), 16);
            return `rgba(${r}, ${g}, ${b}, ${alphaValue})`;
          }
          // If it's a CSS variable, just use alpha
          return `rgba(255, 255, 255, ${alphaValue})`; // fallback
        });
        
        if (newValue !== decl.value) {
          decl.value = newValue;
        }
      }
      
      // Replace gradient directions that use OKLAB
      if (decl.value.includes('in oklab')) {
        decl.value = decl.value.replace(/to\s+\w+\s+in\s+oklab/g, (match) => {
          return match.replace(' in oklab', '');
        });
      }
    }
  };
}

oklchToRgb.postcssPlugin = 'oklch-to-rgb';