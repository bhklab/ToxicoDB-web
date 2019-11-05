import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import Slider from 'react-slick';

import Query from './Query.js';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const StyledQueries = styled.div`
    margin-top:35px;
    width: 100%;

    .slick-next::before {
        content: '>' !important;
    }
    
    .slick-prev::before {
        content: '<' !important;
    }
    
    .slick-prev {
        left: -35px !important;
    }

    .slick-next {
        right: -40px !important;
    }
    
    .slick-next::before, .slick-prev::before {
        font-size:calc(5em + 3vw) !important;
        color:${colors.blue_text} !important;
        font-family: 'Dosis', sans-serif !important;
    }

    .slick-next, .slick-prev {
        height:50px;
    }

    
    .slick-slide {
        text-align:center;
    }
    
    .slick-slide:focus {
        outline:none;
    }

    .slick-dots {
        top:calc(100% + 10px);
        & li button::before {
            color: ${colors.blue_text} !important;
        }
    }
        
    
    
`;

function NextArrow(props) {
    const {onClick} =  props;
    return (
        <p className="slick-next" onClick={onClick}/>
    );
}
  
function PrevArrow(props) {
    const {onClick} =  props;
    return (
        <p className="slick-prev" onClick={onClick}/>
    );
}


class FrequentQueries extends Component {
    render() {
        const prev = '<p className="slick-prev">Prev</p>'
        const settings = {
            dots: true,
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            prevArrow: <PrevArrow/>,
            nextArrow: <NextArrow/>,
            swipe: false,
            speed: 500,
        };
        
        return (
            <StyledQueries>
                <Slider {...settings}>
                    {/* https://www.fullstackreact.com/30-days-of-react/day-13/ to iterate over displaying components */}
                    <Query queryName="CYP1A1"/>
                    <Query queryName="paclitaxel"/>
                    <Query queryName="carbon tetrachloride"/>
                    <Query queryName="erbb1"/>
                    <Query queryName="CYP1A1"/>
                    <Query queryName="CYP1A1"/>
    
                </Slider>
            </StyledQueries>
        )
    }
}

export default FrequentQueries;