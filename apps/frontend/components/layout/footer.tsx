export default function Footer() {
  const date = new Date().getFullYear();
  return (
    <footer className="h-20 bg-[#E55473]/70 p-10 flex items-center justify-center">
      <p className="text-lg text-white">
        © {date} Flower Lab. Всі права захищено.
      </p>
    </footer>
  );
}
