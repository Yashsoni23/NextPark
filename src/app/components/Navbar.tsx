"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Button,
} from "@heroui/react";
import { usePathname } from "next/navigation";
import { useAuth } from "../context/firebase";
import { useMemo } from "react";

export const AcmeLogo = () => {
  return <h1 className="font-bold text-secondary-600 text-3xl">NextPark</h1>;
};

export default function Nav() {
  const { userData, User, logOut } = useAuth();
  const pathname = usePathname();

  // Memoize navigation links
  const navData = useMemo(
    () => [
      { name: "Home", value: "/" },
      { name: "My Bookings", value: "/my-bookings" },
      { name: "Profile & Settings", value: "/profile&settings" },
      { name: "Contact Us", value: "/contact-us" },
      { name: "FAQ", value: "/faq" },
    ],
    []
  );
  console.log(userData, User);
  // Memoize the user state to prevent unnecessary re-renders
  const user = useMemo(() => User, [User]);

  return (
    <Navbar>
      <NavbarContent justify="start">
        <AcmeLogo />
      </NavbarContent>

      {/* Visible on Large Screens */}
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navData.map(({ name, value }) => (
          <NavbarItem key={value} isActive={pathname === value}>
            <Link
              color={pathname === value ? "secondary" : "foreground"}
              href={value}
            >
              {name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Login Button for Guests */}
      {!user && !userData && pathname !== "/login" && (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              href="/login"
              className="w-max px-4 font-bold text-slate-200 bg-secondary-500"
            >
              Login
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      {/* User Profile & Logout */}
      {user && (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={user?.displayName || "User"}
                size="sm"
                src={user?.photoURL || userData?.photoURL}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold text-secondary-600">Signed in as</p>
                <p className="font-semibold text-secondary-600">
                  {user?.email}
                </p>
              </DropdownItem>
              <>
                {navData.map(({ name, value }) => (
                  <DropdownItem className="sm:hidden" key={value}>
                    <Link href={value}>{name}</Link>
                  </DropdownItem>
                ))}
              </>
              <DropdownItem
                key="logout"
                color="danger"
                className="text-danger"
                onPress={() => logOut()}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
    </Navbar>
  );
}
