export interface ExhibitionBanner {
  enabled: boolean;
  href: string;
  image: string;
  title: string;
}

// 展示会の開催中のみ enabled: true にする。終了したら false に戻す。
export const currentExhibition: ExhibitionBanner = {
  enabled: true,
  href: "/exhibition/still_here",
  image: "https://assets.seki-saki.com/2026/umigarasu.webp",
  title: "still here",
};
