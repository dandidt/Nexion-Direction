import React, { useMemo } from 'react';
import "./CategoryFilter.css";
import type { WebSite } from '../types';
import { MainCategory } from '../types';

const ALL_RESOURCES = 'All Resources';

interface CategoryFilterProps {
  activeMain: MainCategory;
  activeSub: string;
  onSelectMain: (cat: MainCategory) => void;
  onSelectSub: (sub: string) => void;
  websites: WebSite[];
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  activeMain, 
  activeSub, 
  onSelectMain, 
  onSelectSub,
  websites
}) => {
  const mainCategories = Object.values(MainCategory);

  const subCategories = useMemo(() => {
    const availableSubs = new Set<string>();
    
    websites.forEach(site => {
      if (site.mainCategory.includes(activeMain)) {
        site.subCategory.forEach(sub => availableSubs.add(sub));
      }
    });

    return [ALL_RESOURCES, ...Array.from(availableSubs).sort()];
  }, [activeMain, websites]);

  return (
    <div className="wrapper-main">
      {/* Main Folder Level */}
      <div className="wrapper-folder">
        {mainCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => onSelectMain(cat)}
            className={`button-folder ${ activeMain === cat ? "active" : "no-active"}`}
          >
            <svg className="folder-icon" xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="#e3e3e3"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Z"/></svg>
            {cat}
          </button>
        ))}
      </div>

      <div className="line"></div>

      {subCategories.length > 1 && (
        <div className="wrapper-category">
          {subCategories.map((sub) => (
            <div className="wrapper-box-btn" key={sub}>
              <button
                onClick={() => onSelectSub(sub)}
                className={`sub-button ${activeSub === sub ? 'active' : 'no-active'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 -960 960 960" width="18" fill="#e3e3e3"><path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H600q-66 0-113 47t-47 113q0 31 10.5 58t29.5 48v148q-13 14-21.5 30.5T445-160H160Zm383.5 96.5Q520-87 520-120q0-23 11-41t29-29v-221q-18-11-29-28.5T520-480q0-33 23.5-56.5T600-560q33 0 56.5 23.5T680-480q0 23-11 40.5T640-411v115l160-53v-62q-18-11-29-28.5T760-480q0-33 23.5-56.5T840-560q33 0 56.5 23.5T920-480q0 23-11 40.5T880-411v119l-240 80v22q18 11 29 29t11 41q0 33-23.5 56.5T600-40q-33 0-56.5-23.5Z"/></svg>
                <span>{sub}</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;