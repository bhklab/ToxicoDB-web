import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import colors from '../../styles/colors';
import MenuList from './MenuList';
import { NONAME } from 'dns';

const customStyles = {
  control: (provided) => ({
    ...provided,
    background: colors.lightred_bg,
    borderRadius: '35px',
    height:60,
    fontFamily: `'Raleway', sans-serif`,
    fontSize: `calc(0.5em + 0.8vw)`,
    fontWeight:700,
    color: colors.red_highlight,
    marginTop: '80px',
    padding:'0 20px',
    border:'none',
    '&:hover': {
      cursor: 'text',
    },
    "&:focus": {
        outline:"none",
        border:"none",
        boxShadow: "none"
    },
  }),
  input: (provided) => ({
    ...provided,
    padding:'0 0px',
    color: colors.red_highlight,
  }),
  placeholder: (provided) => ({
    ...provided,
    color: `${colors.red_highlight}`,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: `${colors.red_highlight}`,
    '&:hover': {
      color: `${colors.red_highlight}`,
      cursor: 'pointer',
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    background: `${colors.red_highlight}`,
    '&:hover': {
      background: `${colors.red_highlight}`,
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: `${colors.red_highlight}`,
  }),
  multiValue: (provided) => ({
    ...provided,
    color: `${colors.red_highlight}`,
    background:'#fff',
    marginRight:'10px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: `${colors.red_highlight}`,
  }),
  option: (provided, state) => ({
    ...provided,
    textAlign: 'left',
    fontWeight: '400',
    background: 'white',
    color: colors.red_highlight,
  }),
};

const customFilterOption = (option, rawInput) => {
    const words = rawInput.split(' ');
    return words.reduce(
      (acc, cur) => acc && option.label.toLowerCase().includes(cur.toLowerCase()),
      true,
    );
  };


class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchData: [],
    };
  }

  componentDidMount() {
    // let searchData = [
    //     {
    //         label: "Drugs",
    //         options: [],
    //     }, {
    //         label: "Genes",
    //         options: [],
    //     }
    // ];
    let searchData = [];

    fetch('/api/v1/drugs')
      .then((response) => response.json())
      .then((data) => {
        const drugData = data.data.map((x) => ({
          label: x.name.charAt(0).toUpperCase() + x.name.slice(1),
          value: x.name,
        }));
        // adding drug data to searchData drug options
        // searchData[0].options = drugData;
        searchData = searchData.concat(drugData);
        this.setState({ searchData });
      });

    fetch('/api/v1/genes')
      .then((response) => response.json())
      .then((data) => {
        const geneData = data.data.map((x) => ({
          label: x.name.charAt(0).toUpperCase() + x.name.slice(1),
          value: x.name,
        }));
        // adding genes data to searchData drug options
        // searchData[1].options = geneData;
        searchData = searchData.concat(geneData);
        this.setState({ searchData });
      });
  }

  render() {
    const { searchData } = this.state;
    
    return (
    // <StyledSearch>
    //     <input type="text" className="input" placeholder="Search..." />
    // </StyledSearch>
      <>
        {searchData.length == 0 ? null : (
              <Select
                    isMulti
                    filterOption={customFilterOption}
                    options={searchData}
                    components={{ MenuList }}
                    placeholder="Enter a drug or gene..."
                    styles={customStyles}
                  />
            )}
      </>


    );
  }
}

export default Search;
