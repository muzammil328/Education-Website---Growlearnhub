'use client';
import React, { useState } from 'react';
import MobileNavbar from './mobile/page';
import DesktopNavbar from './desktop/page';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      {/* Mobile menu */}
      <MobileNavbar open={open} setOpen={setOpen} />

      {/* Desktop menu */}
      <DesktopNavbar setOpen={setOpen} />
    </React.Fragment>
  );
}
