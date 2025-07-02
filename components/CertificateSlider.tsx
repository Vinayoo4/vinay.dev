import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { motion, AnimatePresence } from "framer-motion";

interface CertificateSliderProps {
  images?: string[];
}

const defaultImages: string[] = [
  "/certificate/advancedtechincalanaylsisindss.jpg",
  "/certificate/basics_mf_ind_ss.jpg",
  "/certificate/basic_etfs_ind_ss.jpg",
  "/certificate/index_funds_ind_ss.jpg",
  // Example Google Drive images:
  "https://drive.google.com/uc?export=view&id=1A2B3C4D5E6F7G8H9I0J",
  "https://drive.google.com/uc?export=view&id=2B3C4D5E6F7G8H9I0J1A",
  "https://drive.google.com/uc?export=view&id=3C4D5E6F7G8H9I0J1A2B",
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
  const [selected, setSelected] = useState(0);

  // Autoplay effect
  useEffect(() => {
    if (imageList.length === 0) return;
    const interval = setInterval(() => {
      setSelected((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
      if (apiRef.current) {
        if (apiRef.current.selectedScrollSnap() === imageList.length - 1) {
          apiRef.current.scrollTo(0);
        } else {
          apiRef.current.scrollNext();
        }
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [imageList]);

  // Sync selected state with carousel
  useEffect(() => {
    if (apiRef.current) {
      apiRef.current.scrollTo(selected);
    }
  }, [selected]);

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
            <AnimatePresence mode="wait" initial={false}>
              <CarouselItem key={imageList[selected]}>
                <motion.div
                  key={imageList[selected]}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.4, type: "spring" }}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="rounded-xl overflow-hidden shadow-2xl border-4 border-yellow-400 bg-black flex items-center justify-center min-h-[400px] min-w-[300px]">
                    <Image
                      src={imageList[selected]}
                      alt={`Certificate ${selected + 1}`}
                      width={700}
                      height={500}
                      className="object-contain max-h-[400px] bg-black"
                      priority
                    />
                  </div>
                </motion.div>
              </CarouselItem>
            </AnimatePresence>
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};

export default CertificateSlider; 