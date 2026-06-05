# Slack B2B Application

A modern, full-stack Slack-style collaboration platform built with Next.js, Convex backend, and Clerk authentication.

## Features

- **Team Management**: Create and join teams for collaboration
- **Channel Management**: Public and private channels for different topics
- **Real-time Messaging**: Send and receive messages in channels
- **Authentication**: Secure authentication with Clerk
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Modern UI**: Beautiful interface with smooth animations

## Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- Convex account [Get it here](https://convex.dev)
- Clerk account [Get it here](https://clerk.com)

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd b2bslack
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

4. Configure your Convex project:
   - Go to [Convex Dashboard](https://dashboard.convex.dev)
   - Create a new project
   - Copy the deployment URL (starts with `https://your-project_id.convex.cloud`)
   - Update `NEXT_PUBLIC_CONVEX_URL` in `.env.local`

5. Configure your Clerk authentication:
   - Go to [Clerk Dashboard](https://dashboard.clerk.com)
   - Create a new application
   - Copy your Publishable Key and Secret Key
   - Update the corresponding values in `.env.local`

6. Start the development server:
```bash
pnpm dev
```

7. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
b2bslack/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   ├── page.tsx            # Main application page
│   └── globals.css         # Global styles
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── input.tsx
│   ├── ConvexClientProvider.tsx  # Convex provider setup
│   ├── SendMessage.tsx            # Message input component
│   ├── MessageList.tsx            # Message display component
│   ├── TeamsSidebar.tsx           # Team list sidebar
│   └── ChannelsSidebar.tsx        # Channel list sidebar
├── slack-b2b-app/          # Backend application
│   ├── convex/
│   │   ├── schema.ts              # Database schema
│   │   ├── functions.ts           # Backend functions
│   │   └── myFunctions.ts         # Original functions (kept for compatibility)
│   └── app/
│       ├── page.tsx               # Backend demo page
│       └── server/
│           └── page.tsx           # Server component example
└── lib/
    └── utils.ts                   # Utility functions
```

## Backend Features

### Team Management
- `createTeam`: Create a new team
- `getTeams`: Get all teams for current user
- `searchTeams`: Search teams by name

### Channel Management
- `createChannel`: Create a new channel in a team
- `getChannels`: Get all channels in a team
- `getChannel`: Get a specific channel

### Messaging
- `sendMessage`: Send a message to a channel
- `getMessages`: Get messages from a channel
- `getMessagesByTeam`: Get messages from all channels in a team

### Invitations
- `createInviteToken`: Generate an invite token for a team
- `getInviteUrl`: Validate and get invite URL information

## Data Models

### Teams
- `name`: Team name
- `description`: Team description (optional)
- `createdAt`: Timestamp of creation
- `creatorId`: ID of team creator

### Channels
- `teamId`: Reference to team
- `name`: Channel name
- `type`: 'public' or 'private'
- `description`: Channel description (optional)
- `createdAt`: Timestamp of creation
- `creatorId`: ID of channel creator

### Messages
- `channelId`: Reference to channel
- `teamId`: Reference to team
- `userId`: Reference to user
- `content`: Message content
- `createdAt`: Timestamp
- `mentions`: Array of user IDs mentioned
- `reactions`: Array of reactions

### Users (internal table)
- `username`: User's username
- `email`: User's email
- `image`: Profile picture URL
- `createdAt`: Timestamp
- `teamId`: Current team ID
- `role`: 'owner', 'admin', or 'member'

## Development

### Available Scripts
```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

### Adding New Features

1. **Backend**: Add functions in `slack-b2b-app/convex/`
2. **Frontend**: Create components in `components/`
3. **Types**: Convex automatically generates types from your schema

## Technologies

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **Backend**: Convex (database & serverless functions)
- **Authentication**: Clerk
- **UI Components**: Tailwind CSS with custom components
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **TypeScript**: Full type safety

## Deployment

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Deploy to Convex Vercel
1. Set up Convex in your project
2. Update your Convex deployment URL
3. Deploy with Vercel as described above

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

## Support

For issues and questions:
- [Convex Docs](https://docs.convex.dev)
- [Clerk Docs](https://clerk.com/docs)
- [Next.js Docs](https://nextjs.org/docs)