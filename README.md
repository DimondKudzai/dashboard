A clean React dashboard that fetches and displays users from an API. Built with hooks, search filtering, and detail views.

**Live Demo**: https://dashboard-one-weld-48.vercel.app/ 
**API**: [Jsonplaceholder](https://jsonplaceholder.typicode.com/users) – Free REST API for testing

✨ Features
- **Fetch users** from `GET https://jsonplaceholder.typicode.com/users`
- **Search users** by first/last name in real-time
- **Detail view** – click any user to see avatar, email, ID
- **Loading + error states** with proper UI feedback
- **Responsive design** – works on mobile & desktop
- **API key handled** 

🛠 Tech Stack
- **React 18** – Functional components + Hooks
- **Vite** – Dev server + build tool
- **Fetch API** – No axios needed
- **CSS** – Custom styling, no frameworks
- **Jsonplaceholder** – Test data source

📸 Preview
![Dashboard Screenshot](https://dashboard-one-weld-48.vercel.app/)
> Live demo to `dashboard`

🔧 Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/dimondkudzai/dashboard.git
   cd dashboard
2. *Install deps*
   npm install
3. *Start dev server*
   npm run dev
   Open http://localhost:5173

📦 Build for Deploy
npm run build
npm run preview
Output goes to `/dist` – upload this folder to Vercel, Netlify, or GitHub Pages.

🔑 API Setup
The API is oublic and free no key required


📁 Project Structure
src/
├── App.jsx       # Fetch logic, search, state management
├── App.css       # All styles: .home, .loading, .error, .profile
├── main.jsx      # React 18 createRoot entry point
└── assets/       # Images
🔗 Key Code Snippet
useEffect(() => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(res => res.json())
    .then(data => setUsers(data.data))
    .catch(() => setError(true));
}, []);
🚀 Deploy to Vercel
1. Push to GitHub
2. http://Vercel.com → New Project → Import Repo
3. Framework: Vite → Deploy

Auto-deploys on every `git push` to `main`.

🐛 Common Issues
Error	Fix
`users.map is not a function`	Use `data.data` not `data`
Blank screen	Check browser console for CORS/API errors
📬 Contact
*Your Name* – Harare, Zimbabwe  
Email: diamondkudzai70@gmail.com  
GitHub: https://github.com/dimondkudzai
