interface FooterProps {
  storeName: string;
}

export default function Footer({ storeName }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      <div className="mx-auto py-10">
        <p className="text-center text-xs text-black">
          © {currentYear} {storeName}
        </p>
      </div>
    </footer>
  );
}
