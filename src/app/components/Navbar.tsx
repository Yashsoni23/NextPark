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

export const AcmeLogo = () => {
  return <h1 className="font-bold text-secondary-600 text-3xl">NextPark</h1>;
};

export default function Nav() {
  const firebase = useAuth();
  const pathname = usePathname();
  console.log(firebase?.user?.photoURL);

  const navData = [
    { name: "Home", value: "/" },
    { name: "My Bookings", value: "/mybookings" },
    { name: "Profile & Settings", value: "/profile&settings" },
    { name: "Contact Us", value: "/contact-us" },
    { name: "FAQ", value: "/faq" },
  ];

  return (
    <Navbar>
      <NavbarContent justify="start">
        <AcmeLogo />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navData.map((item: { name: string; value: string }) => (
          <NavbarItem key={item.value} isActive={pathname === item.value}>
            <Link
              color={pathname === item.value ? "secondary" : "foreground"}
              href={item.value}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {!(pathname === "/login") && !firebase.user && (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button
              as={Link}
              href="/login"
              title="Explore"
              className="w-max px-4 font-bold text-slate-200 bg-secondary-500"
            >
              Login
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      {firebase.user && (
        <NavbarContent as="div" justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="secondary"
                name={firebase?.user?.displayName || "User"}
                size="sm"
                src={
                  firebase?.user?.photoURL
                    ? firebase?.user?.photoURL
                    : "https://i.pinimg.com/736x/c6/34/60/c6346030acb7a780af81803c84a06680.jpghttps://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCUJ-GVxj9ccx2tR1zUe1nJDRjtsDjAlYANA&s"
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">{firebase?.user?.email}</p>
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onPress={() => firebase?.logOut()}
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
