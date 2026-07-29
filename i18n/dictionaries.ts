import type { Locale } from "@/i18n/config";

export interface Dictionary {
  nav: {
    home: string;
    illust: string;
    works: string;
    about: string;
    contact: string;
    instagram: string;
    openMenu: string;
  };
  home: {
    heroTitle: string;
    viewIllusts: string;
    featuredHeading: string;
    viewAll: string;
    aboutLink: string;
  };
  illustList: {
    title: string;
    subtitle: string;
    noResults: string;
  };
  illustDetail: {
    workNotFound: string;
    backToIllusts: string;
    previous: string;
    next: string;
    noPreviousWork: string;
    noNextWork: string;
  };
  worksList: {
    title: string;
    empty: string;
    viewWork: string;
  };
  worksDetail: {
    workNotFound: string;
    backToWorks: string;
    previous: string;
    next: string;
    noPreviousWork: string;
    noNextWork: string;
    noImage: string;
    prevImageAria: string;
    nextImageAria: string;
  };
  about: {
    title: string;
    heading: string;
    bio: string[];
  };
  contact: {
    title: string;
    intro: string;
    formNameLabel: string;
    formEmailLabel: string;
    formSubjectLabel: string;
    formMessageLabel: string;
    formSubmitLabel: string;
    formSubmittingLabel: string;
    formSuccessLines: string[];
    formErrorLines: string[];
    privacyNote: string;
  };
  footer: {
    copyright: string;
  };
}

const ja: Dictionary = {
  nav: {
    home: "Home",
    illust: "Illust",
    works: "Works",
    about: "About",
    contact: "Contact",
    instagram: "Instagram",
    openMenu: "メニューを開く",
  },
  home: {
    heroTitle: "Designer & Illustrator",
    viewIllusts: "View Illusts",
    featuredHeading: "Featured Illusts",
    viewAll: "View All",
    aboutLink: "世木口について",
  },
  illustList: {
    title: "Illust",
    subtitle: "Selected projects and artworks",
    noResults: "このカテゴリーのイラストはありません。",
  },
  illustDetail: {
    workNotFound: "作品が見つかりませんでした",
    backToIllusts: "イラスト一覧に戻る",
    previous: "Previous",
    next: "Next",
    noPreviousWork: "前の作品はありません",
    noNextWork: "次の作品はありません",
  },
  worksList: {
    title: "Works",
    empty: "実績はまだありません。",
    viewWork: "作品を見る",
  },
  worksDetail: {
    workNotFound: "実績が見つかりませんでした",
    backToWorks: "実績一覧に戻る",
    previous: "Previous",
    next: "Next",
    noPreviousWork: "前の実績はありません",
    noNextWork: "次の実績はありません",
    noImage: "画像なし",
    prevImageAria: "前の画像",
    nextImageAria: "次の画像",
  },
  about: {
    title: "About Me",
    heading: "派手で美しい人物をリアル調に描きます。",
    bio: [
      "はじめまして。世木口と申します。",
      "芯のある美しい女性を中心にイラストレーションを描いています。",
      "現在は会社員として勤めながら、フリーランスでイラストレーターとして活動しております。",
    ],
  },
  contact: {
    title: "Contact",
    intro: "お仕事のご依頼・ご相談は下記フォームからお気軽にどうぞ。",
    formNameLabel: "お名前（ハンドルネーム可）",
    formEmailLabel: "メールアドレス",
    formSubjectLabel: "件名",
    formMessageLabel: "お問い合わせ内容",
    formSubmitLabel: "送信する",
    formSubmittingLabel: "送信しています...",
    formSuccessLines: [
      "お問い合わせを送信しました。",
      "内容を確認のうえ返信いたします。",
    ],
    formErrorLines: [
      "送信できませんでした。",
      "時間をおいて再度お試しください。",
    ],
    privacyNote:
      "ご依頼の際にいただいた個人情報は、業務上の連絡・対応の目的にのみ使用し、第三者への提供は行いません。",
  },
  footer: {
    copyright: "© 2026 seki-saki.com. All rights reserved.",
  },
};

const en: Dictionary = {
  nav: {
    home: "Home",
    illust: "Illust",
    works: "Works",
    about: "About",
    contact: "Contact",
    instagram: "Instagram",
    openMenu: "Open menu",
  },
  home: {
    heroTitle: "Designer & Illustrator",
    viewIllusts: "View Illusts",
    featuredHeading: "Featured Illusts",
    viewAll: "View All",
    aboutLink: "About Sekiguchi",
  },
  illustList: {
    title: "Illust",
    subtitle: "Selected projects and artworks",
    noResults: "No illusts found in this category.",
  },
  illustDetail: {
    workNotFound: "Work not found",
    backToIllusts: "Back to Illusts",
    previous: "Previous",
    next: "Next",
    noPreviousWork: "No previous work",
    noNextWork: "No next work",
  },
  worksList: {
    title: "Works",
    empty: "No works yet.",
    viewWork: "View work",
  },
  worksDetail: {
    workNotFound: "Work not found",
    backToWorks: "Back to Works",
    previous: "Previous",
    next: "Next",
    noPreviousWork: "No previous work",
    noNextWork: "No next work",
    noImage: "No image",
    prevImageAria: "Previous image",
    nextImageAria: "Next image",
  },
  about: {
    title: "About Me",
    heading: "I draw vivid, beautiful figures with a realistic touch.",
    bio: [
      "Hello, I'm Sekiguchi.",
      "I mainly draw illustrations of beautiful women with a strong sense of self.",
      "I currently work as a full-time employee while also active as a freelance illustrator.",
    ],
  },
  contact: {
    title: "Contact",
    intro: "For work inquiries or questions, feel free to use the form below.",
    formNameLabel: "Name (handle name is fine)",
    formEmailLabel: "Email address",
    formSubjectLabel: "Subject",
    formMessageLabel: "Message",
    formSubmitLabel: "Send",
    formSubmittingLabel: "Sending...",
    formSuccessLines: [
      "Your inquiry has been sent.",
      "We will review it and get back to you.",
    ],
    formErrorLines: ["Something went wrong.", "Please try again later."],
    privacyNote:
      "Any personal information provided in your inquiry will be used solely for the purpose of responding to it and will not be shared with third parties.",
  },
  footer: {
    copyright: "© 2026 seki-saki.com. All rights reserved.",
  },
};

const dictionaries: Record<Locale, Dictionary> = { ja, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
