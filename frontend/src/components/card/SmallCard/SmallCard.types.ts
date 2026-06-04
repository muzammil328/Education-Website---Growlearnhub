export interface SmallCardProps {
  id?: number | string;
  name: string;
  slug: string;
}
export interface SmallMenuCardProps {
  id?: number;
  name: string;
  menu: {
    id?: number;
    name: string;
    slug: string;
  }[];
}
