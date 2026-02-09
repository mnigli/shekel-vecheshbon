# פרומפט לבניית שִׁקְלוֹן ב-Lovable

> העתק את כל הטקסט הזה לתוך Lovable Chat כדי לבנות את האפליקציה.
> חבר את הפרויקט ל-GitHub repo: https://github.com/mnigli/shekel-vecheshbon

---

## 🎯 סקירה כללית

בנה לי אתר חדשות פיננסיות מלא בשם **שִׁקְלוֹן** (Shiklon) — פלטפורמה פיננסית בעברית עם כיוון RTL, המיועדת לקהל ישראלי שרוצה להבין שווקים גלובליים ומקומיים. האתר כולל כתבות, אנציקלופדיה פיננסית, מדריכים, כלים, שאלות ותשובות, פודקאסטים, ומערכת ניהול תוכן (CMS) עם צוות כותבים.

**שם המותג**: שִׁקְלוֹן
**כותרת משנה**: שקל וחשבון — הדרך למיליון
**שפה**: עברית (RTL)
**Stack**: React + TypeScript + Tailwind CSS + shadcn/ui + Supabase

### 📦 קוד מקור קיים
- **GitHub Repo**: https://github.com/mnigli/shekel-vecheshbon
- **Live Demo**: https://mnigli.github.io/shekel-vecheshbon/
- **Stack נוכחי**: React 19 + Vite 7 + TypeScript + TailwindCSS v4

סנכרן את הפרויקט ל-GitHub repo הזה. השתמש בעיצוב, במבנה ובתוכן שקיימים שם כבסיס, ובנה על גביו עם Supabase backend והתוספות המפורטות למטה.

---

## 🎨 מערכת עיצוב (Design System)

### צבעים
- **רקע כהה (Header/Footer)**: `#111111`
- **אקסנט זהב**: `#c8a951` (זהב מלכותי — צבע המותג)
- **אקסנט בהיר**: `#e8d9a0`
- **רקע עמוד**: `#f8f7f4` (שמנת חמה)
- **רקע כרטיסים**: `#ffffff`
- **גבולות**: `#e5e2db`
- **טקסט ראשי**: `#111111`
- **טקסט משני**: `#5c5a55`
- **טקסט שלישוני**: `#9c9890`

### פונטים
- **עברית**: Heebo (משקלים: 300, 400, 500, 700)
- **אנגלית/מספרים**: Inter (משקלים: 400, 500, 600, 700)

### סגנון עיצוב
- **אסתטיקה**: מגזין לוקסוס עריכתי — נקי, מינימלי, עם נגיעות זהב
- **רכיבי UI**: השתמש ב-shadcn/ui components (Card, Button, Input, Dialog, Accordion, Tabs, DropdownMenu)
- **פינות מעוגלות**: `rounded-xl` (12px) על כרטיסים ורכיבים
- **צל עדין**: על כרטיסים וסרגל ניווט
- **אנימציות**: fadeInUp חלק על כרטיסים, זהב sweep על כותרות סקשנים
- **הכל RTL** — כיוון ימין לשמאל, `dir="rtl"` על ה-HTML

---

## 🗄️ Supabase Backend

### חבר Supabase לפרויקט וצור את הטבלאות הבאות:

### טבלה: profiles (פרופילי משתמשים)
```sql
create table profiles (
  id uuid references auth.users primary key,
  full_name text,
  role text check (role in ('admin', 'editor', 'writer')) default 'writer',
  avatar_url text,
  created_at timestamptz default now()
);

-- RLS: כל אחד קורא, רק בעלים מעדכנים
alter table profiles enable row level security;
create policy "Public profiles" on profiles for select using (true);
create policy "Users update own" on profiles for update using (auth.uid() = id);
```

### טבלה: categories (קטגוריות)
```sql
create table categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  color text,
  bg_color text,
  scope text check (scope in ('world', 'israel')) not null,
  sort_order int default 0
);
```

### טבלה: articles (כתבות)
```sql
create table articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  content text, -- rich text / markdown
  category_id uuid references categories(id),
  author_id uuid references profiles(id),
  published_at timestamptz,
  image_url text,
  is_featured boolean default false,
  is_trending boolean default false,
  tags text[],
  status text check (status in ('draft', 'review', 'published')) default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: כולם קוראים published, כותבים רואים שלהם, עורכים רואים הכל
alter table articles enable row level security;
create policy "Public read published" on articles for select using (status = 'published');
create policy "Writers see own" on articles for select using (auth.uid() = author_id);
create policy "Writers insert" on articles for insert with check (auth.uid() = author_id);
create policy "Writers update own" on articles for update using (auth.uid() = author_id);
```

### טבלה: encyclopedia_entries (אנציקלופדיה)
```sql
create table encyclopedia_entries (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  term text not null,
  short_definition text,
  content text,
  section text not null,
  related_terms text[],
  tags text[]
);
```

### טבלה: guides (מדריכים)
```sql
create table guides (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  content text,
  track text check (track in ('beginners', 'reports', 'global', 'values')),
  sort_order int default 0,
  read_time int,
  tags text[]
);
```

### טבלה: qa_items (שאלות ותשובות)
```sql
create table qa_items (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  tags text[]
);
```

### טבלה: podcasts (פודקאסטים)
```sql
create table podcasts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  audio_url text, -- Supabase Storage URL
  duration int, -- דקות
  episode int,
  season int default 1,
  published_at timestamptz,
  author_id uuid references profiles(id),
  tags text[],
  status text check (status in ('draft', 'published')) default 'draft',
  created_at timestamptz default now()
);
```

### טבלה: newsletter_subscribers (ניוזלטר)
```sql
create table newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  subscribed_at timestamptz default now(),
  is_active boolean default true
);
```

### Supabase Storage
צור bucket בשם `podcast-audio` לאחסון קבצי MP3.
צור bucket בשם `article-images` לתמונות כתבות.

### Supabase Auth
הפעל Authentication עם Email/Password.
תפקידים (roles) מנוהלים דרך טבלת profiles.

---

## 🗂️ מבנה דפים

### 1. דף הבית (/)
**ליאאוט שני עמודות**: תוכן ראשי (70%) + סרגל צד (30%)

**תוכן ראשי:**
- **כתבה ראשית (Hero)**: כתבה מודגשת (is_featured=true) עם רקע גרדיאנט כהה, כותרת לבנה גדולה, תיאור, שם כותב ותאריך
- **חדשות אחרונות**: גריד כרטיסים (6 כתבות אחרונות מ-Supabase)
- **סקשנים לפי קטגוריה**: 4 קטגוריות ראשונות (לפי sort_order), כל אחת עם כותרת + לינק "הכל" + 4 כתבות

**סרגל צד (Sticky):**
- ווידג'ט נתוני שוק חיים (מדדים, מט"ח)
- ווידג'ט מחירי מניות חיים
- ווידג'ט טרנדים ברשתות חברתיות (דמו סטטי)
- רשימת כתבות טרנדינג (is_trending=true)
- ווידג'ט פרק פודקאסט אחרון
- הרשמה לניוזלטר

### 2. עמוד קטגוריה (/category/:slug)
- כותרת הקטגוריה ותיאור (מ-Supabase)
- גריד כתבות מאותה קטגוריה
- Breadcrumbs

### 3. עמוד כתבה (/article/:slug)
- Breadcrumbs
- כותרת, קטגוריה, שם כותב, תאריך
- תמונה ראשית (מ-Supabase Storage)
- תוכן הכתבה (Markdown/Rich text)
- כתבות קשורות בתחתית (אותה קטגוריה)

### 4. חיפוש (/search)
- שורת חיפוש
- חיפוש full-text ב-Supabase על כתבות, אנציקלופדיה ומדריכים
- תוצאות עם הדגשת מילת החיפוש

### 5. אנציקלופדיה (/encyclopedia)
- 8 סקשנים עם אייקונים
- ערכים לכל סקשן (מ-Supabase)
- עמוד ערך בודד (/encyclopedia/entry/:slug) עם הגדרה, תוכן, ומושגים קשורים

### 6. מדריכים (/guides)
- 4 מסלולים: מתחילים, דוחות כספיים, ישראל+עולם, ערכים ומשמעת
- מדריכים בכל מסלול עם סדר, זמן קריאה
- עמוד מדריך בודד (/guide/:slug)

### 7. כלים (/tools)
- מחשבון תשואה (חישוב client-side)
- מחשבון ריבית דריבית (חישוב client-side)
- מחשבון משך חיים (חישוב client-side)

### 8. שאלות ותשובות (/qa)
- שאלות מ-Supabase ב-4 קטגוריות
- אקורדיון (shadcn Accordion) עם שאלה ותשובה
- סינון לפי קטגוריה (shadcn Tabs)

### 9. 🆕 פודקאסטים (/podcasts)
- רשימת פרקים מ-Supabase
- כל פרק: כותרת, תיאור, אורך, תאריך, נגן אודיו HTML5 (מ-Supabase Storage)
- סינון לפי עונה (shadcn Tabs)
- לינקים ל-Spotify / Apple Podcasts (לעתיד)

### 10. 🆕 ממשק ניהול — CMS (/admin)
- **מוגן**: רק משתמשים מחוברים עם role=admin/editor/writer
- פירוט בסקשן CMS למטה

---

## 👥 מערכת ניהול תוכן (CMS)

### אימות והרשאות (Supabase Auth + RLS)
| תפקיד | הרשאות |
|---------|---------|
| **מנהל** (admin) | גישה מלאה — ניהול משתמשים, עריכת הכל, פרסום, מחיקה |
| **עורך** (editor) | אישור/דחיית כתבות, עריכת כל התוכן, פרסום |
| **כותב** (writer) | יצירת כתבות/מדריכים/פודקאסטים, עריכת תוכן שלו בלבד, שליחה לאישור |

### ממשק CMS (/admin)
- **דשבורד**: סטטיסטיקות — כמה כתבות, פרקי פודקאסט, מנויי ניוזלטר (queries מ-Supabase)
- **ניהול כתבות**: רשימה, יצירה, עריכה, שינוי סטטוס (טיוטה→בדיקה→מפורסם). עורך Rich Text / Markdown. העלאת תמונות ל-Supabase Storage.
- **ניהול אנציקלופדיה**: CRUD על encyclopedia_entries
- **ניהול מדריכים**: CRUD על guides
- **ניהול שאלות ותשובות**: CRUD על qa_items
- **ניהול פודקאסטים**: העלאת פרקים עם קובץ אודיו ל-Supabase Storage
- **ניהול ניוזלטר**: צפייה ברשימת מנויים
- **ניהול משתמשים** (למנהל בלבד): שינוי role לכותבים/עורכים

### תהליך עבודה (Workflow)
1. כותב יוצר כתבה → סטטוס: **draft** (טיוטה)
2. כותב מגיש לאישור → סטטוס: **review** (בבדיקה)
3. עורך מאשר → סטטוס: **published** (מפורסם, מופיע באתר)
4. עורך יכול גם לערוך ולהחזיר לכותב

---

## 📻 פודקאסטים — פירוט

### דף פודקאסטים (/podcasts)
- כותרת ראשית: "הפודקאסט של שִׁקְלוֹן"
- רשימת פרקים מ-Supabase (status=published, sorted by episode desc)
- כל פרק:
  - כותרת + תיאור קצר
  - אורך (דקות)
  - נגן אודיו HTML5 `<audio>` עם src מ-Supabase Storage
  - תאריך פרסום
- סינון לפי עונה

### נגן מיני בסרגל צד
- ווידג'ט "פרק אחרון" בסרגל הצד של דף הבית
- כותרת + כפתור Play קטן

### העלאת פרקים (מה-CMS)
- טופס: כותרת, תיאור, עונה, מספר פרק, תגיות
- העלאת קובץ MP3 ל-Supabase Storage bucket `podcast-audio`
- שמירה בטבלת podcasts

---

## 📧 ניוזלטר

### הרשמה
- טופס הרשמה בסרגל הצד (שם + אימייל) → INSERT ל-newsletter_subscribers ב-Supabase
- אישור הצלחה עם toast notification (shadcn Toast)

### צפייה (מתוך ה-CMS)
- רשימת מנויים פעילים מ-Supabase
- אפשרות ייצוא CSV

---

## 📱 ניווט (Navigation)

### סרגל ניווט עליון (Header)
- **לוגו**: שִׁקְלוֹן (גדול, bold) + שקל וחשבון — הדרך למיליון (קטן מתחת)
- **רקע**: כהה (#111111) עם sticky top
- **פריטי תפריט**:
  - בית (/)
  - חדשות (/category/stock-market)
  - ת״א היום (/category/real-estate)
  - בנק ישראל / מדד (/category/savings)
  - דוחות (/category/insurance)
  - עולם שמשפיע עלינו (/category/small-business)
  - מדריכים ← DropdownMenu (shadcn):
    - מתחילים (/guides/beginners)
    - להבין דוחות (/guides/reports)
    - ישראל + עולם (/guides/global)
    - ערכים ומשמעת (/guides/values)
  - אנציקלופדיה ← DropdownMenu (shadcn):
    - יסודות ההשקעה
    - מניות ומדדים
    - תעודות סל וקרנות
    - אג"ח וריבית
    - דוחות כספיים
    - מאקרו וגלובלי
    - מיסוי וחשבונות
    - כשרות השקעות
  - פודקאסטים (/podcasts)
  - כלים (/tools)
  - שאלות ותשובות (/qa)
- **חיפוש**: שורת חיפוש בצד שמאל
- **תפריט מובייל**: Sheet (shadcn) עם הכל

### Footer
- לוגו + תיאור קצר
- לינקים מהירים לכל הדפים
- קו מפריד זהב (#c8a951)
- © שִׁקְלוֹן — אתר לדוגמה בלבד

---

## 📐 אסטרטגיית תוכן — כלל ה-70/30

**70% תוכן עולמי / 30% תוכן ישראלי**

כל התוכן באתר — כתבות, מדריכים, פודקאסטים — עוקב אחרי היחס הזה:
- **70% עולם**: וול סטריט, דוחות חברות אמריקאיות, מאקרו-כלכלה גלובלית (פד, ECB, סין, הודו, נפט, קריפטו)
- **30% ישראל**: בורסת תל אביב, בנק ישראל, מדד המחירים, שקל, קופות גמל, מסים, גמ"חים

---

## 📝 קטגוריות ראשוניות — seed data

הכנס את הקטגוריות הבאות ל-Supabase:

| slug | name | description | scope | sort_order |
|------|------|-------------|-------|------------|
| stock-market | חדשות שווקים | חדשות מוול סטריט, הבורסות הבינלאומיות ושוקי ההון בעולם | world | 1 |
| insurance | דוחות חברות | דוחות כספיים ותוצאות רבעוניות של חברות מובילות בעולם | world | 2 |
| small-business | עולם שמשפיע עלינו | מאקרו-כלכלה גלובלית, בנקים מרכזיים, אנרגיה וגיאופוליטיקה | world | 3 |
| real-estate | ת״א היום | חדשות מהבורסה בתל אביב, מניות ישראליות ושוק ההון המקומי | israel | 4 |
| savings | בנק ישראל / מדד | החלטות ריבית, מדד המחירים לצרכן, אינפלציה ומדיניות מוניטרית | israel | 5 |
| kupot-gemel | קופות גמל | חיסכון פנסיוני, קופות גמל להשקעה והשוואת מסלולים | israel | 6 |
| tax-benefits | מסים והטבות | הטבות מס, זיכויים ומענקים למשפחות ולעצמאים | israel | 7 |
| gemachim | גמ"חים | גמ"חים קהילתיים, הלוואות ללא ריבית ופתרונות מימון | israel | 8 |

---

## 📝 תוכן ראשוני — כתבות לטעינה

צור 32 כתבות לדוגמה בעברית ב-Supabase (status=published) לפי החלוקה הבאה:

### 🌍 חדשות שווקים (stock-market) — 8 כתבות
1. דוח רווחים של קוקה-קולה Q4
2. טסלה — צמיחה בהכנסות, אכזבה ברווח
3. אנבידיה — ביקוש לשבבי AI שובר שיאים
4. אמזון AWS — צמיחה של 19%
5. S&P 500 שובר שיא — להיכנס או לחכות?
6. מחיר הזהב שובר שיא 2,100$
7. קרנות סל ביטקוין — מה צריך לדעת
8. יין יפני — סחר נשיאה מתפרק

### 🌍 דוחות חברות (insurance) — 6 כתבות
1. מיקרוסופט — 80 מיליארד בתשתיות AI
2. מטא — הכנסות פרסום +25%
3. אפל — רבעון שיא, אייפון +6%
4. גוגל — חיפוש AI צמח 14%
5. נטפליקס — 300 מיליון מנויים
6. סמסונג — התאוששות בשבבים

### 🌍 עולם שמשפיע עלינו (small-business) — 8 כתבות
1. הפד — ריבית ללא שינוי
2. ECB — הוריד ריבית, אירופה בקיפאון
3. נפט — אופ"ק קיצוץ בהפקה
4. סין — האטה, משבר נדל"ן
5. רגולציה על קריפטו 2025
6. הודו — הכלכלה הצומחת ביותר
7. תקרת חוב ארה"ב — משבר מתקרב
8. EU מטיל מכס על רכב חשמלי סיני

### 🇮🇱 ת״א היום (real-estate) — 4 כתבות
1. ת"א 125 — שבוע חיובי, בנקים מובילים
2. בנק לאומי — רווח שיא 7.8 מיליארד
3. אלביט — צבר הזמנות 21 מיליארד דולר
4. טבע — מפנה, המניה עלתה 80%

### 🇮🇱 בנק ישראל / מדד (savings) — 3 כתבות
1. בנק ישראל — ריבית 4.5% ללא שינוי
2. מדד המחירים לצרכן — +0.4% בינואר
3. דולר ירד ל-3.55 שקלים

### 🇮🇱 קופות גמל (kupot-gemel) — 2 כתבות
1. השוואת קופות גמל 2025
2. מסלול S&P 500 בפנסיה — 25% תשואה

### 🇮🇱 מסים והטבות (tax-benefits) — 2 כתבות
1. הנחות ארנונה 2025
2. עדכון נקודות זיכוי לילדים

### 🇮🇱 גמ"חים (gemachim) — 1 כתבה
1. מדריך גמ"חים להלוואות ללא ריבית

---

## 🔧 תוכן נוסף לטעינה ב-Supabase

### אנציקלופדיה — 34 ערכים ב-8 סקשנים
**סקשנים:**
1. investment-basics — יסודות ההשקעה (15 ערכים): מניה, אג"ח, קרן נאמנות, תעודת סל, תיק השקעות, פיזור, סיכון, תשואה, דיבידנד, שווי שוק, נזילות, מינוף, שורט, לונג, ברוקר
2. israeli-stocks — מניות ומדדים בישראל (3): ת"א-125, ת"א-35, הנפקה ראשונה
3. etfs-funds — תעודות סל וקרנות (2): קרן סל, דמי ניהול
4. bonds-interest — אג"ח וריבית (3): אג"ח ממשלתי, קופון, ריבית בנק ישראל
5. financial-reports — דוחות כספיים (3): מאזן, רווח נקי, מכפיל רווח
6. macro-global — מאקרו וגלובלי (3): אינפלציה, תמ"ג, מיתון
7. tax-accounts — מיסוי וחשבונות (2): מס רווח הון, קרן השתלמות
8. investment-kashrut — כשרות השקעות (3): היתר עסקה, השקעה אתית, הונאות

### מדריכים — 20 מדריכים ב-4 מסלולים
1. beginners — מתחילים (8): שוק ההון, חשבון מסחר, מניות, אג"ח, קרנות, פיזור, גרפים, טעויות נפוצות
2. reports — דוחות כספיים (5): מאזן, רווח והפסד, תזרים, יחסים פיננסיים, ניתוח שנתי
3. global — ישראל + עולם (5): הפד, אינפלציה, משבר, מלחמות סחר, סין/אירופה/אמריקה
4. values — ערכים ומשמעת (2): השקעה לפי ערכים, סבלנות ומשמעת

### שאלות ותשובות — 25 שאלות ב-4 קטגוריות
(מתחילים: 8, מיסוי: 5, הלכה ופיננסים: 5, שוק ההון: 7)

### כלים — 3 מחשבונים פיננסיים (client-side, ללא DB)
1. מחשבון תשואה
2. מחשבון ריבית דריבית
3. מחשבון משך חיים

---

## ⚡ אינטגרציות

### נתוני שוק חיים
- **Finnhub API** למחירי מניות אמריקאיות (ETFs: SPY, DIA, QQQ)
- **Yahoo Finance** (דרך CORS proxy) למדדי ת"א 125, ת"א 35
- **ExchangeRate API** (open.er-api.com) לשערי מט"ח (דולר/שקל, אירו/שקל)
- רענון כל 5 דקות
- Fallback לנתוני דמו אם ה-API לא עובד

### Supabase Edge Functions (לעתיד)
- שליחת ניוזלטר (Resend / SendGrid)
- יצירת RSS feed לפודקאסטים

---

## 📱 רספונסיבי

- **דסקטופ**: שתי עמודות (תוכן + סרגל צד)
- **טאבלט**: סרגל צד מתחת לתוכן
- **מובייל**: עמודה אחת, Sheet menu (shadcn), כרטיסים ברוחב מלא

---

## 🔮 לעתיד (לא עכשיו — רק להכין מקום)
- **פורום / קהילה**: אזור דיונים לשאלות פיננסיות
- **וידאו**: סרטוני ניתוח שוק וראיונות
- **תגובות**: מערכת תגובות על כתבות
- **פרופיל משתמש**: אזור אישי עם כתבות שמורות

---

## 🌐 דומיין

הגדר דומיין מותאם אישית. העדפות:
1. shiklon.com
2. shiklon.co.il
3. shiklon.app
4. shiklon.io

או כל וריאציה שזמינה של השם "שיקלון" / "shiklon".

---

## 📋 סיכום טכני

| רכיב | פירוט |
|-------|--------|
| פלטפורמה | Lovable |
| Stack | React + TypeScript + Tailwind + shadcn/ui |
| Backend | Supabase (PostgreSQL + Auth + Storage) |
| GitHub | סנכרון אוטומטי ל-https://github.com/mnigli/shekel-vecheshbon |
| שפה | עברית, RTL |
| פונטים | Heebo + Inter |
| צבע אקסנט | #c8a951 (זהב) |
| רקע | #f8f7f4 (שמנת) |
| טבלאות DB | articles, categories, encyclopedia_entries, guides, qa_items, podcasts, newsletter_subscribers, profiles |
| אימות | Supabase Auth + RLS (admin/editor/writer) |
| CMS | ממשק ניהול מלא עם workflow (draft→review→published) |
| Storage | Supabase Storage (podcast-audio, article-images) |
| פודקאסטים | נגן אודיו HTML5 + Supabase Storage |
| ניוזלטר | הרשמה ל-Supabase + ייצוא CSV |
| תוכן | 70% עולם / 30% ישראל |
| כתבות | 32 כתבות ראשוניות |
| אנציקלופדיה | 34 ערכים |
| מדריכים | 20 מדריכים |
| Q&A | 25 שאלות |
| כלים | 3 מחשבונים (client-side) |
