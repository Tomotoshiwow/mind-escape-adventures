
import { NegativeThoughtType } from '../types';

interface NegativeThoughtInfo {
  type: NegativeThoughtType;
  name: string;
  description: string;
  examples: string[];
}

export const negativeThoughtTypes: NegativeThoughtInfo[] = [
  {
    type: 'anxiety',
    name: '不安',
    description: '将来の不確実性や潜在的な脅威に対する過度な心配',
    examples: ['もし失敗したらどうしよう', '最悪の事態が起こるかもしれない', '準備が足りないかも']
  },
  {
    type: 'worry',
    name: '心配',
    description: '特定の状況や問題に対する繰り返し考え込む傾向',
    examples: ['これについて心配し続けている', 'どうなるか分からなくて気がかり', '何か悪いことが起きそう']
  },
  {
    type: 'rumination',
    name: '反芻思考',
    description: '過去の出来事や問題について繰り返し考え続けること',
    examples: ['あの時ああすれば良かった', 'なぜあんなことをしてしまったのか', 'あの失敗が忘れられない']
  },
  {
    type: 'self-criticism',
    name: '自己批判',
    description: '自分自身に対する厳しい批判や否定的な評価',
    examples: ['私はダメな人間だ', '他の人よりも劣っている', '十分な努力をしていない']
  },
  {
    type: 'perfectionism',
    name: '完璧主義',
    description: '高すぎる基準を設定し、それに達しないことへの恐れ',
    examples: ['完璧にできないなら始めない方がいい', 'もっと良くできるはず', '十分ではない']
  },
  {
    type: 'fear',
    name: '恐怖',
    description: '特定の状況や対象に対する強い不安や恐れ',
    examples: ['怖くて前に進めない', '失敗が怖い', '拒絶されるのが怖い']
  },
  {
    type: 'sadness',
    name: '悲しみ',
    description: '喪失感や失望に関連する感情',
    examples: ['このまま良くならない', '何も楽しくない', '希望が持てない']
  },
  {
    type: 'regret',
    name: '後悔',
    description: '過去の決断や行動に対する後悔の念',
    examples: ['あの時違う選択をすべきだった', 'もう取り返せない', 'チャンスを逃してしまった']
  },
  {
    type: 'guilt',
    name: '罪悪感',
    description: '自分の行動が他者に悪影響を与えたという感覚',
    examples: ['私のせいで起きた', '申し訳ない気持ちでいっぱい', '許されないことをした']
  },
  {
    type: 'overwhelm',
    name: '圧倒感',
    description: '多くの要求や責任に対処できないという感覚',
    examples: ['すべてが重すぎる', '対処しきれない', 'どこから手をつけていいかわからない']
  },
  {
    type: 'other',
    name: 'その他',
    description: '上記に当てはまらないネガティブな思考パターン',
    examples: ['自分の感情をうまく言葉にできない', '複雑な感情がある', 'その他のネガティブな思考']
  }
];
