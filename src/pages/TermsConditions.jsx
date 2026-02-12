// Contributor: Use this component to migrate the 'legacy_source/pages/Terms&conditons.html' page.
import React from 'react';
import '../styles/index.css'; // Ensure global styles are available
import Breadcrumb from '../components/Breadcrumb';

const TermsConditions = () => {
return (
<>
<Breadcrumb />
<div className="section__container">
  <div className="section__header">TermsConditions Page</div>
  <p>This page is currently under development. Contributors are welcome to work on this!</p>
</div>
</>
);
};

export default TermsConditions;
