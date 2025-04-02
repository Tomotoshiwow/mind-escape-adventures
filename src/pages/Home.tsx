
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Compass, Brain } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* ヒーローセクション */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-blue-500/10 to-teal-500/20 -z-10" />
        
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
            マインド・エスケープ
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            ネガティブな思考から解放され、新しい体験との偶然の出会いを
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button asChild className="btn-gradient text-lg py-6 px-8">
              <Link to="/activities">
                <Compass className="mr-2" size={20} />
                アクティビティを探す
              </Link>
            </Button>
            <Button asChild variant="outline" className="bg-white/80 backdrop-blur-sm text-lg py-6 px-8">
              <Link to="/mindfulness">
                <Brain className="mr-2" size={20} />
                マインドフルネスを試す
              </Link>
            </Button>
          </div>
          
          <div className="max-w-xl mx-auto p-6 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">マインド・エスケープについて</h2>
            <p className="text-gray-600 mb-4">
              自己分析に長けているあなたは、時に思考の渦に捕らわれていませんか？
              マインド・エスケープは、ネガティブな思考から離れ、新鮮な体験と出会うためのプラットフォームです。
            </p>
            <p className="text-gray-600">
              厳選されたアクティビティとパーソナライズされた提案で、あなたの「ふと誘われてやってみたらハマった」体験をサポートします。
            </p>
          </div>
        </div>
      </section>
      
      {/* 特徴セクション */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-10 text-center">
            マインド・エスケープの特徴
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="text-purple-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">新鮮な体験</h3>
              <p className="text-gray-600">
                あなたが思いつかないような新しいアクティビティとの出会いを提供します。
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Brain className="text-blue-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">思考からの解放</h3>
              <p className="text-gray-600">
                ネガティブな思考から離れるための心理的アプローチを組み合わせています。
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Compass className="text-green-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">効率的な発見</h3>
              <p className="text-gray-600">
                膨大な情報から、あなたに合ったアクティビティだけを厳選してお届けします。
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-600">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path>
                  <path d="m7 10 5 5 5-5"></path>
                  <path d="M7 15h10"></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">偶然の魔法</h3>
              <p className="text-gray-600">
                「人に誘われてやってみたら良かった」という体験を、テクノロジーで再現します。
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTAセクション */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            新しい体験への一歩を踏み出しましょう
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            ネガティブな思考の循環から抜け出し、新たな可能性を発見する旅へ
          </p>
          
          <Button asChild className="bg-white text-purple-600 hover:bg-gray-100 text-lg py-6 px-8">
            <Link to="/activities">
              始めてみる
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
