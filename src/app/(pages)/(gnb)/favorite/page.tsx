import { FavoriteClient } from './_components/FavoriteClient';
import Footer from '@/components/Footer';

export default function FavoritePage() {
  return (
    <div className="flex flex-col h-full">
      <FavoriteClient />
      <Footer />
    </div>
  );
}
