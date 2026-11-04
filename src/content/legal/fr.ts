import type { LegalCopy } from "./types";

/**
 * Template legal copy — to be reviewed by a legal professional and completed
 * with the company's registration details before going live.
 */
const fr: LegalCopy = {
  updated: "2026-11-03",
  privacy: {
    intro:
      "Cette politique explique quelles données personnelles {brand} collecte via ce site, pourquoi, combien de temps elles sont conservées et comment exercer vos droits. Elle s'inscrit dans le cadre de la loi algérienne n° 18-07 du 10 juin 2018 relative à la protection des personnes physiques dans le traitement des données à caractère personnel.",
    sections: [
      {
        title: "Responsable du traitement",
        paragraphs: ["Le responsable du traitement est {legal}. Pour toute question relative à vos données, vous pouvez nous écrire via la page Contact du site."],
      },
      {
        title: "Données collectées",
        paragraphs: ["Nous collectons uniquement les informations que vous saisissez volontairement dans nos formulaires de contact et de demande de devis :"],
        list: [
          "nom, nom de l'entreprise et ville ;",
          "numéro de téléphone / WhatsApp et, si vous la fournissez, adresse e-mail ;",
          "service souhaité, budget estimé, moyen de contact préféré et description du projet ;",
          "des informations techniques limitées liées à l'envoi (page d'origine, type de navigateur), utilisées pour la sécurité et la lutte contre les abus.",
        ],
      },
      {
        title: "Finalités",
        paragraphs: ["Ces données servent exclusivement à répondre à votre demande, à établir une proposition commerciale et, si un contrat est conclu, à assurer le suivi du projet. Elles ne sont ni vendues ni utilisées à des fins publicitaires."],
      },
      {
        title: "Destinataires et sous-traitants",
        paragraphs: [
          "Vos données sont accessibles uniquement aux membres de l'équipe {brand} chargés de traiter votre demande. Elles peuvent transiter par des prestataires techniques (hébergement du site, base de données, envoi d'e-mails, outils d'automatisation) agissant pour notre compte et soumis à une obligation de confidentialité.",
          "Lorsque vous choisissez de nous écrire sur WhatsApp, les échanges sont également soumis aux conditions de ce service.",
        ],
      },
      {
        title: "Durée de conservation",
        paragraphs: ["Les demandes qui n'aboutissent pas à un contrat sont conservées au maximum 24 mois après le dernier échange. Les données liées à un contrat sont conservées pendant la durée de la relation commerciale puis pendant les durées imposées par la réglementation."],
      },
      {
        title: "Cookies et mesure d'audience",
        paragraphs: ["Le site utilise Vercel Web Analytics, une mesure d'audience anonyme sans cookie. Le site utilise également le pixel Meta (Facebook / Instagram) : il dépose des cookies Meta et transmet à Meta des informations de navigation (pages vues, clics sur les boutons WhatsApp ou d'appel) afin de mesurer nos publicités et de proposer nos annonces aux visiteurs. Les paramètres de campagne (utm_source, utm_campaign, utm_content) sont conservés uniquement le temps de votre session dans votre navigateur. Vous pouvez refuser ou supprimer ces cookies dans les réglages de votre navigateur et gérer vos préférences publicitaires dans votre compte Meta."],
      },
      {
        title: "Vos droits",
        paragraphs: ["Conformément à la loi n° 18-07, vous disposez d'un droit d'information, d'accès, de rectification et d'opposition au traitement de vos données. Pour les exercer, contactez-nous via la page Contact en précisant votre demande. Vous pouvez également saisir l'Autorité nationale de protection des données à caractère personnel (ANPDP)."],
      },
      {
        title: "Sécurité",
        paragraphs: ["Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables pour protéger vos données : connexions chiffrées, accès restreints, validation des données côté serveur et protection contre les envois abusifs."],
      },
      {
        title: "Modifications",
        paragraphs: ["Cette politique peut évoluer. La date de dernière mise à jour figure en haut de cette page."],
      },
    ],
  },
  terms: {
    intro:
      "Les présentes conditions encadrent l'utilisation du site de {brand} et, sauf stipulation contraire dans un devis ou un contrat signé, les prestations réalisées par {brand}.",
    sections: [
      {
        title: "Objet du site",
        paragraphs: ["Ce site présente les services, la méthode et les projets de {brand}, et permet de nous contacter ou de demander un devis. Les informations publiées ont une valeur indicative et ne constituent pas une offre contractuelle."],
      },
      {
        title: "Devis et commande",
        paragraphs: [
          "Toute prestation fait l'objet d'un devis écrit précisant le périmètre, les livrables, le calendrier prévisionnel, le prix et les modalités de paiement. La commande est ferme après acceptation écrite du devis par le client et, le cas échéant, versement de l'acompte prévu.",
          "Les demandes envoyées via le site n'engagent ni le client ni {brand}.",
        ],
      },
      {
        title: "Obligations du client",
        paragraphs: ["Le client fournit en temps utile les contenus nécessaires (textes, images, logos, accès techniques, autorisations d'installation pour la signalétique) et garantit en détenir les droits. Les retards de transmission peuvent décaler le calendrier."],
      },
      {
        title: "Réalisation et validation",
        paragraphs: ["Les étapes de validation sont définies dans le devis. Chaque étape validée par le client sert de base à la suivante. Les modifications demandées au-delà du périmètre initial peuvent faire l'objet d'un devis complémentaire."],
      },
      {
        title: "Propriété intellectuelle",
        paragraphs: ["Sauf disposition contraire du devis, les droits d'utilisation des créations livrées sont cédés au client pour l'usage prévu après paiement intégral. {brand} conserve la propriété de ses outils, méthodes, codes génériques et produits internes, et peut mentionner la réalisation dans ses références, sauf demande contraire écrite du client."],
      },
      {
        title: "Prestations de publicité",
        paragraphs: ["Les budgets publicitaires versés aux plateformes (Meta, Google…) sont distincts des honoraires de {brand}. Les performances des campagnes dépendent de facteurs externes ; {brand} s'engage sur les moyens mis en œuvre, non sur un résultat chiffré."],
      },
      {
        title: "Responsabilité",
        paragraphs: ["{brand} met en œuvre tous les moyens raisonnables pour assurer la qualité de ses prestations. Sa responsabilité ne saurait être engagée pour les dommages indirects, ni pour les interruptions dues aux prestataires tiers (hébergeurs, plateformes publicitaires, services de messagerie)."],
      },
      {
        title: "Utilisation du site",
        paragraphs: ["Les contenus du site (textes, visuels, éléments graphiques, code) sont protégés. Toute reproduction sans autorisation est interdite. L'envoi de contenus abusifs ou automatisés via les formulaires est prohibé."],
      },
      {
        title: "Droit applicable",
        paragraphs: ["Les présentes conditions sont soumises au droit algérien. En cas de litige, une solution amiable sera recherchée en priorité avant toute action devant les juridictions compétentes."],
      },
    ],
  },
};

export default fr;
