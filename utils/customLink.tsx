import Link from 'next/link';
import { ReactNode, useState } from 'react';

type BreadcrumbItem = {
  href: string;
  label: ReactNode | string;
};

type CustomLinkProps = {
  items: BreadcrumbItem[];
  legacy?: boolean;
};

const CustomLink = ({ items, legacy = false }: CustomLinkProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex items-center font-nunito font-semibold sm:!text-[18px] text-[10px] text-toptext">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <span className="mx-2">&gt;</span>}
          <Link 
            href={item.href} 
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              textDecoration: hoveredIndex === index ? 'underline' : 'none',
              textUnderlineOffset: '2px',
            }}
          >
            {item.label}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CustomLink;