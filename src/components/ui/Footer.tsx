// src/components/Footer.tsx
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-pink-700 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
          
          {/* Columna de Contacto y Redes Sociales */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Brenn's</h3>
            
            <h4 className="opacity-90 font-semibold mb-2">Contacto Directo</h4>
            <p className="text-sm">+52 1 771 130 5400</p>

            <h4 className="opacity-90 font-semibold mt-4 mb-2">Síguenos</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              <a 
                href="https://www.facebook.com/profile.php?id=61555802322496" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-pink-300 transition-colors"
              >
                <FaFacebook size={24} />
              </a>
              <a 
                href="#" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-pink-300 transition-colors"
              >
                <FaInstagram size={24} />
              </a>
              <a 
                href="https://wa.me/5217711305405" // Enlace directo a WhatsApp
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="hover:text-pink-300 transition-colors"
              >
                <FaWhatsapp size={24} />
              </a>
            </div>
          </div>

          {/* Columna de Ubicación */}
          <div>
            <h3 className="text-xl font-bold mb-4">Ubicación</h3>
            <p>
              Zona Centro, calle Juan Mogica Ugalde 5A. 
              <span className="block text-sm opacity-80 mt-1">
                -Una calle detras del cine, donde antes era uniformes Bekita, Huejutla de Reyes-
              </span>
            </p>
          </div>

          {/* Columna con el nuevo título */}
          <div>
            <h3 className="text-xl font-bold mb-4">Detalles</h3>
            <ul className="space-y-1 text-sm">
              <li>Academia Brenn´s tiene como objetivo principal, educar con excelencia a las Manicuristas y Pedicuristas de Huejutla y sus Alrededores.
Además contamos con venta de material, a un costo accesible pero de excelente calidad.
Somos tu mejor opción.</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/30 mt-10 pt-8 text-center">
          <p>© 2025 Brenn's • Hecho con amor en Huejutla de Reyes, Hidalgo ♡</p>
        </div>
      </div>
    </footer>
  )
}