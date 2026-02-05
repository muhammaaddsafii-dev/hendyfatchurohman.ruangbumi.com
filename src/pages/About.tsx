 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
 import ContactForm from "@/components/ContactForm";
 import FAQSection from "@/components/FAQSection";
 
 const faqItems = [
   {
     question: "Are you accepting commission projects?",
     answer: "Yes, I am currently accepting commission projects. Please reach out through the contact form with details about your project, timeline, and budget.",
   },
   {
     question: "Do you design tattoos?",
     answer: "I occasionally design tattoos for clients. Each design is custom and unique. Contact me to discuss your ideas and we can see if it's a good fit.",
   },
   {
     question: "My print didn't arrive or is damaged. What do I do?",
     answer: "Please contact me immediately with your order number and photos of any damage. I will work with you to resolve the issue as quickly as possible.",
   },
 ];
 
 const About = () => {
   return (
     <div className="min-h-screen bg-background">
       <Header />
 
       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
         {/* Contact Form */}
         <ContactForm />
 
         {/* Divider */}
         <hr className="border-border my-8" />
 
         {/* FAQ */}
         <FAQSection items={faqItems} />
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default About;