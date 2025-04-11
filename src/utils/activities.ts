
import { Activity, UserProfile } from '../types';

// ローカルストレージからプロフィールを取得する関数
export const getProfileFromStorage = (): UserProfile | null => {
  try {
    const storedProfile = localStorage.getItem('userProfile');
    return storedProfile ? JSON.parse(storedProfile) : null;
  } catch (error) {
    console.error('Error retrieving profile from storage:', error);
    return null;
  }
};

// サンプルアクティビティデータを生成する関数
export const generateSampleActivities = (userId: string): Activity[] => {
  const activities: Activity[] = [
    {
      id: '1',
      title: '夜の天体観測ツアー',
      description: '星空を専門家のガイドと一緒に観察し、宇宙の神秘について学ぶ機会です。静けさの中で星空を見上げると、日常の悩みが小さく感じられるでしょう。',
      personalizedMessage: '星空の下では、あなたの思考も宇宙のように広がります。この静寂な時間は内省にぴったりです。',
      imageUrl: 'https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      category: '自然・アウトドア',
      duration: '2-3時間',
      price: '¥3,500〜',
      schedule: '金・土曜日、20:00開始',
      location: '郊外の天文台',
      mapLink: 'https://maps.google.com',
      bookingLink: 'https://asoview.com',
      discount: '初回10%オフ',
    },
    {
      id: '2',
      title: '朝活陶芸ワークショップ',
      description: '粘土を手で形作る感覚に集中することで、マインドフルな状態を体験できます。日常から離れて創造性を発揮する時間を過ごしましょう。',
      personalizedMessage: '手を使って創造することは、あなたの思考をリセットし、新たな視点をもたらします。',
      imageUrl: 'https://images.unsplash.com/photo-1565122144278-5b5f28f7b9b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      category: 'クラフト・ものづくり',
      duration: '2時間',
      price: '¥4,000（材料費込）',
      schedule: '平日朝7:00〜9:00',
      location: '市内アートスタジオ',
      mapLink: 'https://maps.google.com',
      bookingLink: 'https://asoview.com',
      discount: 'ペア割引あり',
    },
    {
      id: '3',
      title: 'フォレストバスセラピー',
      description: '森林の中でのゆっくりとした散策と呼吸法を通じて、自然とつながる体験です。森の香りと音に囲まれることで、ストレスホルモンが減少します。',
      personalizedMessage: '木々に囲まれると、自然と呼吸が深くなり、あなたの緊張が解けていくのを感じるでしょう。',
      imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      category: '自然・アウトドア',
      duration: '3時間',
      price: '¥2,800',
      schedule: '土日 9:00〜',
      location: '近郊の国立公園',
      mapLink: 'https://maps.google.com',
      bookingLink: 'https://walkerplus.com',
      discount: '平日参加で20%オフ',
    },
    {
      id: '4',
      title: '夜明け前のサイレントカヤック',
      description: '日の出前の静かな湖でのカヤック体験。水面を滑るように進む感覚と朝の静けさが、心を落ち着かせます。',
      personalizedMessage: '水と一体になる感覚は、あなたの思考の流れを変え、新たな視点をもたらします。',
      imageUrl: 'https://images.unsplash.com/photo-1511436777446-8281fcd89db6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      category: 'スポーツ・アクティビティ',
      duration: '2時間',
      price: '¥5,500',
      schedule: '土日 5:00〜7:00',
      location: '湖畔',
      mapLink: 'https://maps.google.com',
      bookingLink: 'https://asoview.com',
      discount: 'グループ割引あり',
    },
    {
      id: '5',
      title: '秘密の古民家ジャズナイト',
      description: '古民家を改装したひっそりとした空間で行われる、少人数制のジャズライブ。生演奏と温かい雰囲気に包まれる夜を過ごしましょう。',
      personalizedMessage: '心地よい音楽に身を委ねることで、あなたの思考がゆっくりと解きほぐされていくでしょう。',
      imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      category: '音楽・エンターテイメント',
      duration: '3時間',
      price: '¥3,800（1ドリンク付き）',
      schedule: '金土 20:00〜',
      location: '市内隠れ家',
      mapLink: 'https://maps.google.com',
      bookingLink: 'https://walkerplus.com',
      discount: '初回参加特典あり',
    },
    {
      id: '6',
      title: 'サンライズヨガ＆朝食ピクニック',
      description: '早朝の公園で行うヨガセッションの後、地元の食材を使った朝食ピクニックを楽しみます。朝の爽やかな空気と共に一日をスタートさせましょう。',
      personalizedMessage: '朝日を浴びながらのヨガは、あなたの心と体に新しいエネルギーを呼び起こします。',
      imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      category: '健康・ウェルネス',
      duration: '2.5時間',
      price: '¥4,200（朝食込）',
      schedule: '土日 6:00〜8:30',
      location: '市内公園',
      mapLink: 'https://maps.google.com',
      bookingLink: 'https://asoview.com',
      discount: '友達紹介で10%オフ',
    },
    {
      id: '7',
      title: '秘密の地下書店探検',
      description: '街中に隠れた地下書店を訪れ、珍しい古本や限定出版物を探す冒険。知る人ぞ知る文学空間で、新たな本との出会いを楽しみましょう。',
      personalizedMessage: '本の世界に没頭することは、あなたの思考をリフレッシュし、想像力を刺激します。',
      imageUrl: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      category: '文化・芸術',
      duration: '自由',
      price: '入場無料',
      schedule: '平日 15:00〜21:00',
      location: '都心の地下街',
      mapLink: 'https://maps.google.com',
      bookingLink: 'https://walkerplus.com',
      discount: '初回購入者10%オフ',
    },
    {
      id: '8',
      title: '夜の水族館特別ガイドツアー',
      description: '閉館後の水族館を少人数で巡る特別ツアー。静かな環境で海の生き物たちの夜の姿を観察します。青く光る水槽の明かりが特別な雰囲気を作り出します。',
      personalizedMessage: '青い光の中で漂う海の生き物たちを眺めると、あなたの思考もゆったりと流れていくでしょう。',
      imageUrl: 'https://images.unsplash.com/photo-1571164474944-0fc5ef6cc2e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      category: '特別体験',
      duration: '1.5時間',
      price: '¥5,000',
      schedule: '金曜 20:00〜',
      location: '市内水族館',
      mapLink: 'https://maps.google.com',
      bookingLink: 'https://asoview.com',
      discount: '会員特典あり',
    },
    {
      id: '9',
      title: '屋上ガーデンでのハーブティー教室',
      description: 'ビルの屋上にある隠れた庭園で、自分だけのハーブティーをブレンドする教室。植物や香りについて学びながら、自分にぴったりの一杯を見つけましょう。',
      personalizedMessage: '香りは記憶と感情に深く結びついています。あなただけのブレンドで、新たな心の景色を作りましょう。',
      imageUrl: 'https://images.unsplash.com/photo-1546248267-07e697a5b8b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      category: '食・飲料',
      duration: '2時間',
      price: '¥3,600',
      schedule: '土曜 14:00〜',
      location: '都心のビル屋上',
      mapLink: 'https://maps.google.com',
      bookingLink: 'https://walkerplus.com',
      discount: '平日参加で10%オフ',
    },
    {
      id: '10',
      title: '謎解き古民家脱出ゲーム',
      description: '伝統的な古民家を舞台にした没入型の謎解きゲーム。チームで協力して謎を解き明かし、制限時間内に脱出を目指します。頭をフル回転させるチャレンジです。',
      personalizedMessage: '謎に没頭することであなたの思考は現実から離れ、全く新しい世界に集中できるでしょう。',
      imageUrl: 'https://images.unsplash.com/photo-1614032686099-e648d6dea9b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      category: 'ゲーム・エンターテイメント',
      duration: '1時間',
      price: '¥2,800/人',
      schedule: '平日18:00〜、土日13:00〜',
      location: '郊外の古民家',
      mapLink: 'https://maps.google.com',
      bookingLink: 'https://asoview.com',
      discount: '5人以上のグループで15%オフ',
    },
    // さらに40個のアクティビティを追加してください
  ];

  // 実際のアプリケーションでは、ユーザーのプロフィールに基づいてパーソナライズされたアクティビティを生成
  return activities;
};

// 以下のようなカテゴリを提供
export const activityCategories = [
  { id: 'nature', name: '自然・アウトドア' },
  { id: 'craft', name: 'クラフト・ものづくり' },
  { id: 'sports', name: 'スポーツ・アクティビティ' },
  { id: 'music', name: '音楽・エンターテイメント' },
  { id: 'wellness', name: '健康・ウェルネス' },
  { id: 'culture', name: '文化・芸術' },
  { id: 'special', name: '特別体験' },
  { id: 'food', name: '食・飲料' },
  { id: 'game', name: 'ゲーム・エンターテイメント' },
  { id: 'social', name: '社交・コミュニティ' },
  { id: 'learning', name: '学習・ワークショップ' },
  { id: 'tech', name: 'テクノロジー・デジタル' }
];
