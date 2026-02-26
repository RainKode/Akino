# Akino Studio — SEO Setup Guide (Step-by-Step)

Everything you need to do to get your website found on Google and social media. Follow these steps in order.

---

## STEP 1: Verify Your Site on Google Search Console (5 minutes)

This tells Google your website exists and to start showing it in search results.

1. Open your browser and go to: **https://search.google.com/search-console**
2. Sign in with your Google account (use the one you want to manage the site with)
3. On the left, click **"Add Property"**
4. Choose **"Domain"** (not URL prefix)
5. Type in: **akinostudio.com** (without https://)
6. Google will give you a **TXT record** — it looks something like: `google-site-verification=xxxxxxxxxxxxxx`
7. **Copy that TXT record**

### Now go to Hostinger to paste it:

8. Open a new tab and log into **Hostinger** → https://hpanel.hostinger.com
9. Click on your **akinostudio.com** website
10. In the left sidebar, click **"Domains"** → then **"DNS / Nameservers"** (or just search "DNS" in the search bar)
11. Scroll down to the DNS records section
12. Click **"Add Record"**
13. Set the **Type** to: **TXT**
14. In the **Name** field, type: **@**
15. In the **TXT Value** field, **paste** the code Google gave you
16. Set **TTL** to: **14400** (or leave as default)
17. Click **"Add Record"**
18. Go back to Google Search Console and click **"Verify"**
    - If it says "Verification failed", **wait 5-10 minutes** and try again (DNS changes take a little time)

### Submit your sitemap:

19. Once verified, in Google Search Console, click **"Sitemaps"** in the left sidebar
20. In the box that says "Add a new sitemap", type: **sitemap.xml**
21. Click **"Submit"**
22. You should see it say **"Success"** — Google will now crawl your site!

---

## STEP 2: Set Up Google Analytics (10 minutes)

This lets you see how many people visit your site, where they come from, and what they click.

1. Go to: **https://analytics.google.com**
2. Sign in with the same Google account
3. Click **"Start measuring"**
4. **Account name**: Type **Akino Studio**
5. Click **Next**
6. **Property name**: Type **Akino Studio Website**
7. Select your **time zone** and **currency**
8. Click **Next**
9. Choose **Small business** for the business size
10. Check **"Examine user behavior"** and click **Create**
11. Accept the terms
12. Choose **"Web"** as the platform
13. Enter your website URL: **https://akinostudio.com**
14. Stream name: **Akino Studio**
15. Click **"Create stream"**
16. You'll see a **Measurement ID** that looks like: **G-XXXXXXXXXX**
17. You'll also see a code snippet under **"View tag instructions"** → **"Install manually"**
18. **Copy the entire code snippet** — it looks like this:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

19. **Send this code to your developer** (or me) and I'll add it to your website's `index.html` file

---

## STEP 3: Add Your Website Link to All Social Media Profiles (10 minutes)

These are free backlinks that tell Google "these profiles belong to akinostudio.com."

### LinkedIn:
1. Go to: **https://www.linkedin.com/company/akinostudio**
2. Click the **pencil/edit icon** near the top of your page
3. Find the **"Website"** field
4. Enter: **https://akinostudio.com**
5. Click **Save**

### Instagram:
1. Open Instagram → Go to your **@studio.akino** profile
2. Tap **"Edit Profile"**
3. Find the **"Website"** field
4. Enter: **https://akinostudio.com**
5. Tap **Save** (or the checkmark)

### YouTube:
1. Go to: **https://www.youtube.com/@AkinoStudio**
2. Click **"Customize channel"**
3. Go to the **"Basic info"** tab
4. Scroll down to **"Links"**
5. Click **"Add link"**
6. Title: **Website** — URL: **https://akinostudio.com**
7. Click **"Publish"** in the top right

### TikTok:
1. Open TikTok → Go to your **@akinostudio** profile
2. Tap **"Edit Profile"**
3. Find the **"Website"** field (you may need a business account for this)
4. Enter: **https://akinostudio.com**
5. Tap **Save**

---

## STEP 4: Set Up Google Business Profile (15 minutes — optional but recommended)

If you have any kind of office/studio location, this gets you on Google Maps and local search.

1. Go to: **https://business.google.com**
2. Click **"Manage now"**
3. Search for your business name: **Akino Studio**
4. If it doesn't exist, click **"Add your business to Google"**
5. Business name: **Akino Studio**
6. Category: **Video production service** (start typing and it will suggest it)
7. Add your location if you have one (or select "I deliver to customers" if you're fully remote)
8. Add your website: **https://akinostudio.com**
9. Add your phone number (optional)
10. Click **Finish** and follow the verification steps (Google may send a postcard or call you)

---

## STEP 5: Submit to Agency Directories (30 minutes)

These are websites that list video production agencies. Being listed = a backlink + potential clients finding you.

### Clutch.co (most important):
1. Go to: **https://clutch.co/agencies/register**
2. Sign up for a free account
3. Company name: **Akino Studio**
4. Service focus: **Video Production**
5. Website: **https://akinostudio.com**
6. Fill in your company description, services, and client list
7. Submit — approval takes a few days

### DesignRush:
1. Go to: **https://www.designrush.com/agency/register**
2. Register your agency
3. Category: **Video Production Agencies**
4. Fill in your details and website URL
5. Submit

### The Manifest:
1. Go to: **https://themanifest.com/agencies/register**
2. Same process — register, fill in details, submit

### ProductionHub:
1. Go to: **https://www.productionhub.com/join**
2. Create a free profile
3. Add your services, portfolio, and website link

---

## STEP 6: Ask Your Clients for Backlinks (ongoing)

Backlinks from other websites are the #1 factor for ranking higher on Google.

### What to ask your clients:

Send this message to Doctor ER, Jaydone History, and any other clients:

> **Subject: Quick favor — link to our studio?**
>
> Hey [Name],
>
> Really enjoyed working together on [project]. Would you mind adding a credit/link to us on your website or YouTube channel description? Something like:
>
> "Video production by Akino Studio — https://akinostudio.com"
>
> It really helps us out! Happy to return the favor.
>
> Thanks!

### YouTube descriptions:

For every video you upload on your **own** YouTube channel, add this at the bottom of the description:

```
🎬 Akino Studio — Video Production Agency
🌐 https://akinostudio.com
📸 Instagram: https://instagram.com/studio.akino
💼 LinkedIn: https://www.linkedin.com/company/akinostudio
```

---

## STEP 7: Things Already Done (no action needed)

These are already set up in your website code:

- ✅ SEO meta tags (title, description, keywords)
- ✅ Open Graph tags (social media preview cards)
- ✅ Twitter Card tags
- ✅ OG Image (your logo appears when links are shared)
- ✅ Canonical URL
- ✅ robots.txt (tells search engines to crawl your site)
- ✅ sitemap.xml (lists all your pages for Google)
- ✅ Structured data — Organization schema (Google knows you're a video production company)
- ✅ Structured data — FAQ schema (your FAQ questions can appear directly in Google search results)
- ✅ Structured data — Service schema (Google knows your service offerings)
- ✅ Proper heading structure (h1, h2 tags)
- ✅ Accessibility improvements (alt text, aria labels)
- ✅ Privacy Policy page with SEO title

---

## Quick Reference Checklist

| # | Task | Time | Done? |
|---|------|------|-------|
| 1 | Google Search Console + submit sitemap | 5 min | ☐ |
| 2 | Google Analytics (get the code, send to developer) | 10 min | ☐ |
| 3 | Add website to LinkedIn profile | 2 min | ☐ |
| 4 | Add website to Instagram profile | 2 min | ☐ |
| 5 | Add website to YouTube channel | 2 min | ☐ |
| 6 | Add website to TikTok profile | 2 min | ☐ |
| 7 | Google Business Profile (if you have a location) | 15 min | ☐ |
| 8 | Register on Clutch.co | 10 min | ☐ |
| 9 | Register on DesignRush | 10 min | ☐ |
| 10 | Register on The Manifest | 10 min | ☐ |
| 11 | Ask clients for backlinks | ongoing | ☐ |
| 12 | Add studio link to all YouTube descriptions | ongoing | ☐ |

---

## When You Get the Google Analytics Code

Once you have the Google Analytics code snippet (Step 2, item 18), send it to me and I'll add it to your website in under a minute.

---

*Last updated: February 26, 2026*
