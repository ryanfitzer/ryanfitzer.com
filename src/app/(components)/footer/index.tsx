import Image from 'next/image';
import npm from '~/public/images/npm.svg';
import github from '~/public/images/github.svg';

export default function Footer() {
  return (
    <footer className="flex flex-grow justify-center items-end mt-16 pb-8 text-gray-500">
      <p className="flex flex-col lg:flex-row lg:space-x-4 text-center">
        <span>© 2024 Ryan Fitzer</span>
        <span className="flex my-2 lg:my-0 space-x-4 justify-center">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/ryanfitzer"
            aria-label="Github"
          >
            <Image className="inline" alt="Github" src={github} />
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.npmjs.com/~ryanfitzer"
            aria-label="NPM"
          >
            <Image className="inline" alt="NPM" src={npm} />
          </a>
        </span>
        <span>
          ryan@ryanfitzer
          <span className="hidden">no-spam!</span>.com
        </span>
      </p>
    </footer>
  );
}
