
```markdown
# Bouletteproof Dashboard

This project is a Next.js implementation of the Bouletteproof dashboard design from Figma.

## Design Implementation Notes

### Logo Format (.png)
The current implementation uses a `.png` format for the logo. While SVG would be preferable for scalability and performance, `.png` was used for quick implementation during the test phase. In a production environment, it's recommended to switch to an SVG format for better quality across all screen sizes.

### Tables and Charts
The tables and charts in this implementation might display slightly differently from the original Figma design. This is due to:

- Ensuring responsiveness across various screen sizes.
- Optimizing for performance, especially with dynamic data rendering.
- Adhering to accessibility standards, which sometimes requires slight visual adjustments.

These modifications aim to enhance the overall user experience while maintaining the essence of the original design.

## Installation and Running the Project

This project uses **pnpm** as the package manager. Follow these steps to run the project locally:

### 1. Clone the repository
```bash
git clone https://github.com/iradukun/figma-to-nextjs-dashboard.git
```

### 2. Navigate to the project directory
```bash
cd figma-to-nextjs-dashbaord
```

### 3. Install dependencies
```bash
pnpm install
```

### 4. Run the project locally
```bash
pnpm dev
```

The project will be running at `http://localhost:3000`.
