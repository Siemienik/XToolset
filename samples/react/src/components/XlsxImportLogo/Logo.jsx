import React from 'react';
import Github from './Github';
import './Logo.css';

export default function Logo() {
    return (
        <div className="fixed bg-tiffany-blue br2 near-white pa2" style={{ right: 12, top: 12 }}>
            <div className="f4 fw6">xlsx-import</div>
            <div className="mt3">
                <a
                    className="link dim white"
                    href="https://github.com/Siemienik/xlsx-import"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Github className="dib h2 w2" />
                </a>
            </div>
        </div>
    );
}
