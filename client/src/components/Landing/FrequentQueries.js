/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import colors from '../../styles/colors';

import Query from './Query';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


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

        @media (max-width : 500px) {
            left: -25px !important
        }
    }

    .slick-next {
        right: -35px !important;

        @media (max-width : 500px) {
            right: -25px !important
        }
    }
    
    .slick-next::before, .slick-prev::before {
        font-size:calc(2rem + 2vw) !important;
        color:${colors.blue_text} !important;
        font-family: 'Dosis', sans-serif !important;
    }

    .slick-next, .slick-prev {
        height:50px;
    }

    
    .slick-slide {
        text-align:center;
        height: 100%;

        & > div {
            height: 100%;
        }
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
    const { onClick } = props;
    return (
        <p className="slick-next" onClick={onClick} />
    );
}

function PrevArrow(props) {
    const { onClick } = props;
    return (
        <p className="slick-prev" onClick={onClick} />
    );
}

const getSlides = () => {
    const { innerWidth: width } = window;
    if (width >= 800) {
        return 3;
    } if (width >= 480) {
        return 2;
    }
    return 1;
};

const FrequentQueries = () => {
    const [slides, setSlides] = useState(getSlides());

    useEffect(() => {
        function handleResize() {
            setSlides(getSlides());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const settings = {
        dots: true,
        arrows: true,
        slidesToShow: slides,
        slidesToScroll: 1,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        swipe: false,
        speed: 500,
    };
    const desc1 = 'Gene associated with liver damage.';
    const desc2 = 'A synthetic derivative of propylpentanoic acid with antiepileptic properties and potential antineoplastic and antiangiogenesis activities.';
    const desc3 = 'This compound is reported to elicit a dose and time dependent response on CYP1A1, a liver metabolizing enzyme involved in xenobiotic metabolism.';
    const desc4 = 'NRF2 target gene, involved in NRF2 mediated oxidative stress regulation.';
    const desc5 = 'PPARA has been reported to be modulated by Valproic acid, in repeated dose toxicity, leading to steatosis.';

    return (
        <StyledQueries>
            <Slider {...settings}>
                {/* https://www.fullstackreact.com/30-days-of-react/day-13/ to iterate over displaying components */}
                <Query desc={desc1} queryUrl="/genes/435,22217" queryName="CD44" type="gene" />
                <Query desc={desc2} queryUrl="/compounds/32" queryName="valproic acid" type="compound" />
                <Query desc={desc3} queryUrl="/expression?compoundId=9&geneId=7396" queryName="CYP1A1 - carbon tetrachloride" type="pair" />
                <Query desc={desc4} queryUrl="/genes/418,25039" queryName="GCLM" type="gene" />
                <Query desc={desc5} queryUrl="/expression?compoundId=32&geneId=14333" queryName="valproic acid - PPARA" type="pair" />
            </Slider>
        </StyledQueries>
    );
};

export default FrequentQueries;
