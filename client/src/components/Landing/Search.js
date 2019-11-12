import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import colors from '../../styles/colors';
import MenuList from './MenuList';

const customStyles = {
  control: (provided) => ({
    ...provided,
    background: 'rgb(0,0,0,0)',
    border: `1px solid ${colors.nav_links}`,
    margin: '5px 0px',
    '&:hover': {
      border: `1px solid ${colors.nav_links}`,
      cursor: 'text',
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: `${colors.nav_links}`,
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: `${colors.nav_links}`,
    '&:hover': {
      color: `${colors.nav_links}`,
      cursor: 'pointer',
    },
  }),

  indicatorSeparator: (provided) => ({
    ...provided,
    background: `${colors.nav_links}`,
    '&:hover': {
      background: `${colors.nav_links}`,
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: `${colors.nav_links}`,
  }),
  option: (provided, state) => ({
    ...provided,
    textAlign: state.isDisabled ? 'left' : 'center',
    fontWeight: state.isDisabled ? '700' : state.isSelected ? '700' : '400',
    background: state.isDisabled ? colors.summary_bg : 'white',
    color: state.isSelected ? colors.color_main_2 : colors.nav_links,
  }),
};


const StyledSearch = styled.div`
    input {
        margin-top:50px;
        height:70px;
        width:calc(100% - 60px);
        background: ${colors.lightred_bg};
        border: none;
        color: ${colors.red_highlight};
        border-radius:35px;
        padding: 0px 30px;
        font-size: calc(1em + 0.8vw);
        font-family: 'Raleway', sans-serif;
        font-weight:700;

        &::placeholder {
            color: ${colors.red_highlight};
            font-weight:600;
            opacity:0.7;
        }

        &:focus {
            outline:none;
        }
    }
`;

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
    console.log(searchData);
    const customFilterOption = (option, rawInput) => {
      const words = rawInput.split(' ');
      return words.reduce(
        (acc, cur) => acc && option.label.toLowerCase().includes(cur.toLowerCase()),
        true,
      );
    };
    return (
    // <StyledSearch>
    //     <input type="text" className="input" placeholder="Search..." />
    // </StyledSearch>
      <>
        {searchData.length == 0 ? null : (
              <Select
                        // isMulti
                        // filterOption={customFilterOption}
                    options={searchData}
                        // components={{ MenuList }}
                    placeholder="Enter Cell Line or Tissue"
                    styles={customStyles}
                  />
            )}
      </>


    );
  }
}

export default Search;
