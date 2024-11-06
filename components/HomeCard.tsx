import Image from "next/image";
const HomeCard = ({
  img,
  title,
  description,
  bg_color,
  handleClick,
}: {
  img: string;
  title: string;
  description: string;
  bg_color: string;
  handleClick: () => void;
}) => {
  return (
    <div
      className={`${bg_color}  px-4 py-6 flex flex-col justify-between w-full xl:max-w-[276px] min-h-[260px] rounded-[14px] cursor-pointer  hover:scale-105 hover:bg-opacity-80   transition-all `}
      onClick={handleClick}
    >
      <div className="flex-center hover:scale-110  transition-all glassmorphism  size-12 rounded-[10px]">
        <Image alt="create" src={img} width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold ">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
