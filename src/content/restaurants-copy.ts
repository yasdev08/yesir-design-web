import type { Locale } from "@/i18n/config";
import { business } from "./business";
import { formatDA, monthlyPlan, payment, qrOnly, digitalPresence } from "./pricing";

/**
 * Wording of the /restaurants landing page. Prices, delays and contact details
 * come from business.ts / pricing.ts, so changing a price there updates the page,
 * the FAQ, the WhatsApp messages and the structured data together.
 */
export function restaurantsCopy(locale: Locale) {
  const da = (n: number) => formatDA(n, locale);
  const { min, max } = business.delivery.typicalDays;
  const maxDays = business.delivery.maxDays;
  const packFrom = da(digitalPresence.packs[0].price);
  const qrFrom = da(qrOnly.from);
  const monthly = da(monthlyPlan.price);

  const copy = {
    fr: {
      metaTitle: "Menu TV animé et menu QR pour restaurants à Oran | YESIR DESIGN",
      metaDescription: `Menu TV animé en 4K et menu QR mobile pour votre restaurant, à Oran et partout en Algérie. Pack dès ${packFrom}, menu QR dès ${qrFrom}. Livré en ${min} à ${max} jours. Écrivez MENU sur WhatsApp.`,
      nav: { whatsapp: "WhatsApp", home: "Accueil YESIR DESIGN" },
      hero: {
        eyebrow: "Restaurants · Fast-food · Cafés",
        title: "Menu TV animé + menu QR mobile pour votre restaurant",
        sub: `À Oran et partout en Algérie · livré en ${min} à ${max} jours`,
        cta: "Écrivez MENU sur WhatsApp",
        call: "Appeler",
        priceHint: `Pack TV + QR dès ${packFrom}`,
      },
      proof: {
        title: "Ce que voient vos clients",
        placeholder: "Vidéo à ajouter",
        imagePlaceholder: "Image à ajouter",
      },
      pricing: {
        eyebrow: "Tarifs",
        title: `Pack ${digitalPresence.name}`,
        sub: "Menu TV animé + menu QR mobile",
        qr: "Menu QR mobile",
        screens: (n: number) => (n === 1 ? "1 écran TV animé" : `${n} écrans TV animés`),
        video4k: "Vidéos livrées en 4K",
        recommended: "RECOMMANDÉ",
        cta: (name: string) => `Choisir ${name}`,
        qrOnlyLine: `Menu QR seul dès ${qrFrom}`,
        monthly: `Forfait mensuel : ${monthly} / mois`,
        monthlyIncludes: monthlyPlan.includes.fr,
        payment: `Paiement : ${payment.label.fr}`,
        tvNote: "La TV est fournie par vous ; on vous aide à l'installer.",
        delay: `Délai : ${min} à ${max} jours en général, jusqu'à ${maxDays} jours pour un gros projet (écrit dans le devis).`,
      },
      projects: {
        eyebrow: "Réalisations",
        title: "Des restaurants qui l'utilisent déjà",
        live: "Voir en ligne",
        cta: "Je veux la même chose",
      },
      steps: {
        eyebrow: "Comment ça marche",
        title: "5 étapes, tout se passe sur WhatsApp",
        items: [
          { title: "Message WhatsApp", text: "Écrivez MENU : on vous répond pour comprendre votre restaurant." },
          { title: "Devis écrit", text: "Prix, contenu et délai écrits noir sur blanc." },
          { title: "Maquette validée", text: "Vous validez le design avant la production." },
          { title: "Production", text: `Vidéos TV 4K et menu QR, en ${min} à ${max} jours en général.` },
          { title: "Lancement et suivi", text: `Mise en service, aide à l'installation, mises à jour de prix avec le forfait mensuel.` },
        ],
      },
      faq: {
        eyebrow: "Questions fréquentes",
        items: [
          { q: "Combien ?", a: `Pack TV + QR dès ${packFrom}, menu QR seul dès ${qrFrom}.` },
          { q: "En combien de temps ?", a: `${min} à ${max} jours en général, jusqu'à ${maxDays} jours pour un gros projet. Le délai est écrit dans le devis.` },
          { q: "Je peux changer mes prix ?", a: `Oui, avec le forfait ${monthly} / mois (${monthlyPlan.includes.fr}).` },
          { q: "Comment je paie ?", a: `${payment.depositPercent} % au démarrage, le reste à la livraison.` },
          { q: "Il me faut une TV ?", a: "Oui, vous fournissez la TV ; on livre les vidéos 4K et on vous aide à l'installer." },
          { q: "Vous travaillez hors d'Oran ?", a: "Oui, le menu QR partout en Algérie." },
        ],
      },
      final: {
        title: "On en parle ?",
        sub: "Écrivez MENU : on vous répond avec les détails et un devis écrit.",
        cta: "Écrivez MENU sur WhatsApp",
        call: "Appeler",
        office: "Bureau",
        hours: "Horaires",
        area: "Zone",
        maps: "Ouvrir dans Google Maps",
      },
      floating: "Écrire sur WhatsApp",
      messages: {
        base: "MENU — je viens de votre page Restaurants",
        pack: (name: string, price: string) => `MENU — je viens de votre page Restaurants · Pack ${name} (${price})`,
        same: (name: string) => `MENU — je veux la même chose que ${name}`,
      },
    },
    en: {
      metaTitle: "Animated TV menu and QR menu for restaurants in Oran | YESIR DESIGN",
      metaDescription: `Animated 4K TV menu and mobile QR menu for your restaurant, in Oran and across Algeria. Pack from ${packFrom}, QR menu from ${qrFrom}. Delivered in ${min} to ${max} days. Send MENU on WhatsApp.`,
      nav: { whatsapp: "WhatsApp", home: "YESIR DESIGN home" },
      hero: {
        eyebrow: "Restaurants · Fast food · Cafés",
        title: "Animated TV menu + mobile QR menu for your restaurant",
        sub: `In Oran and across Algeria · delivered in ${min} to ${max} days`,
        cta: "Send MENU on WhatsApp",
        call: "Call",
        priceHint: `TV + QR pack from ${packFrom}`,
      },
      proof: { title: "What your customers see", placeholder: "Video to be added", imagePlaceholder: "Image to be added" },
      pricing: {
        eyebrow: "Pricing",
        title: `${digitalPresence.name} pack`,
        sub: "Animated TV menu + mobile QR menu",
        qr: "Mobile QR menu",
        screens: (n: number) => (n === 1 ? "1 animated TV screen" : `${n} animated TV screens`),
        video4k: "Videos delivered in 4K",
        recommended: "RECOMMENDED",
        cta: (name: string) => `Choose ${name}`,
        qrOnlyLine: `QR menu only, from ${qrFrom}`,
        monthly: `Monthly plan: ${monthly} / month`,
        monthlyIncludes: monthlyPlan.includes.en,
        payment: `Payment: ${payment.label.en}`,
        tvNote: "You provide the TV; we help you set it up.",
        delay: `Timeline: usually ${min} to ${max} days, up to ${maxDays} days for a large project (stated in the quote).`,
      },
      projects: { eyebrow: "Our work", title: "Restaurants already using it", live: "View live", cta: "I want the same" },
      steps: {
        eyebrow: "How it works",
        title: "5 steps, all on WhatsApp",
        items: [
          { title: "WhatsApp message", text: "Send MENU: we reply to understand your restaurant." },
          { title: "Written quote", text: "Price, content and timeline in writing." },
          { title: "Approved mock-up", text: "You approve the design before production." },
          { title: "Production", text: `4K TV videos and QR menu, usually in ${min} to ${max} days.` },
          { title: "Launch and follow-up", text: "Go-live, help with installation, price updates with the monthly plan." },
        ],
      },
      faq: {
        eyebrow: "FAQ",
        items: [
          { q: "How much?", a: `TV + QR pack from ${packFrom}, QR menu only from ${qrFrom}.` },
          { q: "How long does it take?", a: `Usually ${min} to ${max} days, up to ${maxDays} days for a large project. The timeline is written in the quote.` },
          { q: "Can I change my prices?", a: `Yes, with the ${monthly} / month plan (${monthlyPlan.includes.en}).` },
          { q: "How do I pay?", a: `${payment.depositPercent}% to start, the rest on delivery.` },
          { q: "Do I need a TV?", a: "Yes, you provide the TV; we deliver the 4K videos and help you set it up." },
          { q: "Do you work outside Oran?", a: "Yes, the QR menu anywhere in Algeria." },
        ],
      },
      final: {
        title: "Shall we talk?",
        sub: "Send MENU: we'll reply with the details and a written quote.",
        cta: "Send MENU on WhatsApp",
        call: "Call",
        office: "Office",
        hours: "Hours",
        area: "Area",
        maps: "Open in Google Maps",
      },
      floating: "Message us on WhatsApp",
      messages: {
        base: "MENU — I'm coming from your Restaurants page",
        pack: (name: string, price: string) => `MENU — I'm coming from your Restaurants page · ${name} pack (${price})`,
        same: (name: string) => `MENU — I want the same as ${name}`,
      },
    },
    ar: {
      metaTitle: "قائمة عرض متحرّكة وقائمة QR للمطاعم في وهران | YESIR DESIGN",
      metaDescription: `قائمة عرض متحرّكة بدقّة 4K وقائمة QR على الهاتف لمطعمك، في وهران وكامل الجزائر. الباقة ابتداءً من ${packFrom}، وقائمة QR ابتداءً من ${qrFrom}. التسليم في ${min} إلى ${max} أيام. أرسل MENU على واتساب.`,
      nav: { whatsapp: "واتساب", home: "الصفحة الرئيسية لـ YESIR DESIGN" },
      hero: {
        eyebrow: "مطاعم · أكل سريع · مقاهٍ",
        title: "قائمة عرض متحرّكة على التلفاز + قائمة QR على الهاتف لمطعمك",
        sub: `في وهران وكامل الجزائر · التسليم في ${min} إلى ${max} أيام`,
        cta: "أرسل MENU على واتساب",
        call: "اتصال",
        priceHint: `باقة التلفاز + QR ابتداءً من ${packFrom}`,
      },
      proof: { title: "ما يراه زبائنك", placeholder: "فيديو سيُضاف", imagePlaceholder: "صورة ستُضاف" },
      pricing: {
        eyebrow: "الأسعار",
        title: `باقة ${digitalPresence.name}`,
        sub: "قائمة عرض متحرّكة + قائمة QR على الهاتف",
        qr: "قائمة QR على الهاتف",
        screens: (n: number) => (n === 1 ? "شاشة عرض متحرّكة واحدة" : n === 2 ? "شاشتا عرض متحرّكتان" : `${n} شاشات عرض متحرّكة`),
        video4k: "فيديوهات بدقّة 4K",
        recommended: "الأنسب",
        cta: (name: string) => `اختر ${name}`,
        qrOnlyLine: `قائمة QR وحدها ابتداءً من ${qrFrom}`,
        monthly: `الاشتراك الشهري: ${monthly} / شهر`,
        monthlyIncludes: monthlyPlan.includes.ar,
        payment: `الدفع: ${payment.label.ar}`,
        tvNote: "التلفاز من جهتك، ونساعدك على تركيبه.",
        delay: `الأجل: من ${min} إلى ${max} أيام عادةً، وحتى ${maxDays} يومًا للمشاريع الكبيرة (يُكتب في عرض السعر).`,
      },
      projects: { eyebrow: "إنجازاتنا", title: "مطاعم تستعملها بالفعل", live: "شاهد على الإنترنت", cta: "أريد مثلها" },
      steps: {
        eyebrow: "كيف نعمل",
        title: "5 خطوات، وكل شيء عبر واتساب",
        items: [
          { title: "رسالة واتساب", text: "أرسل MENU: نردّ عليك لفهم مطعمك." },
          { title: "عرض سعر مكتوب", text: "السعر والمحتوى والأجل مكتوبة بوضوح." },
          { title: "نموذج مُصادَق عليه", text: "تصادق على التصميم قبل الإنتاج." },
          { title: "الإنتاج", text: `فيديوهات 4K للتلفاز وقائمة QR، في ${min} إلى ${max} أيام عادةً.` },
          { title: "الإطلاق والمتابعة", text: "التشغيل، المساعدة على التركيب، وتحديث الأسعار مع الاشتراك الشهري." },
        ],
      },
      faq: {
        eyebrow: "أسئلة شائعة",
        items: [
          { q: "كم السعر؟", a: `باقة التلفاز + QR ابتداءً من ${packFrom}، وقائمة QR وحدها ابتداءً من ${qrFrom}.` },
          { q: "كم يستغرق الإنجاز؟", a: `من ${min} إلى ${max} أيام عادةً، وحتى ${maxDays} يومًا للمشاريع الكبيرة. يُكتب الأجل في عرض السعر.` },
          { q: "هل يمكنني تغيير أسعاري؟", a: `نعم، مع الاشتراك الشهري ${monthly} (${monthlyPlan.includes.ar}).` },
          { q: "كيف أدفع؟", a: `${payment.depositPercent} % عند الانطلاق، والباقي عند التسليم.` },
          { q: "هل أحتاج إلى تلفاز؟", a: "نعم، التلفاز من جهتك؛ نسلّم فيديوهات 4K ونساعدك على تركيبه." },
          { q: "هل تعملون خارج وهران؟", a: "نعم، قائمة QR في كامل الجزائر." },
        ],
      },
      final: {
        title: "نتحدّث؟",
        sub: "أرسل MENU: نردّ عليك بالتفاصيل وعرض سعر مكتوب.",
        cta: "أرسل MENU على واتساب",
        call: "اتصال",
        office: "المكتب",
        hours: "المواعيد",
        area: "المنطقة",
        maps: "افتح في خرائط غوغل",
      },
      floating: "راسلنا على واتساب",
      messages: {
        base: "MENU — جئت من صفحة المطاعم",
        pack: (name: string, price: string) => `MENU — جئت من صفحة المطاعم · باقة ${name} (${price})`,
        same: (name: string) => `MENU — أريد مثل ${name}`,
      },
    },
  };
  return copy[locale];
}

export type RestaurantsCopy = ReturnType<typeof restaurantsCopy>;
