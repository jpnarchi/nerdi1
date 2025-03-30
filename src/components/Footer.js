import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white p-4 text-center">
      <p className="text-orange-500">© 2024 Securitte - Todos los derechos reservados</p>
      <div className="mt-2 space-x-4">
        <a href="#" className="text-white hover:text-orange-500">Política de Privacidad</a>
        <a href="#" className="text-white hover:text-orange-500">Términos de Uso</a>
      </div>
    </footer>
  );
};

export default Footer;