'use client';

import {
  NavigationMenu,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

interface NavbarProps {
  links: { label: string; href: string; id: string }[];
  currentUrl: string;
}

export default function Navbar({ links, currentUrl }: NavbarProps) {
  return (
    <NavigationMenu className="mx-6 flex items-center space-x-4 lg:space-x-6">
      {links.map(function (link, index: any) {
        const isActive = `/category/${link.id}` === currentUrl;

        return (
          <NavigationMenuLink
            className={`text-sm font-medium transition-colors hover:text-black ${
              isActive ? 'text-black' : 'text-neutral-500'
            }`}
            key={index}
            href={`/category${link.href}`}
          >
            {link.label}
          </NavigationMenuLink>
        );
      })}
    </NavigationMenu>
  );
}
