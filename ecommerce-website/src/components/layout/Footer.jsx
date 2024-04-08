export default function Footer() {
  return (
    <footer className="flex flex-col bg-slate-300 h-20 justify-center">
      <h3 className="text-center">
        <span>&copy;</span>Yugantar All rights reserved
      </h3>
      <ul className="underline flex space-x-4 justify-center">
        <li>About</li>
        <li>Contact</li>
        <li>Privacy Policy</li>
      </ul>
    </footer>
  );
}
