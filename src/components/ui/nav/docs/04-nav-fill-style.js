import React from "react";
import { Nav, NavItem, NavLink } from "../index";

export default function NavPillsExample() {
  return (
    <Nav fill>
      <NavItem>
        <NavLink href="#">Active</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="#">Another Link</NavLink>
      </NavItem>
      <NavItem>
        <NavLink disabled href="#">
          Disabled Link
        </NavLink>
      </NavItem>
    </Nav>
  );
}
