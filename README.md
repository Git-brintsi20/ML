# ML Progress Tracker - React + Firebase

A beautiful, modern web app to track your ML learning journey with firebase email authentication and real-time data sync.

## 🚀 Features

- **Progress Tracking**: 5 levels of ML curriculum with 40+ tasks
- **Growth Log**: Document learnings, builds, wins, internships, and blockers
- **Daily Habits**: Track habits across 7 days (watch videos, code, read, kaggle, write)
- **Profile Management**: Customize your profile and platform links
- **Real-time Sync**: All progress syncs to Firebase and persists across devices
- **Beautiful UI**: Dark theme with purple/teal accents

## 📋 Prerequisites

- Node.js 18+ and npm
- Firebase project (free tier is sufficient)
- GitHub account (for Vercel deployment)
- Vercel account (free tier available)

## 🔧 Setup Instructions

### 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing):
   - Click "Create Project"
   - Enter project name (e.g., "ml-progress-tracker")
   - Disable Google Analytics (optional)
   - Click "Create Project"

3. Enable Authentication:
   - In left menu, go to **Authentication** → **Get Started**
   - Click **Email/Password** provider
   - Enable it and save

4. Create Firestore Database:
   - In left menu, go to **Firestore Database**
   - Click "Create Database"
   - Select "Start in test mode"
   - Choose region (closest to you)
   - Click "Create"

5. Get Firebase Config:
   - Go to **Project Settings** (gear icon, top-right)
   - Scroll to "Your apps" section
   - If no app, click "Add app" → Web (</>) icon
   - Copy the Firebase config object

6. Set Firestore Security Rules:
   - Go to **Firestore Database** → **Rules** tab
   - Replace with this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid} {
      allow read, write: if request.auth.uid == uid;
    }
  }
}
```
   - Click "Publish"

### 2. Local Development Setup

1. Clone or copy the repository:
```bash
cd /path/to/ml-progress-tracker
```

2. Create `.env.local` file:
```bash
cp .env.example .env.local
```

3. Fill in Firebase config in `.env.local`:
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

4. Install dependencies:
```bash
npm install
```

5. Run development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in browser
   - Click "Sign Up"
   - Use test email: `shiki2hustle@gmail.com`
   - Enter any password
   - Start tracking!

### 3. Deploy to Vercel

1. **Push to GitHub**:
   - Initialize git repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: ML Progress Tracker"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/ml-progress-tracker.git
   git push -u origin main
   ```

2. **Create Vercel Account & Deploy**:
   - Go to [Vercel](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Configure environment variables:
     - Add all 6 `NEXT_PUBLIC_FIREBASE_*` variables
     - Click "Deploy"

3. **Test Live App**:
   - Wait for deployment to complete
   - Click on your deployment URL
   - Sign up with your email
   - Verify data syncs to Firebase ✓

## 📁 Project Structure

```
app/
├── page.tsx                 # Root page (redirects to dashboard)
├── layout.tsx              # Root layout + auth provider
├── login/page.tsx          # Login/signup page
├── dashboard/page.tsx      # Main dashboard layout
├── components/
│   ├── Sidebar.tsx         # Navigation & stats
│   ├── LevelsPanel.tsx     # Progress tasks
│   ├── GrowthLog.tsx       # Entry management
│   ├── HabitsPanel.tsx     # Daily habits
│   └── ProfilePanel.tsx    # Profile & platform links
├── hooks/
│   ├── useAuth.ts          # Auth context & hook
│   ├── useUserProfile.ts   # Profile data sync
│   ├── useTaskProgress.ts  # Tasks data sync
│   ├── useHabits.ts        # Habits data sync
│   ├── useGrowthEntries.ts # Entries data sync
│   └── usePlatforms.ts     # Platforms data sync
├── lib/
│   ├── firebase.ts         # Firebase config
│   ├── auth.ts             # Auth functions
│   ├── db.ts               # Firestore CRUD
│   └── data.ts             # Levels & habits data
└── styles/
    └── globals.css         # Global styles & theme
```

## 🔑 Key Features

### Authentication
- Email/password registration and login
- Persistent sessions (handled by Firebase)
- Auto-redirect to login if not authenticated

### Data Sync
- Real-time Firestore listener for all data
- Automatic save on changes
- Offline support (changes sync when back online)

### UI Components
- Dark theme with purple/teal accents
- Responsive design for mobile and desktop
- Smooth animations and transitions
- Modal forms for entry/platform editing

## 🎯 Usage

1. **Sign Up**: Create account with email
2. **Track Progress**: Check off tasks as you complete them
3. **Log Entries**: Document your learning journey
4. **Build Habits**: Track daily habits across the week
5. **Edit Profile**: Add bio, platforms, and customize profile
6. **Cross-device Sync**: Sign in anywhere and see your data

## 📝 Example Workflow

1. Complete a machine learning task → Check it off in Progress tab
2. Learn something new → Add entry in Growth Log tab
3. Code for the day → Check off "Write/commit code" in Habits tab
4. Update profile → Add Kaggle/GitHub URLs in Profile tab
5. All changes sync to Firebase in seconds ✓

## 🐛 Troubleshooting

### "Cannot find environment variables"
- Make sure `.env.local` exists in root directory
- Restart dev server after adding env vars
- Check that variable names are correct (with `NEXT_PUBLIC_` prefix)

### "Sign in fails"
- Verify Email/Password auth is enabled in Firebase Console
- Check that Firestore Database is created
- Confirm security rules are set correctly

### "Data not syncing"
- Check browser console for errors
- Verify Firestore rules allow your user (check Firebase Console logs)
- Try signing out and back in

## 🎨 Customization

Edit `app/lib/data.ts` to:
- Modify levels and tasks
- Change habit labels
- Update curriculum

Edit `tailwind.config.js` to:
- Change color scheme
- Adjust font sizes
- Modify theme variables

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Deployment](https://vercel.com/docs)

## 🚀 Next Steps

- Customize the ML curriculum for your learning path
- Add more habit categories
- Create team/shared tracking (requires schema changes)
- Export progress as PDF
- Add dark/light theme toggle

---

**Happy learning! Track your growth and celebrate the progress.** 🎉
