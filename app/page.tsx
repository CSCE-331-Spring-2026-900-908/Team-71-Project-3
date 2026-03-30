import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#c2b2a2] text-black">

      {/* 2. Hero Title */}
      <header className="pt-32 pb-10 text-center">
        <h1 className="text-6xl font-serif text-[##C4AF9A]">Boba shop</h1>
      </header>

      {/* 3. Content Sections */}
      <div className="max-w-5xl mx-auto px-8 space-y-24 pb-20">
        
        {/* Section: Who are we */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-semibold mb-4">Who are we</h2>
            <p className="text-lg leading-relaxed text-gray-800">
              Lorem ipsum dolor sit amet consectetur. Hendrerit habitasse enim a condimentum 
              malesuada nunc donec commodo felis. Scelerisque felis fringilla potenti tristique 
              tellus at eu elementum ultricies.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image src="/Template Image.svg" alt="Boba tea" width={300} height={400} className="object-contain" />
          </div>
        </div>

        {/* Section: Location & Hours (Reversed) */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-semibold mb-4">Location & Hours</h2>
            <p className="text-lg leading-relaxed text-gray-800">
              Lorem ipsum dolor sit amet consectetur. Hendrerit habitasse enim a condimentum 
              malesuada nunc donec commodo felis. Scelerisque felis fringilla potenti tristique 
              tellus at eu elementum ultricies.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image src="/Template Image.svg" alt="Boba tea" width={300} height={400} className="object-contain" />
          </div>
        </div>

        {/* Section: Types of Products */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <h2 className="text-4xl font-semibold mb-4">Types of Products</h2>
            <p className="text-lg leading-relaxed text-gray-800">
              Lorem ipsum dolor sit amet consectetur. Hendrerit habitasse enim a condimentum 
              malesuada nunc donec commodo felis. Scelerisque felis fringilla potenti tristique 
              tellus at eu elementum ultricies.
            </p>
          </div>
          <div className="flex-1 flex justify-center">
            <Image src="/Template Image.svg" alt="Boba tea" width={300} height={400} className="object-contain" />
          </div>
        </div>

      </div>
    </main>
  );
}