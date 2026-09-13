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
    title: "世木口について",
    kicker: "About",
    bio: [
      "はじめまして。\n暮らしの中で感じたことを元にイラストを描いています。\n街ですれ違った人の人生や価値観をよく考えることが好きです。",
      "私の作品は都会の寂しさの中でちょっと温かさを見かけたときに、それを記録するように描いています。",
      "これまではデジタルで人物を描いてきました。最近は日々のドローイングを中心に見た人がクスッと笑えて、肩の力が抜けるような絵を目指しています。",
      "なんでも挑戦してみたいですが、特に絵本や雑誌の挿絵などのお仕事に興味があります。",
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
    title: "About Sekiguchi",
    kicker: "About",
    bio: [
      "Nice to meet you.\nI draw illustrations based on what I feel in everyday life.\nI like to think about the lives and values of the people I pass on the street.",
      "I draw my work as a way of recording the small moments of warmth I find amid the loneliness of the city.",
      "Until now, I've mainly drawn people digitally. Lately I've been focusing on daily drawings, aiming for pictures that make you chuckle and help you loosen up a little.",
      "I'm eager to try all kinds of things, and I'm especially interested in illustrating picture books and magazines.",
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
