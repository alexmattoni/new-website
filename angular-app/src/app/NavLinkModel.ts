export interface NavLink 
{
  title: string;
  route: string;
  adminOnly: boolean;
  dropdownItems?: DropdownItem[];  // Optional property
}

export interface DropdownItem
{
  title: string;
  route: string;
}