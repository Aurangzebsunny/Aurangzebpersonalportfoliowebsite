# Supabase Setup Guide

## ✅ Your Supabase Connection is Ready!

Your portfolio is connected to Supabase with the following credentials:
- **Project ID:** `okodhvecyelxvpnxcids`
- **Project URL:** `https://okodhvecyelxvpnxcids.supabase.co`

## 🚀 Quick Setup Steps

### Step 1: Set Up Database Tables

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/okodhvecyelxvpnxcids
2. Click on the **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `/utils/supabase/setup.sql` file
5. Paste it into the SQL editor
6. Click **Run** to execute the SQL

This will create all necessary tables:
- ✅ projects
- ✅ posts
- ✅ videos
- ✅ certificates
- ✅ jobs
- ✅ reviews
- ✅ qas (Q&A)
- ✅ messages
- ✅ newsletter
- ✅ settings

### Step 2: Enable Realtime (Optional but Recommended)

The SQL script automatically enables realtime for all tables. You can verify this:

1. Go to **Database** → **Replication** in your Supabase dashboard
2. Make sure all tables are enabled for replication
3. If any table is missing, toggle it on

### Step 3: Test the Connection

1. Refresh your portfolio website
2. The app will automatically initialize Supabase with sample data
3. Go to admin panel: `#admin` (default password: `admin123`)
4. Check if all sections show data

### Step 4: Configure Storage (For Image Uploads)

To enable image uploads for projects, posts, certificates, etc.:

1. Go to **Storage** in your Supabase dashboard
2. Create a new bucket called `portfolio-images`
3. Set it to **Public** bucket
4. Add this policy for public access:
   ```sql
   -- Allow public read access
   CREATE POLICY "Public Access"
   ON storage.objects FOR SELECT
   USING ( bucket_id = 'portfolio-images' );

   -- Allow authenticated users to upload
   CREATE POLICY "Authenticated users can upload"
   ON storage.objects FOR INSERT
   WITH CHECK ( bucket_id = 'portfolio-images' AND auth.role() = 'authenticated' );
   ```

## 🎯 What's Already Working

✅ **Real-time Data Sync** - Changes reflect instantly across all users
✅ **All CRUD Operations** - Create, Read, Update, Delete for all content
✅ **Admin Dashboard** - Fully connected to Supabase
✅ **Contact Form** - Messages saved to database
✅ **Aura Assistant** - Lead collection working
✅ **Newsletter** - Email subscriptions saved
✅ **Analytics** - Real-time stats in admin panel

## 🔒 Security Features

✅ **Row Level Security (RLS)** enabled on all tables
✅ **Public read access** for all content
✅ **Public write access** for messages and newsletter only
✅ **Admin authentication** required for content management
✅ **Secure API calls** with Supabase client

## 📊 Data Flow

```
Frontend Components
      ↓
  /utils/storage.tsx
      ↓
  /utils/supabase/client.ts
      ↓
  Supabase Database
      ↓
  Real-time subscriptions
      ↓
  Instant UI updates
```

## 🔄 Real-time Features

All components automatically receive real-time updates:
- New projects appear instantly
- Blog posts update live
- Messages show up immediately in admin
- All changes sync across browser tabs

## 🛠️ Troubleshooting

### Issue: No data showing
**Solution:** 
1. Check browser console for errors
2. Verify SQL setup was executed successfully
3. Check Supabase dashboard → Table Editor to see if tables exist

### Issue: "relation does not exist" error
**Solution:** 
- You need to run the SQL setup script first
- Go to SQL Editor and execute `/utils/supabase/setup.sql`

### Issue: Can't add/edit content
**Solution:**
- Check RLS policies are set correctly
- For admin operations, you might need to authenticate
- Verify your Supabase project URL and anon key are correct

### Issue: Images not uploading
**Solution:**
- Create the `portfolio-images` storage bucket
- Set proper RLS policies for storage
- Make sure bucket is set to public

## 📝 Next Steps

1. ✅ Run the SQL setup script
2. ✅ Test the admin panel
3. ✅ Add your own content
4. ✅ Configure image storage bucket
5. ✅ Customize the sample data
6. ✅ Deploy your portfolio

## 🎨 Customization

You can customize the initial sample data by editing the `initializeSupabase()` function in `/utils/storage.tsx`.

## 📞 Support

If you encounter any issues:
1. Check the browser console for error messages
2. Verify your Supabase dashboard for any issues
3. Review the SQL setup script execution logs
4. Check that your Supabase project is active

Your portfolio is now fully connected to Supabase! 🎉
