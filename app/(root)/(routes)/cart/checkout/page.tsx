import ContactForm from './components/contact-form';

export default function CheckoutPage() {
  return (
    <div className="px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-black">Checkout</h1>
      <ContactForm />
    </div>
  );
}
