import React from 'react';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

const Footer=()=>{

  const date=new Date().getFullYear();

return <div class="container">
  <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div class="col-md-4 d-flex align-items-center">
       <ShoppingBagIcon />
      <span class="mb-3 mb-md-0 text-muted">© {date} <i>Deals4U</i>, Inc All rights reserved.</span>
    </div>
  </footer>
</div>
}

export default Footer;