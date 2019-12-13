import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';

const StyledAnnotationCard = styled.div`
    width: 100%;
    background: ${colors.lightblue_bg};
    color: ${colors.blue_text};
    
    a {
        color: ${colors.red_highlight};
    }
    table {
        width:100%;
        
    }

    td {
        padding: 10px;
        border: 3px solid white;
    }
    .name {
        text-transform:uppercase;
    }
    .value {
    }
    
`;


class AnnotationCard extends Component {
    constructor() {
        super();
        this.state = {
            data: []
        }
    }

    createCard = () => {
        console.log(this.props.data)
        const {data} = this.props;
        let table = [];
        let children = [];

        for (let j = 0; j < data.length; j++) {
            if(data[j].value) {
                table.push(<tr key={j}><td className="name" key={data[j].name}>{data[j].name.replace("_", " ")}</td><td className="value" key={data[j].value}>{data[j].value}</td></tr>);
            }
        }
        return table;
    }

    componentDidMount() {
       const {data} = this.props;
       this.setState({data: data})
    }

    render() {
        const {data} = this.state;
        return (
            <StyledAnnotationCard>  
                {data.length == 0 ? null : 
                    <table>
                        <tbody>
                            {this.createCard()} 
                        </tbody>
                    </table>
                }
            </StyledAnnotationCard>
            
        );
    }
}


export default AnnotationCard;
