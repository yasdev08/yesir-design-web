import type { LegalCopy } from "./types";

const en: LegalCopy = {
  updated: "2026-11-03",
  privacy: {
    intro:
      "This policy explains what personal data {brand} collects through this website, why, how long it is kept and how to exercise your rights. It follows Algerian Law No. 18-07 of 10 June 2018 on the protection of natural persons in the processing of personal data.",
    sections: [
      { title: "Data controller", paragraphs: ["The data controller is {legal}. For any question about your data, you can write to us through the Contact page of this website."] },
      {
        title: "Data collected",
        paragraphs: ["We only collect the information you voluntarily enter in our contact and quote request forms:"],
        list: [
          "name, business name and city;",
          "phone / WhatsApp number and, if you provide it, email address;",
          "service needed, estimated budget, preferred contact method and project description;",
          "limited technical information related to the submission (originating page, browser type), used for security and abuse prevention.",
        ],
      },
      { title: "Purposes", paragraphs: ["This data is used exclusively to respond to your request, prepare a commercial proposal and, if a contract is signed, manage the project. It is never sold or used for advertising."] },
      {
        title: "Recipients and processors",
        paragraphs: [
          "Your data is only accessible to the {brand} team members handling your request. It may pass through technical providers (website hosting, database, email delivery, automation tools) acting on our behalf and bound by confidentiality.",
          "When you choose to message us on WhatsApp, the exchange is also subject to that service's terms.",
        ],
      },
      { title: "Retention", paragraphs: ["Requests that do not lead to a contract are kept for no more than 24 months after the last exchange. Data related to a contract is kept for the duration of the business relationship and then for the periods required by law."] },
      { title: "Cookies and analytics", paragraphs: ["The website uses Vercel Web Analytics, an anonymous, cookie-free audience measurement. The website also uses the Meta (Facebook / Instagram) pixel: it sets Meta cookies and sends browsing information to Meta (pages viewed, clicks on WhatsApp or call buttons) to measure our advertising and show our ads to visitors. Campaign parameters (utm_source, utm_campaign, utm_content) are kept in your browser for your session only. You can refuse or delete these cookies in your browser settings and manage your ad preferences in your Meta account."] },
      { title: "Your rights", paragraphs: ["Under Law No. 18-07, you have the right to information, access, rectification and objection regarding the processing of your data. To exercise them, contact us through the Contact page stating your request. You may also refer the matter to the National Authority for the Protection of Personal Data (ANPDP)."] },
      { title: "Security", paragraphs: ["We apply reasonable technical and organisational measures to protect your data: encrypted connections, restricted access, server-side data validation and protection against abusive submissions."] },
      { title: "Changes", paragraphs: ["This policy may change. The date of the last update appears at the top of this page."] },
    ],
  },
  terms: {
    intro: "These terms govern the use of the {brand} website and, unless otherwise stated in a signed quote or contract, the services provided by {brand}.",
    sections: [
      { title: "Purpose of the website", paragraphs: ["This website presents the services, method and projects of {brand}, and lets you contact us or request a quote. Published information is indicative and does not constitute a contractual offer."] },
      {
        title: "Quotes and orders",
        paragraphs: [
          "Every service is covered by a written quote specifying the scope, deliverables, provisional timeline, price and payment terms. An order is confirmed once the client accepts the quote in writing and, where applicable, pays the agreed deposit.",
          "Requests sent through the website are not binding on either the client or {brand}.",
        ],
      },
      { title: "Client obligations", paragraphs: ["The client provides the necessary content in good time (copy, images, logos, technical access, installation permits for signage) and warrants holding the rights to it. Delays in providing content may shift the timeline."] },
      { title: "Production and approval", paragraphs: ["Approval steps are defined in the quote. Each step approved by the client forms the basis for the next. Changes requested beyond the initial scope may be subject to an additional quote."] },
      { title: "Intellectual property", paragraphs: ["Unless otherwise stated in the quote, usage rights to the delivered work are transferred to the client for the intended use upon full payment. {brand} retains ownership of its tools, methods, generic code and internal products, and may list the work among its references unless the client objects in writing."] },
      { title: "Advertising services", paragraphs: ["Advertising budgets paid to platforms (Meta, Google…) are separate from {brand}'s fees. Campaign performance depends on external factors; {brand} commits to the means employed, not to a numeric result."] },
      { title: "Liability", paragraphs: ["{brand} uses all reasonable means to ensure the quality of its services. It cannot be held liable for indirect damages or for interruptions caused by third-party providers (hosting, advertising platforms, messaging services)."] },
      { title: "Use of the website", paragraphs: ["The website's content (text, visuals, graphic elements, code) is protected. Any reproduction without permission is prohibited. Sending abusive or automated content through the forms is forbidden."] },
      { title: "Governing law", paragraphs: ["These terms are governed by Algerian law. In the event of a dispute, an amicable solution will be sought first before any action before the competent courts."] },
    ],
  },
};

export default en;
