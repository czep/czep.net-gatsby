import React, { Fragment } from "react";
import { Link } from "gatsby";
import Sidebar from "./sidebar";

import "../fonts/cmunbi.ttf";
import "../fonts/cmunbx.ttf";
import "../fonts/cmunbx.woff";
import "../fonts/cmunrm.ttf";
import "../fonts/cmunrm.woff";
import "../fonts/cmunti.svg";
import "../fonts/cmunti.ttf";
import "../fonts/cmunti.woff";
import "./layout.css";


const Layout = ({ location, title, children }) => {

  // const rootPath = `${__PATH_PREFIX__}/`;
  const header = (
    <Fragment>
      <h1><Link className="site-title" to="/">{title}</Link></h1>
      <p className="site-description">&#123; work, data, and working&#95;with&#95;data &#125;</p>
    </Fragment>
  );

  return (
    <div className="container">
      <header className="site-header">{header}</header>
      <main className="content">{children}</main>
      <Sidebar />
      <footer className="site-footer">
        <h1><Link className="site-title" to="/">{title}</Link></h1>
        <p className="site-description">&#123; work, data, and working&#95;with&#95;data &#125;</p>
        <p><Link to="/contact/">Send feedback here.</Link></p>
      </footer>
    </div>
  );

};

export default Layout;
