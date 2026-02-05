 import {
   Accordion,
   AccordionContent,
   AccordionItem,
   AccordionTrigger,
 } from "@/components/ui/accordion";
 import { HelpCircle } from "lucide-react";
 
 interface FAQItem {
   question: string;
   answer: string;
 }
 
 interface FAQSectionProps {
   title?: string;
   items: FAQItem[];
 }
 
 const FAQSection = ({ title = "FAQ", items }: FAQSectionProps) => {
   return (
     <section className="py-16">
       <h2 className="page-title text-center mb-12">{title}</h2>
       <div className="max-w-2xl mx-auto">
         <Accordion type="single" collapsible className="w-full">
           {items.map((item, index) => (
             <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
               <AccordionTrigger className="text-left py-4 hover:no-underline">
                 <div className="flex items-center gap-3">
                   <HelpCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                   <span className="text-sm">{item.question}</span>
                 </div>
               </AccordionTrigger>
               <AccordionContent className="text-sm text-muted-foreground pl-7">
                 {item.answer}
               </AccordionContent>
             </AccordionItem>
           ))}
         </Accordion>
       </div>
     </section>
   );
 };
 
 export default FAQSection;