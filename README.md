# Zenfinity Energy - Battery Analytics Dashboard

A comprehensive battery analytics dashboard built with React, TypeScript, and Vite. This dashboard visualizes battery cycle data from the Zenfinity Energy API, providing insights into battery performance, health, and usage patterns.

## Features

- **Cycle Navigation**: Navigate through battery cycles using a slider, dropdown, or navigation buttons
- **Cycle Statistics**: Display key metrics including cycle number, start/end times, duration, and SOH drop
- **Performance Metrics**: Visualize average speed, maximum speed, and total distance traveled
- **Temperature Distribution**: Interactive histogram showing time spent in various temperature ranges with toggleable sampling rates (5°C, 10°C, 15°C, 20°C)
- **Battery Health**: Visualizations for State of Charge (SOC) and voltage trends
- **Alerts & Safety**: Clear display of warnings and protection events
- **Charging Insights**: Statistics and analysis of charging events
- **Additional Insights**: Automated pattern detection and insights
- **Long-term Trends**: Analyze battery health degradation, SOC trends, temperature patterns, and distance/speed over multiple cycles

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Recharts** - Charting library
- **date-fns** - Date formatting utilities

## Getting Started

### Prerequisites

- **Node.js** 18 or higher ([Download here](https://nodejs.org/))
- **npm** (comes with Node.js) or **yarn**

### Installation & Running Locally

1. **Clone the repository:**
```bash
git clone <your-repo-url>
cd zenfinity/dashboard
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser:**
   - The terminal will display a local URL (typically `http://localhost:5173`)
   - Open this URL in your browser to view the dashboard

### Development Notes

- The development server uses a proxy configuration to handle CORS issues
- Hot module replacement (HMR) is enabled for instant updates during development
- Check the browser console (F12) for any API response logs or errors

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## API Access

The dashboard connects to the Zenfinity Energy API at:
```
https://zenfinity-intern-api-104290304048.europe-west1.run.app
```

**Authorized IMEIs:**
- `865044073967657`
- `865044073949366`

## Project Structure

```
dashboard/
├── src/
│   ├── components/          # React components
│   │   ├── IMEISelector.tsx
│   │   ├── CycleNavigation.tsx
│   │   ├── CycleStatistics.tsx
│   │   ├── PerformanceMetrics.tsx
│   │   ├── TemperatureDistribution.tsx
│   │   ├── BatteryHealth.tsx
│   │   ├── AlertsSafety.tsx
│   │   ├── ChargingInsights.tsx
│   │   ├── AdditionalInsights.tsx
│   │   └── LongTermTrends.tsx
│   ├── api.ts              # API service functions
│   ├── types.ts            # TypeScript type definitions
│   ├── App.tsx             # Main app component
│   ├── App.css             # App-specific styles
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Features in Detail

### Cycle Navigation
- Slider for quick navigation
- Dropdown selector for direct cycle selection
- Previous/Next buttons for sequential navigation

### Temperature Distribution
- Histogram visualization of time spent in temperature ranges
- Toggle between 5°C, 10°C, 15°C, and 20°C sampling rates
- Shows total time and distribution patterns

### Battery Health
- SOC visualization showing min, average, and max values
- Voltage trends (min, average, max)
- Visual representation of battery state during cycle

### Long-term Trends
- **SOH Degradation Curve**: Tracks battery health decline over cycles
- **SOC Trends**: Shows average, min, and max SOC patterns
- **Temperature Trends**: Monitors operating temperature over time
- **Distance & Speed**: Analyzes usage patterns when GPS data is available

## Deployment

This dashboard can be deployed to platforms like:
- **Vercel**: Connect your GitHub repo and deploy automatically
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use the `gh-pages` package for deployment

### Deploying to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect Vite and configure the build settings
4. Deploy!

## Troubleshooting

### Common Issues

**"Failed to fetch" or CORS errors:**
- Make sure the dev server is running (`npm run dev`)
- The Vite proxy should handle CORS automatically in development
- If issues persist, check the browser console for detailed error messages

**"Invalid response format" error:**
- Check the browser console for the actual API response
- The API might be temporarily unavailable
- Verify you're using one of the authorized IMEIs

**Blank page after loading:**
- Open browser console (F12) to check for JavaScript errors
- Error boundaries should display error messages instead of blank pages
- Try refreshing the page

### API Access

The dashboard connects to the Zenfinity Energy API. In development, requests are proxied through the Vite dev server to avoid CORS issues. In production, the app makes direct API calls.

## License

This project is created for the Zenfinity Energy Frontend Intern Assignment.

