import { Button } from "@/components/ui/button"

const ContactForm = () => {
  return(
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 col-start-8 col-span-5">
    <h3 className='text-xl font-semibold mb-8'>Payment and delivery information</h3>
    <form className="grid grid-cols-3">
      <label className="mt-2 col-start-1">Name</label>
      <input className="mt-2 col-start-2 col-span-2 border-solid border-2 border-gray-400 rounded-md" type='text'></input>
      <label className="mt-2 col-start-1">Mail</label>
      <input className="mt-2 col-start-2 col-span-2 border-solid border-2 border-gray-400 rounded-md" type='text'></input>
      <label className="mt-2 col-start-1">Phone</label>
      <input className="mt-2 col-start-2 col-span-2 border-solid border-2 border-gray-400 rounded-md" type='text'></input>
      <label className="mt-2 col-start-1">Adress</label>
      <input className="mt-2 col-start-2 col-span-2 border-solid border-2 border-gray-400 rounded-md" type='text'></input>
      <label className="mt-2 col-start-1">Billing adress</label>
      <input className="mt-2 col-start-2 col-span-2 border-solid border-2 border-gray-400 rounded-md" type='text'></input>
      <Button className="mt-6 col-span-3 mx-4 bg-gray-400">Submit</Button>
    </form>
  </div>
  )
}

export default ContactForm;