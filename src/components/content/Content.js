import React from 'react'
import Search from '../search/Search'
import Brand from '../brand/Brand';
import Download from '../download/Download';
import MainContext from '../../MainContext';
import { useContext } from 'react';

function Content() {

    const { brands, selectedBrands } = useContext(MainContext);

    return (
        <main className='content'>
            <header className="header">
                <Search />
                {selectedBrands.length !== 0 && <Download />}
            </header>
            <section className='brands'>
                {brands.map(brand => (
                    <Brand brand={brand} />
                ))}
            </section>
        </main>
    )
}

export default Content