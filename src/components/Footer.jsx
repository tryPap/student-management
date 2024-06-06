import React from 'react';
function Footer() {
    return (
        <footer>
        <div id="footer">&copy; Student Managment {new Date().toLocaleDateString()}</div>
      </footer>
    );
}
export default Footer;