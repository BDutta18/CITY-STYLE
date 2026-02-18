import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Breadcrumb.css';

const shopCategories = [
  { path: '/coats-parkas', label: 'Coats & Parkas' },
  { path: '/hoodies-sweatshirts', label: 'Hoodies & Sweatshirts' },
  { path: '/instagram-trending', label: 'Instagram Trending' },
  { path: '/oversized-tshirt', label: 'Oversized T-Shirts' },
  { path: '/under-40', label: 'Under $40' },
];

const routeMapping = {
  '/shop': { labels: ['Shop'], paths: ['/shop'] },
  '/faq': { labels: ['Support', 'FAQs'], paths: ['/support', '/faq'] },
  '/size-guide': { labels: ['Size Guide'], paths: ['/size-guide'] },
  '/about': { labels: ['About'], paths: ['/about'] },
  '/auth': { labels: ['My Account', 'Login'], paths: ['/profile', '/auth'] }, 
  '/career': { labels: ['Career'], paths: ['/career'] },
  '/contact': { labels: ['Contact'], paths: ['/contact'] },
  '/order-tracking': { labels: ['Support', 'Order Tracking'], paths: ['/support', '/order-tracking'] },
  '/privacy': { labels: ['Privacy Policy'], paths: ['/privacy'] },
  '/profile': { labels: ['My Account', 'Profile'], paths: ['/profile', '/profile'] }, 
  '/store-location': { labels: ['Store Location'], paths: ['/store-location'] },
  '/support': { labels: ['Support'], paths: ['/support'] },
  '/terms': { labels: ['Terms & Conditions'], paths: ['/terms'] },
};

// Dynamically add shop categories
shopCategories.forEach(category => {
  routeMapping[category.path] = { 
    labels: ['Shop', category.label], 
    paths: ['/shop', category.path] 
  };
});

const Breadcrumb = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    if (currentPath === '/') return null;

    const pathConfig = routeMapping[currentPath];
    
    let crumbs = [];
    if (pathConfig) {
        // Build crumbs from config
        crumbs = pathConfig.labels.map((label, index) => ({
            label,
            path: pathConfig.paths[index] || '#' 
        }));
    } else {
        // Dynamic fallback for unmapped routes
        const pathSnippets = currentPath.split('/').filter(i => i);
        crumbs = pathSnippets.map((snippet, index) => {
             const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
             return {
                 label: snippet.charAt(0).toUpperCase() + snippet.slice(1).replace(/-/g, ' '),
                 path: url
             };
        });
    }

    // Add Home as first crumb
    const breadcrumbs = [
        { label: 'Home', path: '/' },
        ...crumbs
    ];

    return (
        <div role="navigation" aria-label="breadcrumb" className="breadcrumb">
             <ol className="breadcrumb__list" itemScope itemType="https://schema.org/BreadcrumbList">
                {breadcrumbs.map((crumb, index) => {
                    const isLast = index === breadcrumbs.length - 1;
                    
                    return (
                        <li 
                            key={index} 
                            className={`breadcrumb__item ${isLast ? 'active' : ''}`}
                            itemProp="itemListElement" 
                            itemScope 
                            itemType="https://schema.org/ListItem"
                        >
                            {isLast ? (
                                <span itemProp="name" aria-current="page">{crumb.label}</span>
                            ) : (
                                <Link to={crumb.path} itemProp="item">
                                    <span itemProp="name">{crumb.label}</span>
                                </Link>
                            )}
                             <meta itemProp="position" content={index + 1} />
                             {!isLast && <span className="breadcrumb__separator" aria-hidden="true">&gt;</span>}
                        </li>
                    );
                })}
             </ol>
        </div>
    );
};

export default Breadcrumb;
