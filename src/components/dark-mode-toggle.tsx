import { MoonIcon, SunIcon } from "./icons";

export default function DarkMode() {
  return (
    <div class="float-right m-2">
      <SunIcon
        id="sun"
        class="hidden h-10 w-10 cursor-pointer rounded-full p-2 text-gray-300 transition hover:bg-white/5 active:scale-95"
        _="on click take .dark from <html/> add .hidden to me take .hidden from #moon"
      />
      <MoonIcon
        id="moon"
        class="h-10 w-10 cursor-pointer rounded-full p-2 text-gray-700 transition hover:bg-black/5 active:scale-95"
        _="on click add .dark to <html/> add .hidden to me take .hidden from #sun"
      />
    </div>
  );
}
