 import { Instagram, Twitter } from "lucide-react";
 import { useState } from "react";
 import { ArrowRight } from "lucide-react";
 
 const Footer = () => {
   const [email, setEmail] = useState("");
 
   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     // Handle subscription
     setEmail("");
   };
 
   return (
     <footer className="border-t border-border">
       {/* Subscribe Section */}
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
           <div className="flex-1">
             <h3 className="section-title mb-4">SUBSCRIBE FOR UPDATES</h3>
             <form onSubmit={handleSubmit} className="flex items-center gap-4 max-w-sm">
               <input
                 type="email"
                 placeholder="Email"
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="input-minimal flex-1"
               />
               <button type="submit" className="p-2 hover:bg-muted rounded-full transition-colors">
                 <ArrowRight className="w-4 h-4" />
               </button>
             </form>
           </div>
           <div className="flex items-center gap-4">
             <a href="#" className="p-2 hover:bg-muted rounded-full transition-colors">
               <Instagram className="w-5 h-5" />
             </a>
             <a href="#" className="p-2 hover:bg-muted rounded-full transition-colors">
               <Twitter className="w-5 h-5" />
             </a>
           </div>
         </div>
       </div>
 
       {/* Bottom Section */}
       <div className="border-t border-border">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
           <div className="flex flex-col md:flex-row items-center justify-between gap-4">
             {/* Payment Methods */}
             <div className="flex items-center gap-2">
               <span className="payment-badge">AMEX</span>
               <span className="payment-badge">Pay</span>
               <span className="payment-badge">VISA</span>
               <span className="payment-badge">Master</span>
               <span className="payment-badge">PayPal</span>
               <span className="payment-badge">Shop</span>
             </div>
 
             {/* Copyright */}
             <p className="text-xs text-muted-foreground">
               © 2024, HENDY FATCHUROHMAN ILLUSTRATION
             </p>
           </div>
         </div>
       </div>
     </footer>
   );
 };
 
 export default Footer;