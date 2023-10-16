'use client';

import getCategories from '@/actions/get-categories';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Category } from '@/types';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [categories, setCategories] = useState<Category[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    async function getData() {
      const categories = await getCategories();

      setCategories(categories);
    }
    getData();
  }, []);

  return (
    <NavigationMenu className="mx-6 flex items-center space-x-4 lg:space-x-6">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Category</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 lg:grid-cols-[.75fr_1fr]">
              {categories.map(function (category) {
                const isActive = `/category/${category.id}` === pathname;

                return (
                  <li className="row-span-3" key={category.id}>
                    <NavigationMenuLink
                      className={`text-sm font-medium transition-colors hover:text-black   ${
                        isActive ? 'text-black' : 'text-neutral-500'
                      }`}
                      href={`/category/${category.id}`}
                    >
                      {category.name}
                    </NavigationMenuLink>
                  </li>
                );
              })}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
