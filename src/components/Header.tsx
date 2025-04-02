
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Home, Compass, Heart, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">
          Mind Escape
        </Link>

        {/* モバイルメニューボタン */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

        {/* デスクトップナビゲーション */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="flex items-center gap-1 text-gray-700 hover:text-primary">
            <Home size={18} />
            <span>ホーム</span>
          </Link>
          <Link to="/activities" className="flex items-center gap-1 text-gray-700 hover:text-primary">
            <Compass size={18} />
            <span>アクティビティ</span>
          </Link>
          <Link to="/favorites" className="flex items-center gap-1 text-gray-700 hover:text-primary">
            <Heart size={18} />
            <span>お気に入り</span>
          </Link>
          <Link to="/profile" className="flex items-center gap-1 text-gray-700 hover:text-primary">
            <User size={18} />
            <span>プロフィール</span>
          </Link>
        </nav>
      </div>

      {/* モバイルメニュー */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute w-full animated slide-up">
          <nav className="flex flex-col py-4">
            <Link 
              to="/" 
              className="py-3 px-6 flex items-center gap-2 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <Home size={18} />
              <span>ホーム</span>
            </Link>
            <Link 
              to="/activities" 
              className="py-3 px-6 flex items-center gap-2 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <Compass size={18} />
              <span>アクティビティ</span>
            </Link>
            <Link 
              to="/favorites" 
              className="py-3 px-6 flex items-center gap-2 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <Heart size={18} />
              <span>お気に入り</span>
            </Link>
            <Link 
              to="/profile" 
              className="py-3 px-6 flex items-center gap-2 hover:bg-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <User size={18} />
              <span>プロフィール</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
