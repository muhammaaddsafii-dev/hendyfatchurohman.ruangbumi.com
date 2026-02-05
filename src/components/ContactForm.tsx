 import { useState } from "react";
 
 interface ContactFormProps {
   title?: string;
   buttonText?: string;
 }
 
 const ContactForm = ({ title = "Contact", buttonText = "SEND" }: ContactFormProps) => {
   const [formData, setFormData] = useState({
     name: "",
     email: "",
     phone: "",
     comment: "",
   });
 
   const handleChange = (
     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
   ) => {
     setFormData({ ...formData, [e.target.name]: e.target.value });
   };
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     // Handle form submission
     console.log(formData);
   };
 
   return (
     <section className="py-16">
       <h2 className="page-title text-center mb-12">{title}</h2>
       <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <input
             type="text"
             name="name"
             placeholder="Name"
             value={formData.name}
             onChange={handleChange}
             className="input-minimal border border-border rounded-md px-4"
           />
           <input
             type="email"
             name="email"
             placeholder="Email *"
             required
             value={formData.email}
             onChange={handleChange}
             className="input-minimal border border-border rounded-md px-4"
           />
         </div>
         <input
           type="tel"
           name="phone"
           placeholder="Phone number"
           value={formData.phone}
           onChange={handleChange}
           className="input-minimal border border-border rounded-md px-4"
         />
         <textarea
           name="comment"
           placeholder="Comment"
           rows={5}
           value={formData.comment}
           onChange={handleChange}
           className="input-minimal border border-border rounded-md px-4 resize-none"
         />
         <button type="submit" className="btn-primary">
           {buttonText}
         </button>
       </form>
     </section>
   );
 };
 
 export default ContactForm;