# Quick Start Script

Use this guide to quickly set up your portfolio with sample data.

## Step 1: Create Admin Account

Open browser console (F12) and run:

```javascript
// STEP 1: Create your admin account
const signupData = {
  email: 'admin@aurangzebsunny.com',  // Change this to your email
  password: 'SecurePass123!',          // Change this to your password
  name: 'Aurangzeb Sunny'
};

// Get your Supabase info from the info file
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-abd2a1f4/auth/signup', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_ANON_KEY'
  },
  body: JSON.stringify(signupData)
})
.then(r => r.json())
.then(data => {
  console.log('Admin account created:', data);
  console.log('Now login using the email and password you set');
});
```

## Step 2: Login to Admin Panel

1. Click "Admin Panel Login" in the footer (or go to #admin)
2. Enter your email and password
3. You're now logged in!

## Step 3: Add Your First Project

In the admin panel:
1. Go to Projects
2. Click "Add Project"
3. Fill in:
   - **Title**: "E-Commerce Redesign"
   - **Description**: "Complete UI/UX redesign focusing on user experience"
   - **Category**: UI/UX
   - **Image URL**: Use Unsplash or your own image
   - **Project URL**: Your project link (optional)

## Step 4: Add Your First Blog Post

1. Go to Posts
2. Click "Add Post"
3. Fill in the details
4. Your first post is live!

## Populate Sample Data (Optional)

If you want to quickly populate with sample data, run this in the console after logging in:

```javascript
// Get your token from localStorage
const token = localStorage.getItem('admin_token');

// Sample project
fetch('https://YOUR_PROJECT_ID.supabase.co/functions/v1/make-server-abd2a1f4/projects', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: "E-Commerce Platform",
    description: "Modern e-commerce redesign with focus on UX",
    category: "UI/UX",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
    projectUrl: "https://example.com"
  })
})
.then(r => r.json())
.then(data => console.log('Project added:', data));
```

## Tips

1. **Images**: Use Unsplash URLs for high-quality images
   - Example: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800`

2. **YouTube Videos**: Use full YouTube URLs
   - Example: `https://www.youtube.com/watch?v=VIDEO_ID`

3. **Categories**: Stick to the defined categories for consistency
   - Projects: UI/UX, Branding, SEO, Framer, Development
   - Posts: Design, Development, Marketing, Business

4. **Order Matters**: For Q&A items, use the `order` field to control display sequence

## Next Steps

1. ✅ Create admin account
2. ✅ Login to admin panel
3. ✅ Add projects
4. ✅ Add blog posts
5. ✅ Add videos
6. ✅ Add certificates
7. ✅ Add job history
8. ✅ Add client reviews
9. ✅ Add Q&A items
10. ✅ Customize personal info in components

## Customization Checklist

- [ ] Update email in Hero.tsx
- [ ] Update email in Contact.tsx
- [ ] Update WhatsApp link in Contact.tsx
- [ ] Update social media links in Footer.tsx
- [ ] Update resume link in Navigation.tsx
- [ ] Update current roles in About.tsx
- [ ] Update skills in About.tsx
- [ ] Customize AI responses in server/index.tsx

---

You're all set! Start adding your real content and make it yours! 🚀
