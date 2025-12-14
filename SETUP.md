# Setup Guide - Battery Analytics Dashboard

## Quick Start

Follow these steps to get the dashboard running locally:

### Step 1: Install Node.js
- Download and install Node.js 18+ from [nodejs.org](https://nodejs.org/)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

### Step 2: Clone and Install
```bash
# Clone the repository
git clone <your-repo-url>
cd zenfinity/dashboard

# Install dependencies
npm install
```

### Step 3: Run Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
- The terminal will show: `Local: http://localhost:5173`
- Open this URL in your browser
- The dashboard should load and connect to the API automatically

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (outputs to `dist/` folder)
- `npm run preview` - Preview production build locally

## Project Structure

```
dashboard/
├── src/
│   ├── components/       # React components
│   ├── api.ts           # API service layer
│   ├── types.ts         # TypeScript definitions
│   ├── App.tsx          # Main application
│   └── main.tsx         # Entry point
├── public/              # Static assets
├── index.html           # HTML template
├── vite.config.ts      # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## Environment

- **Development**: Uses Vite proxy to handle CORS
- **Production**: Makes direct API calls to the Zenfinity API

## API Endpoints

The dashboard uses the following API endpoints:
- `GET /api/snapshots/summary` - Get battery summaries
- `GET /api/snapshots?imei={imei}` - Get cycle snapshots
- `GET /api/snapshots/{imei}/latest` - Get latest snapshot
- `GET /api/snapshots/{imei}/cycles/{cycle}` - Get specific cycle

## Troubleshooting

### Port Already in Use
If port 5173 is busy, Vite will automatically use the next available port.

### API Connection Issues
- Check your internet connection
- Verify the API is accessible
- Check browser console (F12) for detailed error messages

### Build Errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version (should be 18+)

