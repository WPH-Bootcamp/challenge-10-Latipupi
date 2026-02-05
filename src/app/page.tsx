import MostLiked from "@/features/posting/components/MostLiked";
import Recomended from "@/features/posting/components/Recomended";


export default function Home() {
  return (
      <main className="flex justify-between gap-3 md:px-20 px-2">
        <div className="px-5 border-r">
          <h2 className="text-xl font-bold mb-2">Recomnend For You</h2>
          <Recomended />
        </div>
        <div className="hidden md:block">
          <h2 className="text-xl font-bold mb-2">Most Liked</h2>
          <MostLiked />
        </div>
        
      </main>
  );
}
