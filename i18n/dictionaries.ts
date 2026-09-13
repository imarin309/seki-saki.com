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
    /** 表紙に置く作家名 */
    coverName: string;
    coverRole: string;
    /** 表紙の短いコピー */
    coverCopy: string;
    /** 一般的な View Works ではなく、作品集をひらく言葉 */
    coverCta: string;
    scrollHint: string;
    selectedLabel: string;
    selectedNote: string;
    viewIndex: string;
    aboutLabel: string;
    aboutLead: string;
    aboutLink: string;
    contactLabel: string;
    contactLead: string;
    contactLink: string;
  };
  illustList: {
    title: string;
    kicker: string;
    subtitle: string;
    categoryFilterLabel: string;
    yearFilterLabel: string;
    allCategory: string;
    /** 「全 40 点」のような点数表示 */
    countSuffix: string;
    noResults: string;
  };
  illustDetail: {
    workNotFound: string;
    backToIllusts: string;
    /** 図版番号のラベル */
    plate: string;
    technique: string;
    year: string;
    previous: string;
    next: string;
    noPreviousWork: string;
    noNextWork: string;
  };
  worksList: {
    title: string;
    kicker: string;
    empty: string;
    viewWork: string;
  };
  worksDetail: {
    workNotFound: string;
    backToWorks: string;
    entry: string;
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
    kicker: string;
    heading: string;
    bio: string[];
  };
  contact: {
    title: string;
    kicker: string;
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
    home: "Cover",
    illust: "Illust",
    works: "Works",
    about: "About",
    contact: "Contact",
    instagram: "Instagram",
    openMenu: "メニューを開く",
  },
  home: {
    coverName: "世木口",
    coverRole: "Illustrator",
    coverCopy: "ふと見かけた日常を、一枚ずつ。",
    coverCta: "作品集をひらく",
    scrollHint: "Scroll",
    selectedLabel: "Selected Works",
    selectedNote: "近作より数点。",
    viewIndex: "すべての作品を見る",
    aboutLabel: "About",
    aboutLead: "描いている人のこと。",
    aboutLink: "世木口について",
    contactLabel: "Contact",
    contactLead: "イラスト制作のご依頼・ご相談を承っています。",
    contactLink: "お問い合わせ",
  },
  illustList: {
    title: "Illust",
    kicker: "Index",
    subtitle: "これまでに描いた作品の目次です。",
    categoryFilterLabel: "カテゴリ",
    yearFilterLabel: "制作年",
    allCategory: "すべて",
    countSuffix: "点",
    noResults: "このカテゴリーのイラストはありません。",
  },
  illustDetail: {
    workNotFound: "作品が見つかりませんでした",
    backToIllusts: "目次に戻る",
    plate: "Plate",
    technique: "技法",
    year: "制作",
    previous: "Previous Page",
    next: "Next Page",
    noPreviousWork: "最初のページです",
    noNextWork: "最後のページです",
  },
  worksList: {
    title: "Works",
    kicker: "Record",
    empty: "実績はまだありません。",
    viewWork: "読む",
  },
  worksDetail: {
    workNotFound: "実績が見つかりませんでした",
    backToWorks: "実績一覧に戻る",
    entry: "Record",
    previous: "Previous Page",
    next: "Next Page",
    noPreviousWork: "最初のページです",
    noNextWork: "最後のページです",
    noImage: "画像なし",
    prevImageAria: "前の画像",
    nextImageAria: "次の画像",
  },
  about: {
    title: "About Me",
    kicker: "About",
    heading: "日々のひとコマを、クスッと笑える絵に。",
    bio: [
      "世木口です。\n日常で見かけた風景や出来事をもとに、イラストを描いています。",
      "よく描くのは、一緒に暮らしているトカゲ。\n夜の窓辺でピースをしていたり、水の中を泳いでいたり。\n絵の中では、少しだけ自由に過ごしています。",
      "これまでは厚塗りやペン画で、人物や生きものを描いてきました。\n最近は日々のドローイングを中心に、\n見た人がクスッと笑えて、あたたかい気持ちになれる絵を目指しています。",
      "いつか、絵本の挿絵を描くのが夢です。",
    ],
  },
  contact: {
    title: "Contact",
    kicker: "Contact",
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
    home: "Cover",
    illust: "Illust",
    works: "Works",
    about: "About",
    contact: "Contact",
    instagram: "Instagram",
    openMenu: "Open menu",
  },
  home: {
    coverName: "Sekiguchi",
    coverRole: "Illustrator",
    coverCopy: "Little things I happen to see, one page at a time.",
    coverCta: "Open the book",
    scrollHint: "Scroll",
    selectedLabel: "Selected Works",
    selectedNote: "A few recent pieces.",
    viewIndex: "See all works",
    aboutLabel: "About",
    aboutLead: "About the person drawing.",
    aboutLink: "About Sekiguchi",
    contactLabel: "Contact",
    contactLead: "Open for illustration commissions and inquiries.",
    contactLink: "Get in touch",
  },
  illustList: {
    title: "Illust",
    kicker: "Index",
    subtitle: "An index of the works drawn so far.",
    categoryFilterLabel: "Category",
    yearFilterLabel: "Year",
    allCategory: "All",
    countSuffix: " works",
    noResults: "No illusts found in this category.",
  },
  illustDetail: {
    workNotFound: "Work not found",
    backToIllusts: "Back to index",
    plate: "Plate",
    technique: "Technique",
    year: "Year",
    previous: "Previous Page",
    next: "Next Page",
    noPreviousWork: "This is the first page",
    noNextWork: "This is the last page",
  },
  worksList: {
    title: "Works",
    kicker: "Record",
    empty: "No works yet.",
    viewWork: "Read",
  },
  worksDetail: {
    workNotFound: "Work not found",
    backToWorks: "Back to Works",
    entry: "Record",
    previous: "Previous Page",
    next: "Next Page",
    noPreviousWork: "This is the first page",
    noNextWork: "This is the last page",
    noImage: "No image",
    prevImageAria: "Previous image",
    nextImageAria: "Next image",
  },
  about: {
    title: "About Me",
    kicker: "About",
    heading: "Everyday moments, drawn to make you smile.",
    bio: [
      "I'm Sekiguchi.\nI draw the scenes and little happenings of everyday life.",
      "A frequent model is the lizard I live with.\nFlashing a peace sign by the window at night, or swimming through the water,\nin my drawings it gets to be a little freer.",
      "I've painted people and animals in thick paint and pen.\nLately I've been drawing a little every day,\naiming for pictures that make you chuckle and feel warm inside.",
      "Someday, I'd love to illustrate picture books.",
    ],
  },
  contact: {
    title: "Contact",
    kicker: "Contact",
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
