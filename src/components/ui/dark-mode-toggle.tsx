import { MoonIcon, SunIcon } from "./icons";

export default function DarkMode() {
  return (
    <>
      <SunIcon
        id="sun"
        class="hidden h-10 w-10 cursor-pointer p-2 text-gray-300 hover:bg-white/5 active:scale-95"
        _="on click take .dark from <html/> add .hidden to me take .hidden from #moon"
      />
      <MoonIcon
        id="moon"
        class="h-10 w-10 cursor-pointer p-2 text-gray-700 hover:bg-black/5 active:scale-95"
        _="on click add .dark to <html/> add .hidden to me take .hidden from #sun"
      />
    </>
  );
}
