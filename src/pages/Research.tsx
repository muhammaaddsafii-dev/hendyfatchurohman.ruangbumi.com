 import Header from "@/components/Header";
 import Footer from "@/components/Footer";
 import FAQSection from "@/components/FAQSection";
 import ContactForm from "@/components/ContactForm";
 import { Download, FileText, Clock, Users, HelpCircle } from "lucide-react";
 
 // Import research images
 import researchDecay from "@/assets/research-decay.jpg";
 import researchLight from "@/assets/research-light.jpg";
 import researchEphemeral from "@/assets/research-ephemeral.jpg";
 
 const researchProjects = [
   {
     id: 1,
     image: researchDecay,
     tags: ["VISUAL DOCUMENTATION", "MORPHOLOGICAL ANALYSIS"],
     date: "JAN 2024 — MAR 2024",
     caseNumber: "CASE 01",
     title: "Symmetry in Organic Decay",
     description: "An ethnographic approach to documenting botanical decomposition cycles and their mathematical representation in contemporary illustration.",
   },
   {
     id: 2,
     image: researchLight,
     tags: ["FIELD OBSERVATION", "OPTIC STUDY"],
     date: "SEPT 2023 — DEC 2023",
     caseNumber: "CASE 02",
     title: "The Volatility of Light",
     description: "Investigating the refractive index of alpine mist and its psychological impact on spatial perception in landscape rendering.",
   },
   {
     id: 3,
     image: researchEphemeral,
     tags: ["MATERIAL EXPERIMENT", "HISTORICAL ARCHIVE"],
     date: "MAY 2023 — AUG 2023",
     caseNumber: "CASE 03",
     title: "Fibrous Ephemerality",
     description: "A comparative study between 17th-century rag paper and modern synthetic substrates regarding pigment carbonation and longevity.",
   },
 ];
 
 const researchFAQ = [
   {
     question: "How do you choose your research topics?",
     answer: "My research topics emerge from the intersection of my artistic practice and academic curiosity. I'm particularly drawn to phenomena that blur the line between natural processes and artistic expression.",
   },
   {
     question: "Are your research papers available for download?",
     answer: "Yes, all published research papers are available for download. Click the 'Download Research Paper' link below each case study to access the full PDF.",
   },
   {
     question: "What is the typical duration of a research cycle?",
     answer: "Each research cycle typically spans 3-6 months, depending on the complexity of the subject matter and the depth of investigation required.",
   },
   {
     question: "Do you accept research collaborations?",
     answer: "I'm always open to meaningful collaborations with researchers, institutions, and fellow artists. Please reach out through the inquiry form below to discuss potential partnerships.",
   },
 ];
 
 const Research = () => {
   return (
     <div className="min-h-screen bg-background">
       <Header />
 
       <main>
         {/* Hero Section */}
         <section className="bg-primary text-primary-foreground py-16 px-4">
           <div className="max-w-7xl mx-auto">
             <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
               <div>
                 <h1 className="text-3xl md:text-4xl font-display mb-2">RESEARCH PORTFOLIO</h1>
                 <p className="text-sm uppercase tracking-widest text-primary-foreground/70">
                   CASE STUDIES & ACADEMIC FINDINGS
                 </p>
               </div>
               <p className="text-sm uppercase tracking-widest text-primary-foreground/70">
                 TOTAL PROJECTS: 03
               </p>
             </div>
           </div>
         </section>
 
         {/* Research Cards */}
         <section className="py-16 px-4">
           <div className="max-w-7xl mx-auto">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {researchProjects.map((project) => (
                 <article key={project.id} className="group">
                   {/* Image */}
                   <div className="aspect-[4/5] overflow-hidden mb-4">
                     <img
                       src={project.image}
                       alt={project.title}
                       className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                     />
                   </div>
 
                   {/* Tags */}
                   <div className="flex flex-wrap gap-2 mb-4">
                     {project.tags.map((tag, index) => (
                       <span key={index} className="payment-badge">
                         {tag}
                       </span>
                     ))}
                   </div>
 
                   {/* Meta */}
                   <div className="flex justify-between text-xs text-muted-foreground mb-2">
                     <span>{project.date}</span>
                     <span>{project.caseNumber}</span>
                   </div>
 
                   {/* Content */}
                   <h3 className="text-lg font-display mb-2">{project.title}</h3>
                   <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
 
                   {/* Actions */}
                   <div className="space-y-2">
                     <button className="text-xs uppercase tracking-widest hover:underline">
                       READ CASE STUDY
                     </button>
                     <button className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground">
                       <Download className="w-3 h-3" />
                       DOWNLOAD RESEARCH PAPER
                     </button>
                   </div>
                 </article>
               ))}
             </div>
           </div>
         </section>
 
         {/* Research FAQ */}
         <section className="py-16 px-4 max-w-7xl mx-auto">
           <FAQSection title="Research FAQ" items={researchFAQ} />
         </section>
 
         {/* Inquiry Form */}
         <section className="py-16 px-4 max-w-7xl mx-auto">
           <ContactForm title="Inquiries" buttonText="SEND INQUIRY" />
         </section>
 
         {/* Newsletter Footer */}
         <section className="border-t border-border py-12 px-4">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
             <div>
               <h3 className="section-title mb-4">RESEARCH NEWSLETTER</h3>
               <form className="flex items-center gap-4 max-w-sm">
                 <input
                   type="email"
                   placeholder="Email for research updates"
                   className="input-minimal flex-1"
                 />
                 <button type="submit" className="text-muted-foreground hover:text-foreground">
                   →
                 </button>
               </form>
             </div>
           </div>
         </section>
       </main>
 
       <Footer />
     </div>
   );
 };
 
 export default Research;