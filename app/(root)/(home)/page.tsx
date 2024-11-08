import MeetingTypeList from "@/components/MeetingTypeList";
const Home = () => {
  const date = new Date();
  // ok ok solution hai ye wala
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: "Asia/Kolkata",
  }).format(date);

  // customly made hai ye wala niche wala
  // const time = `${
  //   date.getHours() > 12 ? (date.getHours() - 12).toString() : date.getHours()
  // }:${date.getMinutes() < 10 ? "0" : ""}${date.getMinutes()}`;

  const day = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
  // console.log(`${time} , ${day}`);

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[270px] w-full rounded-[20px] bg-hero  bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h1 className="glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal">
            Let&apos;s get started
          </h1>
          <div className="flex flex-col gap-2 ">
            <div>
              <span className="text-4xl font-extrabold lg:text-7xl">
                {time}
              </span>
              {/* <span>{`${date.getHours() > 12 ? "PM" : "AM"}`}</span> */}
            </div>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{`${day}  `}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;
