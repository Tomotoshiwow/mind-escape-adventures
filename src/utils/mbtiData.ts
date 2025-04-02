
import { MBTIType } from '../types';

interface MBTIInfo {
  type: MBTIType;
  description: string;
  preferences: string[];
}

export const mbtiData: MBTIInfo[] = [
  {
    type: 'INTJ',
    description: '論理的で戦略的な思想家、複雑な問題を解決することに長けています。',
    preferences: ['知的な挑戦', '独立した作業', '創造的な問題解決', '効率性', '長期的な計画']
  },
  {
    type: 'INTP',
    description: '革新的な発明家、好奇心が強く理論的な思考を好みます。',
    preferences: ['理論と概念', 'オープンエンドな問題', '自律性', '知識追求', '創造的な解決策']
  },
  {
    type: 'ENTJ',
    description: '大胆なリーダー、効率的な問題解決と組織運営に長けています。',
    preferences: ['リーダーシップ', '効率的なシステム', '論理的分析', '目標設定', 'チャレンジ']
  },
  {
    type: 'ENTP',
    description: '活気に満ちた発明家、新しいアイデアやプロジェクトを生み出すことに長けています。',
    preferences: ['革新的なアイデア', '知的な刺激', '柔軟性', '創造的な問題解決', '議論']
  },
  {
    type: 'INFJ',
    description: '洞察力のある理想主義者、他者の感情や動機を理解することに長けています。',
    preferences: ['深い関係性', '意味のある仕事', '創造的表現', '調和', '個人の成長']
  },
  {
    type: 'INFP',
    description: '思いやりのある理想主義者、自己表現と内省を重視します。',
    preferences: ['個人の価値観', '創造的な活動', '意味の探求', '自己探求', '調和と平和']
  },
  {
    type: 'ENFJ',
    description: 'カリスマ的なリーダー、他者の成長をサポートすることに情熱を注ぎます。',
    preferences: ['人々との協力', '調和的な関係', '意味のある会話', '個人の成長', '社会貢献']
  },
  {
    type: 'ENFP',
    description: '熱心な理想主義者、新しい可能性や人間の潜在能力を見出すことを楽しみます。',
    preferences: ['創造的表現', '新しい経験', '人間関係', '多様性', '自発性']
  },
  {
    type: 'ISTJ',
    description: '勤勉な管理者、詳細と系統立った手順を重視します。',
    preferences: ['秩序と構造', '事実と詳細', '信頼性', '伝統', '効率性']
  },
  {
    type: 'ISFJ',
    description: '献身的な保護者、他者のニーズに対して敏感で実用的なサポートを提供します。',
    preferences: ['他者のケア', '実用的なサポート', '信頼性', '伝統', '調和']
  },
  {
    type: 'ESTJ',
    description: '効率的な管理者、明確な手順と規則を設定し維持することに長けています。',
    preferences: ['秩序と構造', '実用性', 'リーダーシップ', '伝統的価値観', '効率性']
  },
  {
    type: 'ESFJ',
    description: '思いやりのあるホスト、他者の調和と幸福を促進することに喜びを感じます。',
    preferences: ['社交的な交流', '協力', '伝統', '実用的なサービス', '調和']
  },
  {
    type: 'ISTP',
    description: '器用な問題解決者、機械的な理解と実用的な知識に長けています。',
    preferences: ['手を使う作業', '効率性', '自律性', '冒険', '実用的な問題解決']
  },
  {
    type: 'ISFP',
    description: '柔軟で魅力的なアーティスト、審美眼と感覚的な体験を重視します。',
    preferences: ['芸術的表現', '審美性', '自然', '感覚的体験', '個人の自由']
  },
  {
    type: 'ESTP',
    description: '活動的な冒険家、すぐに行動し実践的な解決策を好みます。',
    preferences: ['冒険', '実践的な活動', '即時の結果', '社交性', '柔軟性']
  },
  {
    type: 'ESFP',
    description: '自発的なエンターテイナー、社交的な交流と感覚的な喜びを楽しみます。',
    preferences: ['社交的な交流', '楽しい経験', '自発性', '実用的なスキル', '協力']
  },
];

export const mbtiTestLink = "https://www.16personalities.com/ja";
