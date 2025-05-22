import { getOpenDayMap } from "@/utils/open-days";

export default function StoreInfo({ name, openDays, address }: { name: string; openDays: number; address: string }) {
  return (
    <>
      <h1 className="f36 text-medium text-primary-text leading-none">{name}</h1>

      <div className="f22 text-medium flex items-center leading-none">
        <img src="/images/calendar.png" alt="달력" className="mr-5 h-5 w-5" />
        {Object.entries(getOpenDayMap(openDays)).map(([day, isOpen]) => (
          <span key={day} className={isOpen ? "text-primary-300" : "text-line"}>
            {day}
          </span>
        ))}
      </div>

      <div className="flex items-center">
        <img src="/images/location.png" alt="위치" className="mr-5 h-5 w-5" />
        <p className="f22 text-medium text-sub-text leading-none">{address}</p>
      </div>
    </>
  );
}
