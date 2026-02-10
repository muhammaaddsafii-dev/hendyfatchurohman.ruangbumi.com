import { Instagram, Mail, MessageCircle, Youtube } from "lucide-react";

const Footer = () => {


  return (
    <footer className="border-t border-border">


      {/* Bottom Section */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/hendy_fatchurohman/" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-muted rounded-full transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:hendy.fatchurohman@mail.ugm.ac.id" className="p-2 hover:bg-muted rounded-full transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <a href="https://wa.me/6282177582119" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-muted rounded-full transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@hendy_fatchurohman" target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-muted rounded-full transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Copyright */}
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              &copy; {new Date().getFullYear()}, HENDY FATCHUROHMAN | Collaboration with <a href="https://ruangbumi.com/" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors underline decoration-dotted underline-offset-2">ruangbumi</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;