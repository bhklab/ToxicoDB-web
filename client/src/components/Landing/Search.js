import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import Select, {components} from 'react-select';
import colors from '../../styles/colors';
import MenuList from './MenuList';
import { NONAME } from 'dns';
import { withRouter } from 'react-router-dom';

const customStyles = {
  control: (provided) => ({
    ...provided,
    background: colors.lightred_bg,
    borderRadius: '35px',
    height:80,
    fontFamily: `'Raleway', sans-serif`,
    fontSize: `calc(0.5em + 0.8vw)`,
    fontWeight:600,
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
  clearIndicator: (provided) => ({
    ...provided,
    color: `${colors.red_highlight}`,
    '&:hover': {
      color: `${colors.red_highlight}`,
      cursor: 'pointer',
    },
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

const CustomOption = innerProps => (
  <components.Option {...innerProps}>
    <div
      style={{
        backgroundColor: innerProps.isFocused ? colors.lightred_bg : 'inherit',
        height:30,
        padding: "13px 20px",
        "&:hover": {
          background: colors.lightred_bg
        }
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


class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchData: [],
      options: [],
      selected: [],
      placeholder: "Enter a drug, gene, or gene-drug pair...",
      menuOpen: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMenuOpen = this.handleMenuOpen.bind(this);
    this.handleMenuClose = this.handleMenuClose.bind(this);
  }

  componentDidMount() {
    let searchData = [];

    fetch('/api/v1/drugs')
      .then((response) => response.json())
      .then((data) => {
        const drugData = data.data.map((x) => ({
          label: x.name.charAt(0).toUpperCase() + x.name.slice(1),
          value: x.id,
          type: "drug"
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
          value: x.id,
          type: "gene"
        }));
        // adding genes data to searchData drug options
        // searchData[1].options = geneData;
        searchData = searchData.concat(geneData);
        this.setState({ searchData });

        // having a separate options so i can filter out options
        // but keep all the data in searchData so I don't have to make fetch statements
        this.setState({options: this.state.searchData})
      });
  }

  handleChange(event) {
    const {searchData} = this.state;
    // no options selected (back to none when crossing out values)
    if (event == null || event.length == 0) {
      this.setState({options: searchData})
    } else {
        // set number of options selected
        this.setState({selected: event})

        // filter based on the opposite of the selected value's type
        if (event.length == 1) {
          let newData = [];
          searchData.forEach((x,i) => {
            if (x.type != event[0].type) {
              newData.push(x);
            }
          });
          
          this.setState({options: newData})
        } else if (event.length == 2) {
            // clear
            this.setState({options: []})
        }
    } 
  }

  handleKeyDown(event) {
    const {selected, menuOpen} = this.state;
    const {history} = this.props;
    if (!menuOpen) {  
      let queryParams = "/"
      if (event.key == "Enter") {
        if (selected.length == 0) { // none selected, error
          // change placeholder
          this.setState({placeholder: "Please select an option."})
        } else if (selected.length == 1) { // one selected, go to indiv page
          if (selected[0].type == "drug") {
            queryParams = queryParams.concat(`drugs/${selected[0].value}`)
          }
          else {
            queryParams = queryParams.concat(`genes/${selected[0].value}`)
          }
        } else { // two selected, then it's a gene drug pair
            if (selected[0].type == "drug") {
              queryParams = queryParams.concat(`expression?drugId=${selected[0].value}&geneId=${selected[1].value}`)
            } else {
              queryParams = queryParams.concat(`expression?drugId=${selected[1].value}&geneId=${selected[0].value}`)
            }
        }
      }
      history.push(queryParams);
    }
    
    return null;
  }

  handleMenuOpen() {
    this.setState({menuOpen:true})
  }

  handleMenuClose() {
    this.setState({menuOpen:false})
  }

  render() {
    const { searchData, options, selected, placeholder, menuOpen } = this.state;
    const { handleChange, handleKeyDown, handleMenuOpen, handleMenuClose } = this;

    return (
      <>
        {searchData.length == 0 ? null : (
          <Select
            isMulti
            filterOption={customFilterOption}
            options={options}
            components={{ MenuList, Option: CustomOption }}
            placeholder={placeholder}
            styles={customStyles}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onMenuOpen={handleMenuOpen}
            onMenuClose={handleMenuClose}
          />
        )}
      </>


    );
  }
}

export default withRouter(Search);
