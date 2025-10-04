# Viking Egypt Cruise Itinerary - Visual Calendar

A SvelteKit 5 + Tailwind CSS 4 application designed for elderly users to view their cruise itinerary in an easy-to-read, printable format.

## ✅ Fixed Issues

The styling issues have been resolved by:

1. **Proper Tailwind CSS 4 Configuration**:

   - Added `@tailwindcss/postcss` plugin
   - Updated PostCSS configuration for Tailwind 4
   - Used `@theme` directive for custom CSS variables

2. **Updated Component Classes**:

   - Replaced custom Tailwind classes with standard ones
   - Fixed color mappings for activity types
   - Ensured all classes are properly defined

3. **Elderly-Friendly Design Features**:
   - Large, high-contrast text (20px base font size)
   - Color-coded activities for easy identification
   - Print-optimized styles with proper margins
   - Clear visual hierarchy with generous spacing

## 🚀 Getting Started

### Development

```bash
npm install
npm run dev
```

Visit: http://localhost:5173

### Production Build

```bash
npm run build
npm run preview
```

Visit: http://localhost:4173

## 🎨 Features

- **Single Day View**: Detailed timeline for each day
- **Timeline View**: Compact overview of daily activities
- **Overview Mode**: See all days at once
- **Print-Friendly**: Optimized for printing with proper page breaks
- **Elderly-Friendly**: Large fonts, high contrast, clear icons
- **Color-Coded Activities**:
  - 🔵 Blue: Excursions & Tours
  - 🟠 Orange: Dining & Meals
  - 🟡 Yellow: Cultural Activities
  - 🟢 Green: Nature & Scenic
  - ⚪ Gray: Free Time
  - 🚌 Yellow: Travel & Transport

## 📱 Navigation

- **Previous/Next Day**: Navigate between days
- **View Modes**: Switch between single day, timeline, and overview
- **Print Button**: Print current view
- **Day Selector**: Jump to specific days

## 🖨️ Printing

The application is optimized for printing with:

- Proper page margins for binding
- High contrast black/white styling
- Page breaks between days
- Clear activity boundaries

## 🛠️ Technical Stack

- **SvelteKit 5**: Modern web framework
- **Tailwind CSS 4**: Utility-first CSS framework
- **TypeScript**: Type-safe development
- **Vite**: Fast build tool

## 📋 Project Structure

```
src/
├── routes/
│   ├── +layout.svelte    # Main layout with CSS imports
│   └── +page.svelte      # Main itinerary page
├── lib/
│   ├── components/
│   │   └── TimeSlotCard.svelte  # Individual time slot component
│   ├── data/
│   │   └── itinerary.json       # Cruise data
│   └── types/
│       └── itinerary.ts         # TypeScript interfaces
├── app.css               # Global styles with Tailwind
└── app.html             # HTML template
```

The styling is now fully functional and the application should display properly with all Tailwind CSS classes working correctly.
