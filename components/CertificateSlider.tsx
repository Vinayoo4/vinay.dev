import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";

interface CertificateSliderProps {
  images?: string[];
}

const defaultImages: string[] = [
  "/certificate/advancedtechincalanaylsisindss.jpg",
  "/certificate/basics_mf_ind_ss.jpg",
  "/certificate/basic_etfs_ind_ss.jpg",
  "/certificate/index_funds_ind_ss.jpg",
  "/certificate/intraday_ind_Ss.jpg",
  "/certificate/short_selling_ind_ss.jpg",
  "/certificate/basicsofstocksindss.jpg",
  "/certificate/marketingterminollogiesindss.jpg",
  "/certificate/basicsofiposindss.jpg",
  "/certificate/basicsoftechincalanalysisindss.jpg",
  "/certificate/fundamentalstocksindss.jpg",
  "/certificate/circuitlimitindss.jpg",
  "/certificate/usindiansindssind.jpg",
  "/certificate/basicofmoneyindss.jpg",
  "/certificate/basicofcompoundingssind.jpg",
  "/certificate/masteringfdindss.jpg",
  "/certificate/fundamentalsinflationsindss.jpg",
  "/certificate/growingmoneyindss.jpg",
  "/certificate/fundamentalofinsuranceindss.jpg",
  "/certificate/creditscoreindss.jpg",
  "/certificate/financialplanningindss.jpg",
  "/certificate/potfoliomanagementssind.jpg",
  "/certificate/optionsprofitindownmarket.jpg",
  "/certificate/mecataptitudess.jpg",
  "/certificate/optionsbasicsindss.jpg",
  "/certificate/mecatrepotss.jpg",
  "/certificate/mecatreportss.jpg",
  "/certificate/corebehaviourss.jpg",
  "/certificate/mecatindustyreportss.jpg",
  "/certificate/mecatss1.jpg",
  "/certificate/mecatss2.jpg"
];

// Only allow image files (jpg, jpeg, png, gif, webp)
const isImage = (path: string) => /\.(jpg|jpeg|png|gif|webp)$/i.test(path);

const CertificateSlider: React.FC<CertificateSliderProps> = ({ images = defaultImages }) => {
  const apiRef = useRef<CarouselApi | null>(null);
  const imageList = images.filter(isImage);

  // Autoplay effect
  useEffect(() => {
    if (imageList.length === 0) return;
    const interval = setInterval(() => {
      if (apiRef.current) {
        if (apiRef.current.selectedScrollSnap() === imageList.length - 1) {
          apiRef.current.scrollTo(0);
        } else {
          apiRef.current.scrollNext();
        }
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [imageList]);

  if (imageList.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center drop-shadow-lg">My Certificates & Exam Screenshots</h2>
        <div className="text-center text-gray-400">No certificates to display.</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-yellow-400 mb-6 text-center drop-shadow-lg">My Certificates & Exam Screenshots</h2>
      <div className="relative">
        <Carousel setApi={(api) => (apiRef.current = api)}>
          <CarouselContent>
            {imageList.map((img, idx) => (
              <CarouselItem key={img}>
                <div className="flex flex-col items-center justify-center">
                  <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-400 bg-black flex items-center justify-center min-h-[400px] min-w-[300px]">
                    <Image
                      src={img}
                      alt={`Certificate ${idx + 1}`}
                      width={700}
                      height={500}
                      className="object-contain max-h-[400px] bg-black"
                      priority={idx === 0}
                    />
                  </div>
                  {/* Only show the name if the file is not an image */}
                  {/* { !isImage(img) && (
                    <span className="mt-2 text-sm text-gray-300">{img.split("/").pop()?.replace(/\.[^.]+$/, "").replace(/_/g, " ")}</span>
                  ) } */}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default CertificateSlider; 