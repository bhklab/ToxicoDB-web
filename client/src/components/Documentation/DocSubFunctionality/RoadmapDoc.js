/* eslint-disable max-len */
import React from 'react';

const RoadmapDoc = () => (
    <div className="doc">
        <h1>Roadmap</h1>
        <p>
          As a part of collaboration with OpenRiskNet,
            {' '}
            <em>ToxicoDB</em>
            {' '}
          will be updated with more datasets. Please find the details to the datasets here -
        </p>
        <ol>
            <h3>October 2020 major release</h3>
            <li>
                <p>
                    Title - Liver models - a successful tool for mechanism-based in vitro detection of genotoxicants
                </p>
                <a target="_blank" rel="noopener noreferrer" href="http://wwwdev.ebi.ac.uk/fg/dixa/group/DIXA-002?keywords=">DIXA-002</a>
            </li>
            <li>
                <p>
                Title - Transcription profiling of human hepatoma cell lines HepG2 and HepaRG using whole genome gene expression analysis before and after exposure to the genotoxic and non-genotoxic carcinogens
                </p>
                <a target="_blank" rel="noopener noreferrer" href="https://www.ebi.ac.uk/arrayexpress/experiments/E-MEXP-2458/">E-MEXP-2458</a>
            </li>
            <h3>April 2021 major release</h3>
            <li>
                <p>
                  Title - Expression Profiles of HepG2 cells treated with genotoxic and non-genotoxic agents
                </p>
                <a target="_blank" rel="noopener noreferrer" href="http://wwwdev.ebi.ac.uk/fg/dixa/group/DIXA-044?keywords=">GSE28878</a>
            </li>
            <li>
                <p>
                  Title  - Expression Profiles of HepG2 cells treated with following compounds: Azathriopine, Furan, Tetradecanoyl phorbol acetate, Tetrachloroethylene, Diazinon and Dmannitol
                </p>
                <a target="_blank" rel="noopener noreferrer" href="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE58235">GSE58235</a>
            </li>
            <p>
                More in vitro datasets -
            </p>
            <a target="_blank" rel="noopener noreferrer" href="https://gitlab.com/bayjan/openrisknet_meta_analysis_data/-/blob/master/meta_analysis_data_info_table.tsv">https://gitlab.com/bayjan/openrisknet_meta_analysis_data/-/blob/master/meta_analysis_data_info_table.tsv</a>
            <p>
                In vivo datasets -
                {' '}
            </p>
            <p>
                Open TG-GATEs  liver -
                <a target="_blank" rel="noopener noreferrer" href="https://toxico.nibiohn.go.jp/english/datalist.html"> https://toxico.nibiohn.go.jp/english/datalist.html</a>
            </p>
        </ol>
    </div>
);

export default RoadmapDoc;
