export const FoodMenu = () => {
  return (
    <div className="mx-auto h-auto flex max-w-3xl  flex-col bg-white text-primary-500 w-full  self-center z-10 text-primary text-center relative">
      <div>
        <h1>MENU</h1>
        <h2>DANIA GŁÓWNE</h2>
        <ul className="grid grid-cols-2 gap-8 mt-16 text-2xl">
          {Array.from({ length: 10 }).map((_, index) => (
            <li key={index}>
              <div className="flex relative justify-between">
                <h3 className="w-full">Kotlet schabowy </h3> <div className="lines border-b-2"></div>
                <span className="text-primary-500 ">12.99</span>
              </div>
              <span className="text-base text-left flex justify-start pl-1">ziemniakami i surówka</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
