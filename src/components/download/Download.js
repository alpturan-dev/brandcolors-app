import React from 'react'
import MainContext from '../../MainContext'
import { useContext, useState } from 'react';
import { GrClose, GrDownload } from 'react-icons/gr'
import { useEffect } from 'react';

function Download() {

    const { selectedBrands, brands, setSelectedBrands } = useContext(MainContext);

    const [downloadUrl, setDownloadUrl] = useState();

    const [cssMethod, setCssMethod] = useState('css');

    useEffect(() => {
        if (selectedBrands.length > 0) {
            let output = '';

            switch (cssMethod) {
                case 'css':
                    output = ":root{\n";
                    selectedBrands.map(slug => {
                        let brand = brands.find(brand => brand.slug === slug);
                        brand.colors.map((color, key) => {
                            output += `--${slug}-${key}: #${color};\n`;
                        })
                    })
                    output += "}";
                    break;
                case 'scss':
                    output = "$colors: (\n";
                    selectedBrands.map(slug => {
                        let brand = brands.find(brand => brand.slug === slug);
                        brand.colors.map((color, key) => {
                            output += `${slug}-${key}: #${color},\n`;
                        })
                    }
                    )
                    output += ");";
                    break;
                case 'less':
                    output = "@colors: (\n";
                    selectedBrands.map(slug => {
                        let brand = brands.find(brand => brand.slug === slug);
                        brand.colors.map((color, key) => {
                            output += `${slug}-${key}: #${color},\n`;
                        })
                    }
                    )
                    output += ");";
                    break;
            }

            const blob = new Blob([output]);
            const url = URL.createObjectURL(blob);
            setDownloadUrl(url);
            return () => {
                URL.revokeObjectURL(url);
                setDownloadUrl('');
            }
        }
    }, [selectedBrands, cssMethod])

    return (
        <div className='download'>
            <div className="actions">
                <select onChange={(e) => setCssMethod(e.target.value)}>
                    <option value="css">CSS</option>
                    <option value="scss">SCSS</option>
                    <option value="less">LESS</option>
                </select>
                <a download={`brands.${cssMethod}`} href={downloadUrl}>
                    <GrDownload />
                </a>
            </div>
            <div className="selected" onClick={() => setSelectedBrands([])}>
                <GrClose />
                {selectedBrands.length && `${selectedBrands.length} Brands Selected!`}
            </div>
        </div>
    )
}

export default Download