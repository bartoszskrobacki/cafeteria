import { Button } from "@/components/ui/button";
import Image from "next/image";

export const MainBanner = () => {
  return (
    <div className="relative w-full max-w-[1680px] max-h-[1024px] mx-auto">
      <Image src="/main_banner.jpg" alt="" width={2048} height={720} />
      <div className="absolute top-0 h-full w-full">
        <div className="flex relative justify-center items-center h-full text-primary-500">
          <Image src="/logo.png" alt="" width={512} height={512} />
          <div className="absolute text-center ">
            <span>Codziennie świetne dania</span>
            <h1 className="text-primary">
              STOŁÓWKA <br /> STUDENCKA
            </h1>
            <Button variant="link" className="w-48 ">
              <span>Zobacz menu</span>
            </Button>
            <div className="mt-8">Łuzycka Gliwice, 32 237 23 47</div>
          </div>
        </div>
      </div>
    </div>
  );
};
