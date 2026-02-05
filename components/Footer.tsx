import { Facebook, Youtube, Instagram, Github } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { 
      name: "Facebook", 
      href: "https://www.facebook.com/mdshethil.mdshethil/", 
      icon: <Facebook size={20} />, 
      hover: "hover:text-blue-600" 
    },
    { 
      name: "YouTube", 
      href: "https://www.youtube.com/@mhshethil", 
      icon: <Youtube size={20} />, 
      hover: "hover:text-red-600" 
    },
    { 
      name: "Instagram", 
      href: "https://www.instagram.com/mh_shethil/", 
      icon: <Instagram size={20} />, 
      hover: "hover:text-pink-600" 
    },
    { 
      name: "GitHub", 
      href: "https://github.com/mh-shethil-7092", 
      icon: <Github size={20} />, 
      hover: "hover:text-gray-400" 
    },
  ];

  return (
    <footer className="border-t bg-white dark:bg-gray-950 py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4">
        
        {/* Social Icons Container */}
        <div className="flex gap-6 text-gray-500 transition-colors">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`transition-all duration-300 transform hover:scale-110 ${social.hover}`}
              aria-label={social.name}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Copyright Text */}
        <div className="text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} <span className="font-semibold text-gray-700 dark:text-gray-200">MediStore</span></p>
          <p className="mt-1">All rights reserved.</p>
        </div>
        
      </div>
    </footer>
  );
}