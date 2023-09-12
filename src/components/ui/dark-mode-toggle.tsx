export default function DarkMode() {
  return (
    <>
      <div
        id="sun"
        class="hidden h-10 w-10 cursor-pointer rounded-full p-2.5 text-gray-300 hover:bg-white/5 active:scale-95"
        _="on click take .dark from <html/> add .hidden to me take .hidden from #moon"
      >
        <i class="i-lucide-sun h-5 w-5" />
      </div>
      <div
        id="moon"
        class="h-10 w-10 cursor-pointer rounded-full stroke-gray-700 p-2.5 hover:bg-black/5"
        _="on click add .dark to <html/> add .hidden to me take .hidden from #sun"
      >
        <i class="i-lucide-moon h-5 w-5" />
      </div>
    </>
  );
}
