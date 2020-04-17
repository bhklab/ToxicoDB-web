/* eslint-disable no-lonely-if */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import Select, { components } from 'react-select';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../styles/colors';
import MenuList from './MenuList';

const customStyles = {
    control: (provided) => ({
        ...provided,
        background: colors.lightblue_bg,
        borderRadius: '35px',
        height: 80,
        fontFamily: '\'Raleway\', sans-serif',
        fontSize: 'calc(0.5em + 0.8vw)',
        fontWeight: 600,
        color: colors.blue_header,
        marginTop: '80px',
        padding: '0 20px',
        border: 'none',
        '&:hover': {
            cursor: 'text',
        },
        '&:focus': {
            outline: 'none',
            border: 'none',
            boxShadow: 'none',
        },
    }),
    input: (provided) => ({
        ...provided,
        padding: '0 0px',
        color: colors.blue_header,
    }),
    placeholder: (provided) => ({
        ...provided,
        color: `${colors.blue_header}`,
    }),
    clearIndicator: (provided) => ({
        ...provided,
        color: `${colors.blue_header}`,
        '&:hover': {
            color: `${colors.blue_header}`,
            cursor: 'pointer',
        },
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: `${colors.blue_header}`,
        '&:hover': {
            color: `${colors.blue_header}`,
            cursor: 'pointer',
        },
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        background: `${colors.blue_header}`,
        '&:hover': {
            background: `${colors.blue_header}`,
        },
    }),
    singleValue: (provided) => ({
        ...provided,
        color: `${colors.blue_header}`,
    }),
    multiValue: (provided) => ({
        ...provided,
        color: `${colors.blue_header}`,
        background: '#fff',
        marginRight: '10px',
    }),
    multiValueLabel: (provided) => ({
        ...provided,
        color: `${colors.blue_header}`,
    }),
    option: (provided) => ({
        ...provided,
        textAlign: 'left',
        fontWeight: '400',
        background: 'white',
        color: colors.blue_header,
    }),
};

const CustomOption = (innerProps) => (
    <components.Option {...innerProps}>
        <div
            style={{
                backgroundColor: innerProps.isFocused ? colors.lightblue_bg : 'inherit',
                height: 30,
                padding: '13px 20px',
                '&:hover': {
                    background: colors.lightblue_bg,
                },
            }}
        >
            <span>{innerProps.label}</span>
        </div>
    </components.Option>
);

const customFilterOption = (option, rawInput) => {
    const words = rawInput.split(' ');
    return words.reduce(
        (acc, cur) => acc && option.label.toLowerCase().includes(cur.toLowerCase()),
        true,
    );
};

const StyledExample = styled.div`
    margin: 20px 0 0 10px;
    color: ${colors.blue_text};

    a {
        color: ${colors.red_highlight}
    }
`;

class Search extends Component {
    constructor() {
        super();
        this.state = {
            searchData: [],
            options: [],
            selected: [],
            placeholder: 'Enter a compound, gene, or gene-compound pair...',
            menuOpen: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleMenuOpen = this.handleMenuOpen.bind(this);
        this.handleMenuClose = this.handleMenuClose.bind(this);
    }

    async componentDidMount() {
        let searchData = [];
        const getCompounds = fetch('/api/v1/drugs').then((response) => response.json());
        const getGenes = fetch('/api/v1/genes').then((response) => response.json());
        const getCompoundSynonyms = fetch('api/v1/drugs/synonyms').then((response) => response.json());
        const getGeneSynonyms = fetch('api/v1/genes/synonyms').then((response) => response.json());

        // fetching the data from all the APIs.
        const data = await Promise.all([getCompounds, getGenes, getCompoundSynonyms, getGeneSynonyms]);

        // compound data.
        const compoundData = data[0].data.map((x) => ({
            label: x.name.charAt(0).toUpperCase() + x.name.slice(1),
            value: x.id,
            type: 'drug',
        }));
        // adding compound data to searchData compound options
        // searchData[0].options = compoundData;
        searchData = searchData.concat(compoundData);

        // compound synonyms.
        const compoundSynonyms = data[2].data.map((x) => ({
            label: x.synonym.charAt(0).toUpperCase() + x.synonym.slice(1),
            value: x.drug_id,
            type: 'drug',
        }));
        searchData = searchData.concat(compoundSynonyms);

        // gene synonyms.
        const geneSynonyms = data[3].data.map((x) => ({
            label: x.synonym,
            value: x.gene_id,
            type: 'gene',
        }));
        searchData = searchData.concat(geneSynonyms);


        // Generating an array of options fro react select where value section
        // can store multiple ids
        const geneObj = {};
        data[1].data.forEach((item) => {
            const name = item.symbol.toUpperCase();
            if (!geneObj[name]) {
                geneObj[name] = { label: name, value: [item.id] };
            } else {
                geneObj[name].value.push(item.id);
            }
        });
        const geneData = Object.values(geneObj).map((x) => ({
            label: x.label,
            value: x.value,
            type: 'gene',
        }));

        // adding genes data to searchData compound options
        // searchData[1].options = geneData;
        searchData = searchData.concat(geneData);
        this.setState({ searchData });

        // having a separate options so i can filter out options
        // but keep all the data in searchData so I don't have to make fetch statements
        this.setState({ options: searchData });
    }

    handleChange(event) {
        const { searchData } = this.state;
        // no options selected (back to none when crossing out values)
        if (event === null || event.length === 0) {
            this.setState({ options: searchData });
        } else {
            // set number of options selected
            this.setState({ selected: event });

            // filter based on the opposite of the selected value's type
            if (event.length === 1) {
                const newData = [];
                searchData.forEach((x) => {
                    if (x.type !== event[0].type) {
                        newData.push(x);
                    }
                });

                this.setState({ options: newData });
            } else if (event.length === 2) {
                // clear
                this.setState({ options: [] });
            }
        }
    }

    handleKeyDown(event) {
        const { selected, menuOpen } = this.state;
        const { history } = this.props;
        if (!menuOpen) {
            let queryParams = '/';
            if (event.key === 'Enter') {
                if (selected.length === 0) { // none selected, error
                    // change placeholder
                    this.setState({ placeholder: 'Please select an option.' });
                } else if (selected.length === 1) { // one selected, go to indiv page
                    if (selected[0].type === 'drug') {
                        queryParams = queryParams.concat(`compounds/${selected[0].value}`);
                    } else {
                        queryParams = queryParams.concat(`genes/${selected[0].value}`);
                    }
                } else { // two selected, then it's a gene compound pair
                    if (selected[0].type === 'drug') {
                        queryParams = queryParams.concat(`expression?compoundId=${selected[0].value}&geneId=${selected[1].value}`);
                    } else {
                        queryParams = queryParams.concat(`expression?compoundId=${selected[1].value}&geneId=${selected[0].value}`);
                    }
                }
            }
            history.push(queryParams);
        }

        return null;
    }

    handleMenuOpen() {
        this.setState({ menuOpen: true });
    }

    handleMenuClose() {
        this.setState({ menuOpen: false });
    }

    render() {
        const {
            searchData, options, placeholder,
        } = this.state;
        const {
            handleChange, handleKeyDown, handleMenuOpen, handleMenuClose,
        } = this;

        return (
            <>
                {/* {searchData.length === 0 ? null : ( */}
                <Select
                    isMulti
                    filterOption={customFilterOption}
                    options={options}
                    components={{
                        MenuList: (props) => (<MenuList {...props} />),
                        Option: CustomOption,
                    }}
                    placeholder={placeholder}
                    styles={customStyles}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onMenuOpen={handleMenuOpen}
                    onMenuClose={handleMenuClose}
                />
                {/* )} */}
                <StyledExample>
                    Example Queries: &nbsp;&nbsp;
                    <Link to="/compounds/7">Acetaminophen</Link>
                    {' '}
&nbsp;&nbsp;|&nbsp;&nbsp;
                    {' '}
                    <Link to="/genes/7396,27541">CYP1A1</Link>
                    {' '}
&nbsp;&nbsp;|&nbsp;&nbsp;
                    {' '}
                    <Link to="/expression?compoundId=9&geneId=7396,27541">CYP1A1 - carbon tetrachloride</Link>
                </StyledExample>
            </>


        );
    }
}

export default withRouter(Search);
