This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Documentation

This project is a web application designed to create and manage external tiles with customizable colors. The application uses React for the frontend and Next.js for server-side rendering. The key features include opening new tiles in separate windows, updating their colors dynamically, and maintaining synchronization between the main window and the external tiles.

- Components

1. SingleTilePreviewContainer - Purpose: This component represents a preview of a single tile. It displays the tile's current color and provides functionality to focus on the tile window or change its color. - Props:
   singleTile: An object containing attributes of the tile such as its color, position, and the reference to its popup window. - tiles: An array of all tile objects. - setTiles: A function to update the tiles array. - selectedTileWindowRef: A reference to the currently selected tile's window. - Functionality: - Opens or focuses an existing tile window. - Updates the tile's color both in the main window and the external window. - Provides a hidden color input and an icon to trigger the color picker.
2. Tile - Purpose: This is the content of the external tile window. It listens for messages from the main window to update its background color. - State: - backgroundColor: Stores the current background color of the tile. - Functionality:
   Listens for postMessage events from the main window to change its background color.
   Updates its background color based on the received message.
3. LandingPage - Purpose: This is the main landing page of the application. It allows users to create new tiles and manage existing ones. - State: - tiles: An array of tile objects representing all the created tiles. - chosenColor: The color selected by the user to be used for new tiles. - Functionality:
   1.Provides a color picker to choose the color for new tiles.
   2.Opens a new tile window and initializes its attributes (position, color, etc.).
   3.Displays all created tiles using the SingleTilePreviewContainer component. - Key Features:
   1.Dynamic Tile Creation: Users can create new tiles which open in separate browser windows.
   2.Color Customization: Each tile's color can be customized using a color picker.
   3.Window Synchronization: The main window and the external tile windows stay in sync with respect to tile colors.
   4.Persistent State: The application maintains the state of all tiles, including their colors and positions.

- Usage: - Users can select a color using the color picker on the landing page. - Clicking the "Click Here" button will open a new tile window with the selected color and add it to the list of tiles. - Managing Existing Tiles: Each tile preview on the landing page allows users to focus on the corresponding tile window or change its color. - Changing the color of a tile will update both the preview and the actual tile window.

- Technical Details: - React: The application is built with React for efficient UI rendering and state management. - Next.js: Used for server-side rendering and creating a performant, SEO-friendly web application. - PostMessage API: Utilized for communication between the main window and the external tile windows to keep them in sync. - Bootstrap: Used for styling the application and providing a responsive layout.

This documentation provides an overview of the project's structure, components, and functionalities without delving into the specific code details.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
