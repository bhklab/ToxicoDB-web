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
                <a href="http://wwwdev.ebi.ac.uk/fg/dixa/group/DIXA-002?keywords=">http://wwwdev.ebi.ac.uk/fg/dixa/group/DIXA-002?keywords=</a>
            </li>
            <li>
                <p>
                Title - Transcription profiling of human hepatoma cell lines HepG2 and HepaRG using whole genome gene expression analysis before and after exposure to the genotoxic and non-genotoxic carcinogens
                </p>
                <a href="https://www.ebi.ac.uk/arrayexpress/experiments/E-MEXP-2458/">https://www.ebi.ac.uk/arrayexpress/experiments/E-MEXP-2458/</a>
            </li>
            <h3>April 2021 major release</h3>
            <li>
                <p>
              Title - Effect of 8 compounds on miRNA expression levels in HepG2 cells
                </p>
                <a href="http://wwwdev.ebi.ac.uk/fg/dixa/group/DIXA-044?keywords=">http://wwwdev.ebi.ac.uk/fg/dixa/group/DIXA-044?keywords=</a>
            </li>
            <li>
                <p>
                  Title  - Expression Profiles of HepG2 cells treated with following compounds: Azathriopine, Furan, Tetradecanoyl phorbol acetate, Tetrachloroethylene, Diazinon and Dmannitol
                </p>
                <a href="https://www.ncbi.nlm.nih.gov/geo/query/acc.cgi?acc=GSE58235">GSE58235</a>
            </li>
            <p>
                More datasets -
            </p>
            <a href="https://gitlab.com/bayjan/openrisknet_meta_analysis_data/-/blob/master/meta_analysis_data_info_table.tsv">https://gitlab.com/bayjan/openrisknet_meta_analysis_data/-/blob/master/meta_analysis_data_info_table.tsv</a>
        </ol>
    </div>
);

export default RoadmapDoc;
