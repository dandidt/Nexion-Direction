import React from 'react';
import type { WebSite } from '../types';
import './SiteCard.css';

interface SiteCardProps {
  site: WebSite;
}

const SiteCard: React.FC<SiteCardProps> = ({ site }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = React.useState(0);
  const [isCalculating, setIsCalculating] = React.useState(true);
    
  React.useLayoutEffect(() => {
    if (!containerRef.current) return;

    setIsCalculating(true);
    const containerWidth = containerRef.current.offsetWidth;
    let usedWidth = 0;
    let count = 0;
    const GAP = 6;
    const PLUS_TAG_WIDTH = 45; 

    const temp = document.createElement('div');
    Object.assign(temp.style, {
      position: 'absolute',
      visibility: 'hidden',
      display: 'flex',
      gap: `${GAP}px`,
      whiteSpace: 'nowrap',
    });
    document.body.appendChild(temp);

    for (let i = 0; i < site.tags.length; i++) {
      const tag = site.tags[i];
      const el = document.createElement('div');
      el.className = 'box-tag';
      el.innerHTML = `<span class="tag-badge">${tag}</span>`;
      temp.appendChild(el);

      const tagWidth = el.offsetWidth;
      const isLast = i === site.tags.length - 1;
      
      const neededWidth = isLast 
        ? usedWidth + tagWidth 
        : usedWidth + tagWidth + GAP + PLUS_TAG_WIDTH;

      if (neededWidth > containerWidth && i > 0) {
        break;
      }

      usedWidth += tagWidth + GAP;
      count++;
    }

    document.body.removeChild(temp);
    setVisibleCount(count);
    setIsCalculating(false);
  }, [site.tags]);

  const visibleTags = site.tags.slice(0, visibleCount);
  const hiddenTags = site.tags.slice(visibleCount);

  return (
    <div className="site-card">
      {/* Thumbnail Section */}
      <div className="card-image-wrapper">
        <img src={site.imageUrl} alt={site.name} className="card-img" />
        <div className="card-gradient-overlay" />
        <div className="category-badge-wrapper">
          <div className="wrapper-row-badge">
            {site.subCategory.map((cat, index) => (
              <span key={`${cat}-${index}`} className="category-badge font-mono-custom">
                {cat}
              </span>
            ))}
          </div>
          <div className="status-dot" />
        </div>
      </div>

      {/* Content Section */}
      <div className="card-content">
        <div className="card-header-row">
          <h3 className="card-title">{site.name}</h3>
        </div>

        <p className="card-description">{site.description}</p>

        {/* Tags Container */}
        <div 
          className={`tag-container ${isCalculating ? 'calculating' : 'ready'}`} 
          ref={containerRef}
        >
          {visibleTags.map((tag, i) => (
            <div key={i} className="box-tag">
              <span className="tag-badge">{tag}</span>
            </div>
          ))}

          {hiddenTags.length > 0 && (
            <div className="tooltip-wrapper">
              <span className="tag-badge-tooltip">+{hiddenTags.length}</span>
              <div className="tooltip-content">
                <div className="tooltip-header">Extra Metadata Tags</div>
                {hiddenTags.map((tag, i) => (
                  <span key={i} className="tooltip-tag-item">{tag}</span>
                ))}
              </div>
            </div>
          )}
          
          {isCalculating && <div className="box-tag" style={{ visibility: 'hidden' }}>&nbsp;</div>}
        </div>

        {/* Action Button */}
        <a
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-terminal"
        >
          <span>Open Now</span>
          <svg
            className="btn-icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default SiteCard;