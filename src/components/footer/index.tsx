export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative flex grow justify-center items-end mt-16 pb-8 text-gray-500 text-xs">
      <p className="flex flex-row space-x-4 text-center">
        <span>© {currentYear} Ryan Fitzer</span>
        <span className="flex space-x-4 justify-center">&bull;</span>
        <span>
          ryan@ryanfitzer
          <span className="hidden">no-spam!</span>.com
        </span>
      </p>
    </footer>
  );
}
