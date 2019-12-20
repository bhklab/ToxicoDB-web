export const DatasetDescription = {

    1: {
        Dataset: 'TGGATES Human',
        Acronym: 'Toxicogenomics Project-Genomics Assisted Toxicity Evaluation system',
        Description: `Generated by the National Institute of Biomedical Innovation, 
                        National Institute of Health Sciences and 15 pharmaceutical companies between 2002 and 2006. 
                        This dataset has profiled the microarray gene expression of 146 compounds on primary human 
                        hepatocytes (PHH).`,
        Resources: {
            Open_TGGATEs: 'https://toxico.nibiohn.go.jp/english/',
            Life_Science_Database_Archive: 'https://dbarchive.biosciencedbc.jp/en/open-tggates/desc.html',
        },
        Publications: {
            'Open TG-GATEs: a large-scale toxicogenomics database': 'https://www.ncbi.nlm.nih.gov/pubmed/25313160',
        },
        DataType: {
            // Cell_Type: 'Primary human hepatocytes',
            // Tissue: 'Liver',
            Study_Type: 'In Vitro',
            Number_Of_Drugs: '146',
            Dose_Level: 'Low, Medium, High',
            Sample_Collection: '2,8,24 hr',
            Microarray_Platform: 'Affymetrix human U133 Plus',
            DataType: 'mRNA expression & Cell viability',
        },
    },


    2: {
        Dataset: 'TGGATES Rat',
        Acronym: 'Toxicogenomics Project-Genomics Assisted Toxicity Evaluation system',
        Description: `Generated by the National Institute of Biomedical Innovation, 
                        National Institute of Health Sciences and 15 pharmaceutical companies between 2002 and 2006. 
                        This dataset has profiled the microarray gene expression of 140 
                        compounds on rat human hepatocytes (PHH).`,
        Resources: {
            Open_TGGATEs: 'https://toxico.nibiohn.go.jp/english/',
            Life_Science_Database_Archive: 'https://dbarchive.biosciencedbc.jp/en/open-tggates/desc.html',
        },
        Publications: {
            'Open TG-GATEs: a large-scale toxicogenomics database': 'https://www.ncbi.nlm.nih.gov/pubmed/25313160',
        },
        DataType: {
            // Cell_Type: 'Primary rat hepatocytes',
            // Tissue: 'Liver',
            Study_Type: 'In Vitro',
            Number_Of_Drugs: '140',
            Dose_Level: 'Low, Medium, High',
            Sample_Collection: '2,8,24 hr',
            Microarray_Platform: 'Rat Genome 230 2.0',
            DataType: 'mRNA expression & Cell viability',
        },
    },

    3: {
        Dataset: 'DrugMatrix Hepatocyte',
        Acronym: 'Generated by the U.S. National Toxicology Program: https://ntp.niehs.nih.gov/',
        Description: `This dataset has Rat toxicological microarrays cell 
                        type (primary rat hepatocyte)  microarray gene expression of 
                        125 compounds on rat human hepatocytes (PHH).`,
        Resources: {
            diXa_Data_Warehouse: 'http://wwwdev.ebi.ac.uk/fg/dixa/browsestudies.html',
        },
        Publications: {
            'An Overview of National Toxicology Program’s Toxicogenomic Applications: DrugMatrix and ToxFX': 'https://link.springer.com/chapter/10.1007/978-3-030-16443-0_8',
        },
        DataType: {
            // Cell_Type: 'Primary rat hepatocytes',
            // Tissue: 'Liver',
            Study_Type: 'In Vitro',
            Number_Of_Drugs: '125',
            Dose_Level: 'Low, Medium, High',
            Sample_Collection: '2,8,24 hr',
            Microarray_Platform: 'Rat Genome 230 2.0',
            DataType: 'mRNA expression & Cell viability',
        },
    },

};

export default {
    DatasetDescription,
};
