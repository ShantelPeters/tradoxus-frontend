"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

// Navigation structure with dropdowns
const navigationStructure = [
  { name: "Home", path: "/", dropdown: false },
  {
    name: "Learning",
    path: "#",
    dropdown: true,
    items: [
      { name: "Modules", path: "/modules" },
      { name: "Problem", path: "/problem" },
    ],
  },
  {
    name: "Features",
    path: "#",
    dropdown: true,
    items: [
      { name: "Solution", path: "/solution" },
      { name: "Benefits", path: "/benefits" },
      { name: "Gamification", path: "/gamification" },
    ],
  },
  { name: "Web3", path: "/web3", dropdown: false },
  {
    name: "User",
    path: "#",
    dropdown: true,
    items: [
      { name: "Dashboard", path: "/dashboard" },
      { name: "Profile", path: "/profile" },
    ],
  },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(
    {}
  );
  const pathname = usePathname();
  const dropdownRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const navRef = useRef<HTMLElement>(null);

  // Check if a path is active (exact match or child route)
  const isActivePath = (path: string) => {
    if (path === "/") return pathname === "/";
    return (
      pathname === path || (path !== "#" && pathname.startsWith(path + "/"))
    );
  };

  // Check if any item in a dropdown is active
  const isActiveDropdown = (items: { path: string }[]) => {
    return items.some((item) => isActivePath(item.path));
  };

  // Toggle dropdown on mobile
  const toggleDropdown = (name: string) => {
    setOpenDropdowns((prev) => {
      // Close all dropdowns first
      const allClosed = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as Record<string, boolean>);

      // Then open only the requested one
      return {
        ...allClosed,
        [name]: !prev[name],
      };
    });
  };

  // Handle hover for desktop dropdowns
  const handleMouseEnter = (name: string) => {
    setOpenDropdowns((prev) => {
      // Close all dropdowns first
      const allClosed = Object.keys(prev).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {} as Record<string, boolean>);

      // Then open only the hovered one
      return {
        ...allClosed,
        [name]: true,
      };
    });
  };

  // Close all dropdowns
  const closeAllDropdowns = () => {
    setOpenDropdowns({});
  };

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isOutsideNav =
        navRef.current && !navRef.current.contains(event.target as Node);

      if (isOutsideNav) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Style classes
  const activeClass = "text-blue-400 font-medium";
  const inactiveClass = "text-gray-300 hover:text-white";
  const dropdownItemClass =
    "py-2 px-3 rounded-md hover:bg-gray-800 transition-colors block w-full text-center";

  return (
    <header className="relative bg-[#050a14] py-4 px-6">
      <div className="flex justify-between items-center relative z-50">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#18b6e8]">
          Tradoxus
        </Link>

        {/* Mobile menu toggle button */}
        <button
          type="button"
          className="md:hidden text-white"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <nav 
          ref={navRef}
          className="hidden md:flex space-x-10 items-center"
        >
          {navigationStructure.map((item) => (
            <div
              key={item.name}
              className="relative pr-0 md:pr-2"
              ref={(el) => {
                if (item.dropdown) {
                  dropdownRefs.current[item.name] = el;
                }
              }}
            >
              {item.dropdown ? (
                <>
                  <button
                    className={`flex items-center gap-1 transition-colors ${
                      isActiveDropdown(item.items || [])
                        ? activeClass
                        : inactiveClass
                    }`}
                    onClick={() => toggleDropdown(item.name)}
                    onMouseEnter={() => handleMouseEnter(item.name)}
                    aria-expanded={openDropdowns[item.name]}
                    aria-haspopup="true"
                  >
                    {item.name}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {/* Desktop dropdown menu */}
                  {openDropdowns[item.name] && (
                    <div
                      className="absolute px-2 mt-5 ml-[-20px] w-[120px] bg-gray-900 border border-gray-800 rounded-md shadow-lg py-2 animate-in fade-in-100 duration-500"
                      onMouseLeave={() => closeAllDropdowns()}
                    >
                      {item.items?.map((subItem) => (
                        <Link
                          key={subItem.path}
                          href={subItem.path}
                          className={`${dropdownItemClass} ${
                            isActivePath(subItem.path)
                              ? activeClass
                              : inactiveClass
                          }`}
                          onClick={() => closeAllDropdowns()}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.path}
                  className={`transition-colors ${
                    isActivePath(item.path) ? activeClass : inactiveClass
                  }`}
                  onMouseEnter={() => closeAllDropdowns()}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Connect Wallet Button (Desktop) */}
        <div className="hidden md:block">
          <button className="bg-[#18b6e8] text-white px-4 py-2 rounded hover:bg-[#0e9ed0] transition">
            Connect Wallet
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-[#050a14] z-40">
          <nav className="flex flex-col py-4 px-4">
            {navigationStructure.map((item) => (
              <div key={item.name} className="py-1">
                {item.dropdown ? (
                  <div className="w-full">
                    <button
                      className={`flex items-center justify-between w-full py-3 px-4 rounded-md hover:bg-gray-800 transition-colors ${
                        isActiveDropdown(item.items || [])
                          ? activeClass
                          : inactiveClass
                      }`}
                      onClick={() => toggleDropdown(item.name)}
                      aria-expanded={openDropdowns[item.name]}
                    >
                      {item.name}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          openDropdowns[item.name] ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {openDropdowns[item.name] && (
                      <div className="pl-4 mt-1 border-l border-gray-800 ml-4 space-y-1">
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.path}
                            href={subItem.path}
                            className={`py-2 px-4 rounded-md block hover:bg-gray-800 transition-colors ${
                              isActivePath(subItem.path)
                                ? activeClass
                                : inactiveClass
                            }`}
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    href={item.path}
                    className={`py-3 px-4 rounded-md block hover:bg-gray-800 transition-colors ${
                      isActivePath(item.path) ? activeClass : inactiveClass
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Mobile Connect Wallet Button */}
            <button className="bg-[#18b6e8] text-white px-4 py-2 rounded hover:bg-[#0e9ed0] transition w-full mt-2">
              Connect Wallet
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}