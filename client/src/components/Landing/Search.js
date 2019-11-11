import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import Select from 'react-select';
import MenuList from './MenuList';

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
        }
    }

    componentDidMount() {
        let searchData = [
            {
                label: "Drugs",
                options: [],
            }, {
                label: "Genes",
                options: [],
            }
        ];

        fetch('/api/v1/drugs')
            .then(response => response.json())
            .then((data) => {
                let drugData = data.data.map(x => {
                    return {
                        label: x.name.charAt(0).toUpperCase() + x.name.slice(1),
                        value: x.name
                    }
                })
                // adding drug data to searchData drug options
                searchData[0].options = drugData;
                this.setState({ searchData: searchData});
        });

        fetch('/api/v1/genes')
            .then(response => response.json())
            .then((data) => {
                let geneData = data.data.map(x => {
                    return {
                        label: x.name.charAt(0).toUpperCase() + x.name.slice(1),
                        value: x.name
                    }
                })
                // adding genes data to searchData drug options
                searchData[1].options = geneData;

                this.setState({ searchData: searchData});
        });

    }
    render() {
        const {searchData} = this.state;
        console.log(searchData)
        return (
            // <StyledSearch>
            //     <input type="text" className="input" placeholder="Search..." />
            // </StyledSearch>
            <Fragment>
                {searchData.length == 0 ? null : (
                    <Select
                        // isMulti
                        options={searchData}
                        components={
                            { MenuList }
                        }
                    />
                )}
            </Fragment>
            
            
        )
    }
}

export default Search;