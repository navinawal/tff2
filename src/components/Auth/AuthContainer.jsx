import Image from "next/image";
import Link from "next/link";
import { socialLinks } from "@/config/site";

export default function AuthContainer({ heading, subHeading, footerHeading, footerLinkText, footerLink, children }) {
  return (
    <div className="h-full w-full min-h-screen relative">
      <div className="h-full grid grid-col-1 md:grid-cols-2">
        <div className="hidden md:flex flex-col justify-between h-full p-16 z-10 bg-muted">
          <div className="p-0 m-0">
            <Link href="/">
              <Image alt="TeamforFilm" src="/logo_white.png" width={150} height={150} />
            </Link>
            <h3 className="text-lg my-5">Welcome to TeamforFilm</h3>
          </div>
          <div className="flex flex-col">
            <div className="mb-5 p-0">
              <ul className="flex gap-5 text-white">
                {socialLinks.map((socialLink) => (
                  <li key={socialLink.name}>
                    <Link href={socialLink.href} target="_blank">
                      {socialLink.icon}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="m-0 p-0">
              <Link className="text-white" target="_blank" href="/privacy-policy">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="bg-background text-foreground flex flex-col justify-center py-16 px-10 lg:px-24 z-10">
          {/* Place the logo above the heading */}
          <div className="text-center mb-20">
            {/* Directly reference the public path */}
            <Image src="/logo_white.png" alt="Logo" width={150} height={150} />
          </div>
          <div className="grid text-center">
            <h1 className="text-3xl font-bold">{heading}</h1>
            <p className="text-sm text-muted-foreground">{subHeading}</p>
          </div>
          <div className="mt-4">{children}</div>
          <div className="mt-8 text-center">
            {footerHeading}
            <Link href={footerLink} className="ml-2 underline">
              {footerLinkText}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}