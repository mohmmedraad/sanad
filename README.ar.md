<div align="center">
  <img src="./public/logo.png" height="100" alt="Sanad Logo"/>
  <h1>سند</h1>
  <p>تشجير الأحاديث وتبسيط الأسانيد</p>

![Version](https://img.shields.io/github/package-json/v/mohmmedraad/sanad)
![License](https://img.shields.io/github/license/mohmmedraad/sanad)
![Contributors](https://img.shields.io/github/contributors/mohmmedraad/sanad)
![Stars](https://img.shields.io/github/stars/mohmmedraad/sanad?style=social)

[🇸🇦 العربية](README.ar.md) | [🇺🇸 English](README.md)

</div>

<br/>

![](./public/hero-light.png)

<br/>

## 📋 الوصف

سند هي أداة ويب بسيطة تساعد طلاب العلم والعلماء على تشجير أسانيد الأحاديث النبوية، مع عرض معلومات عن الرواة وسهولة البحث والتنقل بين السلاسل.

## 🚀 التشغيل محلياً

```bash
git clone https://github.com/mohmmedraad/sanad.git
cd sanad
pnpm install
pnpm run dev
```

تأكد من توفر:

- **Node.js**
- **pnpm**
- **PostgreSQL** (محلياً أو على سيرفر)

### متغيرات البيئة

1. انسخ ملف البيئة:

```bash
cp .env.example .env
```

2. املأ القيم المطلوبة داخل `.env` (على الأقل `NEXT_PUBLIC_WEBSITE_URL` و `BETTER_AUTH_SECRET` ومتغيرات قاعدة البيانات / `DATABASE_URL`).

### قاعدة البيانات

بعد إعداد متغيرات قاعدة البيانات يمكنك إدارة مخطط قاعدة البيانات / ترحيلات قاعدة البيانات عبر:

```bash
pnpm run db:generate
pnpm run db:migrate
```

## 🤝 المساهمة

نرحب بمساهماتكم.

1. **اعمل Fork للمستودع** وأنشئ فرعاً جديداً
2. **شغّل الفحوصات** قبل رفع التغييرات:

```bash
pnpm run check
pnpm run typecheck
```

3. **افتح Pull Request** مع وصف واضح للتغييرات

## 📄 الرخصة

راجع معلومات الرخصة داخل هذا المستودع.

## 📞 التواصل

للاقتراحات أو الأسئلة، فضلاً افتح Issue داخل المستودع.
