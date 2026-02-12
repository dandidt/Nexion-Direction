import React, { useState, useMemo, useEffect } from 'react';
import './App.css';
import { INITIAL_SITES } from './constants';
import type { WebSite } from './types.ts';
import { MainCategory } from './types.ts';
import SiteCard from './components/SiteCard';
import CategoryFilter from './components/CategoryFilter';
import Pagination from './components/Pagination';

const ALL_RESOURCES = 'All Resources';

const App: React.FC = () => {
  const [sites] = useState<WebSite[]>(INITIAL_SITES);
  const [activeMain, setActiveMain] = useState<MainCategory>(MainCategory.CRYPTO);
  
  const [activeSub, setActiveSub] = useState<string>(ALL_RESOURCES);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // ===== GRID CONFIG =====
  const MAX_ROWS = 3;
  const getColumns = () => {
    const w = window.innerWidth;
    if (w >= 1280) return 4;
    if (w >= 1024) return 3;
    if (w >= 640) return 2;
    return 1;
  };

  const [columns, setColumns] = useState(getColumns());
  const itemsPerPage = columns * MAX_ROWS;

  useEffect(() => {
    const onResize = () => setColumns(getColumns());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ===== FILTER DATA (Dinamis) =====
  const filteredSites = useMemo(() => {
    return sites.filter((site) => {
      const matchesMain = site.mainCategory.includes(activeMain);
      
      const matchesSub =
        activeSub === ALL_RESOURCES || 
        site.subCategory.includes(activeSub);

      const matchesSearch = site.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return matchesMain && matchesSub && matchesSearch;
    });
  }, [sites, activeMain, activeSub, searchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeMain, activeSub, searchQuery, columns]);

  const totalPages = Math.ceil(filteredSites.length / itemsPerPage);
  const currentData = useMemo(() => {
    const begin = (currentPage - 1) * itemsPerPage;
    return filteredSites.slice(begin, begin + itemsPerPage);
  }, [filteredSites, currentPage, itemsPerPage]);

  return (
    <div className="main-web">
      <header className="navbar">
        <div className="wrapper-logo">
          <img
            src="https://raw.githubusercontent.com/dandidt/Nexion-Trades-Full/main/favicon.ico"
            className="icon-navbar"
            alt="logo"
          />
          <span className="title-logo font-tasa">NEXION <span className='subtitle-navbar'>DIRECTORY</span></span>
        </div>

        <input
          type="text"
          placeholder="Search Directory..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-text"
        />
      </header>

      <main className="main">
        <div className="main-top">
          <div className="wrapper-text">
            <div className="blok-left"></div>
            <h2 className="directory-text font-mono-custom">
              Nexion / Resources / {activeMain} / {activeSub}
            </h2>
          </div>

          <h1 className="title font-tasa">
            Intelligence <span className="subtitle">Terminal</span>
          </h1>

          <CategoryFilter
            activeMain={activeMain}
            activeSub={activeSub}
            onSelectMain={(cat) => {
              setActiveMain(cat);
              setActiveSub(ALL_RESOURCES);
            }}
            onSelectSub={setActiveSub}
            websites={sites} 
          />
        </div>

        {currentData.length > 0 ? (
          <>
            <div className="wrapper-content">
              {currentData.map((site) => (
                <SiteCard key={site.id} site={site} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        ) : (
          <div className="box-no-data">
            <p className="text-no-data">
              No matching datasets in folder {activeMain}::{activeSub}
            </p>
          </div>
        )}
      </main>

      <footer className="footer">
        <div className="wrapper-footer-socials">
          {/* Discord */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="footer-social-link">
            <svg className='discord-icon' width="14" height="14" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M9 8.5c0 .826.615 1.5 1.36 1.5c.762 0 1.35-.671 1.36-1.5S11.125 7 10.36 7C9.592 7 9 7.677 9 8.5M5.63 10c-.747 0-1.36-.671-1.36-1.5S4.866 7 5.63 7S7.01 7.677 7 8.5c-.013.826-.602 1.5-1.36 1.5z"/><path fill="currentColor" fill-rule="evenodd" d="M13.3 2.72a1 1 0 0 1 .41.342c1.71 2.47 2.57 5.29 2.25 8.53a1 1 0 0 1-.405.71c-1.16.851-2.47 1.5-3.85 1.91a.99.99 0 0 1-1.08-.357a10 10 0 0 1-.665-1.01a9.4 9.4 0 0 1-3.87 0a9 9 0 0 1-.664 1.01a1 1 0 0 1-1.09.357a12.8 12.8 0 0 1-3.85-1.91a1 1 0 0 1-.405-.711c-.269-2.79.277-5.64 2.25-8.52c.103-.151.246-.271.413-.347c.999-.452 2.05-.774 3.14-.957c.415-.07.83.128 1.04.494l.089.161q1.01-.087 2.03 0l.088-.161a1 1 0 0 1 1.04-.494c1.08.181 2.14.502 3.14.955zm-3.67.776a11 11 0 0 0-3.21 0a8 8 0 0 0-.37-.744c-.998.168-1.97.465-2.89.882c-1.83 2.68-2.32 5.29-2.08 7.86c1.07.783 2.27 1.38 3.54 1.76a8 8 0 0 0 .461-.681q.158-.26.297-.53a7.5 7.5 0 0 1-1.195-.565q.15-.109.293-.218a8.5 8.5 0 0 0 1.886.62a8.4 8.4 0 0 0 4.146-.217a8 8 0 0 0 1.04-.404q.144.117.293.218a11 11 0 0 1-.282.157a8 8 0 0 1-.915.41a9 9 0 0 0 .518.872q.117.17.241.337c1.27-.38 2.47-.975 3.54-1.76c.291-2.98-.497-5.57-2.08-7.86c-.92-.417-1.89-.712-2.89-.879q-.204.362-.37.744z" clip-rule="evenodd"/></svg>
            <span>Discord</span>
          </a>

          {/* X (Twitter) */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="footer-social-link">
            <svg className='icon-footer' width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
            <span>Twitter</span>
          </a>

          {/* TikTok */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="footer-social-link">
            <svg className='icon-footer' width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
            <span>TikTok</span>
          </a>

          {/* Instagram */}
          <a href="#" target="_blank" rel="noopener noreferrer" className="footer-social-link">
            <svg className='icon-footer' width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            <span>Instagram</span>
          </a>
        </div>

        <span className="text-footer">
          © 2026 NEXION TRADES. For educational purposes only.
        </span>
      </footer>
    </div>
  );
};

export default App;