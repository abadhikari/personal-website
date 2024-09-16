export default function FooterBottom() {
  const currentYear = new Date().getFullYear();
  return (
    <div>
      <p>Copyright ©{currentYear} Abhinna Adhikari. All rights reserved.</p>
    </div>
  );
}
